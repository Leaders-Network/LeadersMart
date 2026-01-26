'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '@/types';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateDeliveryService: (productId: string, deliveryService: any) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalDeliveryPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shophub_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [previousUser, setPreviousUser] = useState<any>(null);
  const { showToast } = useToast();
  const { user } = useAuth();

  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      setCart([]);
    }
  }, [user]); // Re-run when user changes

  // Clear cart when user logs out (but not on initial load)
  useEffect(() => {
    // If we had a user before and now we don't, it means they logged out
    if (previousUser && !user) {
      setCart([]);
      localStorage.removeItem(CART_STORAGE_KEY);
      showToast('Cart cleared after logout', 'info');
    }
    setPreviousUser(user);
  }, [user, previousUser, showToast]);

  // Save cart to localStorage and sync with MongoDB whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      
      // Sync with MongoDB if user is logged in
      if (user) {
        syncCartWithDB();
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart, user]);

  // Sync cart with MongoDB
  const syncCartWithDB = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem('shophub_auth_token');
      if (!token) return;

      // Map cart items to match the database schema
      const dbCartItems = cart.map(item => ({
        productId: item.id, // Map 'id' to 'productId'
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        vendorLocation: item.vendorLocation,
        selectedDeliveryService: item.selectedDeliveryService
      }));

      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items: dbCartItems }),
      });
    } catch (error) {
      console.error('Error syncing cart with database:', error);
    }
  };

  // Load cart from MongoDB when user logs in
  useEffect(() => {
    const loadCartFromDB = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem('shophub_auth_token');
        if (!token) return;

        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.cart && data.cart.items.length > 0) {
            // Map database items back to client format
            const clientCartItems = data.cart.items.map((item: any) => ({
              id: item.productId, // Map 'productId' back to 'id'
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity,
              vendorLocation: item.vendorLocation,
              selectedDeliveryService: item.selectedDeliveryService,
              // Add other Product fields that might be needed
              category: item.category || '',
              description: item.description || '',
              deliveryServices: item.deliveryServices || []
            }));
            setCart(clientCartItems);
          }
        }
      } catch (error) {
        console.error('Error loading cart from database:', error);
      }
    };

    loadCartFromDB();
  }, [user]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Updated ${product.name} quantity in cart!`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`${product.name} added to cart successfully!`, 'success');
      return [...prev, { 
        ...product, 
        quantity: 1, 
        selectedDeliveryService: product.deliveryServices?.[0]
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateDeliveryService = (productId: string, deliveryService: any) => {
    setCart((prev) =>
      prev.map((item) => 
        item.id === productId ? { ...item, selectedDeliveryService: deliveryService } : item
      )
    );
  };

  const clearCart = async () => {
    setCart([]);
    showToast('Cart cleared successfully!', 'info');
    
    // Clear cart in MongoDB if user is logged in
    if (user) {
      try {
        const token = localStorage.getItem('shophub_auth_token');
        if (token) {
          await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        }
      } catch (error) {
        console.error('Error clearing cart in database:', error);
      }
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDeliveryPrice = cart.reduce((sum, item) => 
    sum + (item.selectedDeliveryService?.price || 0) * item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        updateDeliveryService,
        clearCart, 
        totalItems, 
        totalPrice,
        totalDeliveryPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}