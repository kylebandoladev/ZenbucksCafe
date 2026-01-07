import { useState, useMemo } from "react";
import { Star, Clock, Search } from "lucide-react";
import CustomerNavbar from "../components/CustomerNavbar";
import Chatbot from "../components/Chatbot";
import CustomizeModal, { CustomizedItem } from "../components/CustomizeModal";
import { menuCategories, allMenuItems, MenuItem } from "../constants";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [customizeItem, setCustomizeItem] = useState<MenuItem | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Filter items based on category, subcategory, and search query
  const filteredItems = useMemo(() => {
    let items = allMenuItems.filter((item) => item.category === activeCategory);

    // Filter by subcategory if selected
    if (activeSubcategory) {
      items = items.filter((item) => item.subcategory === activeSubcategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, activeSubcategory, searchQuery]);
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null); // Reset subcategory when category changes
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory);
  };

  const handleCustomizeClick = (item: MenuItem) => {
    setCustomizeItem(item);
    setIsCustomizeOpen(true);
  };

  const handleAddToOrder = (item: MenuItem) => {
    // Create a basic customized item with default values
    const customizedItem: CustomizedItem = {
      ...item,
      customizations: {
        sugar: "Regular",
        milk: "Regular",
        size: "Regular",
        ice: "Regular",
        extras: [],
      },
      totalCalories: item.calories,
    };
    const existingItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
    const updatedItems = [...existingItems, customizedItem];
    localStorage.setItem("orderItems", JSON.stringify(updatedItems));
    setSelectedItem(null);
  };

  const handleCustomizedAddToOrder = (customizedItem: CustomizedItem) => {
    const existingItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
    const updatedItems = [...existingItems, customizedItem];
    localStorage.setItem("orderItems", JSON.stringify(updatedItems));
    setSelectedItem(null);
  };

  return (
    <>
      <CustomerNavbar variant="light" />
      <section className="pt-22">
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
          <div className="flex">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-gray-200 min-h-screen shadow-sm">
              <div className="p-8">
                {menuCategories.map((category) => (
                  <div key={category.id} className="mb-10 ">
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`text-xl font-bold mb-6 block  transition-all duration-200 relative ${
                        activeCategory === category.id
                          ? "text-gray-900"
                          : "text-gray-700 hover:text-black"
                      }`}
                    >
                      {category.name}
                      {activeCategory === category.id && (
                        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gray-900 rounded-full" />
                      )}
                    </button>
                    <ul className="space-y-4 pl-4">
                      {category.subcategories.map((sub, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSubcategoryClick(sub)}
                            className={`text-gray-600 hover:text-black text-left text-base transition-all duration-200 hover:translate-x-2 font-medium relative cursor-pointer ${
                              activeSubcategory === sub
                                ? "text-gray-900 font-semibold"
                                : ""
                            }`}
                          >
                            {sub}
                            {activeSubcategory === sub && (
                              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-gray-700 rounded-full" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 bg-white ml-8 mr-8 mt-8 mb-8 rounded-3xl shadow-md">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                      Menu
                    </h1>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">
                      Available Items
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {filteredItems.length}
                    </p>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search menu items..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 text-black placeholder:text-gray-400"
                  />
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                    {filteredItems.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setSelectedItem(
                            selectedItem === item.name ? null : item.name
                          )
                        }
                        className={`flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 cursor-pointer  ${
                          selectedItem === item.name
                            ? "bg-gray-50 border-gray-300 shadow-lg scale-[1.02]"
                            : "hover:bg-gray-50 border-gray-200 hover:shadow-lg hover:scale-[1.01]"
                        }`}
                      >
                        <div className="relative">
                          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg transition-all duration-300">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          {item.popular && (
                            <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              Popular
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-amber-800 transition-colors duration-200">
                              {item.name}
                            </h3>
                            <span className="text-2xl font-bold text-gray-900 ml-4">
                              {item.price}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{item.prepTime}</span>
                          </div>

                          {selectedItem === item.name && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToOrder(item);
                                    }}
                                    className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
                                  >
                                    Add to Order
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCustomizeClick(item);
                                    }}
                                    className="text-gray-900 px-4 py-2 rounded-full border font-semibold hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    Customize
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-xl text-gray-600 font-medium">
                    No items found
                  </p>
                  <p className="text-gray-500 mt-2">
                    {searchQuery
                      ? "Try adjusting your search or filters"
                      : "Select a category to view items"}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-gray-900 hover:text-black underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
      <Chatbot />
      {customizeItem && (
        <CustomizeModal
          item={customizeItem}
          isOpen={isCustomizeOpen}
          onClose={() => {
            setIsCustomizeOpen(false);
            setCustomizeItem(null);
          }}
          onAddToOrder={handleCustomizedAddToOrder}
        />
      )}
    </>
  );
};

export default MenuPage;
