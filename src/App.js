import logo from './logo.svg';
import './App.css';
import ProductListingPage from './Components/ProductListingPage';
import { Link, Route, Routes } from 'react-router-dom';
import { ShoppingCart } from './Components/ShoppingCart';

function App() {
  
  return (
    <>
    <Link to='/shopping-cart'></Link>
    <Link to='/'></Link>
    
      <Routes>
        <Route path='/'  element={<ProductListingPage/>}/>
        <Route path='/shopping-cart'  element={<ShoppingCart/>}/>
      </Routes>
      
    </>
  );
}

export default App;
