import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"; 

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <a href="#home" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Crafty Construction Logo" 
            className="h-11 w-auto md:h-14 transition-all duration-500 hover:scale-105 object-contain"
            style={{ 
              /* This filter turns the white logo into a professional Dark Blue/Charcoal when scrolled */
              filter: isScrolled 
                ? "brightness(0) saturate(100%) invert(12%) sepia(39%) saturate(1550%) hue-rotate(182deg) brightness(94%) contrast(92%)" 
                : "none" 
            }}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-orange-500 ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+27601133986">
            <Button 
              variant={isScrolled ? "default" : "outline"} 
              size="sm" 
              className={`gap-2 ${!isScrolled && "bg-white/10 text-white border-white hover:bg-white hover:text-slate-900"}`}
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden z-50 p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6 text-slate-900" />
          ) : (
            <Menu className={`h-6 w-6 transition-colors ${isScrolled ? "text-slate-900" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 animate-in slide-in-from-top duration-300 lg:hidden">
           <button 
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-5 right-5"
          >
            <X className="h-8 w-8 text-slate-900" />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-slate-900 text-2xl font-bold hover:text-orange-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:+27601133986" className="w-2/3">
            <Button className="w-full gap-2 py-6 text-lg">
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;