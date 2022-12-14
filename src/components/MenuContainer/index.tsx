import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoFastFood } from 'react-icons/io5';

import { categories } from '../../utils/categories';
import { RowContainer } from '../RowContainer';

// Database fake enquanto não conecto no banco de dados.
import { FoodsItemsDatabase } from '../../utils/FoodsItemsDatabase';

export function MenuContainer() {
  const [filterCategory, setFilterCategory] = useState('chicken');

  return (
    <section id="menu" className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories && categories.map((category, key) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={key}
              className={`group ${filterCategory === category.urlParamName ? 'bg-cartNumBg' : 'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
              onClick={() => setFilterCategory(category.urlParamName)}
            >
              <div className={`w-10 h-10 rounded-full shadow-lg ${filterCategory === category.urlParamName ? 'bg-white' : 'bg-cartNumBg'} group-hover:bg-white flex items-center justify-center`}>
                <IoFastFood className={`${filterCategory === category.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`} />
              </div>

              <p className={`text-sm ${filterCategory === category.urlParamName ? 'text-white' : 'text-textColor'} group-hover:text-white`}>{category.name}</p>
            </motion.div>
          ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={FoodsItemsDatabase.filter(i => i.category === filterCategory)}
          />
        </div>
      </div>
    </section>
  );
}