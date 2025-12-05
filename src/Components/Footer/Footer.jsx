import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="text-gray-300 py-12" style={{ background: "#222934" }}>
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold">Cartzilla</h2>
          <p className="mt-3 opacity-80">Got questions? Contact us 24/7</p>
          <button className="mt-4 bg-white/10 px-4 py-2 rounded-md text-sm hover:bg-white/20 transition">
            Help and Consultation ▼
          </button>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg mb-3 font-medium">Company</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="#">About company</Link></li>
            <li><Link to="#">Our team</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Contact us</Link></li>
            <li><Link to="#">News</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg mb-3 font-medium">Account</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="#">Your account</Link></li>
            <li><Link to="#">Shipping rates & policies</Link></li>
            <li><Link to="#">Refunds & replacements</Link></li>
            <li><Link to="#">Delivery info</Link></li>
            <li><Link to="#">Order tracking</Link></li>
            <li><Link to="#">Taxes & fees</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg mb-3 font-medium">Customer service</h3>
          <ul className="space-y-2 opacity-80">
            <li><Link to="#">Payment methods</Link></li>
            <li><Link to="#">Money-back guarantee</Link></li>
            <li><Link to="#">Product returns</Link></li>
            <li><Link to="#">Support center</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">Terms & conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Links */}
      <div className="container mx-auto mt-10 px-6">
        <div className="flex flex-wrap text-xs gap-3 justify-center opacity-70">
          <span>Computers</span>
          <span>Smartphones</span>
          <span>TV & Video</span>
          <span>Speakers</span>
          <span>Cameras</span>
          <span>Gaming</span>
          <span>Wearables</span>
          <span>Smart Home</span>
          <span>Tablets</span>
          <span>Monitors</span>
          <span>Accessories</span>
        </div>

        {/* Copyright & Payments */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-sm opacity-60">

          <p>© All rights reserved. Made by Creactive Studio</p>

          <div className="flex gap-4 text-2xl mt-3 md:mt-0">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaApplePay />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
