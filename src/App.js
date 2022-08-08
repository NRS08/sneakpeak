import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Trending } from './components/Trending/Trending';
import Home from './components/Home';
import Footer from './components/Footer';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Products } from './components/Products/Products';
import { Cart } from './components/Cart/Cart';
import { Product } from './components/Product';
import Admin from './components/Admin/Admin';
import { AdminLogin } from './components/AdminLogin';
import Checkout from './components/Checkout/Checkout';
import Confirmed from './components/Checkout/confirmed';
import Order from './components/Orders/Order';
import Orders from './components/Admin/Orders';
import AdminProducts from './components/Admin/Products';
import { Routes, Route } from 'react-router-dom';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  React.useEffect(() => {
    document.title = 'SneakPeak';
  });
  return (
    <div className="body">
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmed" element={<Confirmed />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
