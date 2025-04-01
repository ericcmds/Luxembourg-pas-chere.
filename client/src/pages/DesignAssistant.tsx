import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeminiDesignAssistant from "@/components/GeminiDesignAssistant";

export default function DesignAssistant() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Website Design Assistant</h1>
              <p className="text-gray-600">
                Get professional website design suggestions powered by Google Gemini Flash AI.
                Simply describe your needs and we'll provide you with tailored design recommendations.
              </p>
            </div>
            
            <GeminiDesignAssistant initialDescription="I need a professional website for Luxembourg Pas Chère, a guide to affordable living in Luxembourg. The website should feature a book showcase, have sections for About, Books, Press, and Contact, and include Instagram integration. The design should be modern, responsive, and use Luxembourg flag colors (red and blue) as accents." />
            
            <div className="mt-16 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Describe Your Needs</h3>
                  <p className="text-gray-600 text-sm">
                    Enter details about your website goals, target audience, and design preferences.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI Design Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI analyzes your requirements and generates professional design suggestions.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Implement Design</h3>
                  <p className="text-gray-600 text-sm">
                    Review the recommendations and use them to create or improve your website.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Benefits of AI-Assisted Design</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Professional Design Insights:</strong> Get expert-level design recommendations without the high cost of a design agency.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Time Savings:</strong> Skip the research phase and get straight to implementation with AI-generated design directions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Tailored Recommendations:</strong> Receive customized suggestions based on your specific requirements and industry.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Current Best Practices:</strong> Our AI is trained on the latest design trends and accessibility guidelines.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}