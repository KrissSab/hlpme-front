import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import heartImg from "../images/heart.svg";
import helpImg from "../images/help.jpg";
import editImg from "../images/edit.svg";
import { API_KEY } from "../constants";


function Homepage() {
  const [select, setSelect] = useState("Local");
  const [marker, setMarker] = useState(null);
  const [lastLatPosition, setLatPosition] = useState(null)
  const [lastLngPosition, setLngPosition] = useState(null)
  const [problemName, setProblemName] = useState(null);
  const [description, setDescription] = useState(null);

  const changeHandler = (e, setter) => {
    setter(e.target.value);
    console.log(problemName, description);
  };

  const submitData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(PORT + "/local/dangers/create",);
      return navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  const onMapClick = (event) => {
    setLatPosition(event.latLng.lat())
    setLngPosition(event.latLng.lng())
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
    console.log(marker);
  }

  return (
    <div className=" h-screen w-screen bg-[url('websitebg.jpg')]">
      <nav className="flex justify-between w-screen p-3 h-[61px] bg-white">
        <p className="text-3xl font-semibold flex">
          <img className=" w-7 h-7 m-1.5" src={heartImg}></img>
          HlpMe
        </p>
        <p className="text-3xl font-semibold hover:cursor-pointer">Sign Up</p>
      </nav>
      <div className="h-[750px] flex items-center justify-center p-6">
        <div className="flex items-center p-12 rounded-xl backdrop-blur-xl">
          <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
          <p className="flex-wrap m-4 max-w-[300px] text-white text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus alias iste aperiam labore a magni porro vel, doloribus maiores, architecto, quos sit voluptas eligendi facere laboriosam quas. Ratione, fugiat!</p>
        </div>
      </div>
      <div className="flex w-screen justify-around pb-8">
        <p className="py-8 px-20 bg-white hover:cursor-pointer rounded-2xl" onClick={() => setSelect('Global')}>Global Help</p>
        <p className="py-8 px-20 bg-white hover:cursor-pointer rounded-2xl" onClick={() => setSelect("Local")}>Local Help</p>
      </div>
      <div className="flex justify-center items-center h-screen w-screen bg-[url('websitebg2.jpg')]">
        <LoadScript googleMapsApiKey={API_KEY}>
          {select === 'Global' ? (
            <div>
              Global content
            </div>
          ) : null}
          {select === 'Local' ? (
            <div className="flex justify-center py-12">
              <GoogleMap
                id="example-map"
                mapContainerStyle={{ width: '600px', height: '600px', borderRadius: "24px", marginRight: "32px", }}
                zoom={13}
                center={{ lat: 49.839684, lng: 24.029716 }}
                onClick={onMapClick}
              >
                {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
              </GoogleMap>


              <div className="w-[600px] h-[600px] border-black border-4 rounded-2xl ml-8 bg-white">
                <h3 className="flex items-center justify-center m-3">My markers:</h3>
                <ul className=" max-h-[250px] overflow-scroll">
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
                  <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                  <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                  <li className="flex m-2 border-2 rounded-xl border-black p-1 justify-between">Mark3<img src={editImg} className="h-6 w-6 ml-4 hover:cursor-pointer"></img></li>
                </ul>
                <div>Last chosen position: {lastLatPosition} and {lastLngPosition}
                </div>
                <input type="text" placeholder="Problem name" onChange={(e) => { changeHandler(e, setProblemName) }} />
                <input type="text" placeholder="Description" onChange={(e) => { changeHandler(e, setDescription) }} />
                <div onClick={submitData}>Create marker</div>
              </div>
            </div>
          ) : null
          }
        </LoadScript >
      </div >
      <div className="flex justify-center items-center text-4xl py-6"> By continuing to help others, you maintain your humanity.</div>
    </div >
  );
}
export default Homepage;
