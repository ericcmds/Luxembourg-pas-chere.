import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default",
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "There was an error subscribing to the newsletter.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse({ email });
      subscribe(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: error.errors[0]?.message || "Please enter a valid email address",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section className="bg-[#E60023] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-2">
              Get Exclusive Deals
            </h2>
            <p className="font-opensans">
              Subscribe to our newsletter for weekly updates on the best budget options
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full md:w-64 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit"
                disabled={isPending}
                className="bg-white text-[#E60023] font-montserrat font-semibold px-6 py-3 rounded-full hover:bg-[#F5F5F5] transition-colors duration-200 h-12"
              >
                {isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
