import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "./components/loading/Loading"; 
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Trends from "./pages/analytics/Trends";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки (например, 2 секунды)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (  
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <div className=''>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Trends" element={<Trends />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="conversation/:conversationId" element={<Home/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
      {/* )} */}
    </>
  );
}

export default App;

