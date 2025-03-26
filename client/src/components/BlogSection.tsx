import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the blog posts data
const blogPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1573058683238-f32eda1ded92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    date: "October 12, 2023",
    category: "Travel",
    title: "10 Free Attractions in Luxembourg City You Can't Miss",
    description: "Discover the hidden gems of Luxembourg City that won't cost you a cent but will leave you with priceless memories...",
    author: {
      name: "Sophie Durand",
      role: "Local Guide",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      initials: "SD"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    date: "October 5, 2023",
    category: "Food",
    title: "Budget-Friendly Food Guide: Eat Like a Local",
    description: "From affordable local eateries to the best food markets, this guide shows you how to enjoy Luxembourg's cuisine without emptying your wallet...",
    author: {
      name: "Marc Weber",
      role: "Food Blogger",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      initials: "MW"
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1565967511849-42083a8e4525?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    date: "September 28, 2023",
    category: "Transport",
    title: "Navigating Luxembourg: Free Public Transport Guide",
    description: "Everything you need to know about Luxembourg's revolutionary free public transport system and how to make the most of it...",
    author: {
      name: "Julie Schmit",
      role: "Travel Writer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      initials: "JS"
    }
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#333333] mb-4">
            Budget Travel Blog
          </h2>
          <p className="text-lg font-opensans text-[#333333] max-w-2xl mx-auto">
            Tips, tricks, and stories about enjoying Luxembourg on a budget from locals and frequent travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-500 font-opensans">{post.date}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-[#00A1DE] font-opensans">{post.category}</span>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{post.title}</h3>
                <p className="text-[#333333] font-opensans mb-4 line-clamp-3">{post.description}</p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-4">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-montserrat font-semibold text-[#333333]">{post.author.name}</p>
                    <p className="text-sm text-gray-500 font-opensans">{post.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-[#333333] hover:bg-gray-700 text-white font-montserrat font-semibold px-8 py-3 rounded-full"
          >
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
