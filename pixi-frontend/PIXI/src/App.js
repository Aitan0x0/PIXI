
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import CategoryGames from "./pages/category/CategoryGames";
import GameReadmore from "./pages/readmore/GameReadmore";
import PopularGames from "./pages/popular/PopularGames";
import FreeGames from "./pages/free/FreeGames";
import Login from "./pages/login-register/Login";
import SignUp from "./pages/login-register/SignUp";
import DiscountedGames from "./pages/discounted/DiscountedGames";
import Profile from "./pages/profile/Profile";
import Wishlist from "./pages/profile/Wishlist";
import Library from "./pages/profile/Library";
import Settings from "./pages/profile/Settings";
import ProfileLayout from "./components/ProfileLayout";
import UserProvider from "./UserContext";
import WishlistProvider from "./WishlistContext";
import Cart from "./components/Cart";
import { LibraryContext, LibraryProvider } from "./LibraryContext";
import CartProvider from "./CartContext";
import AdminLayout from "./admin/AdminLayout";
import AdminStatistics from "./admin/AdminStatistics";
import AdminUsers from "./admin/AdminUsers";
import AdminCats from "./admin/AdminCats";
import AdminOrders from "./admin/AdminOrders";
import AdminSettings from "./admin/AdminSettings";
import AdminGames from "./admin/AdminGames";
import AdminUserForm from "./admin/AdminUserForm";
import AdminGameForm from "./admin/AdminGameForm";
import AdminCatForm from "./admin/AdminCatForm";
import AdminOrderInfo from "./admin/AdminOrderInfo";



function App() {
  return (
<LibraryProvider>
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route index element={<Login />} />

              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/category/:id" element={<CategoryGames />} />
                <Route path="/game/:id" element={<GameReadmore />} />
                <Route path="/freegames" element={<FreeGames />} />
                <Route path="/discountedgames" element={<DiscountedGames />} />
                <Route path="/populargames" element={<PopularGames />} />
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route index element={<Profile />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="library" element={<Library />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>
              <Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="statistics" element={<AdminStatistics />} />
                <Route path="users" element={<AdminUsers />} />
               <Route path="user/add" element={<AdminUserForm mode="add"/>}/>
               <Route path="user/edit/:id" element={<AdminUserForm mode="edit"/>}/>
               <Route path="game/add" element={<AdminGameForm mode="add"/>}/>
               <Route path="game/edit/:id" element={<AdminGameForm mode="edit"/>}/>
                <Route path="categories" element={<AdminCats />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="order/info/:id" element={<AdminOrderInfo />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="games" element={<AdminGames />} />
                <Route path="cat/edit/:id" element={<AdminCatForm mode="edit"/>}/>
                <Route path="cat/add" element={<AdminCatForm mode="add"/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
</LibraryProvider>

  );
}

export default App;
