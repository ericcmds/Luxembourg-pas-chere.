import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  newsletterSchema, 
  bookOrderSchema, 
  crowdfundingPledgeSchema,
  searchHistorySchema,
  restaurantSchema,
  accommodationSchema,
  budgetTipSchema,
  aiRecommendationSchema
} from "@shared/schema";
import rateLimit from 'express-rate-limit';
import { ZodError } from "zod";
import { Anthropic } from "@anthropic-ai/sdk";

// Create Anthropic client for AI integration
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiters für verschiedene API-Endpunkte
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute
  message: { error: "Too many contact form submissions, please try again later" }
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: { error: "Too many newsletter subscriptions, please try again later" }
});

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: { error: "Too many order submissions, please try again later" }
});

const crowdfundingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: { error: "Too many crowdfunding pledges, please try again later" }
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: { error: "Too many AI recommendations requested, please try again later" }
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute
  message: { error: "Too many searches, please try again later" }
});

export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * Kontaktformular-API
   */
  app.post("/api/contact", contactLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", data: contact });
    } catch (error: unknown) {
      console.error("Contact form submission error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  });

  /**
   * Newsletter-Anmeldung
   */
  app.post("/api/newsletter", newsletterLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Newsletter subscription successful", 
        data: newsletter 
      });
    } catch (error: unknown) {
      console.error("Newsletter subscription error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else if (error instanceof Error && error.message.includes('bereits registriert')) {
        return res.status(409).json({ 
          success: false, 
          message: error.message 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  });

  /**
   * Buchbestellung-API
   */
  app.post("/api/book-orders", orderLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = bookOrderSchema.parse(req.body);
      const order = await storage.createBookOrder(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Order placed successfully", 
        data: order 
      });
    } catch (error: unknown) {
      console.error("Book order error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request" 
      });
    }
  });

  /**
   * Crowdfunding-Optionen abrufen
   */
  app.get("/api/crowdfunding", async (_req: Request, res: Response) => {
    try {
      const options = await storage.getCrowdfundingOptions();
      res.json({
        success: true,
        data: options
      });
    } catch (error) {
      console.error("Error fetching crowdfunding options:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve crowdfunding options"
      });
    }
  });

  /**
   * Crowdfunding-Pledge abschicken
   */
  app.post("/api/crowdfunding/pledge", crowdfundingLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = crowdfundingPledgeSchema.parse(req.body);
      const pledge = await storage.createCrowdfundingPledge(validatedData);
      res.status(201).json({
        success: true,
        message: "Thank you for your pledge!",
        data: pledge
      });
    } catch (error) {
      console.error("Crowdfunding pledge error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your pledge"
      });
    }
  });

  /**
   * Suchanfrage speichern
   */
  app.post("/api/search-history", searchLimiter, async (req: Request, res: Response) => {
    try {
      // Prüfen, ob SessionID vorhanden ist
      if (!req.body.sessionId) {
        req.body.sessionId = Math.random().toString(36).substring(2, 15);
      }

      const validatedData = searchHistorySchema.parse(req.body);
      const searchEntry = await storage.addSearchTerm(validatedData);
      res.status(201).json({
        success: true,
        data: searchEntry,
        sessionId: req.body.sessionId
      });
    } catch (error) {
      console.error("Search history error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to save search term"
      });
    }
  });

  /**
   * Letzte Suchbegriffe abrufen
   */
  app.get("/api/search-history", searchLimiter, async (req: Request, res: Response) => {
    try {
      const sessionId = req.query.sessionId as string;
      
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: "Session ID is required"
        });
      }
      
      const searches = await storage.getRecentSearches(sessionId);
      res.json({
        success: true,
        data: searches
      });
    } catch (error) {
      console.error("Error fetching search history:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve search history"
      });
    }
  });

  /**
   * Restaurants abrufen
   */
  app.get("/api/restaurants", async (req: Request, res: Response) => {
    try {
      // Filter-Parameter aus Query-String extrahieren
      const filterOptions = {
        location: req.query.location as string,
        priceCategory: req.query.priceCategory as string,
        cuisine: req.query.cuisine as string,
        specialDeal: req.query.specialDeal === 'true'
      };
      
      const restaurants = await storage.getRestaurants(filterOptions);
      res.json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve restaurants"
      });
    }
  });

  /**
   * Unterkünfte abrufen
   */
  app.get("/api/accommodations", async (req: Request, res: Response) => {
    try {
      // Filter-Parameter aus Query-String extrahieren
      const filterOptions = {
        location: req.query.location as string,
        priceCategory: req.query.priceCategory as string,
        specialDeal: req.query.specialDeal === 'true'
      };
      
      const accommodations = await storage.getAccommodations(filterOptions);
      res.json({
        success: true,
        data: accommodations
      });
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve accommodations"
      });
    }
  });

  /**
   * Budget-Tipps abrufen
   */
  app.get("/api/budget-tips", async (req: Request, res: Response) => {
    try {
      const languageCode = req.query.lang as string || 'de';
      const tips = await storage.getBudgetTips(languageCode);
      res.json({
        success: true,
        data: tips
      });
    } catch (error) {
      console.error("Error fetching budget tips:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve budget tips"
      });
    }
  });

  /**
   * Claude AI für personalisierte Empfehlungen
   */
  app.post("/api/ai-recommendations", aiLimiter, async (req: Request, res: Response) => {
    try {
      const { prompt, category, languageCode = 'de', sessionId } = req.body;
      
      // Validierung der Eingaben
      if (!prompt || !category || !sessionId) {
        return res.status(400).json({
          success: false,
          message: "Required fields missing: prompt, category, and sessionId are required"
        });
      }

      // Angepassten Prompt für Claude erstellen
      const systemPrompt = `Du bist ein hilfreicher Reiseberater für Luxemburg, der speziell für Budget-Reisende Empfehlungen gibt. 
      Du bist Experte für kostengünstige Optionen in Luxemburg und kennst alle Sparmöglichkeiten.
      Beantworte die Frage des Nutzers prägnant mit spezifischen Tipps für ${category} in Luxemburg.
      Verwende immer die Sprache des Nutzers (${languageCode}).
      Beginne deine Antwort nie mit "Als KI" oder "Als Sprachmodell".
      Gib eine kurze, direkte Antwort mit 3-5 konkreten Empfehlungen.`;

      // Claude API aufrufen
      const response = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219", // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: prompt
        }]
      });

      // Empfehlung in Datenbank speichern
      const recommendation = await storage.saveAiRecommendation({
        sessionId,
        userId: req.body.userId,
        prompt,
        response: response.content[0].text,
        category,
        languageCode
      });

      // Erfolgreiche Antwort
      res.json({
        success: true,
        data: {
          recommendation: response.content[0].text,
          id: recommendation.id
        }
      });
    } catch (error) {
      console.error("Error generating AI recommendation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate recommendation"
      });
    }
  });

  /**
   * Feedback zu AI-Empfehlungen geben
   */
  app.post("/api/ai-recommendations/:id/feedback", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { rating } = req.body;
      
      if (isNaN(id) || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Invalid ID or rating (rating must be 1-5)"
        });
      }
      
      // In einer vollständigen Implementierung würde hier
      // die Bewertung in der Datenbank gespeichert werden
      
      res.json({
        success: true,
        message: "Feedback received, thank you!"
      });
    } catch (error) {
      console.error("Error saving AI feedback:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save feedback"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
