import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'; 
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext'; 



function Header() {
  const CartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);

  const totalCartItems = CartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    UserProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="React logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
