
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check } from "lucide-react";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "offline";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Get plan details based on the URL parameter
  const planDetails = {
    offline: {
      name: "Plano Offline",
      price: "R$80",
      description: "Uso offline com armazenamento local"
    },
    online: {
      name: "Plano Online",
      price: "R$150",
      description: "Acesso em qualquer dispositivo com sincronização na nuvem"
    }
  };
  
  const currentPlan = plan === "online" ? planDetails.online : planDetails.offline;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Pagamento aprovado!",
        description: `Você adquiriu o ${currentPlan.name} com sucesso.`,
      });
      navigate("/payment-success");
    }, 2000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setFormData({...formData, [name]: formatted.substring(0, 19)});
    }
    // Format expiry as MM/YY
    else if (name === "cardExpiry") {
      const formatted = value.replace(/\D/g, "");
      if (formatted.length > 2) {
        setFormData({...formData, [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`});
      } else {
        setFormData({...formData, [name]: formatted});
      }
    }
    // Restrict CVC to 3-4 digits
    else if (name === "cardCvc") {
      setFormData({...formData, [name]: value.replace(/\D/g, "").substring(0, 4)});
    }
    else {
      setFormData({...formData, [name]: value});
    }
  };
  
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
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Finalizar compra</h1>
            <p className="text-muted-foreground">
              Você está adquirindo o {currentPlan.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order summary */}
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span>Resumo do Pedido</span>
                </h2>
                
                <div className="border-t border-b py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{currentPlan.name}</span>
                    <span>{currentPlan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan.description}
                  </p>
                </div>
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{currentPlan.price}</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Pagamento único</p>
                    <p className="text-muted-foreground">Sem assinaturas ou taxas recorrentes</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Dados de Pagamento</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no cartão</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="Nome como está no cartão"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/AA"
                        required
                        maxLength={5}
                        value={formData.cardExpiry}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        required
                        maxLength={4}
                        value={formData.cardCvc}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processando..." : `Pagar ${currentPlan.price}`}
                  </Button>
                </form>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                Seus dados de pagamento são processados de forma segura.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
