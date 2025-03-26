import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    submitForm(data);
  };

  return (
    <section id="contact" className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#333333] mb-6">
              Get In Touch
            </h2>
            <p className="text-lg font-opensans text-[#333333] mb-8">
              Have questions, suggestions for budget spots, or want to partner with us? We'd love to hear from you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-[#E60023] rounded-full w-10 h-10 flex items-center justify-center text-white mt-1 mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">Our Office</h3>
                  <p className="text-[#333333] font-opensans">23 Boulevard Royal, Luxembourg City, 2449</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E60023] rounded-full w-10 h-10 flex items-center justify-center text-white mt-1 mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">Email Us</h3>
                  <p className="text-[#333333] font-opensans">info@luxembourgpaschère.lu</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#E60023] rounded-full w-10 h-10 flex items-center justify-center text-white mt-1 mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-[#333333]">Call Us</h3>
                  <p className="text-[#333333] font-opensans">+352 28 12 34 56</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <a href="#" className="bg-[#00A1DE] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-[#00A1DE] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-[#00A1DE] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-[#00A1DE] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <Card className="bg-white rounded-lg shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-montserrat font-semibold text-[#333333] mb-6">
                  Send Us a Message
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#333333] font-montserrat font-semibold">
                            Your Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1DE]" 
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
                          <FormLabel className="text-[#333333] font-montserrat font-semibold">
                            Your Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1DE]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#333333] font-montserrat font-semibold">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1DE]" 
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
                          <FormLabel className="text-[#333333] font-montserrat font-semibold">
                            Your Message
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4} 
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1DE]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#E60023] hover:bg-red-700 text-white font-montserrat font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
