import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { Link } from 'react-router-dom'  

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают')
      return
    }


    setIsLoading(true)


    setTimeout(() => {
      console.log('Register:', { name, email, password })

      setIsLoading(false) 
    }, 2000) 
  }


  const isButtonDisabled = !name || !email || !password || !confirmPassword || password !== confirmPassword

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl flex justify-center font-bold mb-6 text-gray-900 ">
          Регистрация
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Имя
            </label>
            <Input
              type="text"
              icon="user"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Email
            </label>
            <Input
              type="email"
              icon="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Пароль
            </label>
            <Input
              type="password"
              icon="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Подтвердите пароль
            </label>
            <Input
              type="password"
              icon="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            variant="solid"
            disabled={isButtonDisabled || isLoading} 
            isLoading={isLoading} 
            className="w-full bg-[#4ade80] text-white" 
          >
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'} 
          </Button>
        </form>

       
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 ">
            У вас уже есть аккаунт?{' '}
            <Link to="/Login" className="text-blue-500 hover:underline">
              Войдите
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
