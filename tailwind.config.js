/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A1A1A', // глубокий тёмный фон
        text: '#D1D5DB',        // светло-серый текст
        primary: '#0057B8',     // глубокий неоновый синий (чуть темнее для солидности)
        secondary: '#8E44AD',   // кибер-фиолетовый
        accent: '#FF007F',      // неоновый розовый для акцентов
        success: '#2EE6A7',     // свежий мятный цвет
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0057B8, #8E44AD)',
      },
      fontSize: {
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem', // 14px
        'base': '1rem',   // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem',  // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
      },
      spacing: {
        '4': '1rem',      // 16px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
      },
      borderRadius: {
        'xl': '1rem',     // 16px
        '2xl': '1.5rem',  // 24px
      },
      boxShadow: {
        'card': '0 4px 14px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
