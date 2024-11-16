import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">SobMile</h3>
            <p className="text-gray-400">Discover all type of pruducts with SobMile.</p>
            <div className="mt-4">
              <h4 className="text-md font-semibold">Contact Us</h4>
              <p className="text-gray-400">Email: support@sobmile.com</p>
              <p className="text-gray-400">Phone: (+880) 1456-7890</p>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Shop</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-gray-500 text-sm">© 2024 SobMile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
