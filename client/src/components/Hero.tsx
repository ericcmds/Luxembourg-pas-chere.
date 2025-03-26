import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-r from-lux-red to-lux-blue text-white">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl leading-tight mb-6">
            Discover Affordable Options in Luxembourg
          </h1>
          <p className="font-opensans text-lg md:text-xl mb-8 opacity-90">
            Your guide to enjoying Luxembourg without breaking the bank. Find the best deals on restaurants, activities, shopping, and more.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              size="lg"
              variant="default"
              className="bg-white text-lux-red hover:bg-white hover:brightness-95"
            >
              <a href="#offers">Explore Offers</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-lux-blue"
            >
              <a href="#blog">Read Our Blog</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
