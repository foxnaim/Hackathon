import React from 'react'
import Button from "../../components/button/button";
import Checkbox from "../../components/checkbox/checkbox";
import Input from "../../components/imput/input";


const Home = () => {
  return (
   <React.Fragment>
    <div>Главная страница</div>
    <Button isLoading>Войти</Button>
      <Checkbox
        isChecked={true}
        onChange={(checked) => console.log("Checked status:", checked)}
        rounded={true}
        onClick={() => console.log("Checkbox clicked!")}
      />
      <Input placeholder="Введите email" icon="email"/>
<Input placeholder="Введите пароль" type="password" icon="password" />
<Input placeholder="Введите имя" icon="user" />
<Input placeholder="Поиск..." icon="search" />
   </React.Fragment>
  )
}

export default Home
