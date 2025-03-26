import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-gradient-to-r from-[#E60023] to-[#00A1DE] text-white py-20">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
            Discover Luxembourg Without Breaking the Bank
          </h1>
          <p className="text-lg md:text-xl mb-8 font-opensans">
            Your ultimate guide to enjoying Luxembourg's beauty, culture, and cuisine on a budget.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#E60023] hover:bg-[#F5F5F5] font-montserrat font-semibold px-8 py-3 rounded-full"
            >
              <a href="#offers">Latest Offers</a>
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
