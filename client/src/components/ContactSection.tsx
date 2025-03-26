import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactSchema } from "@shared/schema";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: (values: Record<string, any>) => {
      return apiRequest("POST", "/api/contact", values);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(values: Record<string, any>) {
    mutate(values);
  }

  return (
    <section id="contact" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="font-montserrat font-bold text-3xl text-center mb-12">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-6">Get In Touch</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat">Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          className="px-4 py-3 rounded-md border focus:border-lux-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat">Your Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter your email"
                          className="px-4 py-3 rounded-md border focus:border-lux-blue"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message"
                          className="px-4 py-3 rounded-md border focus:border-lux-blue"
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  className="bg-lux-blue hover:bg-lux-red text-white font-montserrat font-semibold"
                  disabled={isPending}
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-xl mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-lux-blue mr-4 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium">Address</h4>
                  <p className="text-gray-600">7 Rue de la Liberté, L-1931 Luxembourg</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-lux-blue mr-4 mt-1">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium">Email</h4>
                  <p className="text-gray-600">info@luxembourgpaschère.lu</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-lux-blue mr-4 mt-1">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-montserrat font-medium">Phone</h4>
                  <p className="text-gray-600">+352 123 456 789</p>
                </div>
              </div>
              
              <div className="pt-6">
                <h4 className="font-montserrat font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-lux-light text-lux-blue hover:bg-lux-blue hover:text-white transition-colors p-3 rounded-full"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-lux-light text-lux-blue hover:bg-lux-blue hover:text-white transition-colors p-3 rounded-full"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-lux-light text-lux-blue hover:bg-lux-blue hover:text-white transition-colors p-3 rounded-full"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    className="bg-lux-light text-lux-blue hover:bg-lux-blue hover:text-white transition-colors p-3 rounded-full"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
