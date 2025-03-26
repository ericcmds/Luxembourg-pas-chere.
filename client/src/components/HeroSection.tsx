import { Button } from "@/components/ui/button";
import { 
  Percent, 
  BookOpen, 
  MapPin, 
  Tag, 
  PiggyBank 
} from "lucide-react";

import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transformations
  const calculateParallax = (factor: number) => {
    return scrollY * factor;
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative bg-gradient-to-r from-[#E60023] to-[#00A1DE] text-white py-20 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-black opacity-30"
        style={{ transform: `translateY(${calculateParallax(0.05)}px)` }}
      ></div>
      <div className="container mx-auto px-6 relative z-10">
        <div 
          className="max-w-3xl"
          style={{ transform: `translateY(${calculateParallax(-0.1)}px)` }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-extrabold mb-6 animate-fadeIn text-shadow-lg"> {/*Increased font size and added text shadow*/}
            Discover Luxembourg Without Breaking the Bank
          </h1>
          <p className="text-xl md:text-2xl mb-6 font-opensans animate-slideUp font-medium"> {/*Increased font size and added font weight*/}
            Your ultimate guide to enjoying Luxembourg's beauty, culture, and cuisine on a budget.
          </p>

          {/* Statistics boxes */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1 flex items-center border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <Percent className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold">40%</p> {/*Increased font size*/}
                <p className="text-sm">Average savings</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1 flex items-center border border-white border-opacity-20">
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p> {/*Increased font size*/}
                <p className="text-sm">Money-saving tips</p>
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <MapPin className="h-5 w-5 mr-2" aria-hidden="true" /> {/*Increased icon size*/}
              <span className="text-lg font-medium">Local secrets</span> {/*Increased font size*/}
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <Tag className="h-5 w-5 mr-2" aria-hidden="true" /> {/*Increased icon size*/}
              <span className="text-lg font-medium">Exclusive deals</span> {/*Increased font size*/}
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
              <PiggyBank className="h-5 w-5 mr-2" aria-hidden="true" /> {/*Increased icon size*/}
              <span className="text-lg font-medium">Budget friendly</span> {/*Increased font size*/}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              size="lg"
              className="bg-[#E31837] text-white hover:bg-[#c01530] font-montserrat font-semibold px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105 text-shadow-lg"
            > {/*Added text shadow*/}
              <a href="#offers" aria-label="Discover money-saving offers now">Discover Now</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#00A1DE] font-montserrat font-semibold px-8 py-3 rounded-full text-shadow-lg"
            > {/*Added text shadow*/}
              <a href="#contact">Get Updates</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}