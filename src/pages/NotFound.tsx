
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! A página que você está procurando não foi encontrada.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-to-r from-brandBlue to-brandPurple">
            Voltar para Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
