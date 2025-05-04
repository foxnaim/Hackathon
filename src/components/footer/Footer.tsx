import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full mt-20 py-6 bg-white rounded-xl px-5"
      style={{ boxShadow: '0 -10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-800">
          Nexora AI — твой ассистент по стартапам: меньше риска, больше точности.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
