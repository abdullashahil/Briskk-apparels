import { Product } from "../types/Product";

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`http://localhost:4000/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};