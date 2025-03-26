import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", data: contact });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(400).json({ success: false, message: "Invalid contact form data" });
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
