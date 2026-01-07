import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./contexts/QueryProvider";
import HomePage from "./pages/HomePage";
import Menu from "./pages/Menu";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";

const App = () => {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-page" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </QueryProvider>
  );
};

export default App;
