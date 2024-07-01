import {create} from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  cartVisible: false,
  reset: () => set(() => ({cart: []})),
  toggle: (product) => set((state) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      return {
        cart: state.cart.filter((item) =>
          item.id !== product.id 
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }), 
  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  increaseQuantity: (productId) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  decreaseQuantity: (productId) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0),
  })),
  toggleCartVisibility: () => set((state) => ({
    cartVisible: !state.cartVisible,
  })),
}));


export default useCartStore;
