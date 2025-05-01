
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  paymentType: string;
  features: PlanFeature[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Plano Offline",
    description: "Trabalhe sem depender de internet",
    price: "R$80",
    paymentType: "pagamento único",
    features: [
      { text: "Funciona totalmente offline", included: true },
      { text: "Salva os dados localmente no navegador", included: true },
      { text: "Organização por categorias", included: true },
      { text: "Descrições detalhadas", included: true },
      { text: "Acesso rápido", included: true },
      { text: "Sincronização na nuvem", included: false },
      { text: "Acesso de múltiplos dispositivos", included: false },
    ],
    buttonText: "Comprar Agora",
    buttonLink: "/checkout?plan=offline",
  },
  {
    name: "Plano Online",
    description: "Acesse de qualquer lugar, qualquer dispositivo",
    price: "R$150",
    paymentType: "pagamento único",
    features: [
      { text: "Funciona online e offline", included: true },
      { text: "Salva os dados na nuvem (Supabase)", included: true },
      { text: "Organização por categorias", included: true },
      { text: "Descrições detalhadas", included: true },
      { text: "Acesso rápido", included: true },
      { text: "Sincronização na nuvem", included: true },
      { text: "Acesso de múltiplos dispositivos", included: true },
    ],
    buttonText: "Comprar Agora",
    buttonLink: "/checkout?plan=online",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              Plano
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Planos acessíveis com pagamento único. Sem assinaturas mensais.
            Escolha o que melhor se adapta às suas necessidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${
                plan.highlighted
                  ? "border-brandPurple shadow-lg dark:border-brandPurple/50"
                  : "border-gray-200 dark:border-gray-800"
              } relative overflow-hidden`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-brandBlue to-brandPurple text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">
                    {plan.paymentType}
                  </span>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      {feature.included ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-green-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                      )}
                      <span
                        className={`${
                          feature.included
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={plan.buttonLink} className="w-full">
                  <Button
                    size="lg"
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-brandBlue to-brandPurple hover:from-brandBlue/90 hover:to-brandPurple/90"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Não tem certeza? Experimente primeiro
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Crie uma conta gratuitamente e teste todas as funcionalidades por 7
            dias sem nenhum compromisso.
          </p>
          <Link to="/register">
            <Button size="lg">Experimente Grátis por 7 Dias</Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
    </section>
  );
}
