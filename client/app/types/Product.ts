export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    rating: Rating;
  }
  