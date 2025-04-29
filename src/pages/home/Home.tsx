
import MessageList from "../../components/ai/MessageList";
import MessageInput from "../../components/ai/MessageInput";
import Header from "../../components/header/header";

const Home = () => {
  return (
   <>
   <div className="sticky top-0 z-10 w-full rounded-5xl">
   <Header /> 
   </div>
    <div className="flex flex-col h-screen w-2/3 mx-auto ">
      <div className="flex-1 overflow-hidden w-full relative">
        <div className="absolute inset-0 overflow-y-auto">
          <MessageList />
        </div>
      </div>
      <div className="sticky bottom-4 z-5 w-full rounded-5xl">
        <MessageInput />
      </div>
    </div>
    </>
  );
};

export default Home;
