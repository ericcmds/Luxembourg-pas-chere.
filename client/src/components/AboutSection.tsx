import { Users, Tag, Euro } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#333333] mb-6">
              About Luxembourg Pas Chère
            </h2>
            <p className="text-lg font-opensans text-[#333333] mb-6">
              Founded in 2020, Luxembourg Pas Chère was created to help both locals and tourists discover affordable ways to enjoy one of Europe's most expensive countries.
            </p>
            <p className="text-lg font-opensans text-[#333333] mb-8">
              Our team of budget-conscious locals scours the country to find the best deals, hidden gems, and free activities across Luxembourg. We negotiate exclusive discounts with partners to bring you authentic experiences at a fraction of the usual cost.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-[#E60023] rounded-full w-12 h-12 flex items-center justify-center text-white mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">10,000+</h3>
                  <p className="text-sm text-gray-500 font-opensans">Community Members</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-[#00A1DE] rounded-full w-12 h-12 flex items-center justify-center text-white mr-4">
                  <Tag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">500+</h3>
                  <p className="text-sm text-gray-500 font-opensans">Exclusive Deals</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white mr-4">
                  <Euro className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">€1M+</h3>
                  <p className="text-sm text-gray-500 font-opensans">Saved by Community</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1570623132341-55efd0c3d9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Luxembourg City Panorama" 
                className="rounded-lg shadow-xl w-full" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-48">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-montserrat font-bold text-[#E60023]">30%</p>
                    <p className="text-sm font-opensans text-[#333333]">Average Savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
