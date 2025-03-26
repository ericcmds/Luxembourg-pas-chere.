import React, { useState } from 'react';
import { Target, Eye, BookOpen, Users, Map, Calendar } from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("mission");

  const tabData = {
    mission: {
      title: "Our Mission",
      icon: <Target className="h-6 w-6" aria-hidden="true" />,
      content: "We are dedicated to making Luxembourg accessible to everyone, regardless of budget constraints. Our mission is to showcase affordable opportunities to experience Luxembourg's rich culture and beauty."
    },
    vision: {
      title: "Our Vision",
      icon: <Eye className="h-6 w-6" aria-hidden="true" />,
      content: "We envision a Luxembourg where every visitor and resident can enjoy the country's wonders without financial barriers. We believe that great experiences shouldn't come with a high price tag."
    },
    story: {
      title: "Our Story",
      icon: <BookOpen className="h-6 w-6" aria-hidden="true" />,
      content: "Founded by budget-conscious Luxembourg enthusiasts, our platform grew from a small blog into a comprehensive resource for affordable living and tourism in Luxembourg. We're proud to help thousands save money every year."
    },
    team: {
      title: "Our Team",
      icon: <Users className="h-6 w-6" aria-hidden="true" />,
      content: "Our team consists of local experts who are passionate about Luxembourg and committed to finding the best budget-friendly options. We personally test and review all recommendations to ensure quality."
    },
    locations: {
      title: "Coverage",
      icon: <Map className="h-6 w-6" aria-hidden="true" />,
      content: "We cover the entire Grand Duchy of Luxembourg, from the capital city to the smallest villages in the countryside. Our recommendations span urban attractions, nature reserves, and cultural sites."
    },
    history: {
      title: "History",
      icon: <Calendar className="h-6 w-6" aria-hidden="true" />,
      content: "Luxembourg on a Budget was established in 2018 and has since grown to become the premier resource for budget-conscious travelers and residents in Luxembourg."
    }
  };

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          <span className="highlight-text">About Luxembourg on a Budget</span>
        </h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(tabData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === key 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-selected={activeTab === key}
              role="tab"
            >
              <span className="flex items-center gap-2">
                {React.cloneElement(value.icon, { 
                  className: `h-4 w-4 ${activeTab === key ? 'text-white' : 'text-blue-500'}`
                })}
                {value.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-500 transform hover:shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4">
              {tabData[activeTab as keyof typeof tabData].icon}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">{tabData[activeTab as keyof typeof tabData].title}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {tabData[activeTab as keyof typeof tabData].content}
          </p>
        </div>

        {/* Additional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {Object.entries(tabData).slice(0, 3).map(([key, value]) => (
            <div 
              key={key}
              className="about-card bg-white p-6 rounded-lg shadow cursor-pointer"
              onClick={() => setActiveTab(key)}
            >
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                  activeTab === key ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
                } mb-4 transition-all duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
              </div>
              <p className="text-gray-600">
                {value.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}