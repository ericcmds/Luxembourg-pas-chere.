type AboutItem = {
  iconClass: string;
  title: string;
  description: string;
  colorClass: string;
};

export default function AboutSection() {
  const aboutItems: AboutItem[] = [
    {
      iconClass: "fas fa-bullseye",
      title: "Our Mission",
      description: "To make Luxembourg accessible to everyone by finding and sharing affordable options for dining, entertainment, shopping, and more. We believe enjoying Luxembourg shouldn't be limited by budget.",
      colorClass: "bg-lux-red"
    },
    {
      iconClass: "fas fa-users",
      title: "Our Team",
      description: "We're a group of Luxembourg locals and expats who are passionate about our beautiful country and committed to helping others experience it without breaking the bank.",
      colorClass: "bg-lux-blue"
    },
    {
      iconClass: "fas fa-handshake",
      title: "Our Partners",
      description: "We collaborate with local businesses, cultural institutions, and tourism offices to bring you exclusive deals and insider information on enjoying Luxembourg affordably.",
      colorClass: "bg-lux-red"
    },
    {
      iconClass: "fas fa-heart",
      title: "Our Values",
      description: "We believe in authenticity, accessibility, and community. All our recommendations are personally tested and verified to ensure they offer genuine value for money.",
      colorClass: "bg-lux-blue"
    }
  ];

  return (
    <section id="about" className="py-5 py-md-6 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            <h2 className="display-5 fw-bold font-montserrat mb-3">About Luxembourg Pas Chère</h2>
            <p className="lead mb-0">
              We're dedicated to helping locals and visitors discover affordable options in Luxembourg.
            </p>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {aboutItems.map((item, index) => (
            <div key={index} className="col">
              <div className="card h-100 border-0 shadow-sm about-card">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className={`${item.colorClass} text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center`} style={{width: "48px", height: "48px"}}>
                      <i className={`${item.iconClass}`}></i>
                    </div>
                    <h3 className="card-title h5 fw-bold font-montserrat mb-0">{item.title}</h3>
                  </div>
                  <p className="card-text text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
