import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/userProfile/UserProfile";
import Layout from "./layout/Layout";
import { Amplify } from "aws-amplify";
import Product from "./pages/product/product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import { CartProvider } from "./context/CartContext";

Amplify.configure({
  Auth: {
    region: "us-west-2",
    userPoolId: "us-west-2_64B5fbzI1",
    userPoolWebClientId: "54dp5bot4bp6iqooh4m2k03k5f",
  },
});

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={<Layout />} />

        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
