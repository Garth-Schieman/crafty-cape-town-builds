import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/27601133986?text=Hi%20Crafty%20Construction%20and%20Technical%20Services%2C%20I%20would%20like%20a%20quote"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-primary-foreground" />
      </a>

      {/* Call button - mobile only */}
      <a
        href="tel:+27601133986"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 sm:hidden"
        aria-label="Call us"
      >
        <Phone className="h-7 w-7 text-primary-foreground" />
      </a>
    </>
  );
};

export default FloatingButtons;
