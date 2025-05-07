import { useState } from "react";
import Header from "../../components/header/header";
import ChatComponent from "../../components/ai/ChatComponent";
import Menu from "../../components/menu/Menu";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block w-1/4 lg:w-1/5 border-r border-gray-200">
        <Menu isOpen={true} onClose={() => {}} user={null} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 w-full">
          <Header onMenuClick={toggleMenu} />
        </div>
        
        <div className="flex-1 overflow-hidden px-2 sm:px-4 md:px-8 lg:px-16">
          <ChatComponent />
        </div>
      </div>

    </div>
  );
};

export default Home;

