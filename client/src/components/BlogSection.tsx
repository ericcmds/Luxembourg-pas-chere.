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
    <section id="blog" className="py-5 py-md-6 bg-white">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="display-6 fw-bold font-montserrat mb-0">Latest Blog Posts</h2>
          </div>
          <div className="col-auto">
            <a href="#" className="text-decoration-none text-lux-blue fw-bold">
              View all posts <i className="fas fa-arrow-right ms-1 small"></i>
            </a>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col">
              <a href="#" className="text-decoration-none text-dark">
                <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden blog-card">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="card-img-top object-fit-cover"
                    style={{ height: "200px" }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center text-muted mb-3 small">
                      <span><i className="far fa-calendar-alt me-1"></i> {post.date}</span>
                      <span className="mx-2">•</span>
                      <span><i className="far fa-clock me-1"></i> {post.readTime}</span>
                    </div>
                    <h3 className="card-title h5 fw-bold font-montserrat mb-3">{post.title}</h3>
                    <p className="card-text text-muted mb-3">{post.description}</p>
                    <div className="text-lux-blue fw-bold">
                      Read more <i className="fas fa-chevron-right ms-1 small"></i>
                    </div>
                  </div>
                </article>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
