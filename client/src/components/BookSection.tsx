import { useState } from "react";
import BookCover from "./BookCover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Target, Users, Building, Lightbulb, BookOpen, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookSection() {
  const { toast } = useToast();
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrderProcessing(false);
      setOrderComplete(true);
      
      // Reset order complete state after dialog closes
      setTimeout(() => {
        setOrderComplete(false);
      }, 500);
      
      toast({
        title: "Order Placed Successfully",
        description: "You will receive an email confirmation shortly.",
      });
    }, 1500);
  };

  return (
    <section id="book" className="py-5 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-3 text-lux-dark">
            The Only Guide to <span className="text-lux-red">Affordable Living</span> in Luxembourg
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A comprehensive resource bringing together all the information needed to save money in Luxembourg
          </p>
        </div>
        
        {/* Book Showcase using Bootstrap Grid */}
        <div className="container mb-5">
          <div className="row align-items-center mb-5">
            {/* Book Cover - Bootstrap Column */}
            <div className="col-12 col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
              <div className="mx-auto" style={{ maxWidth: "300px", transition: "transform 0.5s" }}>
                <BookCover />
              </div>
            </div>
            
            {/* Book Info - Bootstrap Column */}
            <div className="col-12 col-lg-8 text-center text-lg-start">
              <div className="d-inline-block bg-lux-red px-3 py-1 rounded-pill mb-3">
                <span className="text-white fw-medium fs-6">The Essential Guide</span>
              </div>
              
              <h3 className="font-montserrat fw-bold fs-2 mb-3 text-lux-dark">
                Luxembourg Pas Chère: <span className="text-lux-red">Your Key to Affordable Living</span>
              </h3>
              
              <p className="text-gray-700 mb-4">
                Our guide is unique, being the only one to compile all the information needed to save money. This makes it useful and valuable for readers looking to maintain their quality of life in Luxembourg while spending less.
              </p>
              
              <h4 className="font-montserrat fw-semibold fs-5 mb-3 text-lux-dark">The Guide Has a Triple Objective:</h4>
              
              <div className="mb-4">
                <div className="d-flex align-items-start gap-2 mb-2">
                  <div className="mt-1 flex-shrink-0">
                    <i className="fas fa-check-circle text-lux-blue"></i>
                  </div>
                  <p className="text-gray-700">
                    <span className="fw-medium">Help families in precarious situations</span> maintain their dignity by becoming active in finding solutions to their financial difficulties and managing daily life.
                  </p>
                </div>
                <div className="d-flex align-items-start gap-2 mb-2">
                  <div className="mt-1 flex-shrink-0">
                    <i className="fas fa-check-circle text-lux-blue"></i>
                  </div>
                  <p className="text-gray-700">
                    <span className="fw-medium">Save families time</span> by providing all the information they need in one place.
                  </p>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <i className="fas fa-check-circle text-lux-blue"></i>
                  </div>
                  <p className="text-gray-700">
                    <span className="fw-medium">Encourage responsible consumption</span> by promoting the social and solidarity economy.
                  </p>
                </div>
              </div>
              
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
                <div className="text-lux-red fw-bold fs-2">€24.99</div>
                <div className="text-decoration-line-through text-gray-400 fs-5">€34.99</div>
                <div className="bg-lux-red text-white px-2 py-1 rounded fs-6 fw-bold">
                  SAVE 28%
                </div>
              </div>
              
              {/* Order Button with Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-lux-red hover:bg-lux-red/90 text-white font-bold px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <i className="fas fa-shopping-cart me-2"></i> Order Now
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md">
                  {!orderComplete ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Complete Your Order</DialogTitle>
                        <DialogDescription>
                          Fill in your details to purchase "Luxembourg Pas Chère".
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleOrder} className="space-y-4 py-4">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" className="form-control" required />
                          </div>
                          <div className="col-md-6">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" className="form-control" required />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" className="form-control" required />
                        </div>
                        
                        <div className="mb-3">
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input id="address" className="form-control" required />
                        </div>
                        
                        <div className="row g-3">
                          <div className="col-md-6">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" className="form-control" required />
                          </div>
                          <div className="col-md-6">
                            <Label htmlFor="postal-code">Postal Code</Label>
                            <Input id="postal-code" className="form-control" required />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <span className="fw-medium">Total:</span>
                            <span className="fw-bold text-lux-red fs-4">€24.99</span>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-100 bg-lux-blue"
                            disabled={isOrderProcessing}
                          >
                            {isOrderProcessing ? 
                              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...</> : 
                              <>Complete Purchase</>
                            }
                          </Button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="d-flex flex-column align-items-center py-4 text-center">
                      <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "64px", height: "64px" }}>
                        <i className="fas fa-check-circle text-success fs-2"></i>
                      </div>
                      <h3 className="fs-4 fw-bold mb-2">Order Successful!</h3>
                      <p className="text-gray-600 mb-4">
                        Thank you for your purchase. You will receive an email confirmation shortly.
                      </p>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <p className="text-sm text-gray-500 mt-3">
                <i className="fas fa-truck me-1"></i> Free shipping in Luxembourg. International shipping available.
              </p>
            </div>
          </div>
          
          {/* Additional Detailed Information */}
          <div className="mt-5">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">
                  <i className="fas fa-info-circle me-2"></i> About
                </TabsTrigger>
                <TabsTrigger value="target">
                  <i className="fas fa-users me-2"></i> Target Audience
                </TabsTrigger>
                <TabsTrigger value="innovation">
                  <i className="fas fa-lightbulb me-2"></i> Innovation
                </TabsTrigger>
                <TabsTrigger value="content">
                  <i className="fas fa-book-open me-2"></i> Content
                </TabsTrigger>
              </TabsList>
              
              {/* About the Project Tab */}
              <TabsContent value="about" className="pt-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card border-0 h-100">
                      <div className="card-header bg-lux-red text-white py-3">
                        <h4 className="m-0 font-montserrat fw-semibold d-flex align-items-center">
                          <i className="fas fa-user me-2"></i>
                          About the Project Leader
                        </h4>
                      </div>
                      <div className="card-body bg-lux-light">
                        <p className="card-text mb-3">
                          <span className="fw-medium">My name is Pascale ZAOUROU.</span> I am a single mother of three children, aged 49, with a degree in Educational Sciences and a diploma in Social Sciences and Mediation. I have been a resident of Luxembourg for over fifteen years.
                        </p>
                        <p className="card-text">
                          This project is based on my personal experience, followed by interviews with students, single-parent families to learn about their best tips, and discussions with associative leaders and key players in Luxembourg's social and solidarity economy.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card border-0 h-100">
                      <div className="card-header bg-lux-blue text-white py-3">
                        <h4 className="m-0 font-montserrat fw-semibold d-flex align-items-center">
                          <i className="fas fa-landmark me-2"></i>
                          Context
                        </h4>
                      </div>
                      <div className="card-body bg-lux-light">
                        <p className="card-text mb-3">
                          Today, 45% of workers in Luxembourg come from across the borders, and 75% of the active population is non-native. We also address the issue of working poor.
                        </p>
                        <p className="card-text mb-3">
                          Various health, climate, and security crises have weakened household budgets. The phenomenon of working poor has intensified in Luxembourg.
                        </p>
                        <p className="card-text">
                          While the country aims to attract talent, the high cost of living hinders its appeal. A thorough market study reveals current gaps in information on affordable tips and consumer needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Target Audience Tab */}
              <TabsContent value="target" className="pt-4">
                <div className="card border-0 mb-4">
                  <div className="card-header bg-lux-red text-white py-3">
                    <h4 className="m-0 font-montserrat fw-semibold d-flex align-items-center">
                      <i className="fas fa-bullseye me-2"></i>
                      Who This Guide Is For
                    </h4>
                  </div>
                  <div className="card-body bg-lux-light">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Local residents concerned about managing their budget</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Students, young professionals</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Budget travelers</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Municipalities</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Social services</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Human resources departments</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Non-resident expatriates</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Companies featured in the first edition</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Companies concerned with CSR in banking or consumer sectors</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Ministries</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Temporary employment agencies</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Daycare centers</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Real estate agencies</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>New residents and families</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Anyone wanting to save on daily expenses</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Innovation Tab */}
              <TabsContent value="innovation" className="pt-4">
                <div className="card border-0">
                  <div className="card-header bg-lux-blue text-white py-3">
                    <h4 className="m-0 font-montserrat fw-semibold d-flex align-items-center">
                      <i className="fas fa-lightbulb me-2"></i>
                      What Makes This Guide Innovative
                    </h4>
                  </div>
                  <div className="card-body bg-lux-light">
                    <p className="card-text mb-4">
                      The project's innovation lies in several aspects:
                    </p>
                    <div className="accordion" id="innovationAccordion">
                      <div className="accordion-item border-0 mb-3">
                        <h2 className="accordion-header">
                          <button className="accordion-button bg-white shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <i className="fas fa-check-circle text-lux-blue me-2"></i>
                            <span className="fw-medium">Comprehensive coverage</span>
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#innovationAccordion">
                          <div className="accordion-body">
                            Our project is the only one to address all areas of daily life: finance, culture, furniture, entrepreneurship, food, contributing to lower household expenses and offering an economic solution alternative.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0 mb-3">
                        <h2 className="accordion-header">
                          <button className="accordion-button bg-white shadow-sm collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <i className="fas fa-check-circle text-lux-blue me-2"></i>
                            <span className="fw-medium">Direct response to high costs</span>
                          </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#innovationAccordion">
                          <div className="accordion-body">
                            A practical solution to the high cost of living in Luxembourg, which is often a barrier for newcomers and longtime residents alike.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header">
                          <button className="accordion-button bg-white shadow-sm collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <i className="fas fa-check-circle text-lux-blue me-2"></i>
                            <span className="fw-medium">Uniquely local</span>
                          </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#innovationAccordion">
                          <div className="accordion-body">
                            Created by a long-term resident with first-hand experience of the challenges and opportunities in Luxembourg, incorporating real insights from interviews with various community members.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Content Tab */}
              <TabsContent value="content" className="pt-4">
                <div className="card border-0">
                  <div className="card-header bg-lux-red text-white py-3">
                    <h4 className="m-0 font-montserrat fw-semibold d-flex align-items-center">
                      <i className="fas fa-book-open me-2"></i>
                      What's Inside the Guide
                    </h4>
                  </div>
                  <div className="card-body bg-lux-light">
                    <div className="nav nav-tabs mb-4" id="tab-content" role="tablist">
                      <button className="nav-link active" id="daily-tab" data-bs-toggle="tab" data-bs-target="#daily" type="button" role="tab" aria-controls="daily" aria-selected="true">
                        <span className="badge rounded-pill bg-lux-red me-2">1</span>
                        Daily Life Sections
                      </button>
                      <button className="nav-link" id="education-tab" data-bs-toggle="tab" data-bs-target="#education" type="button" role="tab" aria-controls="education" aria-selected="false">
                        <span className="badge rounded-pill bg-lux-red me-2">2</span>
                        Education
                      </button>
                      <button className="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social" type="button" role="tab" aria-controls="social" aria-selected="false">
                        <span className="badge rounded-pill bg-lux-red me-2">3</span>
                        Social Economy
                      </button>
                    </div>
                    
                    <div className="tab-content" id="tabContent">
                      <div className="tab-pane fade show active" id="daily" role="tabpanel" aria-labelledby="daily-tab">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body">
                            <p className="card-text mb-4">
                              As in the first edition, we cover essential aspects of daily living including:
                            </p>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Affordable food options</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Budget housing solutions</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Entertainment on a budget</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Free/low-cost tourism</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Discount shopping</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                  <span>Budget-friendly transport</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tab-pane fade" id="education" role="tabpanel" aria-labelledby="education-tab">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body">
                            <p className="card-text mb-4">
                              The guide now includes comprehensive information on:
                            </p>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Affordable schooling options in Luxembourg</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Scholarships and financial aid opportunities</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Low-cost training programs</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Budget student living tips</span>
                              </li>
                              <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                <span>Educational resources and discounts</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
                        <div className="card border-0 shadow-sm">
                          <div className="card-body">
                            <p className="card-text mb-4">
                              Special attention is given to promoting social and economic initiatives:
                            </p>
                            <div className="row">
                              <div className="col-md-6">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                    <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                    <span>Community-based economic initiatives</span>
                                  </li>
                                  <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                    <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                    <span>Cooperative businesses and services</span>
                                  </li>
                                  <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                    <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                    <span>Ethical consumption options</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-6">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                    <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                    <span>Sustainable and affordable living solutions</span>
                                  </li>
                                  <li className="list-group-item border-0 d-flex align-items-center ps-0">
                                    <i className="fas fa-check-circle text-lux-blue me-2"></i>
                                    <span>Social services and resources</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Call to Action - Bottom */}
          <div className="mt-16 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-lux-red hover:bg-lux-red/90 text-white font-bold px-12 py-8 text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Order Your Copy Now
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                {/* Same dialog content as above */}
                {!orderComplete ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Complete Your Order</DialogTitle>
                      <DialogDescription>
                        Fill in your details to purchase "Luxembourg Pas Chère".
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleOrder} className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="order-first-name">First name</Label>
                          <Input id="order-first-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="order-last-name">Last name</Label>
                          <Input id="order-last-name" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="order-email">Email</Label>
                        <Input id="order-email" type="email" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="order-address">Delivery Address</Label>
                        <Input id="order-address" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="order-city">City</Label>
                          <Input id="order-city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="order-postal-code">Postal Code</Label>
                          <Input id="order-postal-code" required />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-lux-red text-xl">€24.99</span>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-lux-blue"
                          disabled={isOrderProcessing}
                        >
                          {isOrderProcessing ? "Processing..." : "Complete Purchase"}
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Order Successful!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your purchase. You will receive an email confirmation shortly.
                    </p>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}