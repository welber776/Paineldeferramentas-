
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  PlusCircle, 
  Search, 
  Settings, 
  UserCircle, 
  LogOut, 
  Home, 
  LayoutDashboard, 
  FolderOpen,
  Menu,
  Database,
  Play
} from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { localStorageService, Tool } from "@/services/LocalStorageService";

export default function Dashboard() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTool, setNewTool] = useState({
    name: "",
    link: "",
    category: "",
    description: "",
    logoUrl: "",
    videoTutorial: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load tools from storage on component mount
  useEffect(() => {
    const loadTools = async () => {
      try {
        const storedTools = await localStorageService.getTools();
        setTools(storedTools);
      } catch (error) {
        console.error("Error loading tools:", error);
        toast({
          title: "Erro ao carregar ferramentas",
          description: "Não foi possível carregar suas ferramentas. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTools();
  }, [toast]);

  // Handle search
  const filteredTools = tools.filter(tool => 
    (selectedCategory ? tool.category === selectedCategory : true) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get unique categories
  const categories = [...new Set(tools.map(tool => tool.category))];

  // Group tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  const handleAddTool = async () => {
    if (newTool.name && newTool.link && newTool.category) {
      try {
        const addedTool = await localStorageService.addTool(newTool);
        setTools([...tools, addedTool]);
        setNewTool({
          name: "",
          link: "",
          category: "",
          description: "",
          logoUrl: "",
          videoTutorial: ""
        });
        setDialogOpen(false);
        
        toast({
          title: "Ferramenta adicionada",
          description: `${newTool.name} foi adicionada com sucesso.`
        });
      } catch (error) {
        console.error("Error adding tool:", error);
        toast({
          title: "Erro ao adicionar ferramenta",
          description: "Não foi possível adicionar a ferramenta. Tente novamente.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const toolToDelete = tools.find(tool => tool.id === id);
    try {
      await localStorageService.deleteTool(id);
      setTools(tools.filter(tool => tool.id !== id));
      
      toast({
        title: "Ferramenta removida",
        description: `${toolToDelete?.name} foi removida com sucesso.`
      });
    } catch (error) {
      console.error("Error deleting tool:", error);
      toast({
        title: "Erro ao remover ferramenta",
        description: "Não foi possível remover a ferramenta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleEditTool = async (editedTool: Tool) => {
    try {
      await localStorageService.updateTool(editedTool);
      setTools(tools.map(tool => 
        tool.id === editedTool.id ? editedTool : tool
      ));
      
      toast({
        title: "Ferramenta atualizada",
        description: `${editedTool.name} foi atualizada com sucesso.`
      });
    } catch (error) {
      console.error("Error updating tool:", error);
      toast({
        title: "Erro ao atualizar ferramenta",
        description: "Não foi possível atualizar a ferramenta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleResetToDefaults = async () => {
    try {
      const defaultTools = await localStorageService.resetToDefaults();
      setTools(defaultTools);
      
      toast({
        title: "Dados restaurados",
        description: "As ferramentas padrão foram restauradas."
      });
    } catch (error) {
      console.error("Error resetting tools:", error);
      toast({
        title: "Erro ao restaurar dados",
        description: "Não foi possível restaurar as ferramentas padrão. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Componente de sidebar de categorias para móvel
  const MobileCategoriesMenu = () => (
    <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu de categorias</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px]">
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-4">Categorias</h2>
          <div className="space-y-2">
            <Button 
              variant={selectedCategory === null ? "secondary" : "ghost"}
              className="w-full justify-start" 
              onClick={() => {
                setSelectedCategory(null);
                setIsMobileSidebarOpen(false);
              }}
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              Todas
            </Button>
            {categories.map((category) => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                className="w-full justify-start" 
                onClick={() => {
                  setSelectedCategory(category);
                  setIsMobileSidebarOpen(false);
                }}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2">
              <div className="flex items-center gap-2 py-2">
                <div className="rounded-md bg-primary/10 p-1">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-lg">ToolMaster PRO</div>
              </div>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link to="/dashboard">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings">
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleResetToDefaults}
                      tooltip="Restaurar dados padrão"
                    >
                      <Database className="w-4 h-4" />
                      <span>Redefinir dados</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Categorias</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setSelectedCategory(null)}
                      isActive={selectedCategory === null}
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>Todas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {categories.map((category) => (
                    <SidebarMenuItem key={category}>
                      <SidebarMenuButton 
                        onClick={() => setSelectedCategory(category)}
                        isActive={selectedCategory === category}
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>{category}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                <span className="text-sm font-medium">Usuário Local</span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/login">
                    <LogOut className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main content */}
        <SidebarInset>
          <div className="container py-6 px-4">
            <div className="flex flex-col gap-8">
              {/* Dashboard header */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MobileCategoriesMenu />
                  <div>
                    <h1 className="text-3xl font-bold">
                      {selectedCategory ? selectedCategory : "Todas as Ferramentas"}
                    </h1>
                    <p className="text-muted-foreground">
                      Gerencie todas as suas ferramentas de trabalho em um só lugar.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Buscar ferramenta..." 
                      className="pl-8 w-full md:w-[300px]" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Ferramenta</DialogTitle>
                        <DialogDescription>
                          Preencha os campos abaixo para adicionar uma nova ferramenta ao seu painel.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input 
                            id="name" 
                            value={newTool.name}
                            onChange={(e) => setNewTool({...newTool, name: e.target.value})} 
                            placeholder="Ex: Figma"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="link">Link</Label>
                          <Input 
                            id="link"
                            value={newTool.link} 
                            onChange={(e) => setNewTool({...newTool, link: e.target.value})}
                            placeholder="Ex: https://figma.com"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria</Label>
                          <Input 
                            id="category"
                            value={newTool.category}
                            onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                            placeholder="Ex: Design"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Descrição (opcional)</Label>
                          <Input 
                            id="description"
                            value={newTool.description}
                            onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                            placeholder="Breve descrição da ferramenta"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="logoUrl">URL do Logo (opcional)</Label>
                          <Input 
                            id="logoUrl"
                            value={newTool.logoUrl}
                            onChange={(e) => setNewTool({...newTool, logoUrl: e.target.value})}
                            placeholder="Ex: https://exemplo.com/logo.png"
                          />
                          <p className="text-xs text-muted-foreground">Cole o URL de uma imagem para usar como logo.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="videoTutorial">URL do Vídeo Tutorial (opcional)</Label>
                          <Input 
                            id="videoTutorial"
                            value={newTool.videoTutorial}
                            onChange={(e) => setNewTool({...newTool, videoTutorial: e.target.value})}
                            placeholder="Ex: https://youtube.com/watch?v=xxxxx"
                          />
                          <p className="text-xs text-muted-foreground">Cole o URL de um vídeo do YouTube para usar como tutorial.</p>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddTool}>Adicionar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Tools grid */}
              <div className="space-y-8">
                {Object.keys(groupedTools).length > 0 ? (
                  Object.entries(groupedTools).map(([category, categoryTools]) => (
                    <div key={category} className="space-y-4">
                      <h2 className="text-xl font-semibold">{category}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categoryTools.map(tool => (
                          <ToolCard 
                            key={tool.id} 
                            tool={tool} 
                            onDelete={handleDelete}
                            onEdit={handleEditTool}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-card">
                    <h3 className="text-lg font-medium">Nenhuma ferramenta encontrada</h3>
                    <p className="text-muted-foreground mt-1">
                      {searchQuery 
                        ? "Tente buscar com outros termos ou" 
                        : "Você ainda não adicionou nenhuma ferramenta."}
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => {
                        setSearchQuery("");
                        setDialogOpen(true);
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar Nova Ferramenta
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
