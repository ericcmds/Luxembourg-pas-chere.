export default function Hero() {
  return (
    <section id="home" className="position-relative text-white overflow-hidden">
      {/* Hero Background Image */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1580846961439-725c18a67d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxembourg City View" 
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      
      {/* Gradient overlay for better text visibility */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.8) 0%, rgba(0, 164, 224, 0.7) 100%)',
          zIndex: 1
        }}>
      </div>
      
      {/* Content */}
      <div className="position-relative px-4 px-md-5" style={{ zIndex: 2 }}>
        <div className="container py-5 py-md-6 py-lg-7 min-vh-100 d-flex align-items-center">
          <div className="row align-items-center">
            <div className="col-12 col-lg-7">
              <div className="badge bg-lux-red d-inline-block mb-3 fw-semibold rounded-pill px-3 py-2">
                Save money in Luxembourg
              </div>
              
              <h1 className="display-4 fw-bold font-montserrat mb-4">
                Welcome to <span className="text-lux-red">Luxembourg</span> <span className="text-lux-blue">Pas Chère</span>
              </h1>
              
              <p className="lead mb-5 opacity-90 font-opensans">
                The best tips and offers for an affordable life in Luxembourg. Discover how to enjoy this beautiful country without emptying your wallet.
              </p>
              
              {/* Feature badges */}
              <div className="d-flex flex-wrap gap-2 mb-5">
                <div className="badge bg-white bg-opacity-10 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-map-marker-alt text-lux-red me-2"></i>
                  <span className="fw-medium">Local secrets</span>
                </div>
                <div className="badge bg-white bg-opacity-10 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-heart text-lux-red me-2"></i>
                  <span className="fw-medium">Exclusive deals</span>
                </div>
                <div className="badge bg-white bg-opacity-10 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-wallet text-lux-red me-2"></i>
                  <span className="fw-medium">Budget friendly</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <a href="#offers" className="btn btn-lg px-4 py-2 fw-medium" 
                  style={{ backgroundColor: '#E31837', borderColor: '#E31837', color: 'white' }}>
                  <i className="fas fa-arrow-right me-2"></i> Discover Now
                </a>
                <a href="#blog" className="btn btn-lg px-4 py-2 fw-medium border-2 text-white" 
                  style={{ backgroundColor: 'transparent', borderColor: 'white' }}>
                  <i className="fas fa-info-circle me-2"></i> Learn More
                </a>
              </div>
            </div>
            
            {/* Stats Cards - Right side on desktop */}
            <div className="col-12 col-lg-5 d-none d-lg-block">
              <div className="row gy-4 mt-5">
                <div className="col-6">
                  <div className="card border-0 bg-white bg-opacity-10 rounded-4 p-3 text-center shadow-lg h-100" 
                    style={{ backdropFilter: 'blur(10px)' }}>
                    <div className="card-body">
                      <h2 className="display-5 fw-bold mb-0">40%</h2>
                      <p className="card-text opacity-80 mb-0">Average savings</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-0 bg-white bg-opacity-10 rounded-4 p-3 text-center shadow-lg h-100" 
                    style={{ backdropFilter: 'blur(10px)', transform: 'rotate(2deg)' }}>
                    <div className="card-body">
                      <h2 className="display-5 fw-bold mb-0">500+</h2>
                      <p className="card-text opacity-80 mb-0">Money-saving tips</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Stats - Visible only on mobile */}
        <div className="container d-block d-lg-none position-relative pb-4" style={{ zIndex: 2 }}>
          <div className="row g-3">
            <div className="col-6">
              <div className="card border-0 bg-white bg-opacity-10 rounded-4 p-2 text-center shadow-lg" 
                style={{ backdropFilter: 'blur(10px)' }}>
                <div className="card-body py-2">
                  <h2 className="h1 fw-bold mb-0">40%</h2>
                  <p className="card-text small opacity-80 mb-0">Average savings</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0 bg-white bg-opacity-10 rounded-4 p-2 text-center shadow-lg" 
                style={{ backdropFilter: 'blur(10px)' }}>
                <div className="card-body py-2">
                  <h2 className="h1 fw-bold mb-0">500+</h2>
                  <p className="card-text small opacity-80 mb-0">Money-saving tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x d-none d-md-block mb-4" style={{ zIndex: 2 }}>
        <a href="#category" className="text-white opacity-75 hover-opacity-100 transition">
          <i className="fas fa-chevron-down fa-2x bounce"></i>
        </a>
      </div>
    </section>
  );
}
