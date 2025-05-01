
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link2, MoreVertical, Pencil, Trash2, Image, Play } from "lucide-react";
import { Tool } from "@/services/LocalStorageService";

interface ToolCardProps {
  tool: Tool;
  onDelete: (id: string) => void;
  onEdit?: (tool: Tool) => void;
}

export function ToolCard({ tool, onDelete, onEdit }: ToolCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [editedTool, setEditedTool] = useState<Tool>(tool);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(editedTool);
    }
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(tool.id);
    setIsDeleteDialogOpen(false);
  };

  const getDefaultLogoUrl = (name: string) => {
    // Fallback para uma imagem genérica quando não há logoUrl
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true&size=128`;
  };

  const getVideoEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Convert YouTube URLs to embed format
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    } 
    
    // Convert YouTube short URLs
    if (url.includes('youtu.be')) {
      const videoId = url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20">
        <CardHeader className="pb-2 flex flex-row justify-between items-start space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-primary/10">
              {tool.logoUrl ? (
                <img 
                  src={tool.logoUrl} 
                  alt={`${tool.name} logo`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback para avatar se a imagem falhar
                    (e.target as HTMLImageElement).src = getDefaultLogoUrl(tool.name);
                  }}
                />
              ) : (
                <img 
                  src={getDefaultLogoUrl(tool.name)}
                  alt={`${tool.name} avatar`}
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            <CardTitle className="text-lg font-semibold truncate pr-6">
              {tool.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        
        <CardContent>
          {tool.description && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{tool.description}</p>
          )}
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {tool.category}
            </span>
            {tool.videoTutorial && (
              <span 
                className="inline-flex items-center ml-2 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-500 cursor-pointer"
                onClick={() => setIsVideoDialogOpen(true)}
              >
                <Play className="h-3 w-3 mr-1" />
                Tutorial
              </span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-row gap-2">
          <Button 
            variant="outline" 
            className="flex-1 gap-2 hover:bg-primary/10" 
            asChild
          >
            <a href={tool.link} target="_blank" rel="noopener noreferrer">
              <Link2 className="h-4 w-4" />
              Acessar
            </a>
          </Button>
          {tool.videoTutorial && (
            <Button 
              variant="outline" 
              className="gap-2 hover:bg-red-500/10" 
              onClick={() => setIsVideoDialogOpen(true)}
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ferramenta</DialogTitle>
            <DialogDescription>
              Atualize os detalhes da ferramenta.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome</Label>
              <Input 
                id="edit-name" 
                value={editedTool.name}
                onChange={(e) => setEditedTool({...editedTool, name: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-link">Link</Label>
              <Input 
                id="edit-link"
                value={editedTool.link} 
                onChange={(e) => setEditedTool({...editedTool, link: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Input 
                id="edit-category"
                value={editedTool.category}
                onChange={(e) => setEditedTool({...editedTool, category: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição (opcional)</Label>
              <Input 
                id="edit-description"
                value={editedTool.description || ""}
                onChange={(e) => setEditedTool({...editedTool, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-logo-url">URL do Logo (opcional)</Label>
              <Input 
                id="edit-logo-url"
                value={editedTool.logoUrl || ""}
                onChange={(e) => setEditedTool({...editedTool, logoUrl: e.target.value})}
                placeholder="https://exemplo.com/logo.png"
              />
              <p className="text-xs text-muted-foreground">Cole o URL de uma imagem para usar como logo.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-video-tutorial">URL do Vídeo Tutorial (opcional)</Label>
              <Input 
                id="edit-video-tutorial"
                value={editedTool.videoTutorial || ""}
                onChange={(e) => setEditedTool({...editedTool, videoTutorial: e.target.value})}
                placeholder="https://youtube.com/watch?v=xxxxx"
              />
              <p className="text-xs text-muted-foreground">Cole o URL de um vídeo do YouTube para usar como tutorial.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a ferramenta <strong>{tool.name}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Tutorial Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Video Tutorial: {tool.name}</DialogTitle>
          </DialogHeader>
          
          <div className="aspect-video w-full mt-2">
            {tool.videoTutorial && (
              <iframe
                src={getVideoEmbedUrl(tool.videoTutorial)}
                className="w-full h-full"
                title={`${tool.name} tutorial`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsVideoDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
