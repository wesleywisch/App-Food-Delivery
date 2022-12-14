import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    desc: string;
    price: string;
    imgSrc: string;
    category: string;
    calories: string;
    amount: number;
  }
}

export function CartItem({ item }: CartItemProps) {
  const { handleUpdateQuantity, handleDeleteItemInCart } = useCart();

  return (
    <div className="w-full p-1 rounded-lg bg-cartItem flex items-center gap-2 relative">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item.imgSrc}
        alt={item.name}
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">$ {parseFloat(item.price) * item.amount}</p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <BiMinus className="text-gray-50" onClick={() => handleUpdateQuantity(item, 'remove')} />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">{item.amount}</p>

        <motion.div whileTap={{ scale: 0.75 }}>
          <BiPlus className="text-gray-50" onClick={() => handleUpdateQuantity(item, 'add')} />
        </motion.div>
      </div>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer bg-red-500 p-1"
        onClick={() => handleDeleteItemInCart(item)}
      >
        <MdDelete className="text-white w-full h-full" />
      </motion.div>
    </div>
  )
}