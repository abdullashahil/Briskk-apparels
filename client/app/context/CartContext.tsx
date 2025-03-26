"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { toast } from "sonner";

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  toggleCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setHasHydrated(true)
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, hasHydrated])

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      const newCart = existingItem
        ? prevCart.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        : [...prevCart, { ...product, quantity }]
      
      // Show success toast
      toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to cart`)
      
      return newCart
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const removedItem = prevCart.find(item => item.id === productId)
      const newCart = prevCart.filter(item => item.id !== productId)
      
      if (removedItem) {
        toast.error(`${removedItem.name} removed from cart`)
      }
      
      return newCart
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])
  const toggleCart = () => setIsCartOpen(prev => !prev)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      toggleCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}