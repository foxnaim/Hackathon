import { useState } from "react";
import HeaderInfo from "../../components/header/header-info/HeaderInfo";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import ModalForm from "../../ui/modal-form/ModalForm";

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSubmit = (data: { email: string; message: string }) => {
  };
  return (
    <div className="px-5 md:px-10">
      <header className="fixed top-0 left-0 w-full z-50 px-5 md:px-10 backdrop-blur-md">
        <HeaderInfo />
      </header>
      <main className="px-10">
        <section className="flex flex-col md:flex-row my-28 md:my-56">
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              Nexora AI — твой ассистент по стартапам
            </h1>
            <p className="text-base md:text-lg my-5">
              С помощью Nexora AI вы узнаете, какие ниши растут, где рынок
              перенасыщен, а где есть неиспользованные возможности. Мы
              используем большие данные и машинное обучение, чтобы дать вам
              чёткие рекомендации для запуска успешного бизнеса.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-green-400 hover:bg-green-500 py-2 px-6 rounded-lg border-2 border-gray-300 duration-200 mb-4"
              onClick={() => navigate("/login")}
            >
              Присоединиться
            </motion.button>
            
          
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center"
          >
            {/* Placeholder for image or graphic */}
            <div className="w-64 h-64 bg-gray-300 rounded-full"></div>
          </motion.aside>
        </section>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="border-2 mt-32 md:mt-80"
        />
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-10"
        >
          <span
            id="about-us"
            className="flex justify-center mt-3 text-xl md:text-2xl font-bold"
          >
            Что такое Nexora AI?
          </span>
          <div className="mt-4 w-full md:w-2/3 lg:w-1/2 mx-auto text-center">
            <p className="text-base md:text-lg">
              Nexora AI — это ваш интеллектуальный помощник для поиска и запуска
              стартапов. Мы анализируем огромные массивы данных, чтобы выявлять
              тренды, пробелы и перспективные ниши на рынке. Наша цель — помочь
              вам запускать бизнесы быстрее, точнее и с меньшими рисками.
            </p>
          </div>

          <motion.span
            className="flex font-bold mt-8 text-lg md:text-xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Чем помогает Nexora AI?
          </motion.span>

          <motion.ol
            className="list-decimal list-inside text-base md:text-lg w-full md:w-2/3 lg:w-1/3 space-y-3 mt-4 leading-relaxed text-left mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <li>
              <span className="font-semibold">Показывает,</span> какие ниши
              активно растут и где сосредоточен высокий спрос.
            </li>
            <li>
              <span className="font-semibold">Помогает избежать,</span>
              перенасыщенных рынков, чтобы вы не тратили ресурсы зря.
            </li>
            <li>
              <span className="font-semibold">Предлагает идеи,</span> продуктов
              и услуг, основанные на анализе Big Data.
            </li>
            <li>
              <span className="font-semibold">Автоматически формирует,</span>
              отчёты с рекомендациями и прогнозами.
            </li>
            <li>
              <span className="font-semibold">Дает доступ,</span> к инсайдам о
              поведении аудитории, трендах покупок и медиа.
            </li>
          </motion.ol>

          <motion.span
            className="flex font-bold mt-8 text-lg md:text-xl mb-4 justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Почему это полезно?
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="list-disc list-inside text-base md:text-lg w-full md:w-2/3 lg:w-1/3 space-y-3 mt-4 leading-relaxed text-left ml-auto">
              <li>
                <span className="font-semibold">Экономия времени:</span> вам не
                нужно вручную исследовать рынок — ИИ делает это за вас.
              </li>
              <li>
                <span className="font-semibold">Снижение рисков:</span> вы
                запускаете стартап, опираясь на данные, а не на догадки.
              </li>
              <li>
                <span className="font-semibold">Быстрый старт:</span> получаете
                конкретные рекомендации и прогнозы, готовые к действию.
              </li>
              <li>
                <span className="font-semibold">
                  Преимущество над конкурентами:
                </span>{" "}
                узнаёте о трендах раньше других.
              </li>
            </ul>
          </motion.div>
        </motion.section>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="border-2 mt-32 md:mt-80"
        />

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            id="how-to-use"
            className="flex justify-center mt-5 text-2xl md:text-3xl font-bold"
          >
            Как использовать Nexora AI?
          </span>
          <div className="flex flex-col md:flex-row mt-10 space-x-0 md:space-x-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <ol className="list-decimal list-inside space-y-6">
                <li>
                  <strong>Зарегистрируйтесь</strong>
                  <p>
                    Создайте бесплатный аккаунт, чтобы получить доступ к панели
                    инструментов.
                  </p>
                </li>
                <li>
                  <strong>Выберите интересующую вас сферу</strong>
                  <p>
                    Например: финтех, e-commerce, здоровье, образование — или
                    введите свои ключевые слова.
                  </p>
                </li>
                <li>
                  <strong>Получите анализ трендов</strong>
                  <p>
                    Мы покажем, какие ниши растут, где есть пробелы и что
                    прогнозируется на ближайшее будущее.
                  </p>
                </li>
              </ol>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <ol start={4} className="list-decimal list-inside space-y-6">
                <li>
                  <strong>Изучите рекомендации</strong>
                  <p>
                    Сервис сгенерирует конкретные советы и идеи для запуска
                    стартапа.
                  </p>
                </li>
                <li>
                  <strong>Начните действовать</strong>
                  <p>
                    Создайте бесплатный аккаунт, чтобы получить доступ к панели
                    инструментов.
                  </p>
                </li>
              </ol>
            </motion.div>
          </div>
        </motion.section>
        <div className="border-2 mt-32 md:mt-80"/>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Помогите нам стать лучше
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Мы постоянно работаем над улучшением Nexora AI. Ваши идеи и предложения 
            помогут нам сделать сервис еще более полезным для предпринимателей. 
            Поделитесь своими мыслями о том, как мы можем стать лучше.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="bg-green-400 hover:bg-green-500 py-2 px-6 rounded-lg border-2 border-gray-300 duration-200 mb-4"
            onClick={handleModalOpen}
          >
            Оставить пожелания
          </motion.button>
        </motion.section>
        <Footer />
      </main>
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      
      />
    </div>
  );
};

export default Home;
