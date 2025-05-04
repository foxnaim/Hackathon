import Header from "../../components/header/header";
import ChatComponent from "../../components/ai/ChatComponent";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10 w-full">
        <Header />
      </div>
      <div className="flex flex-col h-full max-w-screen px-2 sm:px-4 md:px-8 lg:px-16 mx-auto w-full md:w-2/3">
        <div className="flex-1 overflow-hidden -mt-16">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;

