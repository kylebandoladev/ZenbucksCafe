import { useState } from "react";
import { X } from "lucide-react";
import { MenuItem } from "../constants";

interface CustomizeModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (customizedItem: CustomizedItem) => void;
}

export interface CustomizedItem extends MenuItem {
  customizations: {
    sugar: string;
    milk: string;
    size: string;
    ice: string;
    extras: string[];
  };
  totalCalories: number;
}

const CustomizeModal = ({ item, isOpen, onClose, onAddToOrder }: CustomizeModalProps) => {
  const [sugar, setSugar] = useState("Regular");
  const [milk, setMilk] = useState("Regular");
  const [size, setSize] = useState("Regular");
  const [ice, setIce] = useState("Regular");
  const [extras, setExtras] = useState<string[]>([]);

  if (!isOpen) return null;

  const baseCalories = item.calories;
  let totalCalories = baseCalories;

  // Calculate calories based on customizations
  if (sugar === "Less Sugar") totalCalories -= 20;
  if (sugar === "No Sugar") totalCalories -= 40;
  if (sugar === "Extra Sugar") totalCalories += 30;
  if (milk === "Oat Milk") totalCalories += 10;
  if (milk === "Almond Milk") totalCalories -= 20;
  if (milk === "Soy Milk") totalCalories += 5;
  if (size === "Large") totalCalories += 50;
  if (size === "Small") totalCalories -= 30;
  if (ice === "No Ice") totalCalories -= 5;
  if (ice === "Extra Ice") totalCalories += 5;
  extras.forEach(() => {
    totalCalories += 25;
  });

  // Ensure calories never go below 0
  totalCalories = Math.max(0, totalCalories);

  const handleExtraToggle = (extra: string) => {
    if (extras.includes(extra)) {
      setExtras(extras.filter((e) => e !== extra));
    } else {
      setExtras([...extras, extra]);
    }
  };

  const handleAddToOrder = () => {
    const customizedItem: CustomizedItem = {
      ...item,
      customizations: {
        sugar,
        milk,
        size,
        ice,
        extras,
      },
      totalCalories,
    };
    onAddToOrder(customizedItem);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blurred backdrop - no black overlay, just blur */}
      <div className="absolute inset-0 backdrop-blur-md" />
      
      {/* Modal content */}
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-end items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Item Info */}
          <div className="flex gap-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Base Calories</p>
                  <p className="text-xl font-bold text-gray-900">{baseCalories} cal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Calories</p>
                  <p className="text-xl font-bold text-green-600">{totalCalories} cal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-bold text-gray-900">{item.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            {/* Sugar Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Sugar Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["No Sugar", "Less Sugar", "Regular", "Extra Sugar"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSugar(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      sugar === option
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Milk Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["Regular", "Oat Milk", "Almond Milk", "Soy Milk"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setMilk(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      milk === option
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Small", "Regular", "Large"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSize(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      size === option
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Ice Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Ice Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["No Ice", "Regular", "Extra Ice"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setIce(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      ice === option
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Extras
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Whipped Cream", "Caramel Drizzle", "Chocolate Syrup", "Vanilla", "Cinnamon"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleExtraToggle(option)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      extras.includes(option)
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Calories</p>
            <p className="text-2xl font-bold text-green-600">{totalCalories} cal</p>
          </div>
          <button
            onClick={handleAddToOrder}
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;

