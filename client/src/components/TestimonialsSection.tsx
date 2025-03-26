import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

// Define the testimonials data
const testimonials = [
  {
    id: 1,
    content: "Thanks to Luxembourg Pas Chère, I was able to explore most of the country during my weekend trip without exceeding my budget. The restaurant deals were particularly excellent!",
    rating: 5,
    author: {
      name: "Emily Johnson",
      role: "Tourist from UK",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      initials: "EJ"
    }
  },
  {
    id: 2,
    content: "Even as a local, I've discovered so many affordable places through this site that I never knew existed! The weekly newsletter has become my go-to for planning weekend activities with my family.",
    rating: 5,
    author: {
      name: "Thomas Muller",
      role: "Luxembourg Resident",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      initials: "TM"
    }
  },
  {
    id: 3,
    content: "As a student in Luxembourg, money is always tight. This website has been a lifesaver for finding affordable entertainment and dining options. The exclusive student deals are amazing!",
    rating: 4.5,
    author: {
      name: "Sophie Lambert",
      role: "University Student",
      avatar: "https://randomuser.me/api/portraits/women/24.jpg",
      initials: "SL"
    }
  }
];

// Helper function to render rating stars
const renderRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half-star" className="relative h-5 w-5">
        <Star className="absolute h-5 w-5 text-yellow-400" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
    );
  }

  return stars;
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#00A1DE]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg font-opensans text-white opacity-90 max-w-2xl mx-auto">
            Hear from people who have discovered Luxembourg affordably through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white rounded-lg shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {renderRatingStars(testimonial.rating)}
                  </div>
                </div>
                <p className="text-[#333333] font-opensans italic mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                    <AvatarFallback>{testimonial.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-montserrat font-semibold text-[#333333]">{testimonial.author.name}</p>
                    <p className="text-sm text-gray-500 font-opensans">{testimonial.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
