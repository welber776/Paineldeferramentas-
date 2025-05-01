
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/5 to-brandPurple/5"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto glassmorphism rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para organizar suas ferramentas?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Comece agora mesmo com 7 dias grátis ou adquira um dos nossos
              planos para acessar todas as funcionalidades do ToolMaster PRO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-brandBlue to-brandPurple hover:from-brandBlue/90 hover:to-brandPurple/90"
                >
                  Experimente Grátis
                </Button>
              </Link>
              <Link to="/#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
