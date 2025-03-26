import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";

// Define the offers data
const offers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580423482583-9c8dd4bed0e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    discount: "50% OFF",
    discountType: "bg-[#E60023]",
    price: "€15.00",
    title: "City Museum Pass",
    description: "Access to all major museums in Luxembourg City at half price. Valid for 48 hours.",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    discount: "MEAL DEAL",
    discountType: "bg-[#00A1DE]",
    price: "€12.90",
    title: "Lunch Special at Café du Parc",
    description: "Three-course lunch menu at this charming local restaurant near the city center.",
    rating: 4.0,
    reviews: 92
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    discount: "FREE",
    discountType: "bg-green-500",
    price: "€0.00",
    title: "Guided Hiking Tour",
    description: "Free weekend hiking tours through the beautiful Mullerthal region with a local guide.",
    rating: 5.0,
    reviews: 156
  }
];

// Helper function to render stars based on rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />);
  }

  return stars;
};

export default function OffersSection() {
  return (
    <section id="offers" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#333333] mb-4">
            Best Affordable Offers
          </h2>
          <p className="text-lg font-opensans text-[#333333] max-w-2xl mx-auto">
            Explore the best budget-friendly options Luxembourg has to offer, curated specially for savvy explorers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className={`${offer.discountType} text-white text-sm font-montserrat py-1 px-3 rounded-full`}>
                    {offer.discount}
                  </span>
                  <span className="text-[#333333] font-montserrat font-bold">{offer.price}</span>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-2">{offer.title}</h3>
                <p className="text-[#333333] font-opensans mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex">
                      {renderStars(offer.rating)}
                    </div>
                    <span className="ml-2 text-sm text-[#333333]">({offer.reviews})</span>
                  </div>
                  <a href="#" className="text-[#00A1DE] hover:underline font-montserrat font-semibold">
                    View Deal
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-[#00A1DE] hover:bg-blue-600 text-white font-montserrat font-semibold px-8 py-3 rounded-full"
          >
            View All Offers
          </Button>
        </div>
      </div>
    </section>
  );
}
