import React from 'react';
import { Mail, Phone, MapPin, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Coffee className="h-10 w-10 text-amber-500 mr-3" />
              <span className="text-3xl font-bold tracking-tight">BrewMaster</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Premium coffee beans sourced from the world's finest coffee regions. 
              We're passionate about bringing you the perfect cup of coffee, from bean to brew.
            </p>
            <div className="flex space-x-6">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <span>hello@brewmaster.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Our Coffee</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Brewing Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Subscription</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:underline">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <span>+62 123-123-123</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-1" />
                <span>123 Street <br />Sleman, Yogyakarta 12345</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-white">Business Hours</h4>
              <div className="text-gray-300 space-y-1">
                <p>Mon - Fri: 6:00 AM - 8:00 PM</p>
                <p>Sat - Sun: 7:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 BrewMaster. All rights reserved. Crafted with ☕ and ❤️
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;