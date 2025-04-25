import React from "react";
import Button from "./components/button/button";
import Checkbox from "./components/checkbox/checkbox";

function App() {
  return (
    <React.Fragment>
      <Button variant="solid">Войти</Button>
      <Checkbox
        isChecked={true}
        onChange={(checked) => console.log("Checked status:", checked)}
        rounded={true}
        onClick={() => console.log("Checkbox clicked!")}
      />
    </React.Fragment>
  );
}

export default App;
