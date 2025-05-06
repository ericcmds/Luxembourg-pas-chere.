import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  json,
  numeric,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Bestehende Nutzertabelle
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Newsletter-Anmeldungen
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  interests: json("interests").$type<string[]>().default([]),
  language: varchar("language", { length: 10 }).default("de"),
  consent: boolean("consent").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const newsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
  name: true,
  interests: true,
  language: true,
  consent: true,
});

export type InsertNewsletter = z.infer<typeof newsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Kontaktanfragen
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  responded: boolean("responded").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContact = z.infer<typeof contactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Buchbestellungen
export const bookOrders = pgTable("book_orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  totalPrice: numeric("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const bookOrderSchema = createInsertSchema(bookOrders).pick({
  name: true,
  email: true,
  address: true,
  city: true,
  zip: true,
  country: true,
  quantity: true,
  paymentMethod: true,
});

export type InsertBookOrder = z.infer<typeof bookOrderSchema>;
export type BookOrder = typeof bookOrders.$inferSelect;

// Restaurants
export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  priceCategory: varchar("price_category", { length: 50 }).notNull(), // budget, moderate, higher
  cuisine: varchar("cuisine", { length: 50 }).notNull(),
  rating: numeric("rating").notNull(),
  description: text("description").notNull(),
  address: varchar("address", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  websiteUrl: varchar("website_url", { length: 255 }),
  specialDeal: boolean("special_deal").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const restaurantSchema = createInsertSchema(restaurants).pick({
  name: true,
  location: true,
  priceCategory: true,
  cuisine: true,
  rating: true,
  description: true,
  address: true,
  imageUrl: true,
  websiteUrl: true,
  specialDeal: true,
});

export type InsertRestaurant = z.infer<typeof restaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;

// Unterkünfte
export const accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  priceCategory: varchar("price_category", { length: 50 }).notNull(), // budget, moderate, higher
  rating: numeric("rating").notNull(),
  description: text("description").notNull(),
  address: varchar("address", { length: 255 }),
  imageUrl: varchar("image_url", { length: 255 }),
  websiteUrl: varchar("website_url", { length: 255 }),
  specialDeal: boolean("special_deal").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accommodationSchema = createInsertSchema(accommodations).pick({
  name: true,
  location: true,
  priceCategory: true,
  rating: true,
  description: true,
  address: true,
  imageUrl: true,
  websiteUrl: true,
  specialDeal: true,
});

export type InsertAccommodation = z.infer<typeof accommodationSchema>;
export type Accommodation = typeof accommodations.$inferSelect;

// Ausstattungsmerkmale für Unterkünfte (Many-to-Many)
export const amenities = pgTable("amenities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
});

export const accommodationAmenities = pgTable("accommodation_amenities", {
  accommodationId: integer("accommodation_id").notNull().references(() => accommodations.id, { onDelete: "cascade" }),
  amenityId: integer("amenity_id").notNull().references(() => amenities.id, { onDelete: "cascade" }),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.accommodationId, table.amenityId] }),
  };
});

// Spartipps und Budgetideen
export const budgetTips = pgTable("budget_tips", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // transport, dining, accommodation, activity
  description: text("description").notNull(),
  savingEstimate: integer("saving_estimate"), // Geschätzte Ersparnis in Euro
  difficulty: varchar("difficulty", { length: 50 }), // easy, medium, hard
  imageUrl: varchar("image_url", { length: 255 }),
  languageCode: varchar("language_code", { length: 10 }).notNull().default("de"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const budgetTipSchema = createInsertSchema(budgetTips).pick({
  title: true,
  category: true,
  description: true,
  savingEstimate: true,
  difficulty: true,
  imageUrl: true,
  languageCode: true,
});

export type InsertBudgetTip = z.infer<typeof budgetTipSchema>;
export type BudgetTip = typeof budgetTips.$inferSelect;

// Benutzersuchverläufe
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  searchTerm: varchar("search_term", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const searchHistorySchema = createInsertSchema(searchHistory).pick({
  userId: true,
  sessionId: true,
  searchTerm: true,
});

export type InsertSearchHistory = z.infer<typeof searchHistorySchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;

// Crowdfunding-Optionen
export const crowdfundingOptions = pgTable("crowdfunding_options", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("EUR"),
  imageUrl: varchar("image_url", { length: 255 }),
  maxBackers: integer("max_backers"),
  currentBackers: integer("current_backers").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const crowdfundingOptionSchema = createInsertSchema(crowdfundingOptions).pick({
  title: true,
  description: true,
  price: true,
  currency: true,
  imageUrl: true,
  maxBackers: true,
  isActive: true,
});

export type InsertCrowdfundingOption = z.infer<typeof crowdfundingOptionSchema>;
export type CrowdfundingOption = typeof crowdfundingOptions.$inferSelect;

// Crowdfunding-Beiträge
export const crowdfundingPledges = pgTable("crowdfunding_pledges", {
  id: serial("id").primaryKey(),
  optionId: integer("option_id").notNull().references(() => crowdfundingOptions.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  amount: numeric("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("EUR"),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const crowdfundingPledgeSchema = createInsertSchema(crowdfundingPledges).pick({
  optionId: true,
  name: true,
  email: true,
  amount: true,
  paymentMethod: true,
  message: true,
});

export type InsertCrowdfundingPledge = z.infer<typeof crowdfundingPledgeSchema>;
export type CrowdfundingPledge = typeof crowdfundingPledges.$inferSelect;

// AI-generierte Empfehlungen
export const aiRecommendations = pgTable("ai_recommendations", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // budget, accommodation, restaurant, transport, activity
  feedbackRating: integer("feedback_rating"), // 1-5 Sterne
  languageCode: varchar("language_code", { length: 10 }).notNull().default("de"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiRecommendationSchema = createInsertSchema(aiRecommendations).pick({
  sessionId: true,
  userId: true,
  prompt: true,
  response: true,
  category: true,
  languageCode: true,
});

export type InsertAiRecommendation = z.infer<typeof aiRecommendationSchema>;
export type AiRecommendation = typeof aiRecommendations.$inferSelect;

// Beziehungen definieren
export const usersRelations = relations(users, ({ many }) => ({
  searchHistory: many(searchHistory),
  aiRecommendations: many(aiRecommendations),
}));

export const accommodationsRelations = relations(accommodations, ({ many }) => ({
  amenities: many(accommodationAmenities),
}));

export const amenitiesRelations = relations(amenities, ({ many }) => ({
  accommodations: many(accommodationAmenities),
}));

export const accommodationAmenitiesRelations = relations(accommodationAmenities, ({ one }) => ({
  accommodation: one(accommodations, {
    fields: [accommodationAmenities.accommodationId],
    references: [accommodations.id],
  }),
  amenity: one(amenities, {
    fields: [accommodationAmenities.amenityId],
    references: [amenities.id],
  }),
}));

export const crowdfundingOptionsRelations = relations(crowdfundingOptions, ({ many }) => ({
  pledges: many(crowdfundingPledges),
}));

export const crowdfundingPledgesRelations = relations(crowdfundingPledges, ({ one }) => ({
  option: one(crowdfundingOptions, {
    fields: [crowdfundingPledges.optionId],
    references: [crowdfundingOptions.id],
  }),
}));