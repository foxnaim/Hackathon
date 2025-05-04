import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/button/button'
import { Icons } from '../../ui/icons/Icons'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-deepViolet mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Анализ трендов рынка для стартапов
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Добро пожаловать в наш сервис! Мы анализируем огромные массивы данных, чтобы выявить самые перспективные ниши
        для старта вашего бизнеса.
      </motion.p>

      <motion.ul
        className="list-disc list-inside text-left text-gray-700 max-w-2xl mb-4 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <li>Увидеть, какие ниши стремительно набирают популярность.</li>
        <li>Понять, какие отрасли насыщены, а где есть пробелы на рынке.</li>
        <li>Получать автоматические отчёты с рекомендациями по стартапам.</li>
        <li>Анализировать поведение пользователей, тренды покупок и медиа.</li>
        <li>Получать прогнозы роста спроса на определённые услуги или товары.</li>
      </motion.ul>

      <motion.p
        className="text-gray-700 max-w-2xl text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Мы используем большие данные и машинное обучение, чтобы сократить ваши риски и дать вам чёткое понимание, где
        открывать новый бизнес.
      </motion.p>

      <Button
        variant="solid"
        icon={<Icons.login className="w-5 h-5" />}
        className="border-2 bg-gray-200 hover:bg-gray-300 text-background"
        onClick={handleClick}
      >
        Хочу воспользоваться
      </Button>
    </div>
  )
}

export default Home
