const HeaderInfo = () => {
  return (
    <header className="w-full  my-5 h-16">
      <div className="px-5 h-16 rounded-xl flex justify-between items-center shadow-2xl">
        <span className="text-3xl font-semibold">Nexora AI</span>
        <nav>
          <ul className="flex space-x-6 text-gray-600">
            <li>
              <a
                href="#about-us"
                className="transition-colors duration-300 hover:text-green-600"
              >
                О нас
              </a>
            </li>
            <li>
              <a
                href="#how-to-use"
                className="transition-colors duration-300 hover:text-green-600"
              >
               Как использовать
              </a>
            </li>
            <li>
              <a
                href="#problem-solving"
                className="transition-colors duration-300 hover:text-green-600"
              >
               Решение проблем
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderInfo;
