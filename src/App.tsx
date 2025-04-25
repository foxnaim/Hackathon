import React from "react";
import Button from "./components/button/button";
import Checkbox from "./components/checkbox/checkbox";
import { Header } from "./components/header/header";

function App() {
  return (
    <React.Fragment>
      <Button isLoading>Войти</Button>
      <Checkbox
        isChecked={true}
        onChange={(checked) => console.log("Checked status:", checked)}
        rounded={true}
        onClick={() => console.log("Checkbox clicked!")}
      />
      <Header className="bg-indigo-600 text-white text-lg">
        Добро пожаловать в приложение!
      </Header>
    </React.Fragment>
  );
}

export default App;
