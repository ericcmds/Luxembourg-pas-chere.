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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

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
    <section id="book" className="py-20 bg-gradient-to-b from-white to-lux-light">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Book Cover */}
            <div className="flex justify-center">
              <div className="w-64 md:w-80 transform transition-transform duration-500 hover:rotate-[-1deg] hover:scale-105">
                <BookCover />
              </div>
            </div>
            
            {/* Book Info */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-lux-red px-3 py-1 rounded-full mb-4">
                <span className="text-white font-medium text-sm">New Release</span>
              </div>
              
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-lux-dark">
                Luxembourg Pas Chère: <span className="text-lux-red">The Book</span>
              </h2>
              
              <p className="text-gray-600 mb-6">
                Discover the ultimate guide to affordable living in Luxembourg. This comprehensive book provides insider tips, hidden gems, and money-saving strategies that will help you enjoy everything Luxembourg has to offer without breaking the bank.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-lux-blue" />
                  <span className="text-sm">300+ pages of tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-lux-blue" />
                  <span className="text-sm">Restaurant deals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-lux-blue" />
                  <span className="text-sm">Budget activities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-lux-blue" />
                  <span className="text-sm">Local insights</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
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
                    className="bg-lux-red hover:bg-lux-red/90 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
        </div>
      </div>
    </section>
  );
}