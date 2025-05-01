
import { Preferences } from '@capacitor/preferences';

// Types
export interface Tool {
  id: string;
  name: string;
  link: string;
  category: string;
  description?: string;
  logoUrl?: string;
  videoTutorial?: string; // Added field for video tutorial URL
}

// Default data
const defaultTools: Tool[] = [
  { 
    id: "1", 
    name: "Figma", 
    link: "https://figma.com", 
    category: "Design", 
    description: "Design and prototyping tool",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  },
  { 
    id: "2", 
    name: "Photoshop", 
    link: "https://adobe.com/photoshop", 
    category: "Design", 
    description: "Image editing software",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/640px-Adobe_Photoshop_CC_icon.svg.png"
  },
  { 
    id: "3", 
    name: "VS Code", 
    link: "https://code.visualstudio.com", 
    category: "Desenvolvimento", 
    description: "Code editor",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/640px-Visual_Studio_Code_1.35_icon.svg.png"
  },
  { 
    id: "4", 
    name: "Instagram", 
    link: "https://instagram.com", 
    category: "Social Media", 
    description: "Social media platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/640px-Instagram_logo_2016.svg.png"
  },
  { 
    id: "5", 
    name: "YouTube", 
    link: "https://youtube.com", 
    category: "Social Media", 
    description: "Video sharing platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png",
    videoTutorial: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

// Class to handle data storage operations using Capacitor Preferences
class LocalStorageService {
  private readonly TOOLS_KEY = 'toolmaster_tools';

  constructor() {
    this.initializeData();
  }

  // Initialize data if not already present
  private async initializeData() {
    const { value } = await Preferences.get({ key: this.TOOLS_KEY });
    if (!value) {
      await Preferences.set({
        key: this.TOOLS_KEY,
        value: JSON.stringify(defaultTools)
      });
    }
  }

  // Get all tools
  async getTools(): Promise<Tool[]> {
    const { value } = await Preferences.get({ key: this.TOOLS_KEY });
    return value ? JSON.parse(value) : [];
  }

  // Add a new tool
  async addTool(tool: Omit<Tool, 'id'>): Promise<Tool> {
    const newTool = {
      ...tool,
      id: Date.now().toString(),
    };
    
    const tools = await this.getTools();
    tools.push(newTool);
    await Preferences.set({
      key: this.TOOLS_KEY,
      value: JSON.stringify(tools)
    });
    
    return newTool;
  }

  // Update an existing tool
  async updateTool(tool: Tool): Promise<Tool> {
    const tools = await this.getTools();
    const index = tools.findIndex(t => t.id === tool.id);
    
    if (index !== -1) {
      tools[index] = tool;
      await Preferences.set({
        key: this.TOOLS_KEY,
        value: JSON.stringify(tools)
      });
    }
    
    return tool;
  }

  // Delete a tool
  async deleteTool(id: string): Promise<boolean> {
    const tools = await this.getTools();
    const filteredTools = tools.filter(tool => tool.id !== id);
    
    if (filteredTools.length !== tools.length) {
      await Preferences.set({
        key: this.TOOLS_KEY,
        value: JSON.stringify(filteredTools)
      });
      return true;
    }
    
    return false;
  }

  // Clear all tools (for testing)
  async clearTools(): Promise<void> {
    await Preferences.set({
      key: this.TOOLS_KEY,
      value: JSON.stringify([])
    });
  }

  // Reset to default tools
  async resetToDefaults(): Promise<Tool[]> {
    await Preferences.set({
      key: this.TOOLS_KEY,
      value: JSON.stringify(defaultTools)
    });
    return defaultTools;
  }

  // Export data as JSON string
  async exportData(): Promise<string> {
    const tools = await this.getTools();
    return JSON.stringify(tools, null, 2);
  }

  // Import data from JSON string
  async importData(jsonData: string): Promise<boolean> {
    try {
      const tools = JSON.parse(jsonData);
      await Preferences.set({
        key: this.TOOLS_KEY,
        value: JSON.stringify(tools)
      });
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const localStorageService = new LocalStorageService();
