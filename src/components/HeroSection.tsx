
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              ToolMaster PRO
            </span>
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white mb-6 animate-fade-in">
            Organize suas ferramentas.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              Trabalhe de qualquer lugar.
            </span>
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in-up">
            Uma plataforma poderosa para adicionar, organizar e acessar todas as
            suas ferramentas de trabalho em um único painel, de qualquer
            dispositivo, a qualquer momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto font-medium">
                Experimente Grátis por 7 Dias
              </Button>
            </Link>
            <Link to="/#pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto font-medium"
              >
                Ver Planos
              </Button>
            </Link>
          </div>
          <div className="relative mx-auto max-w-4xl h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/10 to-brandPurple/10 z-10 glassmorphism rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTg0NzB8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGFzaGJvYXJkfGVufDB8fHx8MTcxNDQwMjMwMXww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="ToolMaster PRO Dashboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <h3 className="text-lg font-semibold">
                  ToolMaster PRO Dashboard
                </h3>
                <p className="text-sm text-gray-200">
                  Todas as suas ferramentas organizadas em um só lugar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
