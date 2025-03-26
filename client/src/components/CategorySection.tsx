import { Utensils, ShoppingBag, Ticket, Bed } from "lucide-react";

type Category = {
  icon: React.ReactNode;
  title: string;
  href: string;
};

export default function CategorySection() {
  const categories: Category[] = [
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Restaurants",
      href: "#",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Shopping",
      href: "#",
    },
    {
      icon: <Ticket className="h-6 w-6" />,
      title: "Activities",
      href: "#",
    },
    {
      icon: <Bed className="h-6 w-6" />,
      title: "Accommodation",
      href: "#",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="font-montserrat font-bold text-3xl text-center mb-12">What Are You Looking For?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a key={index} href={category.href} className="group">
              <div className="bg-lux-light rounded-lg p-6 flex flex-col items-center transition-transform transform group-hover:-translate-y-1">
                <div className="bg-lux-blue text-white p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-center">{category.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
