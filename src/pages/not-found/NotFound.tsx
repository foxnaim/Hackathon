import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold text-gray-600"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl font-semibold mt-4"
      >
        Ой! Страница не найдена
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-2 text-gray-600"
      >
        Возможно, вы ошиблись адресом или страница была удалена.
      </motion.p>
      <motion.a
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 inline-block bg-gray-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-600 transition"
      >
        На главную
      </motion.a>
    </div>
  );
}

export default NotFound;
