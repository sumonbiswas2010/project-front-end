import React, {useState, useEffect} from 'react';
import './home.css'
import Loading from '../Component/Loading'

const Home = () => {

  const[isLoading, setIsLoading] =useState();
  const [temp, setTemp] =useState();
  const [aTemp, setAtemp] = useState();
  const getWeather = async() => {
    setIsLoading(true)

    console.log("called");
    try{
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=e4bdd4326ac64b2987c93822211407&q=Bagerhat&aqi=no' , {
        method: 'GET'
        
    });
    const responseData = await response.json();

    if(response.ok) {
      console.log(responseData.current.feelslike_c)
      setTemp(responseData.current.temp_c)
      
      setAtemp(responseData.current.feelslike_c)
    }
    setIsLoading(false)
    
    
    }
      catch {
        setIsLoading(false)
        console.log("catch")
      }
    }

  

  function App() {
    useEffect(() => {
        getWeather()
    }, []);
  } 
  App();
  console.log(isLoading)

  


    return(
      <div>
      {isLoading && <Loading />}
      {!isLoading &&
    <div className="App">
      <img src='./images/home.jpg' alt="Home" />
    </div>
    }
    </div>
    )
}
export default Home;