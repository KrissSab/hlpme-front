import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import heartImg from "../images/heart.svg";
import helpImg from "../images/help.jpg";
import { API_KEY } from "../constants";
import { URL } from "../constants"

function Homepage() {
  const [select, setSelect] = useState("Local");
  const [marker, setMarker] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastLatPosition, setLatPosition] = useState(0)
  const [lastLngPosition, setLngPosition] = useState(0)
  const [problemName, setProblemName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isRequestMade, setIsRequestMade] = useState(false);

  const changeHandler = (e, setter) => {
    setter(e.target.value);
    console.log(problemName, description);
  };

  function scrollDown() {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  const submitData = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: problemName,
        description: description,
        dangerLevel: 0,
        coordinates: {
          latitude: lastLatPosition,
          longitude: lastLngPosition,
        }
      };
      console.log(data)
      //const response = await axios.post(URL + "/local/dangers/create", data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isRequestMade == false) {
      axios.get(URL + "/local/dangers")
        .then(response => {
          setIsRequestMade(true);
          const elements = response.data;
          const ul = document.getElementById('myMarkersList');

          elements.forEach(element => {
            const li = document.createElement('li');
            li.textContent = element.name;
            li.classList.add('flex', 'm-2', 'border-2', 'rounded-xl', 'border-black', 'p-1', 'justify-between');

            const img = document.createElement('img');
            img.src = 'edit.svg';
            img.classList = 'h-6 w-6 ml-4 hover:cursor-pointer';

            li.appendChild(img);
            ul.appendChild(li);
          });
        })
        .catch(error => {
          console.error('Помилка запиту:', error);
        });
    }
  }, [isRequestMade]);

  const onMapClick = (event) => {
    setLatPosition(event.latLng.lat())
    setLngPosition(event.latLng.lng())
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
    setIsDropdownOpen(false);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onMarkerClick = () => {
    toggleDropdown();
  };

  return (
    <div className=" h-screen w-screen bg-khaki-green2">
      <nav className="flex justify-between w-screen p-3 h-[61px] bg-beige2">
        <p className="text-3xl font-semibold flex">
          <img className=" w-7 h-7 m-1.5" src={heartImg}></img>
          HlpMe
        </p>
        <p className="text-3xl font-semibold hover:cursor-pointer">Sign Up</p>
      </nav>
      <div className="h-[750px] flex items-center justify-center p-6">
        <div className="flex items-center p-12 gap-[100px] justify-around">
          <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
          <p className="flex-wrap m-4 max-w-[300px] text-center text-beige2 text-2xl font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus alias iste aperiam labore a magni porro vel, doloribus maiores, architecto, quos sit voluptas eligendi facere laboriosam quas. Ratione, fugiat!</p>
          <img src={helpImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
        </div>
      </div>
      <div className="flex w-screen justify-around pb-[62px]">
        <p
          className="mt-[-50px] py-8 px-20 bg-beige2 hover:cursor-pointer rounded-2xl border-4 border-khaki-green2 text-3xl font-semibold hover:border-4 hover:border-black"
          onClick={() => { setSelect('Global'); scrollDown() }}>
          Global Help
        </p>
        <p
          className="mt-[-50px] py-8 px-20 bg-beige2 hover:cursor-pointer rounded-2xl border-4 border-khaki-green2 text-3xl font-semibold hover:border-4 hover:border-black"
          onClick={() => { setSelect("Local"); scrollDown() }}>
          Local Help
        </p>
      </div>
      <div className="flex justify-center items-center h-screen w-screen bg-beige2">
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
                {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} onClick={onMarkerClick} />}
              </GoogleMap>
              <div className="w-[600px] h-[600px] border-black border-4 rounded-2xl ml-8 bg-white">
                <h3 className="flex items-center justify-center m-2 text-2xl font-semibold">My markers:</h3>
                <ul id="myMarkersList" className=" h-[300px] max-h-[250px] overflow-scroll"></ul>
                <div className="flex justify-center items-center border-t-4 border-black text-lg font-medium">Last chosen position:
                  <p className="p-1 mx-2 text-lg font-medium text-gray-900 w-[175px]">{lastLatPosition}</p>
                  and
                  <p className="p-1 mx-2 text-lg font-medium text-gray-900 w-[170px]">{lastLngPosition}</p>
                </div>
                <div className="flex flex-col justify-around items-center ">
                  <input type="text" placeholder="Problem name" className="m-2 border-2 border-black p-4 w-[550px] rounded-xl text-xl h-[40px]" onChange={(e) => { changeHandler(e, setProblemName) }} />
                  <textarea placeholder="Description" className="m-2 border-2 border-black p-4 h-[100px] w-[550px] rounded-xl text-lg break-words" onChange={(e) => { changeHandler(e, setDescription) }}></textarea>
                </div>
                <div onClick={submitData} className="flex justify-center items-center">
                  <span className="px-12 py-4 border-khaki-green2 border-4 rounded-xl text-xl font-semibold bg-khaki-green2 text-beige2 hover:cursor-pointer hover:border-black">Create marker</span>
                </div>
              </div>
            </div>
          ) : null
          }
        </LoadScript >
      </div >
      <div className="flex justify-center items-center text-4xl py-6 bg-khaki-green2 text-beige2"> By continuing to help others, you maintain your humanity.</div>
    </div >
  );
}
export default Homepage;
