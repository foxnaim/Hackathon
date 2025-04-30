import MessageList from "../../components/ai/MessageList";
import MessageInput from "../../components/ai/MessageInput";
import Header from "../../components/header/header";

const Home = () => {
  return (
    <>
      <div className="sticky top-0 z-10 w-full">
        <Header />
      </div>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-screen px-2 sm:px-4 md:px-8 lg:px-16 mx-auto w-full md:w-2/3">
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto">
            <MessageList />
          </div>
        </div>
        <div className="sticky bottom-0 z-10 w-full">
          <MessageInput />
        </div>
      </div>
    </>
  );
};

export default Home;
