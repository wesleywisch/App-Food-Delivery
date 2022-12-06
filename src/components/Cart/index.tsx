import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';

import { useCart } from '../../hooks/useCart';
import { useUser } from '../../hooks/useUser';

import EmptyCart from '../../assets/emptyCart.svg';

import { CartItem } from './CartItem';

export function Cart() {
  const { setShowCart, showCart, cartItems } = useCart();
  const { user, setUser } = useUser();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (acc, item) {
      return acc + item.amount * Number(item.price);
    }, 0);

    setTotalPrice(totalPrice);
  }, [cartItems]);

  function login() {
    if (!user?.displayName) {
      const userFakeTeste = {
        displayName: 'Wesley Wisch',
        email: 'wesley_wisch@hotmail.com',
        photoURL: 'https://github.com/wesleywisch.png',
        providerId: 'Google.com',
        uid: '7427483269bfjsdjlbfkjb238y482',
        admin: true,
      }

      setUser(userFakeTeste);
      console.log('Fazer essa funcionalidade')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[50]"
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => setShowCart(!showCart)}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl cursor-pointer" />
        </motion.div>

        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Items */}

            {cartItems && cartItems.length > 0 && cartItems.map((item, key) => (
              <CartItem
                key={key}
                item={item}
              />
            ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub total:</p>
              <p className="text-gray-400 text-lg">$ {totalPrice}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2" />

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ {totalPrice + 2.5}</p>
            </div>

            {user && user.displayName ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={login}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="Empty cart" className="w-300" />

          <p className="text-lg text-textColor font-semibold">
            Add some items to your cart.
          </p>
        </div>
      )}
    </motion.div>
  )
}