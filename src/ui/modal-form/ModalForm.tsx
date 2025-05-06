import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onSubmit: (data: { email: string; message: string }) => void;
  isOpen: boolean;
  onClose: () => void;
};

const ModalForm = ({ onSubmit, isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && message.trim()) {
      onSubmit({ email, message });
      setEmail("");
      setMessage("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-deepViolet">Оставьте пожелания</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <textarea
                placeholder="Ваше сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition duration-200"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition duration-200"
                >
                  Отправить
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalForm;
