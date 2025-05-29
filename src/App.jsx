import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import Cart from './components/UI/Cart.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import Checkout from './components/UI/Checkout.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import './App.css';

function App() {

  return (
    <UserProgressContextProvider>
       <CartContextProvider>
       <Header/>
       <Meals />
       <Cart/>
       <Checkout/>
       </CartContextProvider>
   </UserProgressContextProvider>
  )
}

export default App ;
