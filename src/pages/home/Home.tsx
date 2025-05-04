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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-deepViolet mb-6">
          Анализ трендов рынка для стартапов
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Сервис, который подсказывает перспективные ниши для открытия бизнеса на основании больших данных.
        </p>
        <Button
          variant="solid"
          icon={<Icons.login className="w-5 h-5" />}
          className="border-2 bg-gray-200 hover:bg-gray-300 text-background text-lg px-6 py-3"
          onClick={handleClick}
        >
          Начать анализ
        </Button>
      </motion.div>
    </div>
  )
}

export default Home
