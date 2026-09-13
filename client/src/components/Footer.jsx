import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-32">
      <div className="container-page py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-display text-2xl mb-4">
            NOIR <span className="italic font-light">&amp;</span> CO
          </h3>
          <p className="text-sm text-paper/60 max-w-xs">
            Considered clothing, made to be worn for years rather than seasons.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-wide2 uppercase text-paper/50 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop?category=outerwear" className="hover:text-gold transition-colors">Outerwear</Link></li>
            <li><Link to="/shop?category=dresses" className="hover:text-gold transition-colors">Dresses</Link></li>
            <li><Link to="/shop?category=footwear" className="hover:text-gold transition-colors">Footwear</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-gold transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-wide2 uppercase text-paper/50 mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-paper/80">
            <li>Shipping &amp; returns</li>
            <li>Size guide</li>
            <li>Contact us</li>
            <li>Order tracking</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-wide2 uppercase text-paper/50 mb-4">Studio</h4>
          <p className="text-sm text-paper/80 leading-relaxed">
            42 Ashworth Lane<br />
            Jaipur, Rajasthan<br />
            hello@noirandco.com
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-paper/40">
          <span>&copy; {new Date().getFullYear()} NOIR &amp; CO. All rights reserved.</span>
          <span>Built as a full-stack demo project.</span>
        </div>
      </div>
    </footer>
  );
}
