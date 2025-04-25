import React, { useState } from "react";
import { Icons } from "../../ui/icons/Icons"; // Импортируем иконки из файла icons.ts

type Props = {
  isChecked?: boolean; // состояние чекбокса
  onChange?: (checked: boolean) => void; // функция изменения состояния
  className?: string; // дополнительный класс для стилизации
  rounded?: boolean; // флаг для скругленных углов
  onClick?: () => void; // обработчик клика
  children?: React.ReactNode; // текст или элементы, переданные внутрь компонента
};

const Checkbox: React.FC<Props> = ({
  isChecked = false,
  onChange,
  className = "",
  rounded = false,
  onClick,
  children,
}) => {
  const [checked, setChecked] = useState(isChecked);

  // Функция для переключения состояния чекбокса
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  // Обработка клика (если передан onClick)
  const handleClick = () => {
    if (onClick) onClick();
    handleChange();
  };

  return (
    <div
      className={`flex items-center cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center border-2 ${
          rounded ? "rounded-full" : "rounded-none"
        } ${checked ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-500"} p-1`}
      >
        {checked ? (
          <Icons.check className="text-white w-4 h-4" /> // Используем Icons.check
        ) : (
          <div
            className={`w-full h-full ${
              rounded ? "rounded-full" : "rounded-none"
            } bg-transparent`}
          />
        )}
      </div>
      {/* Отображение переданного текста */}
      <span className="ml-2">{children}</span>
    </div>
  );
};

export default Checkbox;


// Пример использования:

// // Чекбокс с скругленными углами и кастомным стилем
// <Checkbox
//   isChecked={true}
//   onChange={(checked) => console.log("Checked status:", checked)}
//   rounded={true}
//   className="border-blue-500" // Кастомный класс для обводки
//   onClick={() => console.log("Checkbox clicked!")}
// />

// // Чекбокс с квадратными углами
// <Checkbox
//   isChecked={false}
//   onChange={(checked) => console.log("Checked status:", checked)}
//   rounded={false}
//   className="border-red-500"
//   onClick={() => console.log("Checkbox clicked!")}
// />
