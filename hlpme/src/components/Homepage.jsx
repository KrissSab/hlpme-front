import React, { useState } from "react";
import heartImg from "../images/heart.svg";
import helpImg from "../images/help.jpg";

function Homepage() {
  const [select, setSelect] = useState("Local");

  return (
    <div className="h-screen w-screen from-light-green from-10% via-midle-green to-dark-green">
      <nav className="flex h-[51px] w-screen justify-between border-b-4 border-black p-3">
        <p className="flex text-3xl font-semibold">
          <img className=" m-1.5 h-7 w-7" src={heartImg}></img>
          HlpMe
        </p>
        <p className="text-3xl font-semibold hover:cursor-pointer">Sign Up</p>
      </nav>
      <div className="flex h-[780px] items-center justify-center">
        <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
        <p className="m-4 max-w-[300px] flex-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus
          alias iste aperiam labore a magni porro vel, doloribus maiores,
          architecto, quos sit voluptas eligendi facere laboriosam quas.
          Ratione, fugiat!
        </p>
      </div>
      <div className="flex w-screen justify-around ">
        <p
          className="rounded-2xl border-2 border-black px-20 py-8 hover:cursor-pointer"
          onClick={() => {
            setSelect("Global");
            console.log(select);
          }}
        >
          Global Help
        </p>
        <p
          className="rounded-2xl border-2 border-black px-20 py-8 hover:cursor-pointer"
          onClick={() => {
            setSelect("Local");
            console.log(select);
          }}
        >
          Local Help
        </p>
      </div>
    </div>
  );
}
export default Homepage;
