import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { InfoIcon, Users, Target, Star, Book } from "lucide-react";

type AboutItem = {
  iconClass: string;
  title: string;
  description: string;
  colorClass: string;
};

type TabContent = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("about");
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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

  const tabContents: Record<string, TabContent> = {
    about: {
      title: "About",
      icon: <InfoIcon className="h-4 w-4" />,
      content: (
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
      )
    },
    audience: {
      title: "Target Audience",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="row">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold font-montserrat mb-3 text-[#E31837]">Budget-Conscious Locals</h3>
                <p className="text-muted">Long-term residents looking to maximize their budget while enjoying all Luxembourg has to offer. From affordable dining options to entertainment and shopping deals.</p>
                <ul className="list-unstyled mt-3">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Daily deals for everyday needs</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Local hidden gems</li>
                  <li><i className="fas fa-check text-success me-2"></i> Seasonal special offers</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold font-montserrat mb-3 text-[#00A4E0]">Cost-Conscious Tourists</h3>
                <p className="text-muted">Visitors wanting to experience Luxembourg without overspending. We provide tips for affordable accommodation, transportation, attractions, and dining.</p>
                <ul className="list-unstyled mt-3">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Budget travel itineraries</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Tourist card discounts</li>
                  <li><i className="fas fa-check text-success me-2"></i> Free attractions and events</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold font-montserrat mb-3 text-[#E31837]">Expatriates & New Residents</h3>
                <p className="text-muted">Newcomers to Luxembourg looking to set up life without excessive costs. We offer practical advice for finding affordable housing, services, utilities, and social activities.</p>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <p><i className="fas fa-check text-success me-2"></i> Housing resources</p>
                  </div>
                  <div className="col-md-4">
                    <p><i className="fas fa-check text-success me-2"></i> Administrative guidance</p>
                  </div>
                  <div className="col-md-4">
                    <p><i className="fas fa-check text-success me-2"></i> Integration activities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    innovation: {
      title: "Innovation",
      icon: <Star className="h-4 w-4" />,
      content: (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm h-100 border-start border-4 border-[#E31837]">
              <h3 className="h5 fw-bold font-montserrat mb-3">Community-Sourced Recommendations</h3>
              <p className="text-muted">Unlike traditional guides that quickly become outdated, we leverage our community of budget-conscious locals and visitors to provide real-time recommendations and feedback on affordable options.</p>
              <div className="d-flex align-items-center mt-3">
                <div className="bg-[#E31837] text-white rounded-circle p-2 me-2 d-flex align-items-center justify-content-center" style={{width: "36px", height: "36px"}}>
                  <i className="fas fa-comments"></i>
                </div>
                <p className="mb-0 text-muted fst-italic">"Our community is our strength"</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm h-100 border-start border-4 border-[#00A4E0]">
              <h3 className="h5 fw-bold font-montserrat mb-3">Interactive Savings Calculator</h3>
              <p className="text-muted">Our proprietary tool helps users calculate potential savings by comparing standard tourist options with our budget recommendations. See exactly how much you can save during your time in Luxembourg.</p>
              <div className="d-flex align-items-center mt-3">
                <div className="bg-[#00A4E0] text-white rounded-circle p-2 me-2 d-flex align-items-center justify-content-center" style={{width: "36px", height: "36px"}}>
                  <i className="fas fa-calculator"></i>
                </div>
                <p className="mb-0 text-muted fst-italic">"Quantifiable savings at your fingertips"</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="bg-light p-4 rounded-lg shadow-sm border border-2 border-dashed border-[#E31837]">
              <h3 className="h5 fw-bold font-montserrat mb-3 text-center">Upcoming Innovations</h3>
              <div className="row text-center">
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="bg-white p-3 rounded-lg shadow-sm h-100">
                    <i className="fas fa-mobile-alt text-[#E31837] fa-2x mb-3"></i>
                    <h4 className="h6 fw-bold">Mobile App</h4>
                    <p className="small text-muted mb-0">Real-time deals and alerts</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <div className="bg-white p-3 rounded-lg shadow-sm h-100">
                    <i className="fas fa-map-marked-alt text-[#00A4E0] fa-2x mb-3"></i>
                    <h4 className="h6 fw-bold">Interactive Maps</h4>
                    <p className="small text-muted mb-0">Budget-friendly location finder</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm h-100">
                    <i className="fas fa-store text-[#E31837] fa-2x mb-3"></i>
                    <h4 className="h6 fw-bold">Discount Marketplace</h4>
                    <p className="small text-muted mb-0">Exclusive partner deals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    content: {
      title: "Content",
      icon: <Book className="h-4 w-4" />,
      content: (
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="accordion" id="contentAccordion">
              <div className="accordion-item border mb-3 rounded-lg overflow-hidden shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button font-montserrat fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Budget-Friendly Dining Guide
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#contentAccordion">
                  <div className="accordion-body">
                    <p className="text-muted mb-3">Comprehensive listings of affordable restaurants, cafés, and eateries across Luxembourg, organized by region, cuisine type, and price range.</p>
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-[#E31837]">150+ Restaurants</span>
                      <span className="badge bg-[#00A4E0]">30+ Cuisine Types</span>
                      <span className="badge bg-[#E31837]">Price Indicators</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="accordion-item border mb-3 rounded-lg overflow-hidden shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed font-montserrat fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Free &amp; Low-Cost Attractions
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#contentAccordion">
                  <div className="accordion-body">
                    <p className="text-muted mb-3">Detailed information on museums, parks, historical sites, and cultural venues that can be enjoyed for free or at a low cost, with insider tips on the best times to visit.</p>
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-[#00A4E0]">80+ Attractions</span>
                      <span className="badge bg-[#E31837]">Free Entry Days</span>
                      <span className="badge bg-[#00A4E0]">Hidden Gems</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="accordion-item border mb-3 rounded-lg overflow-hidden shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed font-montserrat fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accommodation &amp; Transportation Savings
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#contentAccordion">
                  <div className="accordion-body">
                    <p className="text-muted mb-3">Strategies for finding affordable places to stay and economical ways to navigate around Luxembourg, including public transport passes, carpooling options, and budget accommodation alternatives.</p>
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-[#E31837]">Transport Passes</span>
                      <span className="badge bg-[#00A4E0]">Accommodation Types</span>
                      <span className="badge bg-[#E31837]">Booking Tips</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="accordion-item border rounded-lg overflow-hidden shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed font-montserrat fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Seasonal Events &amp; Deals Calendar
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#contentAccordion">
                  <div className="accordion-body">
                    <p className="text-muted mb-3">Monthly updated guide to free festivals, cultural events, seasonal sales, and special promotions happening throughout Luxembourg, helping you plan your activities around the best deals.</p>
                    <div className="d-flex justify-content-between">
                      <span className="badge bg-[#00A4E0]">Monthly Updates</span>
                      <span className="badge bg-[#E31837]">Free Events</span>
                      <span className="badge bg-[#00A4E0]">Sale Periods</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  // Ensure Bootstrap's JavaScript is initialized for the accordions
  useEffect(() => {
    // This ensures Bootstrap's collapse functionality works with React
    // Modern websites typically use React state over Bootstrap JS, but this approach works for adding it in
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        
        <Tabs 
          defaultValue="about" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full mb-6"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="bg-muted/50 p-1 rounded-full">
              {Object.entries(tabContents).map(([key, { title, icon }]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === key 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={`${title} tab`}
                >
                  {icon}
                  <span>{title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(tabContents).map(([key, { content }]) => (
            <TabsContent 
              key={key} 
              value={key}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="animate-in fade-in-50 duration-300">
                {content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
