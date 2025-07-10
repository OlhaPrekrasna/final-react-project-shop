import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ButtonScrollToTop from './ui/ButtonScrollToTop/ButtonScrollToTop';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import ModalBlock from './components/ModalBlock/ModalBlock';
import ModalConnect from './components/ModalBlock/ModalConnect';

import HomePage from './pages/HomePage/Home';
import Categories from './pages/Categories/Categories';
import ProductsByCategorie from './pages/ProductsByCategorie/ProductsByCategorie';
import AllProducts from './pages/AllProducts/AllProducts';
import DiscountedProducts from './pages/DiscountedProducts/DiscountedProducts';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import NotFoundPage from './pages/NotFoundPage/NotFound';

import store from './redux/store';
import './App.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ButtonScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:categoryId" element={<ProductsByCategorie />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="discounted-products" element={<DiscountedProducts />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <ModalConnect />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;

