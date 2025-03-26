export default function Footer() {
  return (
    <footer className="bg-lux-dark text-white py-5 py-lg-6">
      <div className="container">
        <div className="row g-4 g-xl-5">
          {/* Logo and Description */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <a href="#" className="d-inline-block text-decoration-none mb-3">
                <span className="text-lux-red font-montserrat fw-bold fs-3">Luxembourg</span>
                <span className="text-lux-blue font-montserrat fw-bold fs-3 ms-1">Pas Chère</span>
              </a>
              <p className="text-light-gray mb-3">
                Your guide to enjoying Luxembourg without breaking the bank.
              </p>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Main Navigation</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#home" className="text-light-gray footer-link">Home</a></li>
                <li className="mb-2"><a href="#offers" className="text-light-gray footer-link">Offers</a></li>
                <li className="mb-2"><a href="#blog" className="text-light-gray footer-link">Blog</a></li>
                <li className="mb-2"><a href="#about" className="text-light-gray footer-link">About</a></li>
                <li className="mb-2"><a href="#contact" className="text-light-gray footer-link">Contact</a></li>
              </ul>
            </div>
          </div>
          
          {/* Categories */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Categories</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Restaurants</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Shopping</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Activities</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Accommodation</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Transportation</a></li>
              </ul>
            </div>
          </div>
          
          {/* Legal */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Legal</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Terms of Service</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Privacy Policy</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Cookie Policy</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-top border-secondary mt-4 pt-4 text-center">
          <p className="text-light-gray mb-0">
            © 2025 Luxembourg Pas Chère. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
