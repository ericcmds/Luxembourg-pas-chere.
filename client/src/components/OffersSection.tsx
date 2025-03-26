import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

type Offer = {
  id: number;
  title: string;
  description: string;
  location: string;
  discount: string;
  image: string;
};

export default function OffersSection() {
  const offers: Offer[] = [
    {
      id: 1,
      title: "Bella Italia Restaurant",
      description: "Enjoy authentic Italian cuisine at a fraction of the price with our exclusive discount.",
      location: "Kirchberg, Luxembourg City",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 2,
      title: "Philharmonie Concert",
      description: "Experience world-class music at Luxembourg's Philharmonie with a special discount on tickets.",
      location: "Place de l'Europe, Kirchberg",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1607460256908-a44d43651db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 3,
      title: "City Shopping Pass",
      description: "Get discounts at over 30 shops in Luxembourg City with our exclusive shopping pass.",
      location: "City Center, Luxembourg",
      discount: "€25 ONLY",
      image: "https://images.unsplash.com/photo-1629207338691-a731a3b88cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    }
  ];

  return (
    <section id="offers" className="bg-lux-light py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl">Latest Offers</h2>
          <div className="mt-4 md:mt-0">
            <a href="#" className="font-montserrat text-lux-blue hover:text-lux-red transition-colors flex items-center">
              View all offers
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-montserrat font-semibold text-xl">{offer.title}</h3>
                  <span className="bg-lux-red text-white text-sm font-montserrat font-semibold px-3 py-1 rounded-full">
                    {offer.discount}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{offer.location}</span>
                </div>
                <Button 
                  className="w-full bg-lux-blue hover:bg-lux-red text-white font-montserrat font-semibold py-2"
                >
                  View Deal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
