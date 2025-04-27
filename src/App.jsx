import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const getBackgroundImage = () => {
    const condition = weather?.condition?.toLowerCase() || '';
    if (condition.includes('sunny')) return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e';
    if (condition.includes('rain')) return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0';
    if (condition.includes('cloud')) return 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63';
    return 'https://images.unsplash.com/photo-1592210454359-9043f067919b';e
  };

  const checkWeather = () => {
    if (!city) {
      toast.warn('Fill The Input Field !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    axios.get(`https://weather-api-server-git-main-taha-sirajs-projects.vercel.app/api/weatherApp/${city}`)
      .then((res) => {
        console.log("res", res.data);
        setWeather(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data?.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">Weather App</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
            className="w-full py-3 outline-0 text-black text-xl px-4 bg-white/10 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        <button
          onClick={checkWeather}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Search Weather
        </button>
        {weather.cityname && (
          <div className="mt-6 text-white space-y-2 text-black capitalize">
            <h2 className="text-2xl font-semibold ">{weather.cityname}, {weather.country}</h2>
            <p className="text-lg">Temperature: {weather?.temperature?.current} {weather?.temperature?.unit}</p>
            <p className="text-lg">Feels Like: {weather?.temperature?.feels_like} {weather?.temperature?.unit}</p>
            <p className="text-lg">Humidity: {weather?.humidity}%</p>
            <p className="text-lg">Wind Speed: {weather?.wind?.speed} km/h</p>
            {weather.condition && (
              <p className="text-lg capitalize">Condition: {weather.condition}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default App;