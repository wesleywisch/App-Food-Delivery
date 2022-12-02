import { useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { MdShoppingBasket, MdDownloadDone } from "react-icons/md";

import NotFound from '../../assets/NotFound.svg';

import { useCart } from "../../hooks/useCart";

interface RowContainerProps {
  flag: boolean;
  scrollValue?: number;
  data: {
    id: string;
    name: string;
    desc: string;
    price: string;
    imgSrc: string;
    category: string;
    calories: string;
    amount: number;
  }[];
}

export function RowContainer({ flag, data, scrollValue }: RowContainerProps) {
  const { handleAddItemInCart, handleDeleteItemInCart, cartItems } = useCart();

  const rowContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rowContainer.current && scrollValue) {
      rowContainer.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${flag
        ? "overflow-x-scroll scrollbar-none"
        : "overflow-x-hidden flex-wrap justify-center"
        }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item.imgSrc}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {cartItems.find(i => i.id === item.id) ? (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => handleDeleteItemInCart(item)}
                >
                  <MdDownloadDone className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => handleAddItemInCart(item)}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              )}
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p title={item.name} className="text-textColor font-semibold text-base md:text-lg">
                {item.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="Not found" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
}