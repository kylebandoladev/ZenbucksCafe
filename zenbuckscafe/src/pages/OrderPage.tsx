import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import { CustomizedItem } from "../components/CustomizeModal";

// This would typically come from a context or state management
// For now, we'll use localStorage or create a simple state
const OrderPage = () => {
  // Get order items from localStorage or use empty array
  const [orderItems, setOrderItems] = useState<CustomizedItem[]>(() => {
    const saved = localStorage.getItem("orderItems");
    return saved ? JSON.parse(saved) : [];
  });

  const updateOrderItems = (items: CustomizedItem[]) => {
    setOrderItems(items);
    localStorage.setItem("orderItems", JSON.stringify(items));
  };

  const removeItem = (index: number) => {
    const newItems = orderItems.filter((_, i) => i !== index);
    updateOrderItems(newItems);
  };

  const updateQuantity = (index: number, change: number) => {
    const newItems = [...orderItems];
    // For simplicity, we'll just duplicate/remove items
    // In a real app, you'd have a quantity field
    if (change > 0) {
      newItems.splice(index + 1, 0, newItems[index]);
    } else {
      newItems.splice(index, 1);
    }
    updateOrderItems(newItems);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("₱", "").replace(",", ""));
      return total + price;
    }, 0);
  };

  const calculateTotalCalories = () => {
    return orderItems.reduce((total, item) => {
      return total + (item.totalCalories || item.calories);
    }, 0);
  };

  const getItemCount = () => {
    return orderItems.length;
  };

  return (
    <>
      <CustomerNavbar variant="light" />
      <div className="min-h-screen bg-gradient-to-br pt-5 from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/menu-page"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Order</h1>
                <p className="text-gray-600">
                  {getItemCount()} {getItemCount() === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">{getItemCount()}</span>
              </div>
            </div>
          </div>

          {orderItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start adding items from the menu</p>
              <Link
                to="/menu-page"
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2 space-y-4">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {item.totalCalories || item.calories} cal
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Customizations */}
                        {item.customizations && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {item.customizations.sugar !== "Regular" && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {item.customizations.sugar}
                                </span>
                              )}
                              {item.customizations.milk !== "Regular" && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {item.customizations.milk}
                                </span>
                              )}
                              {item.customizations.size !== "Regular" && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {item.customizations.size}
                                </span>
                              )}
                              {item.customizations.ice !== "Regular" && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {item.customizations.ice}
                                </span>
                              )}
                              {item.customizations.extras.map((extra, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                >
                                  {extra}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">
                            {item.price}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                              1
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">₱{calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service Charge</span>
                      <span className="font-semibold">₱0.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Total Calories</span>
                      <span className="font-semibold">{calculateTotalCalories()} cal</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        ₱{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors mb-4">
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/menu-page"
                    className="block text-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;

