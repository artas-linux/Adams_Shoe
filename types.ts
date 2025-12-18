
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Performance' | 'Lifestyle' | 'Limited';
  image: string;
  description: string;
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: number;
}

export type ViewState = 'shop' | 'customizer' | 'cart';
