
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
            ToolMaster PRO
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-brandBlue dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium text-gray-700 hover:text-brandBlue dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            Configurações
          </Link>
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline" size="sm">
              Entrar
            </Button>
          </Link>
        </div>

        {/* Mobile Menu (Sheet Component) */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                  ToolMaster PRO
                </SheetTitle>
                <SheetDescription>
                  Gerencie todas suas ferramentas em um só lugar
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <Link
                  to="/dashboard"
                  className="py-2 px-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="py-2 px-4 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Configurações
                </Link>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link 
                    to="/login" 
                    className="block w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full mb-2">
                      Entrar
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
