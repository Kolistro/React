//файл основного компонента для объединения всех компонентов
import React from "react"; //добавляем объект React из библиотеки React
import Info from "./components/info"; //импортируем компонент Info из папки components
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "0554d9821a896924538be4a7c123c706";

class App extends React.Component{ //создаем компонент App наследник от React.Component

  //состояние
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }
//метод  (async-ассинхронизация)
//e.preventDefault() убираем постоянное обновление страницы
  gettingWeather = async(e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;

    if(city){
      const api_url = await
      //переменная для получения данных с URL адреса
      fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_KEY+"&units=metric&lang=ru");
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      //передаем полученные данные в state
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else{
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
}
  //возвращает описание того, что хотим увидеть на экране.
  render(){
    return(
      //весь код на HTML трансформируется react в JavaScript
      //всегда должен возвращаться одий общий тег
      //<Info/> <Form/> <Weather/> - компоненты
      //weatherMethod={this.gettingWeather} передаем свойства в компонент Form
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
