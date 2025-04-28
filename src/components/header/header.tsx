import React from 'react';
import { motion } from 'framer-motion';
import { ItemMenu } from './data/Menu'; // Импортируем данные
import MenuItem from './MenuItem'; // Импортируем компонент меню

const Header: React.FC = () => {
  return (
    <div className='w-full h-auto'>
      <div className='w-2/3 mx-auto py-8 flex justify-between items-center'>
        <motion.h2 
          className='text-primary text-[2vw] font-bold' // Используем color из Tailwind
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Hackathon
        </motion.h2>

        <nav>
          <motion.ul 
            className='flex gap-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {ItemMenu.map((item, index) => (
              <MenuItem key={index} name={item.title} link={item.link} />
            ))}
          </motion.ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
