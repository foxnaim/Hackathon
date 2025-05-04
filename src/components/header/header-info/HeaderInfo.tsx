const HeaderInfo = () => {
  return (
    <header className="w-full px-10 my-5 h-16">
      <div className="px-5 h-16 rounded-xl flex justify-between items-center shadow-2xl">
        <span className="text-3xl font-semibold">Nexora AI</span>
        <nav>
          <ul className="flex space-x-6 text-gray-600">
            <li>
              <a
                href="#about-us"
                className="transition-colors duration-300 hover:text-green-600"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#how-to-use"
                className="transition-colors duration-300 hover:text-green-600"
              >
                How to use
              </a>
            </li>
            <li>
              <a
                href="#problem-solving"
                className="transition-colors duration-300 hover:text-green-600"
              >
                Problem solving
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderInfo;
