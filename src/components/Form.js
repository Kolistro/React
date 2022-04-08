import React from "react";

//упрощенный компонент, можно делать только если нет состояний
const Form = (props) => (
  //<input> текстовое поле и плэйсхолдер для ввода города
  //<button>  кнопка для получения погоды
  <form onSubmit={props.weatherMethod}>
    <input type="text" name="city" placeholder="Город"/>
    <button>Получить погоду</button>
  </form>
)


export default Form;
