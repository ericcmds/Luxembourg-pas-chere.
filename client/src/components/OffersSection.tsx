import { useState } from 'react';

type Offer = {
  id: number;
  title: string;
  description: string;
  location: string;
  discount: string;
  image: string;
  rating: number;
  reviewCount: number;
};

export default function OffersSection() {
  const [activePostId, setActivePostId] = useState<number | null>(null);
  
  const offers: Offer[] = [
    {
      id: 1,
      title: "Bella Italia Restaurant",
      description: "Genießen Sie authentische italienische Küche zu einem Bruchteil des Preises mit unserem exklusiven Rabatt.",
      location: "Kirchberg, Luxemburg-Stadt",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      title: "Philharmonie Konzert",
      description: "Erleben Sie Musik von Weltklasse in der Philharmonie Luxemburg mit einem Sonderrabatt auf Tickets.",
      location: "Place de l'Europe, Kirchberg",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1607460256908-a44d43651db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.8,
      reviewCount: 94
    },
    {
      id: 3,
      title: "City Shopping Pass",
      description: "Erhalten Sie Rabatte in über 30 Geschäften in Luxemburg-Stadt mit unserem exklusiven Shopping-Pass.",
      location: "Stadtzentrum, Luxemburg",
      discount: "€25 ONLY",
      image: "https://images.unsplash.com/photo-1629207338691-a731a3b88cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.2,
      reviewCount: 76
    }
  ];

  // Generate star rating HTML
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star text-warning"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt text-warning"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star text-warning"></i>
        ))}
      </div>
    );
  };

  const handleShareClick = (e: React.MouseEvent, offerId: number) => {
    e.preventDefault();
    setActivePostId(activePostId === offerId ? null : offerId);
  };

  const handleShare = (e: React.MouseEvent, platform: string, offerId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;
    
    const shareUrl = `https://luxembourgpaschère.com/offers/${offerId}`;
    const shareText = `${offer.title} - ${offer.discount} | Luxembourg Pas Chère`;
    
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
    <section id="offers" className="py-5 py-md-6 bg-light">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="display-6 fw-bold font-montserrat mb-0">Aktuelle Angebote</h2>
          </div>
          <div className="col-auto">
            <a href="#" className="text-decoration-none text-lux-blue fw-bold">
              View all offers <i className="fas fa-arrow-right ms-1 small"></i>
            </a>
          </div>
        </div>
        
        {/* Desktop View */}
        <div className="row row-cols-1 row-cols-md-3 g-4 d-none d-md-flex">
          {offers.map((offer) => (
            <div key={offer.id} className="col">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden offer-card"
                style={{ 
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="position-relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="card-img-top object-fit-cover"
                    style={{ height: "200px" }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-lux-red px-3 py-2 rounded-pill fs-6 fw-bold">
                      {offer.discount}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="card-title h5 fw-bold font-montserrat mb-0">{offer.title}</h3>
                    {/* Share button */}
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                        onClick={(e) => handleShareClick(e, offer.id)}
                        aria-expanded={activePostId === offer.id}
                      >
                        <i className="fas fa-share-alt"></i>
                      </button>
                      
                      {activePostId === offer.id && (
                        <div className="share-popup">
                          <div className="d-flex gap-2 mt-2">
                            <button 
                              className="btn btn-sm btn-outline-primary rounded-circle"
                              onClick={(e) => handleShare(e, 'facebook', offer.id)}
                              aria-label="Share on Facebook"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-info rounded-circle"
                              onClick={(e) => handleShare(e, 'twitter', offer.id)}
                              aria-label="Share on Twitter"
                            >
                              <i className="fab fa-twitter"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-primary rounded-circle"
                              onClick={(e) => handleShare(e, 'linkedin', offer.id)}
                              aria-label="Share on LinkedIn"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-success rounded-circle"
                              onClick={(e) => handleShare(e, 'whatsapp', offer.id)}
                              aria-label="Share on WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="d-flex align-items-center mb-3">
                    {renderStars(offer.rating)}
                    <span className="ms-2 text-muted small">({offer.reviewCount})</span>
                  </div>
                  
                  <p className="card-text text-muted mb-3">{offer.description}</p>
                  <div className="d-flex align-items-center text-muted mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <small>{offer.location}</small>
                  </div>
                  <div className="d-grid">
                    <a 
                      href="#" 
                      className="btn btn-primary py-2"
                      style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }}
                    >
                      View Deal <i className="fas fa-chevron-right ms-1 small"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel View - Only visible on small screens */}
        <div className="d-block d-md-none mt-4">
          <div className="text-center mb-3">
            <span className="text-muted small">Swipe left for more offers</span>
          </div>
          <div id="offersCarouselMobile" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {offers.map((offer, index) => (
                <div key={offer.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden offer-card mx-2"
                    style={{ 
                      transition: 'all 0.3s ease-in-out',
                      transform: 'translateY(0)'
                    }}
                  >
                    <div className="position-relative">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="card-img-top object-fit-cover"
                        style={{ height: "200px" }}
                      />
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-lux-red px-3 py-2 rounded-pill fs-6 fw-bold">
                          {offer.discount}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <h3 className="card-title h5 fw-bold font-montserrat mb-2">{offer.title}</h3>
                      
                      {/* Rating */}
                      <div className="d-flex align-items-center mb-3">
                        {renderStars(offer.rating)}
                        <span className="ms-2 text-muted small">({offer.reviewCount})</span>
                      </div>
                      
                      <p className="card-text text-muted mb-3">{offer.description}</p>
                      <div className="d-flex align-items-center text-muted mb-3">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        <small>{offer.location}</small>
                      </div>
                      
                      <div className="row g-2">
                        <div className="col-8">
                          <a 
                            href="#" 
                            className="btn btn-primary w-100 py-2"
                            style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }}
                          >
                            View Deal
                          </a>
                        </div>
                        <div className="col-4">
                          <button 
                            className="btn btn-outline-secondary w-100 py-2"
                            data-bs-toggle="modal" 
                            data-bs-target="#shareModal"
                          >
                            <i className="fas fa-share-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#offersCarouselMobile" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#offersCarouselMobile" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}