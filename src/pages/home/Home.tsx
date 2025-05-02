import Header from "../../components/header/header";
import ChatComponent from "../../components/ai/ChatComponent";

const Home = () => {
  return (
    <>
      <div className="sticky top-0 z-10 w-full">
        <Header />
      </div>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-screen px-2 sm:px-4 md:px-8 lg:px-16 mx-auto w-full md:w-2/3">
        <ChatComponent />
      </div>
    </>
  );
};

export default Home;
