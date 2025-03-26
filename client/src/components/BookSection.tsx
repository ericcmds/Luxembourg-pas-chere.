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
    <section id="book" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-lux-dark">
            The Only Guide to <span className="text-lux-red">Affordable Living</span> in Luxembourg
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A comprehensive resource bringing together all the information needed to save money in Luxembourg
          </p>
        </div>
        
        {/* Book Showcase */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Book Cover and Main Info */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            {/* Book Cover - Central for mobile, Left for desktop */}
            <div className="flex justify-center lg:justify-start lg:w-1/3">
              <div className="w-64 md:w-72 transform transition-transform duration-500 hover:rotate-[-1deg] hover:scale-105">
                <BookCover />
              </div>
            </div>
            
            {/* Book Info */}
            <div className="text-center lg:text-left lg:w-2/3">
              <div className="inline-block bg-lux-red px-3 py-1 rounded-full mb-4">
                <span className="text-white font-medium text-sm">The Essential Guide</span>
              </div>
              
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4 text-lux-dark">
                Luxembourg Pas Chère: <span className="text-lux-red">Your Key to Affordable Living</span>
              </h3>
              
              <p className="text-gray-700 mb-6">
                Our guide is unique, being the only one to compile all the information needed to save money. This makes it useful and valuable for readers looking to maintain their quality of life in Luxembourg while spending less.
              </p>
              
              <h4 className="font-montserrat font-semibold text-xl mb-3 text-lux-dark">The Guide Has a Triple Objective:</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 size={18} className="text-lux-blue" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Help families in precarious situations</span> maintain their dignity by becoming active in finding solutions to their financial difficulties and managing daily life.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 size={18} className="text-lux-blue" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Save families time</span> by providing all the information they need in one place.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 size={18} className="text-lux-blue" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">Encourage responsible consumption</span> by promoting the social and solidarity economy.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="text-lux-red font-bold text-3xl">€24.99</div>
                <div className="line-through text-gray-400 text-lg">€34.99</div>
                <div className="bg-lux-red text-white px-2 py-1 rounded-md text-sm font-bold">
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
                    Order Now
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input id="address" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postal-code">Postal Code</Label>
                            <Input id="postal-code" required />
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
              
              <p className="text-sm text-gray-500 mt-4">
                Free shipping in Luxembourg. International shipping available.
              </p>
            </div>
          </div>
          
          {/* Additional Detailed Information */}
          <div className="mt-12">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="target">Target Audience</TabsTrigger>
                <TabsTrigger value="innovation">Innovation</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
              
              {/* About the Project Tab */}
              <TabsContent value="about" className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-montserrat font-semibold text-xl mb-4 text-lux-dark flex items-center">
                      <BookOpen className="mr-2 text-lux-blue" size={20} />
                      About the Project Leader
                    </h4>
                    <div className="bg-lux-light p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        <span className="font-medium">My name is Pascale ZAOUROU.</span> I am a single mother of three children, aged 49, with a degree in Educational Sciences and a diploma in Social Sciences and Mediation. I have been a resident of Luxembourg for over fifteen years.
                      </p>
                      <p className="text-gray-700">
                        This project is based on my personal experience, followed by interviews with students, single-parent families to learn about their best tips, and discussions with associative leaders and key players in Luxembourg's social and solidarity economy.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat font-semibold text-xl mb-4 text-lux-dark flex items-center">
                      <Building className="mr-2 text-lux-blue" size={20} />
                      Context
                    </h4>
                    <div className="bg-lux-light p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Today, 45% of workers in Luxembourg come from across the borders, and 75% of the active population is non-native. We also address the issue of working poor.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Various health, climate, and security crises have weakened household budgets. The phenomenon of working poor has intensified in Luxembourg.
                      </p>
                      <p className="text-gray-700">
                        While the country aims to attract talent, the high cost of living hinders its appeal. A thorough market study reveals current gaps in information on affordable tips and consumer needs.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Target Audience Tab */}
              <TabsContent value="target" className="pt-6">
                <h4 className="font-montserrat font-semibold text-xl mb-4 text-lux-dark flex items-center">
                  <Target className="mr-2 text-lux-blue" size={20} />
                  Who This Guide Is For
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-lux-light p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Local residents concerned about managing their budget</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Students, young professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Budget travelers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Municipalities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Social services</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-lux-light p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Human resources departments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Non-resident expatriates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Companies featured in the first edition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Companies concerned with CSR in banking or consumer sectors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Ministries</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-lux-light p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Temporary employment agencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Daycare centers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Real estate agencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>New residents and families</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-lux-blue mt-1 flex-shrink-0" />
                        <span>Anyone wanting to save on daily expenses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Innovation Tab */}
              <TabsContent value="innovation" className="pt-6">
                <h4 className="font-montserrat font-semibold text-xl mb-4 text-lux-dark flex items-center">
                  <Lightbulb className="mr-2 text-lux-blue" size={20} />
                  What Makes This Guide Unique
                </h4>
                
                <div className="bg-lux-light p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    The project's innovation lies in several aspects:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-lux-blue" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Comprehensive coverage:</span> Our project is the only one to address all areas of daily life: finance, culture, furniture, entrepreneurship, food, contributing to lower household expenses and offering an economic solution alternative.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-lux-blue" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Direct response to high costs:</span> A practical solution to the high cost of living in Luxembourg, which is often a barrier for newcomers and longtime residents alike.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-lux-blue" />
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Uniquely local:</span> Created by a long-term resident with first-hand experience of the challenges and opportunities in Luxembourg, incorporating real insights from interviews with various community members.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Content Tab */}
              <TabsContent value="content" className="pt-6">
                <h4 className="font-montserrat font-semibold text-xl mb-4 text-lux-dark flex items-center">
                  <BookOpen className="mr-2 text-lux-blue" size={20} />
                  What's Inside the Guide
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-lux-light rounded-lg overflow-hidden">
                    <div className="bg-lux-blue text-white py-3 px-4 font-medium">
                      Daily Life Sections
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Eating affordably</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Budget housing options</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Entertainment & recreation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Affordable tourism</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Discount shopping</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-lux-light rounded-lg overflow-hidden">
                    <div className="bg-lux-blue text-white py-3 px-4 font-medium">
                      New Sections
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Schooling options</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Training opportunities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Higher education</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Professional development</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Lifelong learning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-lux-light rounded-lg overflow-hidden">
                    <div className="bg-lux-blue text-white py-3 px-4 font-medium">
                      Social & Solidarity Economy
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Community initiatives</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Cooperative businesses</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Social enterprises</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Ethical consumption</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-lux-blue" />
                          <span>Sustainable options</span>
                        </li>
                      </ul>
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