import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { sendCartData, fetchCartData } from './store/cart-actions';

import Notification from './components/UI/Notification';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

let isInitial = true;

const App = () => {
  // useSelect
  const { cartIsVisible, notification } = useSelector(state => state.ui);
  const cart = useSelector(state => state.cart);

  // Actions
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default App;
