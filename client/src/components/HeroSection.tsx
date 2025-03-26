import { Button } from "@/components/ui/button";
import { 
  Percent, 
  BookOpen, 
  MapPin, 
  Tag, 
  PiggyBank 
} from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-r from-[#E60023] to-[#00A1DE] text-white py-20">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
            Discover Luxembourg Without Breaking the Bank
          </h1>
          <p className="text-lg md:text-xl mb-6 font-opensans">
            Your ultimate guide to enjoying Luxembourg's beauty, culture, and cuisine on a budget.
          </p>
          
          {/* Statistics boxes */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1 flex items-center border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <Percent className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">40%</p>
                <p className="text-sm">Average savings</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1 flex items-center border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm">Money-saving tips</p>
              </div>
            </div>
          </div>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium">Local secrets</span>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <Tag className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium">Exclusive deals</span>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <PiggyBank className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium">Budget friendly</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              size="lg"
              className="bg-[#E31837] text-white hover:bg-[#c01530] font-montserrat font-semibold px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105"
            >
              <a href="#offers" aria-label="Discover money-saving offers now">Discover Now</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00A1DE] font-montserrat font-semibold px-8 py-3 rounded-full"
            >
              <a href="#contact">Get Updates</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
