
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">ToolMaster PRO</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 container flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">Pagamento Confirmado!</h1>
          
          <p className="text-muted-foreground">
            Seu pagamento foi processado com sucesso. Agora você tem acesso completo ao ToolMaster PRO.
          </p>
          
          <div className="pt-4 space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link to="/dashboard">
                Acessar o Dashboard
              </Link>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <p>Enviamos um e-mail com os detalhes da sua compra.</p>
              <p className="mt-1">
                Dúvidas? Entre em contato com nosso{" "}
                <Link to="/support" className="text-primary underline-offset-4 hover:underline">
                  suporte
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
