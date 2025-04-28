import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center space-x-2"
      >
        <div className="w-8 h-8 border-t-4 border-accent border-solid rounded-full animate-spin"></div>
        <span className="text-text text-lg">Загрузка...</span> {/* Используем text-text для цвета текста */}
      </motion.div>
    </div>
  );
};

export default Loading;


// пример использования

// import { Loading } from "./components/loading/Loading"; // Путь к твоему компоненту

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   // Пример для имитации загрузки
//   setTimeout(() => {
//     setIsLoading(false);
//   }, 3000);

//   return (
//     <div>
//       {isLoading ? <Loading /> : <div>Контент загружен!</div>}
//     </div>
//   );
// };

// export default App;
