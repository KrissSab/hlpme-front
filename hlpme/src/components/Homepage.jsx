import React, { useState } from "react";
import heartImg from "../images/heart.svg"
import helpImg from "../images/help.jpg"

function Homepage() {
  const [select, setSelect] = useState('Local');

  return (
    <div className="h-screen w-screen from-light-green from-10% via-midle-green to-dark-green">
      <nav className="flex justify-between w-screen border-b-4 border-black p-3 h-[51px]">
        <p className="text-3xl font-semibold flex">
          <img className=" w-7 h-7 m-1.5" src={heartImg}></img>
          HlpMe
        </p>
        <p className="text-3xl font-semibold hover:cursor-pointer">Sign Up</p>
      </nav>
      <div className="h-[780px] flex items-center justify-center">
        <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
        <p className="flex-wrap m-4 max-w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus alias iste aperiam labore a magni porro vel, doloribus maiores, architecto, quos sit voluptas eligendi facere laboriosam quas. Ratione, fugiat!</p>
      </div>
      <div className="flex w-screen justify-around ">
        <p className="py-8 px-20 hover:cursor-pointer border-black border-2 rounded-2xl" onClick={() => { setSelect('Global'); console.log(select) }}>Global Help</p>
        <p className="py-8 px-20 hover:cursor-pointer border-black border-2 rounded-2xl" onClick={() => { setSelect("Local"); console.log(select) }}>Local Help</p>
      </div>

    </div>
  );
}
export default Homepage;
