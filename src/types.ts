export interface BOMItem {
  id: string;
  component: string;
  description: string;
  material: string;
  function: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  badge: string;
  specs: {
    type: string;
    operation: string;
    pressureClass: string;
    sizeRange: string;
    endConnection: string;
    testing: string;
    [key: string]: string;
  };
  bom: BOMItem[];
  visualType: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export type PageId = 'home' | 'about' | 'products' | 'services' | 'contact';
