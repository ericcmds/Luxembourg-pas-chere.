import { useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
};

export default function BlogSection() {
  const [activePostId, setActivePostId] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 kostenlose Aktivitäten in Luxemburg-Stadt",
      description: "Entdecken Sie erstaunliche kostenlose Aktivitäten und Attraktionen, die Luxemburg-Stadt für preisbewusste Reisende zu bieten hat.",
      date: "15. Juni 2023",
      readTime: "5 Min. Lesezeit",
      image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 2,
      title: "Die besten budgetfreundlichen Restaurants in Luxemburg",
      description: "Ein Leitfaden zu erschwinglichen Speisemöglichkeiten in Luxemburg, die keine Kompromisse bei Qualität oder Erlebnis eingehen.",
      date: "8. Juni 2023",
      readTime: "4 Min. Lesezeit",
      image: "https://images.unsplash.com/photo-1579868863073-62179e29725a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 3,
      title: "Wie man Luxemburgs kostenlosen öffentlichen Verkehr nutzt",
      description: "Ein vollständiger Leitfaden zur Navigation im kostenlosen öffentlichen Verkehrssystem Luxemburgs wie ein Einheimischer.",
      date: "1. Juni 2023",
      readTime: "3 Min. Lesezeit",
      image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    }
  ];

  const handleShareClick = (e: React.MouseEvent, postId: number) => {
    e.preventDefault();
    setActivePostId(activePostId === postId ? null : postId);
  };

  const getShareUrl = (postId: number) => {
    // In a real app, this would be a proper URL to the blog post
    return `https://luxembourgpaschère.com/blog/${postId}`;
  };

  const handleShare = (e: React.MouseEvent, platform: string, postId: number) => {
    e.preventDefault();
    e.stopPropagation();

    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    const shareUrl = getShareUrl(postId);
    const shareText = post.title;

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
  };

  return (
    <section id="blog" className="py-5 py-md-6 bg-white">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="display-6 fw-bold font-montserrat mb-0 section-title">Aktuelle Blog-Beiträge</h2>
          </div>
          <div className="col-auto">
            <a href="#" className="text-decoration-none text-lux-blue fw-bold highlight-text">
              Alle Beiträge anzeigen <i className="fas fa-arrow-right ms-1 small"></i>
            </a>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col">
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
                  <h3 className="card-title h5 fw-bold font-montserrat mb-3 highlight-text">{post.title}</h3>
                  <p className="card-text text-muted mb-3">{post.description}</p>

                  {/* Actions row */}
                  <div className="d-flex align-items-center justify-content-between">
                    <a href="#" className="text-decoration-none text-lux-blue fw-bold highlight-text">
                      Weiterlesen <i className="fas fa-chevron-right ms-1 small"></i>
                    </a>

                    {/* Share dropdown */}
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                        onClick={(e) => handleShareClick(e, post.id)}
                        aria-expanded={activePostId === post.id}
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>

                      {activePostId === post.id && (
                        <div className="share-popup">
                          <div className="d-flex gap-2 mt-2">
                            <button 
                              className="btn btn-sm btn-outline-primary rounded-circle"
                              onClick={(e) => handleShare(e, 'facebook', post.id)}
                              aria-label="Share on Facebook"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-info rounded-circle"
                              onClick={(e) => handleShare(e, 'twitter', post.id)}
                              aria-label="Share on Twitter"
                            >
                              <i className="fab fa-twitter"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-primary rounded-circle"
                              onClick={(e) => handleShare(e, 'linkedin', post.id)}
                              aria-label="Share on LinkedIn"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-success rounded-circle"
                              onClick={(e) => handleShare(e, 'whatsapp', post.id)}
                              aria-label="Share on WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View - Only visible on small screens */}
        <div className="d-block d-md-none mt-4">
          <div className="text-center mb-3">
            <span className="text-muted small">Wischen Sie nach links für mehr Beiträge</span>
          </div>
          <div id="blogCarouselMobile" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {blogPosts.map((post, index) => (
                <div key={post.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden blog-card mx-2">
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
                      <h3 className="card-title h5 fw-bold font-montserrat mb-3 highlight-text">{post.title}</h3>
                      <p className="card-text text-muted mb-3">{post.description}</p>

                      {/* Actions row */}
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="#" className="text-decoration-none text-lux-blue fw-bold highlight-text">
                          Weiterlesen <i className="fas fa-chevron-right ms-1 small"></i>
                        </a>

                        {/* Share button */}
                        <button 
                          className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                          data-bs-toggle="modal" 
                          data-bs-target="#shareModal"
                        >
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#blogCarouselMobile" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#blogCarouselMobile" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}r */
  }
</style>