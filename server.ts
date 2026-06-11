import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PRODUCTS, OFFERS } from "./src/data/products.ts";

dotenv.config();

// Standard server-side initialization for Gemini SDK with telemetry headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy_key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // 1. AI CHATBOT ROUTE - Context-Aware and Catalog-Integrated assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, currentPage, currentProduct, cartSummary } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Fallback response for missing API key so the application remains robust
        return res.json({
          response: "Hi! I am *Zene*, Zentrova's premium shopping guide. I would love to tell you all about our products and offers! (Note: The Gemini API key is currently unconfigured, so I am running in local offline demo mode). Our premium catalog offers things like " + PRODUCTS.map(p => p.title).slice(0,3).join(", ") + "! How can I help you discover these?",
          isDemo: true
        });
      }

      // Generate conversational context detailing Zentrova's brand, catalog, and actual catalog offers
      const catalogInfo = PRODUCTS.map(p => 
        `- [ID: ${p.id}] ${p.title} by ${p.brand} listed under ${p.category} -> ${p.subCategory} ($${p.price}) with sku ${p.sku}. Key features: ${p.features.slice(0,2).join(", ")}. In stock: ${p.inStock} (${p.stockCount} left).`
      ).join("\n");

      const offersInfo = OFFERS.map(o => 
        `- Campaign: ${o.title}. Text: "${o.description}". Coupon Code: "${o.couponCode}" giving ${o.discountPercent}% off.`
      ).join("\n");

      let contextPrompt = `You are "Zene", a luxury, friendly, and ultra-professional AI shopping guide at Zentrova.
Zentrova's Tagline is "Discover the Best, Shop the Future".

Here is the actual active catalog of Zentrova:
${catalogInfo}

Here are the active campaigns/discount coupons:
${offersInfo}

Context boundaries:
1. ONLY discuss products listed in Zentrova's active catalog.
2. Under no circumstances make up mock products that do not exist in the above catalog list.
3. Help the user discover products, answer technical questions (about headphones, watches, serums, etc.), explain premium elements, and suggest the appropriate discount codes!
4. Keep answers concise, helpful, highly structured, and written in a polished tone (never dry, never over-hyped).
5. If the user asks for coupons, give them the actual active coupon codes like "SOLSTICE40" or "WELCOME10".
6. Keep markdown formatting clean (e.g. use bullet points and bold headers).

Current session details:
- User is currently viewing path/section: "${currentPage || 'Homepage'}"
${currentProduct ? `- Product currently in view: "${currentProduct.title}" ($${currentProduct.price})` : ""}
${cartSummary ? `- Active cart contents: "${JSON.stringify(cartSummary)}"` : ""}
`;

      // Build contents schema for models
      const chatMessages = [];
      // Combine history if formatted
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          chatMessages.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }
      chatMessages.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Call Gemini 3.5 Flash server-side using the correct generateContent API
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatMessages,
        config: {
          systemInstruction: contextPrompt,
          temperature: 0.7,
        }
      });

      res.json({
        response: response.text || "I was unable to complete your request. Please try again.",
        isDemo: false
      });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      res.status(500).json({ error: "Failed to communicate with Zentrova AI Core Assistant.", details: error.message });
    }
  });

  // 2. PERSONALIZED RECOMMENDATIONS ROUTE
  app.post("/api/personalized-suggestions", async (req, res) => {
    try {
      const { cartItems, wishlistIds, viewedProductIds } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        // Offline heuristic fallback suggestions
        const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 3);
        return res.json({
          suggestions: bestSellers,
          reason: "Recommended based on trending popularity and superior buyer satisfaction.",
          isDemo: true
        });
      }

      const promptInput = `Based on the following user signals at Zentrova:
- Current Cart: ${JSON.stringify(cartItems || [])}
- Wishlisted Product IDs: ${JSON.stringify(wishlistIds || [])}
- Recently Viewed Product IDs: ${JSON.stringify(viewedProductIds || [])}

Analyze their shopping behavior and match them to the available catalog products:
${PRODUCTS.map(p => `[ID: ${p.id}] ${p.title} - ${p.category} -> ${p.subCategory} ($${p.price}). Details: ${p.description}`).join("\n")}

Respond with ONLY a clean JSON object in this layout:
{
  "recommendedProductIds": ["id1", "id2", "id3"],
  "reason": "a brief tailored 1-sentence explanation of why these products fit their behavior"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptInput,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        }
      });

      try {
        const result = JSON.parse(response.text?.trim() || "{}");
        // Resolve actual catalog products
        const suggestions = PRODUCTS.filter(p => result.recommendedProductIds?.includes(p.id));
        res.json({
          suggestions: suggestions.length > 0 ? suggestions : PRODUCTS.slice(0, 3),
          reason: result.reason || "Recommended items custom-curated for your modern lifestyle.",
          isDemo: false
        });
      } catch (err) {
        // Fallback in case of JSON parse failure
        res.json({
          suggestions: PRODUCTS.slice(0, 3),
          reason: "Exclusive suggestions recommended based on Zentrova's active trends.",
          isDemo: false
        });
      }
    } catch (error: any) {
      console.error("Personalization Error:", error);
      res.status(500).json({ error: "Failed to compile recommendations." });
    }
  });

  // 3. SERVICE WEB PLATFORM & MIDDLEWARES
  if (process.env.NODE_ENV !== "production") {
    // Development Mode Server utilizing Vite's Hot Module Replacement proxy middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite developer middleware mounted successfully.");
  } else {
    // Production Mode serving compiled static resources
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zentrova Full-Stack platform active and bound to port ${PORT}`);
  });
}

startServer();
