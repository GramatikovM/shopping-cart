import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />}></Route>
        <Route path="/cart-page" element={<CartPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
