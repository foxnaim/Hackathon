import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {MenuItemProps} from '../../common.types';


const MenuItem: React.FC<MenuItemProps> = ({ name, link }) => {
  return (
    <Link to={link}>
      <motion.li 
        className="text-[20px] font-bold p-3 after:duration-300 hover:text-gray-800 duration-300 delay-300 hover:bg-white relative before:absolute before:h-1 before:w-0 hover:before:w-full before:bg-white before:duration-300 before:bottom-[50px] before:left-0 after:absolute after:h-1 after:bottom-0 after:right-0 after:w-0 hover:after:w-full after:bg-white cursor-pointer"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.li>
    </Link>
  );
};

export default MenuItem;
