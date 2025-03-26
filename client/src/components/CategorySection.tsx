type Category = {
  icon: string;
  title: string;
  href: string;
  color: string;
};

export default function CategorySection() {
  const categories: Category[] = [
    {
      icon: "fas fa-utensils",
      title: "Restaurants",
      href: "#restaurants",
      color: "#20c997", // Türkis
    },
    {
      icon: "fas fa-shopping-bag",
      title: "Shopping",
      href: "#shopping",
      color: "#e83e8c", // Rosa
    },
    {
      icon: "fas fa-ticket-alt",
      title: "Activities",
      href: "#activities",
      color: "#0dcaf0", // Hellblau
    },
    {
      icon: "fas fa-bed",
      title: "Accommodation",
      href: "#accommodation",
      color: "#E31837", // Rot
    },
  ];

  return (
    <section id="category" className="bg-white py-5 py-md-6 py-lg-7">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 text-center">
            <h2 className="display-6 fw-bold font-montserrat mb-3">What Are You Looking For?</h2>
            <div className="divider-custom mx-auto mb-4">
              <div className="divider-custom-line bg-lux-red"></div>
              <div className="divider-custom-icon"><i className="fas fa-star text-lux-blue mx-2"></i></div>
              <div className="divider-custom-line bg-lux-blue"></div>
            </div>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {categories.map((category, index) => (
            <div key={index} className="col">
              <a href={category.href} className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm category-card transition"
                  style={{
                    borderRadius: '0.75rem',
                    overflow: 'hidden'
                  }}>
                  <div className="card-body text-center p-4 p-xxl-5">
                    <div className="category-icon-wrapper mb-3 mx-auto"
                      style={{
                        backgroundColor: category.color,
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <i className={`${category.icon} fa-lg text-white`}></i>
                    </div>
                    <h3 className="card-title h5 font-montserrat fw-bold">{category.title}</h3>
                    <p className="card-text small text-muted mt-2">Find the best deals</p>
                    <div className="mt-3">
                      <span className="btn btn-sm btn-outline-secondary rounded-pill py-1 px-3">
                        Explore <i className="fas fa-chevron-right ms-1 small"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .category-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .divider-custom {
          width: 80%;
          max-width: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .divider-custom-line {
          width: 100%;
          height: 2px;
          border-radius: 1px;
        }
        .divider-custom-icon {
          color: #00A4E0;
        }
      `}</style>
    </section>
  );
}
