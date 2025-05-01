
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Organize por Categorias",
    description:
      "Agrupe suas ferramentas por categorias personalizadas que fazem sentido para o seu fluxo de trabalho.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    title: "Acesso Rápido",
    description:
      "Acesse suas ferramentas com apenas um clique, economizando tempo e aumentando sua produtividade.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Trabalhe Offline",
    description:
      "Com o plano Offline, suas ferramentas ficam salvas localmente no navegador, sem depender de internet.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v17.25m0 0c-1.241 0-2.25-1.009-2.25-2.25S10.759 15.75 12 15.75s2.25 1.009 2.25 2.25-1.009 2.25-2.25 2.25zM18.894 6.166a12.24 12.24 0 00-2.794-2.776c.128.485.239.971.311 1.465.986-.508 2.013-.873 3.09-1.059.334.508.61 1.047.823 1.607a14.223 14.223 0 00-1.43.738zM5.106 6.166a12.24 12.24 0 012.794-2.776 13.69 13.69 0 00-.311 1.465c-.986-.508-2.013-.873-3.09-1.059a10.225 10.225 0 00-.823 1.607c.495.177.986.385 1.43.738zM3.9 12c0-.961.137-1.889.386-2.777A14.97 14.97 0 002.2 12c0 1.488.217 2.928.62 4.291-.264-.9-.407-1.85-.407-2.83 0-1.097.164-2.158.47-3.168a14.956 14.956 0 01-2.138 3.168 14.953 14.953 0 002.138 3.169c-.306-1.01-.47-2.071-.47-3.169 0-.98.143-1.93.407-2.83A14.97 14.97 0 013.9 12zm16.2 0c0 .961-.137 1.889-.386 2.777.401-1.363.618-2.803.618-4.291 0-1.488-.217-2.928-.618-4.291.249.889.386 1.816.386 2.777 0 .98-.143 1.93-.407 2.83a14.956 14.956 0 012.138-3.168 14.953 14.953 0 00-2.138-3.169c.306 1.01.47 2.071.47 3.169 0 .98-.143 1.93-.407 2.83zM12 21a9 9 0 01-7.539-4.096C5.522 15.79 6.695 15 8 15s2.478.79 3.539 1.904A9 9 0 0112 21zm0-18a9 9 0 017.539 4.096C18.478 8.21 17.305 9 16 9s-2.478-.79-3.539-1.904A9 9 0 0112 3z"
        />
      </svg>
    ),
  },
  {
    title: "Sincronização na Nuvem",
    description:
      "Com o plano Online, suas ferramentas são sincronizadas na nuvem para acesso de qualquer dispositivo.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
    ),
  },
  {
    title: "Descrições Detalhadas",
    description:
      "Adicione descrições às suas ferramentas para lembrar para que serve cada uma delas.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    title: "Interface Intuitiva",
    description:
      "Design simples e intuitivo para que você encontre o que precisa rapidamente.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904"
        />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gray-50 dark:bg-gray-900/50 relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Funcionalidades
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              {" "}
              Incríveis
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubra como o ToolMaster PRO pode transformar a forma como você
            organiza e acessa suas ferramentas de trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 dark:border-gray-800 hover-card-effect"
            >
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-brandBlue/10 to-brandPurple/10 text-brandBlue dark:text-brandPurple mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
