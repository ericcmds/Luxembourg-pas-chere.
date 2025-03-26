import { ArrowRight } from "lucide-react";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
};

export default function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Free Activities in Luxembourg City",
      description: "Discover amazing free activities and attractions that Luxembourg City has to offer for budget travelers.",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 2,
      title: "Best Budget-Friendly Restaurants in Luxembourg",
      description: "A guide to affordable dining options in Luxembourg that don't compromise on quality or experience.",
      date: "June 8, 2023",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1579868863073-62179e29725a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 3,
      title: "How to Use Luxembourg's Free Public Transport",
      description: "A complete guide to navigating Luxembourg's free public transportation system like a local.",
      date: "June 1, 2023",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    }
  ];

  return (
    <section id="blog" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl">Latest Blog Posts</h2>
          <div className="mt-4 md:mt-0">
            <a href="#" className="font-montserrat text-lux-blue hover:text-lux-red transition-colors flex items-center">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-lux-light rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <a href="#" className="font-montserrat text-lux-blue hover:text-lux-red transition-colors flex items-center">
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
