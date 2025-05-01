
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é o ToolMaster PRO?",
    answer:
      "ToolMaster PRO é uma plataforma para adicionar, organizar e acessar suas ferramentas de trabalho em um único painel. Perfeito para criadores de conteúdo, editores, designers, desenvolvedores e outros profissionais que utilizam diversas ferramentas online em seu dia a dia.",
  },
  {
    question: "Qual a diferença entre o plano Offline e Online?",
    answer:
      "O plano Offline (R$80) salva todos os seus dados localmente no navegador, sem depender de internet para funcionar. Já o plano Online (R$150) salva seus dados na nuvem, permitindo acessar suas ferramentas de qualquer dispositivo, em qualquer lugar.",
  },
  {
    question: "Por quanto tempo posso testar gratuitamente?",
    answer:
      "Oferecemos um período de teste gratuito de 7 dias com acesso a todas as funcionalidades do plano Online. Após esse período, você precisará adquirir um dos planos para continuar utilizando.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Oferecemos um pagamento único (sem assinaturas mensais) através de métodos seguros como cartão de crédito e outros meios de pagamento online. Após a confirmação do pagamento, você terá acesso imediato à versão completa do plano escolhido.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim, você pode fazer um upgrade do plano Offline para o Online a qualquer momento, pagando apenas a diferença de valor. Entre em contato com nosso suporte para realizar essa mudança.",
  },
  {
    question: "Como funciona a conexão com o banco de dados?",
    answer:
      "No plano Online, a conexão com o banco de dados é feita automaticamente ao primeiro login. O sistema cria todas as tabelas necessárias no Supabase, sem que você precise se preocupar com a configuração técnica.",
  },
  {
    question: "Posso ter mais de uma conta para gerenciar diferentes projetos?",
    answer:
      "Sim, você pode criar múltiplas contas com emails diferentes para gerenciar projetos distintos. Cada conta terá seu próprio painel de ferramentas.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              Frequentes
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o ToolMaster PRO e como ele pode ajudar você
            a organizar suas ferramentas de trabalho.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ainda tem dúvidas? Entre em contato com a gente
          </p>
          <a
            href="mailto:suporte@toolmasterpro.com"
            className="text-brandBlue dark:text-brandPurple hover:underline text-sm font-medium"
          >
            suporte@toolmasterpro.com
          </a>
        </div>
      </div>
    </section>
  );
}
