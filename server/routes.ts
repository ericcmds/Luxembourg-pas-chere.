import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.saveContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error saving contact message:", error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // Newsletter subscriptions
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeToNewsletter(validatedData);
      res.status(201).json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid email address", errors: error.errors });
      } else {
        console.error("Error saving newsletter subscription:", error);
        res.status(500).json({ success: false, message: "Failed to subscribe" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
