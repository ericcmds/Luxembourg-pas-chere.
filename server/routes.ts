import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";
import rateLimit from 'express-rate-limit';

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

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", data: contact });
    } catch (error) {
      console.error("Contact form submission error:", error);
      if (error.name === 'ZodError') {
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

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json({ success: true, message: "Newsletter subscription successful", data: newsletter });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ success: false, message: "Invalid newsletter subscription data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
