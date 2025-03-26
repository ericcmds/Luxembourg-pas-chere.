type Offer = {
  id: number;
  title: string;
  description: string;
  location: string;
  discount: string;
  image: string;
};

export default function OffersSection() {
  const offers: Offer[] = [
    {
      id: 1,
      title: "Bella Italia Restaurant",
      description: "Enjoy authentic Italian cuisine at a fraction of the price with our exclusive discount.",
      location: "Kirchberg, Luxembourg City",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 2,
      title: "Philharmonie Concert",
      description: "Experience world-class music at Luxembourg's Philharmonie with a special discount on tickets.",
      location: "Place de l'Europe, Kirchberg",
      discount: "20% OFF",
      image: "https://images.unsplash.com/photo-1607460256908-a44d43651db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    },
    {
      id: 3,
      title: "City Shopping Pass",
      description: "Get discounts at over 30 shops in Luxembourg City with our exclusive shopping pass.",
      location: "City Center, Luxembourg",
      discount: "€25 ONLY",
      image: "https://images.unsplash.com/photo-1629207338691-a731a3b88cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80"
    }
  ];

  return (
    <section id="offers" className="py-5 py-md-6 bg-light">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col">
            <h2 className="display-6 fw-bold font-montserrat mb-0">Latest Offers</h2>
          </div>
          <div className="col-auto">
            <a href="#" className="text-decoration-none text-lux-blue fw-bold">
              View all offers <i className="fas fa-arrow-right ms-1 small"></i>
            </a>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {offers.map((offer) => (
            <div key={offer.id} className="col">
              <a href="#" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden offer-card">
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
                    <h3 className="card-title h5 fw-bold font-montserrat mb-3">{offer.title}</h3>
                    <p className="card-text text-muted mb-3">{offer.description}</p>
                    <div className="d-flex align-items-center text-muted mb-3">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      <small>{offer.location}</small>
                    </div>
                    <div className="d-grid">
                      <button 
                        className="btn btn-primary py-2"
                        style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }}
                      >
                        View Deal <i className="fas fa-chevron-right ms-1 small"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
