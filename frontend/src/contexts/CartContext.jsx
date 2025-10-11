import { createContext, useContext, useReducer, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Tạo unique ID cho mỗi item được thêm vào giỏ
      const newItem = {
        ...action.payload,
        cartItemId: Date.now() + Math.random(), // Unique ID
        quantity: 1,
        selected: true // Mặc định được chọn
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartItemId !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'TOGGLE_SELECTION':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartItemId === action.payload
            ? { ...item, selected: !item.selected }
            : item
        ),
      };
    case 'SELECT_ALL':
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: true })),
      };
    case 'UNSELECT_ALL':
      return {
        ...state,
        items: state.items.map(item => ({ ...item, selected: false })),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'REMOVE_SELECTED':
      return {
        ...state,
        items: state.items.filter(item => !item.selected),
      };
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Initialize with empty cart
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load user's cart when user changes or becomes authenticated
  useEffect(() => {
    if (user?.id && isAuthenticated) {
      const cartKey = `cart_${user.id}`;
      try {
        const savedCart = localStorage.getItem(cartKey);
        const cartData = savedCart ? JSON.parse(savedCart) : { items: [] };
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading user cart:', error);
        dispatch({ type: 'CLEAR_CART' });
      }
    } else if (!isAuthenticated) {
      // Clear cart when user logs out
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user?.id, isAuthenticated]);

  // Save cart to localStorage whenever state changes (only when user is authenticated)
  useEffect(() => {
    if (user?.id && isAuthenticated && state.items.length > 0) {
      const cartKey = `cart_${user.id}`;
      try {
        localStorage.setItem(cartKey, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state, user?.id, isAuthenticated]);

  const addToCart = useCallback((product) => {
    if (!isAuthenticated) {
      throw new Error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [isAuthenticated]);

  const removeFromCart = useCallback((cartItemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartItemId });
  }, []);

  const updateQuantity = useCallback((cartItemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } });
  }, []);

  const toggleSelection = useCallback((cartItemId) => {
    dispatch({ type: 'TOGGLE_SELECTION', payload: cartItemId });
  }, []);

  const selectAll = useCallback(() => {
    dispatch({ type: 'SELECT_ALL' });
  }, []);

  const unselectAll = useCallback(() => {
    dispatch({ type: 'UNSELECT_ALL' });
  }, []);

  const removeSelected = useCallback(() => {
    dispatch({ type: 'REMOVE_SELECTED' });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const clearUserCart = useCallback((userId) => {
    if (userId) {
      const cartKey = `cart_${userId}`;
      localStorage.removeItem(cartKey);
    }
  }, []);

  // Memoized computed values for better performance
  const totalItems = useMemo(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const selectedItems = useMemo(() => {
    return state.items.filter(item => item.selected);
  }, [state.items]);

  const selectedItemsCount = useMemo(() => {
    return selectedItems.reduce((total, item) => total + item.quantity, 0);
  }, [selectedItems]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((total, item) => {
      const price = item.price || item.currentPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [state.items]);

  const selectedTotalPrice = useMemo(() => {
    return selectedItems.reduce((total, item) => {
      const price = item.price || item.currentPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [selectedItems]);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelection,
      selectAll,
      unselectAll,
      removeSelected,
      clearCart,
      clearUserCart,
      totalItems,
      selectedItems,
      selectedItemsCount,
      totalPrice,
      selectedTotalPrice,
      isAuthenticated,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
