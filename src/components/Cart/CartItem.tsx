import { motion } from 'framer-motion';
import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

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
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(action: 'add' | 'remove') {
    if (action === 'add') {
      setQuantity(quantity + 1)
    }

    if (action === 'remove') {
      if (quantity === 0) {
        return quantity
      }

      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="w-full p-1 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item.imgSrc}
        alt={item.name}
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">$ {parseFloat(item.price) * quantity}</p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <BiMinus className="text-gray-50" onClick={() => updateQuantity('remove')} />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">{quantity}</p>

        <motion.div whileTap={{ scale: 0.75 }}>
          <BiPlus className="text-gray-50" onClick={() => updateQuantity('add')} />
        </motion.div>
      </div>
    </div>
  )
}