import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import { MoveDown, MapPin, Heart, Wallet } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative text-white overflow-hidden">
      {/* Stylized background */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          <div className="inline-block mb-3 bg-lux-red px-3 py-1 rounded-full">
            <span className="text-white font-medium text-sm">Save money in Luxembourg</span>
          </div>
          
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Welcome to <span className="text-lux-red">Luxembourg</span> <span className="text-lux-blue">Pas Chère</span>
          </h1>
          
          <p className="font-opensans text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
            The best tips and offers for an affordable life in Luxembourg. Discover how to enjoy this beautiful country without emptying your wallet.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <MapPin size={16} className="text-lux-red mr-2" />
              <span className="text-sm font-medium">Local secrets</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <Heart size={16} className="text-lux-red mr-2" />
              <span className="text-sm font-medium">Exclusive deals</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <Wallet size={16} className="text-lux-red mr-2" />
              <span className="text-sm font-medium">Budget friendly</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg"
              variant="default"
              className="bg-lux-red hover:bg-lux-red/90 text-white border-none font-medium text-base px-8"
            >
              <a href="#offers">Discover Now</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-medium text-base"
            >
              <a href="#blog">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <a href="#category" className="text-white/70 hover:text-white transition-colors">
          <MoveDown size={24} />
        </a>
      </div>
      
      {/* Floating stats cards */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center shadow-lg border border-white/20 max-w-xs">
          <div className="text-3xl font-bold mb-1">500+</div>
          <div className="text-sm text-white/80">Money-saving tips</div>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-8 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center shadow-lg border border-white/20 max-w-xs transform rotate-3">
          <div className="text-3xl font-bold mb-1">40%</div>
          <div className="text-sm text-white/80">Average savings</div>
        </div>
      </div>
    </section>
  );
}
