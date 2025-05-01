
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, ChevronLeft, Download, Upload, RefreshCw } from "lucide-react";
import { localStorageService } from "@/services/LocalStorageService";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export default function Settings() {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState("json");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const handleExportData = async () => {
    try {
      setIsLoading(true);
      const toolsData = await localStorageService.exportData();
      
      let dataStr = toolsData;
      if (exportFormat === "csv") {
        const tools = JSON.parse(toolsData);
        dataStr = convertToCSV(tools);
      }
      
      // Save file to device
      const fileName = `toolmaster_export_${new Date().toISOString().slice(0, 10)}.${exportFormat}`;
      
      // Write the file first
      await Filesystem.writeFile({
        path: fileName,
        data: dataStr,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      
      toast({
        title: "Dados exportados",
        description: `Seus dados foram exportados para ${fileName} na pasta Documentos.`,
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const result = e.target?.result as string;
          let toolsData: string;
          
          if (file.name.endsWith('.json')) {
            // Validate JSON
            JSON.parse(result); // This will throw if invalid
            toolsData = result;
          } else if (file.name.endsWith('.csv')) {
            const tools = parseCSV(result);
            toolsData = JSON.stringify(tools);
          } else {
            throw new Error("Formato de arquivo não suportado");
          }
          
          // Save to storage
          await localStorageService.importData(toolsData);
          
          toast({
            title: "Dados importados",
            description: "Seus dados foram importados com sucesso. Atualize a página para ver as alterações.",
          });
        } catch (error) {
          console.error("Error processing import:", error);
          toast({
            title: "Erro na importação",
            description: "Ocorreu um erro ao importar os dados. Verifique o formato do arquivo.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      if (file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        toast({
          title: "Formato não suportado",
          description: "Por favor, importe arquivos JSON ou CSV.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
      
      // Reset the input
      event.target.value = '';
    } catch (error) {
      console.error("Error in import handler:", error);
      toast({
        title: "Erro na importação",
        description: "Ocorreu um erro ao processar o arquivo.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleResetData = async () => {
    try {
      setIsLoading(true);
      if (confirm("Tem certeza que deseja redefinir todos os dados para o padrão? Esta ação não pode ser desfeita.")) {
        await localStorageService.resetToDefaults();
        toast({
          title: "Dados redefinidos",
          description: "Seus dados foram redefinidos para o padrão.",
        });
      }
    } catch (error) {
      console.error("Error resetting data:", error);
      toast({
        title: "Erro ao redefinir dados",
        description: "Não foi possível redefinir os dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert tools to CSV
  const convertToCSV = (tools: any[]) => {
    if (tools.length === 0) return '';
    
    const headers = Object.keys(tools[0]).join(',');
    const rows = tools.map(tool => {
      return Object.values(tool).map(value => {
        if (typeof value === 'string') {
          // Escape quotes and wrap in quotes
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });
    
    return [headers, ...rows].join('\n');
  };

  // Helper function to parse CSV
  const parseCSV = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',');
      const obj: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1).replace(/""/g, '"');
        }
        obj[header] = value;
      });
      
      return obj;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link to="/dashboard">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <span className="text-xl font-bold">Configurações</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Settings sections */}
          <div className="space-y-10">
            {/* Local Storage Settings */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                <h2 className="text-xl font-bold">Armazenamento Local</h2>
              </div>
              
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Seus dados são armazenados localmente no dispositivo. Você pode exportar seus dados para uso posterior ou em outros dispositivos.
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoSave" className="font-medium">Auto Salvar</Label>
                    <p className="text-sm text-muted-foreground">
                      Salva automaticamente todas as alterações.
                    </p>
                  </div>
                  <Switch 
                    id="autoSave" 
                    checked={autoSaveEnabled} 
                    onCheckedChange={setAutoSaveEnabled}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={handleResetData} 
                    className="gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin mr-2">◌</span>
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Redefinir para Padrão
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Backup and Export */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Backup e Exportação</h2>
              
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exportFormat">Formato de exportação</Label>
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        id="json" 
                        name="exportFormat" 
                        value="json"
                        checked={exportFormat === "json"}
                        onChange={() => setExportFormat("json")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="json" className="cursor-pointer">JSON</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        id="csv" 
                        name="exportFormat" 
                        value="csv"
                        checked={exportFormat === "csv"}
                        onChange={() => setExportFormat("csv")}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="csv" className="cursor-pointer">CSV</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleExportData}
                    className="gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin mr-2">◌</span>
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Exportar Dados
                  </Button>
                  
                  <div className="relative">
                    <Input 
                      type="file" 
                      accept=".json,.csv" 
                      onChange={handleImport}
                      className="hidden" 
                      id="file-upload"
                      disabled={isLoading}
                    />
                    <Label htmlFor="file-upload" asChild>
                      <Button variant="outline" className="gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <span className="animate-spin mr-2">◌</span>
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Importar Backup
                      </Button>
                    </Label>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Os arquivos serão salvos na pasta Documentos do seu dispositivo.
                </p>
              </div>
            </section>
            
            {/* Appearance */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Aparência</h2>
              
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="font-medium">Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative o tema escuro para reduzir o cansaço visual.
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </section>
            
            {/* App Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Informações do Aplicativo</h2>
              
              <div className="bg-muted rounded-lg p-6 space-y-2">
                <div>
                  <Label className="font-medium">Versão</Label>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                
                <div>
                  <Label className="font-medium">Plataforma</Label>
                  <p className="text-sm text-muted-foreground">Desktop / Android</p>
                </div>
                
                <div>
                  <Label className="font-medium">Armazenamento</Label>
                  <p className="text-sm text-muted-foreground">Local (Arquivo)</p>
                </div>
              </div>
            </section>
            
            {/* Save button */}
            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? <span className="animate-spin mr-2">◌</span> : null}
                Salvar Configurações
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
