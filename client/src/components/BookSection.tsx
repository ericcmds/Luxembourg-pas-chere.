import { useState } from "react";
import BookCover from "./BookCover";

export default function BookSection() {
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrderProcessing(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
      });
      
      // Show success alert via Bootstrap
      const alertPlaceholder = document.getElementById('orderAlertPlaceholder');
      if (alertPlaceholder) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i> Order placed successfully! You will receive an email confirmation shortly.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertPlaceholder.append(wrapper);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          const alert = document.querySelector('.alert');
          if (alert) {
            alert.remove();
          }
        }, 5000);
      }
      
      // Close modal using Bootstrap's JS API
      const modalElement = document.getElementById('orderModal');
      if (modalElement && typeof window !== 'undefined') {
        // @ts-ignore - Bootstrap is loaded from CDN
        const bootstrapModal = window.bootstrap?.Modal.getInstance(modalElement);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    }, 1500);
  };

  return (
    <section id="book" className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">
              The Only Guide to <span className="text-lux-red">Affordable Living</span> in Luxembourg
            </h2>
            <p className="lead text-muted mb-0">
              A comprehensive resource bringing together all the information needed to save money in Luxembourg
            </p>
          </div>
        </div>
        
        {/* Book Showcase using Bootstrap Grid */}
        <div className="row g-5 align-items-center mb-5">
          {/* Book Cover - Left Column */}
          <div className="col-12 col-lg-5 text-center">
            <div className="mx-auto mb-4 mb-lg-0" style={{ maxWidth: "350px" }}>
              <BookCover />
            </div>
          </div>
          
          {/* Book Info - Right Column */}
          <div className="col-12 col-lg-7">
            <div className="card border-0 bg-light shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <span className="badge bg-lux-red rounded-pill px-3 py-2 mb-3">
                  The Essential Guide
                </span>
                
                <h3 className="h2 fw-bold font-montserrat mb-4">
                  Luxembourg Pas Chère: <span className="text-lux-red">Your Key to Affordable Living</span>
                </h3>
                
                <p className="text-muted mb-4">
                  Our guide is unique, being the only one to compile all the information needed to save money. This makes it useful and valuable for readers looking to maintain their quality of life in Luxembourg while spending less.
                </p>
                
                <h4 className="h5 fw-bold font-montserrat mb-3">The Guide Has a Triple Objective:</h4>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0"><strong>Help families in precarious situations</strong> maintain their dignity by becoming active in finding solutions to their financial difficulties and managing daily life.</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0"><strong>Save families time</strong> by providing all the information they need in one place.</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0"><strong>Encourage responsible consumption</strong> by promoting the social and solidarity economy.</p>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="text-lux-red fw-bold fs-1">€24.99</div>
                  <div className="text-decoration-line-through text-muted fs-4">€34.99</div>
                  <div className="badge bg-lux-red px-2 py-1 fs-6 fw-bold">SAVE 28%</div>
                </div>
                
                {/* Alert placeholder for order confirmation */}
                <div id="orderAlertPlaceholder" className="mb-3"></div>
                
                {/* Order Button */}
                <div className="d-flex flex-wrap gap-3 mb-3">
                  <button 
                    className="btn btn-lg btn-danger px-4 py-2" 
                    style={{ backgroundColor: '#E31837', borderColor: '#E31837' }}
                    data-bs-toggle="modal" 
                    data-bs-target="#orderModal"
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </button>
                </div>
                
                <p className="text-muted small mb-0">
                  <i className="fas fa-truck me-1"></i> Free shipping in Luxembourg. International shipping available.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional features of the book */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-lux-blue bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="fas fa-book fa-2x text-lux-blue"></i>
                </div>
                <h5 className="fw-bold mb-3">Comprehensive Content</h5>
                <p className="text-muted">Over 500 tips and resources for saving money across all aspects of life in Luxembourg.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-lux-red bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="fas fa-language fa-2x text-lux-red"></i>
                </div>
                <h5 className="fw-bold mb-3">Multilingual Support</h5>
                <p className="text-muted">Available resources in multiple languages to serve Luxembourg's diverse population.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="fas fa-leaf fa-2x text-success"></i>
                </div>
                <h5 className="fw-bold mb-3">Sustainable Living</h5>
                <p className="text-muted">Promotes eco-friendly and sustainable options that are also good for your wallet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Modal */}
      <div className="modal fade" id="orderModal" tabIndex={-1} aria-labelledby="orderModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-lux-blue text-white">
              <h5 className="modal-title" id="orderModalLabel">Complete Your Order</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOrder} id="orderForm">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Delivery Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="city" 
                      value={formData.city}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="postalCode" 
                      value={formData.postalCode}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                  <span className="fw-bold">Total:</span>
                  <span className="text-lux-red fw-bold fs-4">€24.99</span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button 
                type="submit" 
                form="orderForm" 
                className="btn btn-danger"
                style={{ backgroundColor: '#E31837', borderColor: '#E31837' }}
                disabled={isOrderProcessing}
              >
                {isOrderProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  'Complete Purchase'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}