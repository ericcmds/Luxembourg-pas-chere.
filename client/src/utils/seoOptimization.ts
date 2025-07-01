/**
 * SEO Optimization Utilities for Luxembourg Market
 * Implements local SEO best practices and structured data
 */

export interface LocalBusinessData {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url: string;
  openingHours: string[];
  priceRange: string;
  currenciesAccepted: string[];
  paymentAccepted: string[];
  areaServed: {
    name: string;
    geoContains: string[];
  };
}

// Luxembourg-specific local business data
export const luxembourgBusinessData: LocalBusinessData = {
  name: "Luxembourg Pas Chère",
  description: "Your guide to affordable living in Luxembourg - Ihr Ratgeber für günstiges Leben in Luxemburg - Votre guide pour vivre pas cher au Luxembourg",
  address: {
    streetAddress: "2 Rue du Marché-aux-Herbes",
    addressLocality: "Luxembourg",
    postalCode: "L-1728",
    addressCountry: "LU"
  },
  geo: {
    latitude: 49.6116,
    longitude: 6.1319
  },
  telephone: "+352-xxx-xxx-xxx",
  email: "info@luxembourgpaschere.lu",
  url: "https://luxembourgpaschere.lu",
  openingHours: [
    "Mo-Fr 09:00-18:00",
    "Sa 10:00-16:00"
  ],
  priceRange: "€",
  currenciesAccepted: ["EUR"],
  paymentAccepted: ["Credit Card", "PayPal", "Bank Transfer", "SEPA"],
  areaServed: {
    name: "Luxembourg",
    geoContains: [
      "Luxembourg City",
      "Esch-sur-Alzette",
      "Differdange",
      "Dudelange",
      "Ettelbruck",
      "Diekirch",
      "Wiltz",
      "Echternach",
      "Grevenmacher",
      "Remich"
    ]
  }
};

// Generate Local Business Schema
export function generateLocalBusinessSchema(data: LocalBusinessData): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${data.url}/#business`,
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.telephone,
    "email": data.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.geo.latitude,
      "longitude": data.geo.longitude
    },
    "openingHoursSpecification": data.openingHours.map(hours => {
      const [days, time] = hours.split(' ');
      const [open, close] = time.split('-');
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": parseDayOfWeek(days),
        "opens": open,
        "closes": close
      };
    }),
    "priceRange": data.priceRange,
    "currenciesAccepted": data.currenciesAccepted.join(', '),
    "paymentAccepted": data.paymentAccepted.join(', '),
    "areaServed": {
      "@type": "Country",
      "name": data.areaServed.name,
      "geoContains": data.areaServed.geoContains.map(city => ({
        "@type": "City",
        "name": city
      }))
    },
    "sameAs": [
      "https://www.facebook.com/luxembourgpaschere",
      "https://www.instagram.com/luxembourgpaschere",
      "https://www.linkedin.com/company/luxembourgpaschere",
      "https://twitter.com/luxembourgpaschere"
    ]
  };
}

// Helper function to parse day of week
function parseDayOfWeek(days: string): string[] {
  const dayMap: { [key: string]: string } = {
    'Mo': 'Monday',
    'Tu': 'Tuesday',
    'We': 'Wednesday',
    'Th': 'Thursday',
    'Fr': 'Friday',
    'Sa': 'Saturday',
    'Su': 'Sunday'
  };
  
  if (days.includes('-')) {
    const [start, end] = days.split('-');
    const startDay = dayMap[start] || start;
    const endDay = dayMap[end] || end;
    // Return array of days between start and end
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const startIndex = allDays.indexOf(startDay);
    const endIndex = allDays.indexOf(endDay);
    return allDays.slice(startIndex, endIndex + 1);
  }
  
  return [dayMap[days] || days];
}

