"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { WiBarometer } from "react-icons/wi";

import { useEffect, useState } from "react";
import LoaderSpinner from "./LoaderSpinner";



export default function OverlayCard() {
    const today=new Date();
    const day=today.toLocaleString('en-US',{weekday:'long'});
    const date=today.toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric'});
    // const time=today.toLocaleString('en-US',{hour:'2-digit',minute:'2-digit'});
    const [data,setData]=useState('')
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
  
    const backendUrl2=import.meta.env.VITE_BACKEND_URL2;
    const [backendUrl,setUrl]=useState(backendUrl2)
    const [searchValue, setSearchValue] = useState("");
   
     // Handle input change
     const handleInputChange = (e) => {
       setSearchValue(e.target.value);
     };
   
     // Handle search on Enter key press
     const handleKeyPress = (e) => {
       if (e.key === "Enter") {
         performSearch();
       }
     };
   
     // Handle search button click
     const  performSearch = async() => {
       if (searchValue.trim()) {
       
         console.log("Searching for:", searchValue);
          setUrl(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchValue}&appid=4c3fb3dc336e3f3a2ccfc656bf857318`);
          try{
            setLoading(true);
            const response=await axios.get(backendUrl)
            setData(response.data);
            console.log(data.sys);
          }catch(err){
            console.error("Error fetching weather data :",err.message);
            setError(err.message);
          }finally{
            setLoading(false);
          }
         
       } else {
         console.log("Search input is empty.");
       }
     };
   useEffect(()=>{
    const fetchData=async()=>{
      try{
        
        const response=await axios.get(backendUrl)
      
      
        setData(response.data);
        
      }catch(errr){
        setError(error.message);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
   },[backendUrl]);


  return (
    <div>
    {loading?<div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4  border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>:(
     
    
    <div className="bg-orange-300 flex justify-center items-center h-screen">
  <div className="relative bg-blue-500   overflow-hidden h-[100%]  shadow-lg">

    <video 
      className="absolute top-0 left-0 w-full h-full object-cover"
      src={`src/assets/${data.weather[0].main}.mp4`}
      autoPlay
      loop
      muted
    ></video>
    <div className="relative z-10 mt-12  px-5 text-white  items-center ">
    
       
        <div className="relative ">

  <div className="flex justify-between items-center border rounded-lg  ">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className=" flex grow py-3 focus:outline-none  px-2 bg-transparent   "
      />

      {/* Search Button */}
      <button
        onClick={performSearch}
        className=" mr-8"
        
      >
          <i className="fas fa-search search-icon font-bold    transform text-gray-500" />

      </button>
    </div>

</div>
        <div className="text-white justify-center text-center items-center flex flex-col md:gap-6 ">
            <h1 className="text-5xl font-delhi pt-6 font-semibold">{data.name}</h1>
            <div className="flex gap-2">
            <h1>{day}</h1>
            <h1>{date}</h1>
            {/* <h1>{time}</h1> */}
          
            </div>
            <div className=" flex items-center">
           
            <img className=" -m-5 " src={`https://openweather.site/img/wn/${data.weather[0].icon}.png`}></img>

            <h2>{data.weather[0].description}</h2>
            
            </div>
            <div className="gap-12   flex justify-center text-center">
                
            <h1 className="text-6xl font-thin" >{data.main.temp}&#176;C</h1>
            
             <div>
                <h3>H- {data.main.temp_max}</h3>
                <h3>L- {data.main.temp_min}</h3>
             </div>
             
        </div>
        <div>
                <p> {data.main.temp}&#176;C, Feels like {data.main.feels_like}&#176;C, winds {data.wind.speed}m/s  direction {data.wind.deg},<br></br> {data.main.humidity}% humidity </p>
             </div>
             <div className="my-5">
             <div className="grid grid-cols-3 grid-flow-row gap-4 ">
                <div className="p-3 bg-gray-600 bg-opacity-60 rounded-lg"> 
                    <h2  className="">{data.main.pressure} hPa</h2>
                    <h1><WiBarometer size={60}/></h1>
                </div>
                <div  className="p-3 bg-gray-600 bg-opacity-60 rounded-lg  "> 
                    <h2>{data.wind.speed} m/s</h2>
                    <img src="src/assets/wind.png" className="h-[40px] w-[40px]" /> 
                </div>
                <div  className=" p-3 bg-gray-600 bg-opacity-60 rounded-lg"> 
                    <h2>{data.main.humidity} %</h2>
                    <img src="src/assets/humidity.png" className="h-[40px] w-[40px]" /> 

                </div>
        

{/*         
                <div  className=" bg-gray-600 bg-opacity-60 rounded-lg"> 
                    <h2>{data.sys.sunrise}</h2>
                    <h1>Sun Rise</h1>
                </div>
                <div className=" bg-gray-600 bg-opacity-60 rounded-lg"> 
                    <h2>{data.sys.sunset}</h2>
                    <h1>Sun Set</h1>
                </div>  */}
                 {/* <div  className=" bg-gray-600 bg-opacity-60 rounded-lg"> 
                    <h2>{data.main.pressure} mm</h2>
                    <h1>Pressure</h1>
                </div> */}
                

             </div>
             </div>
        </div>
      
    </div>

  
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
  </div>
</div>

    )
}  
    </div>
  )
}
