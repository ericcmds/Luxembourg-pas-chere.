
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface BaseOffer {
  id: number;
  title: string;
  description: string;
  location: string;
  discount: string;
  image: string;
}

interface RatedOffer extends BaseOffer {
  rating: number;
  reviewCount: number;
}

type Offer = RatedOffer;

interface OfferCardProps {
  offer: Offer;
  onSelect?: (offerId: number) => void;
}

export default function OffersSection() {
  const { t } = useTranslation();
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
    },
    {
      id: 4,
      title: "Sportspalast Luxembourg",
      description: "Exklusiver Mitgliedschaftsrabatt für eines der besten Fitnessstudios in Luxemburg mit Zugang zu allen Einrichtungen.",
      location: "Strassen, Luxemburg",
      discount: "50% OFF First Month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.3,
      reviewCount: 112
    },
    {
      id: 5,
      title: "Vianden Castle Tour",
      description: "Entdecken Sie eines der beeindruckendsten Schlösser Europas mit einem Sonderrabatt für Führungen und Ausstellungen.",
      location: "Vianden, Luxemburg",
      discount: "2-FOR-1 TICKETS",
      image: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.9,
      reviewCount: 203
    },
    {
      id: 6,
      title: "Kulturpass Luxembourg",
      description: "Ein Jahr kostenloser Eintritt zu über 60 Museen und Kulturstätten in ganz Luxemburg - perfekt für Kulturliebhaber!",
      location: "Landesweit, Luxemburg",
      discount: "€15 ONLY",
      image: "https://images.unsplash.com/photo-1566049220874-6e98f7c02b83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.7,
      reviewCount: 89
    },
    {
      id: 7,
      title: "Luxemburg Transit-Pass",
      description: "Vergünstigter Monatspass für den öffentlichen Nahverkehr in ganz Luxemburg - eine Alternative zum kostenlosen ÖPNV für Besucher.",
      location: "Landesweit, Luxemburg",
      discount: "15% OFF",
      image: "https://images.unsplash.com/photo-1533651180995-3b8dcd33e834?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.4,
      reviewCount: 156
    },
    {
      id: 8,
      title: "Brunch am Sonntag",
      description: "Genießen Sie ein luxuriöses Sonntagsbrunch-Erlebnis im historischen Hotel Bel Air mit atemberaubendem Blick auf die Luxemburger Landschaft.",
      location: "Echternach, Luxemburg",
      discount: "25% OFF",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.6,
      reviewCount: 78
    },
    {
      id: 9,
      title: "Weinprobe Mosel-Region",
      description: "Entdecken Sie die besten Weine der Mosel-Region Luxemburgs mit einer vergünstigten Weinprobe-Tour inklusive Transport.",
      location: "Mosel-Tal, Luxemburg",
      discount: "GROUP DISCOUNT 40%",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      rating: 4.8,
      reviewCount: 92
    }
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt text-warning"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star text-warning"></i>);
    }

    return stars;
  };

  // Function to share an offer on social media
  const shareOffer = (platform: string) => {
    // Implement share functionality
    const shareUrl = window.location.href;
    const shareText = 'Check out this amazing deal on Luxembourg Pas Chère!';
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

  // Display only the first 6 offers in the main view
  const displayedOffers = offers.slice(0, 6);

  return (
    <section id="offers" className="py-5 py-md-6 bg-light">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="display-6 fw-bold font-montserrat mb-0 text-primary">{t('currentOffers')}</h2>
          </div>
          <div className="col-auto">
            <a href="#" className="text-decoration-none text-lux-blue fw-bold">
              {t('viewAllOffers')} <i className="fas fa-arrow-right ms-1 small"></i>
            </a>
          </div>
        </div>

        {/* Desktop View */}
        <div className="row row-cols-1 row-cols-md-3 g-4 d-none d-md-flex">
          {displayedOffers.map((offer) => (
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
                  <h5 className="card-title fw-bold mb-2">{offer.title}</h5>
                  
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
                      {t('viewDeal')} <i className="fas fa-chevron-right ms-1 small"></i>
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
            <span className="text-muted small">{t('swipeLeftForMore')}</span>
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
                      <h5 className="card-title fw-bold mb-2">{offer.title}</h5>
                      
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
                            {t('viewDeal')}
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

        {/* View More Button */}
        <div className="text-center mt-5">
          <a href="#" className="btn btn-outline-primary btn-lg px-4 fw-bold">
            {t('exploreMoreDeals')} <i className="fas fa-arrow-right ms-1"></i>
          </a>
        </div>

        {/* Share Modal */}
        <div className="modal fade" id="shareModal" tabIndex={-1} aria-labelledby="shareModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold" id="shareModalLabel">{t('shareThisOffer')}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-around">
                  <button onClick={() => shareOffer('facebook')} className="btn btn-outline-primary rounded-circle p-3">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button onClick={() => shareOffer('twitter')} className="btn btn-outline-info rounded-circle p-3">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button onClick={() => shareOffer('linkedin')} className="btn btn-outline-secondary rounded-circle p-3">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                  <button onClick={() => shareOffer('whatsapp')} className="btn btn-outline-success rounded-circle p-3">
                    <i className="fab fa-whatsapp"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
