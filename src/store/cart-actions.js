import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

const url = 'https://test-9a22d-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json';

export const fetchCartData = () => async dispatch => {
  const fetchData = async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('fetch cart data failed');

    const resData = await res.json();

    return resData;
  };

  try {
    const cartData = await fetchData();
    dispatch(
      cartActions.replaceCartData({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'sending cart data failed',
      })
    );
  }
};

export const sendCartData = cart => {
  console.log('send');

  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'Loading...',
        title: 'Sending',
        message: 'sending cart data!',
      })
    );

    const sendRequest = async () => {
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!res.ok) throw new Error('sending cart data failed');
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'send cart data success',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'sending cart data failed',
        })
      );
    }
  };
};
