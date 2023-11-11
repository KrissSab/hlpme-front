import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import heartImg from "../images/heart.svg";
import helpImg from "../images/help.jpg";
import editImg from "../images/edit.svg";
import { API_KEY } from "../constants";


function Homepage() {
  const [select, setSelect] = useState('Local');

  return (
    <div className=" h-screen w-screen">
      <nav className="flex justify-between w-screen border-b-4 border-black p-3 h-[61px]">
        <p className="text-3xl font-semibold flex">
          <img className=" w-7 h-7 m-1.5" src={heartImg}></img>
          HlpMe
        </p>
        <p className="text-3xl font-semibold hover:cursor-pointer">Sign Up</p>
      </nav>
      <div className="h-[750px] flex items-center justify-center p-6">
        <div className="flex items-center border-2 border-black p-12 rounded-xl">
          <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
          <p className="flex-wrap m-4 max-w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus alias iste aperiam labore a magni porro vel, doloribus maiores, architecto, quos sit voluptas eligendi facere laboriosam quas. Ratione, fugiat!</p>
        </div>
      </div>
      <div className="flex w-screen justify-around ">
        <p className="py-8 px-20 bg-white hover:cursor-pointer border-black border-2 rounded-2xl" onClick={() => setSelect('Global')}>Global Help</p>
        <p className="py-8 px-20 bg-white hover:cursor-pointer border-black border-2 rounded-2xl" onClick={() => setSelect("Local")}>Local Help</p>
      </div>
      <LoadScript googleMapsApiKey={API_KEY}>
        {select === 'Global' ? (
          <div>
            Global content
          </div>
        ) : null}
        {select === 'Local' ? (
          <div className="flex justify-center mt-10">
            <GoogleMap
              id="example-map"
              mapContainerStyle={{ width: '400px', height: '400px', borderRadius: "24px", marginRight: "32px", }}
              zoom={13}
              center={{ lat: 49.839684, lng: 24.029716 }}
            />
            <div className="w-[400px] h-[400px] border-black border-4 rounded-2xl ml-8">
              <h3 className="flex items-center justify-center m-3">My markers:</h3>
              <ul className=" max-h-[350px] overflow-scroll">
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark1<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark2<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
              </ul>
            </div>
          </div>
        ) : null}
      </LoadScript>
      <div className="my-6">We have to help each other</div>
    </div>
  );
}
export default Homepage;
