import { createContext, useContext, useReducer, useCallback } from 'react';
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
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

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

  const getTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }, [state.items]);

  const getSelectedItems = useCallback(() => {
    return state.items.filter(item => item.selected);
  }, [state.items]);

  const getSelectedItemsCount = useCallback(() => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  }, [getSelectedItems]);

  const getTotalPrice = useCallback(() => {
    return state.items.reduce((total, item) => {
      const price = item.price || item.currentPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [state.items]);

  const getSelectedTotalPrice = useCallback(() => {
    return getSelectedItems().reduce((total, item) => {
      const price = item.price || item.currentPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [getSelectedItems]);

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
      getTotalItems,
      getSelectedItems,
      getSelectedItemsCount,
      getTotalPrice,
      getSelectedTotalPrice,
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
