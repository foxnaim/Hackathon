import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemDrop, titleDropDown } from './ItemDrop'; 
import { Icons } from '../../ui/icons/Icons';


const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        tabIndex={-1}
        whileFocus={{ scale: 1.02 }}
        whileTap={{ scale: 0.99 }}
        className="relative w-full"
      >
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-sm outline-none focus:border-indigo-500 transition flex items-center justify-between"
        >
          <span>{titleDropDown}</span>
          {isOpen ? <Icons.chevronUp className="w-5 h-5 ml-2 text-gray-400" /> : <Icons.chevronDown className="w-5 h-5 ml-2 text-gray-400" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} 
              transition={{ duration: 0.2 }}
              className="absolute z-10 mt-2 w-full bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden"
            >
              {ItemDrop.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 text-gray-900 text-sm hover:bg-gray-100 transition"
                >
                  {item.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default DropDown;
