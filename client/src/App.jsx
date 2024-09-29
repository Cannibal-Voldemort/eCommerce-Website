import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthSignup from "./pages/auth/signup";
import AdminLayout from "./components/admin/layout";
import AdminProduct from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminDashboard from "./pages/admin-view/dashboard";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import Account from "./pages/shopping-view/accout";
import Checkout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ItemsListing from "./pages/shopping-view/items";

function App() {
  return (
    <div>
      <Routes>
        {/* nesting is done to /auth to get the children routes*/}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignup />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
          <Route path="/shop" element={<ShoppingLayout/>}>
          <Route path="account" element={<Account/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="items" element={<ItemsListing/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
