import { eq } from "drizzle-orm";
import { 
  type User, type InsertUser, users,
  type Contact, type InsertContact, contacts,
  type Newsletter, type InsertNewsletter, newsletters,
  type Restaurant, type InsertRestaurant, restaurants,
  type Accommodation, type InsertAccommodation, accommodations,
  type BudgetTip, type InsertBudgetTip, budgetTips,
  type SearchHistory, type InsertSearchHistory, searchHistory,
  type CrowdfundingOption, type InsertCrowdfundingOption, crowdfundingOptions,
  type CrowdfundingPledge, type InsertCrowdfundingPledge, crowdfundingPledges,
  type AiRecommendation, type InsertAiRecommendation, aiRecommendations,
  type BookOrder, type InsertBookOrder, bookOrders,
  amenities, accommodationAmenities
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Newsletter methods
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  
  // Restaurant methods
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  getRestaurants(filterOptions?: any): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  updateRestaurant(id: number, data: Partial<InsertRestaurant>): Promise<Restaurant | undefined>;
  deleteRestaurant(id: number): Promise<boolean>;
  
  // Accommodation methods
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;
  getAccommodations(filterOptions?: any): Promise<Accommodation[]>;
  getAccommodation(id: number): Promise<Accommodation | undefined>;
  updateAccommodation(id: number, data: Partial<InsertAccommodation>): Promise<Accommodation | undefined>;
  deleteAccommodation(id: number): Promise<boolean>;
  
  // Budget tips methods
  createBudgetTip(tip: InsertBudgetTip): Promise<BudgetTip>;
  getBudgetTips(languageCode?: string): Promise<BudgetTip[]>;
  getBudgetTip(id: number): Promise<BudgetTip | undefined>;
  
  // Search history methods
  addSearchTerm(searchData: InsertSearchHistory): Promise<SearchHistory>;
  getRecentSearches(sessionId: string, limit?: number): Promise<SearchHistory[]>;
  
  // Crowdfunding methods
  createCrowdfundingOption(option: InsertCrowdfundingOption): Promise<CrowdfundingOption>;
  getCrowdfundingOptions(): Promise<CrowdfundingOption[]>;
  createCrowdfundingPledge(pledge: InsertCrowdfundingPledge): Promise<CrowdfundingPledge>;
  
  // AI recommendations methods
  saveAiRecommendation(recommendation: InsertAiRecommendation): Promise<AiRecommendation>;
  getAiRecommendations(sessionId: string): Promise<AiRecommendation[]>;
  
  // Book order methods
  createBookOrder(order: InsertBookOrder): Promise<BookOrder>;
  getBookOrders(): Promise<BookOrder[]>;
  updateBookOrderStatus(id: number, status: string): Promise<BookOrder | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }
  
  // Newsletter methods
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    try {
      const [newsletter] = await db.insert(newsletters)
        .values(insertNewsletter)
        .returning();
      return newsletter;
    } catch (error: any) {
      // Prüfen, ob es ein Duplicate-Key-Error ist (Email existiert bereits)
      if (error && error.code === '23505') {
        throw new Error('Diese E-Mail-Adresse ist bereits für den Newsletter registriert.');
      }
      throw error;
    }
  }
  
  async getNewsletters(): Promise<Newsletter[]> {
    return await db.select().from(newsletters).orderBy(newsletters.createdAt);
  }
  
  // Restaurant methods
  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const [restaurant] = await db.insert(restaurants).values(insertRestaurant).returning();
    return restaurant;
  }
  
  async getRestaurants(filterOptions?: any): Promise<Restaurant[]> {
    let query = db.select().from(restaurants);
    
    if (filterOptions) {
      if (filterOptions.location && filterOptions.location !== 'all') {
        query = query.where(eq(restaurants.location, filterOptions.location));
      }
      
      if (filterOptions.priceCategory && filterOptions.priceCategory !== 'all') {
        query = query.where(eq(restaurants.priceCategory, filterOptions.priceCategory));
      }
      
      if (filterOptions.cuisine && filterOptions.cuisine !== 'all') {
        query = query.where(eq(restaurants.cuisine, filterOptions.cuisine));
      }
      
      if (filterOptions.specialDeal === true) {
        query = query.where(eq(restaurants.specialDeal, true));
      }
    }
    
    return await query.orderBy(restaurants.name);
  }
  
  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.id, id));
    return restaurant;
  }
  
  async updateRestaurant(id: number, data: Partial<InsertRestaurant>): Promise<Restaurant | undefined> {
    const [restaurant] = await db.update(restaurants)
      .set(data)
      .where(eq(restaurants.id, id))
      .returning();
    return restaurant;
  }
  
  async deleteRestaurant(id: number): Promise<boolean> {
    const result = await db.delete(restaurants).where(eq(restaurants.id, id));
    return !!result;
  }
  
  // Accommodation methods
  async createAccommodation(insertAccommodation: InsertAccommodation): Promise<Accommodation> {
    const [accommodation] = await db.insert(accommodations).values(insertAccommodation).returning();
    return accommodation;
  }
  
  async getAccommodations(filterOptions?: any): Promise<Accommodation[]> {
    let query = db.select().from(accommodations);
    
    if (filterOptions) {
      if (filterOptions.location && filterOptions.location !== 'all') {
        query = query.where(eq(accommodations.location, filterOptions.location));
      }
      
      if (filterOptions.priceCategory && filterOptions.priceCategory !== 'all') {
        query = query.where(eq(accommodations.priceCategory, filterOptions.priceCategory));
      }
      
      if (filterOptions.specialDeal === true) {
        query = query.where(eq(accommodations.specialDeal, true));
      }
    }
    
    return await query.orderBy(accommodations.name);
  }
  
  async getAccommodation(id: number): Promise<Accommodation | undefined> {
    const [accommodation] = await db.select().from(accommodations).where(eq(accommodations.id, id));
    return accommodation;
  }
  
  async updateAccommodation(id: number, data: Partial<InsertAccommodation>): Promise<Accommodation | undefined> {
    const [accommodation] = await db.update(accommodations)
      .set(data)
      .where(eq(accommodations.id, id))
      .returning();
    return accommodation;
  }
  
  async deleteAccommodation(id: number): Promise<boolean> {
    const result = await db.delete(accommodations).where(eq(accommodations.id, id));
    return !!result;
  }
  
  // Budget tips methods
  async createBudgetTip(insertTip: InsertBudgetTip): Promise<BudgetTip> {
    const [tip] = await db.insert(budgetTips).values(insertTip).returning();
    return tip;
  }
  
  async getBudgetTips(languageCode?: string): Promise<BudgetTip[]> {
    let query = db.select().from(budgetTips);
    
    if (languageCode) {
      query = query.where(eq(budgetTips.languageCode, languageCode));
    }
    
    return await query.orderBy(budgetTips.createdAt);
  }
  
  async getBudgetTip(id: number): Promise<BudgetTip | undefined> {
    const [tip] = await db.select().from(budgetTips).where(eq(budgetTips.id, id));
    return tip;
  }
  
  // Search history methods
  async addSearchTerm(searchData: InsertSearchHistory): Promise<SearchHistory> {
    const [search] = await db.insert(searchHistory).values(searchData).returning();
    return search;
  }
  
  async getRecentSearches(sessionId: string, limit: number = 5): Promise<SearchHistory[]> {
    return await db.select()
      .from(searchHistory)
      .where(eq(searchHistory.sessionId, sessionId))
      .orderBy(searchHistory.timestamp)
      .limit(limit);
  }
  
  // Crowdfunding methods
  async createCrowdfundingOption(insertOption: InsertCrowdfundingOption): Promise<CrowdfundingOption> {
    const [option] = await db.insert(crowdfundingOptions).values(insertOption).returning();
    return option;
  }
  
  async getCrowdfundingOptions(): Promise<CrowdfundingOption[]> {
    return await db.select()
      .from(crowdfundingOptions)
      .where(eq(crowdfundingOptions.isActive, true))
      .orderBy(crowdfundingOptions.price);
  }
  
  async createCrowdfundingPledge(insertPledge: InsertCrowdfundingPledge): Promise<CrowdfundingPledge> {
    // Transaktion starten, um atomare Operation sicherzustellen
    const result = await db.transaction(async (tx) => {
      // Füge den Pledge hinzu
      const [pledge] = await tx.insert(crowdfundingPledges).values(insertPledge).returning();
      
      // Aktualisiere die Anzahl der Unterstützer für diese Option
      await tx.update(crowdfundingOptions)
        .set({
          currentBackers: tx.sql`${crowdfundingOptions.currentBackers} + 1`,
        })
        .where(eq(crowdfundingOptions.id, insertPledge.optionId));
      
      return pledge;
    });
    
    return result;
  }
  
  // AI recommendations methods
  async saveAiRecommendation(insertRecommendation: InsertAiRecommendation): Promise<AiRecommendation> {
    const [recommendation] = await db.insert(aiRecommendations)
      .values(insertRecommendation)
      .returning();
    return recommendation;
  }
  
  async getAiRecommendations(sessionId: string): Promise<AiRecommendation[]> {
    return await db.select()
      .from(aiRecommendations)
      .where(eq(aiRecommendations.sessionId, sessionId))
      .orderBy(aiRecommendations.createdAt);
  }
  
  // Book order methods
  async createBookOrder(insertOrder: InsertBookOrder): Promise<BookOrder> {
    // Berechne den Gesamtpreis basierend auf der Menge
    // In einer realen Anwendung würde hier der Preis aus einer Produkttabelle geholt werden
    const bookPrice = 24.99; // Fest definierter Preis für das Buch
    const totalPrice = bookPrice * (insertOrder.quantity || 1);
    
    // Wir müssen das Objekt als Array für db.insert wrappen
    const [order] = await db.insert(bookOrders).values({
      ...insertOrder,
      totalPrice
    }).returning();
    
    return order;
  }
  
  async getBookOrders(): Promise<BookOrder[]> {
    return await db.select().from(bookOrders).orderBy(bookOrders.createdAt);
  }
  
  async updateBookOrderStatus(id: number, status: string): Promise<BookOrder | undefined> {
    const [order] = await db.update(bookOrders)
      .set({ status, updatedAt: new Date() })
      .where(eq(bookOrders.id, id))
      .returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
