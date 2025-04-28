import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MenuItemProps } from '../../common.types';

const MenuItem: React.FC<MenuItemProps> = ({ name, link }) => {
  return (
    <Link to={link}>
      <motion.li
        className="text-lg font-medium px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white transition-all duration-300"
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
