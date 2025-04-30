import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../../api/context'
import { Icons } from '../../ui/icons/Icons'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ошибка входа')
      }

      const data = await response.json()

      if (data.token) {
        Cookies.set('authorization', `Bearer ${data.token}`, { expires: 7 })
        alert('Успешный вход!')
        navigate('/dashboard') // Измени на нужный маршрут
      } else {
        throw new Error('Токен не получен')
      }
    } catch (error: any) {
      alert(error.message || 'Произошла ошибка при входе')
    } finally {
      setIsLoading(false)
    }
  }

  const isButtonDisabled = !email || !password

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl flex justify-center items-center font-bold mb-6 text-gray-900">
          Войти в аккаунт
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <Input
              type="password"
              icon="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="solid"
            isLoading={isLoading}
            icon={<Icons.user className="w-5 h-5 text-white" />}
            disabled={isButtonDisabled || isLoading}
            className="w-full bg-[#4ade80] text-white"
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Зарегистрируйтесь
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