// Generate Product Schema for the book
export function generateBookSchema(language: 'fr' | 'de' | 'en') {
  const titles = {
    fr: "Luxembourg Pas Chère - Le guide ultime pour économiser",
    de: "Luxembourg Pas Chère - Der ultimative Sparguide",
    en: "Luxembourg Pas Chère - The Ultimate Saving Guide"
  };

  const descriptions = {
    fr: "Découvrez tous les secrets pour vivre moins cher au Luxembourg avec notre guide complet.",
    de: "Entdecken Sie alle Geheimnisse für ein günstigeres Leben in Luxemburg mit unserem umfassenden Leitfaden.",
    en: "Discover all the secrets to living cheaper in Luxembourg with our comprehensive guide."
  };

  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": titles[language],
    "description": descriptions[language],
    "author": {
      "@type": "Organization",
      "name": "Luxembourg Pas Chère"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Luxembourg Pas Chère"
    },
    "isbn": "978-99959-0-XXX-X", // Replace with actual ISBN when available
    "bookFormat": "https://schema.org/Paperback",
    "inLanguage": language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US',
    "numberOfPages": 250,
    "offers": {
      "@type": "Offer",
      "price": "19.99",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Luxembourg Pas Chère"
      },
      "validFrom": "2025-01-01",
      "priceValidUntil": "2025-12-31"
    }
  };
}

// Generate Event Schema for crowdfunding campaign
export function generateCrowdfundingEventSchema(language: 'fr' | 'de' | 'en') {
  const names = {
    fr: "Campagne de Crowdfunding - Luxembourg Pas Chère 2025",
    de: "Crowdfunding-Kampagne - Luxembourg Pas Chère 2025",
    en: "Crowdfunding Campaign - Luxembourg Pas Chère 2025"
  };

  const descriptions = {
    fr: "Soutenez la création du guide 2025 pour vivre pas cher au Luxembourg",
    de: "Unterstützen Sie die Erstellung des 2025-Leitfadens für günstiges Leben in Luxemburg",
    en: "Support the creation of the 2025 guide for affordable living in Luxembourg"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": names[language],
    "description": descriptions[language],
    "startDate": "2025-01-01T00:00:00+01:00",
    "endDate": "2025-03-31T23:59:59+02:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://luxembourgpaschere.lu/crowdfunding"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Luxembourg Pas Chère",
      "url": "https://luxembourgpaschere.lu"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": language === 'fr' ? "Contribution de base" : language === 'de' ? "Basisbeitrag" : "Basic Contribution",
        "price": "25",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": language === 'fr' ? "Contribution supporter" : language === 'de' ? "Unterstützer-Beitrag" : "Supporter Contribution",
        "price": "50",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": language === 'fr' ? "Contribution premium" : language === 'de' ? "Premium-Beitrag" : "Premium Contribution",
        "price": "100",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    ]
  };
}

// Meta tag generator for dynamic pages
export function generateMetaTags(options: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  language?: 'fr' | 'de' | 'en';
}) {
  const { title, description, keywords = [], ogImage, canonicalUrl, language = 'fr' } = options;
  
  const metaTags = [
    { name: 'title', content: title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: language === 'fr' ? 'fr_FR' : language === 'de' ? 'de_DE' : 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];

  if (keywords.length > 0) {
    metaTags.push({ name: 'keywords', content: keywords.join(', ') });
  }

  if (ogImage) {
    metaTags.push({ property: 'og:image', content: ogImage });
    metaTags.push({ name: 'twitter:image', content: ogImage });
  }

  if (canonicalUrl) {
    metaTags.push({ property: 'og:url', content: canonicalUrl });
  }

  return metaTags;
}

// Luxembourg-specific keywords for SEO
export const luxembourgKeywords = {
  fr: [
    'luxembourg pas cher',
    'économiser luxembourg',
    'bons plans luxembourg',
    'réductions luxembourg',
    'vivre moins cher luxembourg',
    'budget luxembourg',
    'guide économies luxembourg',
    'astuces luxembourg',
    'promotions luxembourg',
    'soldes luxembourg'
  ],
  de: [
    'luxemburg günstig',
    'sparen in luxemburg',
    'schnäppchen luxemburg',
    'rabatte luxemburg',
    'günstiger leben luxemburg',
    'budget luxemburg',
    'sparguide luxemburg',
    'tipps luxemburg',
    'angebote luxemburg',
    'sale luxemburg'
  ],
  en: [
    'cheap luxembourg',
    'save money luxembourg',
    'deals luxembourg',
    'discounts luxembourg',
    'affordable living luxembourg',
    'budget luxembourg',
    'savings guide luxembourg',
    'tips luxembourg',
    'offers luxembourg',
    'sales luxembourg'
  ]
};