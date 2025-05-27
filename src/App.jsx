import { UserProgressContextProvider } from './store/UserProgressContext';
import { CartContextProvider } from './store/CartContext';
import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/UI/Cart';
import './App.css';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
