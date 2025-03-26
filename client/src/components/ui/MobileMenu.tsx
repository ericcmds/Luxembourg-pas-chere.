import { useEffect } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close mobile menu when clicking on a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
  };

  useEffect(() => {
    // Handle ESC key press to close menu
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4">
      <nav className="flex flex-col space-y-4">
        <a href="#home" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200" onClick={handleLinkClick}>Home</a>
        <a href="#offers" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200" onClick={handleLinkClick}>Offers</a>
        <a href="#blog" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200" onClick={handleLinkClick}>Blog</a>
        <a href="#about" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200" onClick={handleLinkClick}>About</a>
        <a href="#contact" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200" onClick={handleLinkClick}>Contact</a>
      </nav>
    </div>
  );
}
