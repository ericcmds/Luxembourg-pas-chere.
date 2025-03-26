import { Target, Users, HandshakeIcon, Heart } from "lucide-react";

type AboutItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
};

export default function AboutSection() {
  const aboutItems: AboutItem[] = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Our Mission",
      description: "To make Luxembourg accessible to everyone by finding and sharing affordable options for dining, entertainment, shopping, and more. We believe enjoying Luxembourg shouldn't be limited by budget.",
      iconColor: "bg-lux-red"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Our Team",
      description: "We're a group of Luxembourg locals and expats who are passionate about our beautiful country and committed to helping others experience it without breaking the bank.",
      iconColor: "bg-lux-blue"
    },
    {
      icon: <HandshakeIcon className="h-5 w-5" />,
      title: "Our Partners",
      description: "We collaborate with local businesses, cultural institutions, and tourism offices to bring you exclusive deals and insider information on enjoying Luxembourg affordably.",
      iconColor: "bg-lux-red"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Our Values",
      description: "We believe in authenticity, accessibility, and community. All our recommendations are personally tested and verified to ensure they offer genuine value for money.",
      iconColor: "bg-lux-blue"
    }
  ];

  return (
    <section id="about" className="bg-lux-light py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat font-bold text-3xl text-center mb-6">About Luxembourg Pas Chère</h2>
          <p className="text-center text-gray-600 mb-12">
            We're dedicated to helping locals and visitors discover affordable options in Luxembourg.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className={`${item.iconColor} text-white p-3 rounded-full mr-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-montserrat font-semibold text-xl">{item.title}</h3>
                </div>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
