
"use client";

import { useSelector } from "react-redux";

export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-1000 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-black">Your Cart</h2>
        
        <button onClick={onClose} className="text-gray-600 text-xl">✖</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-4 border-b pb-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <p className="font-medium text-black">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm text-black font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t mt-4">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
