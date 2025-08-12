export interface TechStackItem {
  name: string;
  category: 'skills' | 'tools';
  svgPath: string;
  viewBox?: string;
  title?: string;
}

export interface TechStackData {
  skills: TechStackItem[];
  tools: TechStackItem[];
}