import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import heartImg from "../images/heart.svg";
import jar from "../../jar.jpg";
import helpingImg from "../../helping-right.jpg";
import { API_KEY } from "../constants";
import { URL } from "../constants";

function Card(properties) {
  return (
    <div class="flex  max-w-sm flex-col justify-center rounded-lg border-4 border-black/25 bg-khaki-green2 p-5 duration-300 hover:scale-110 hover:bg-khaki-green2/90">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
        {properties.name}
      </h5>
      <p class="font-normal text-white">{properties.description}</p>
      <a
        target="_blank"
        className="flex items-center justify-center text-white duration-300 hover:scale-125"
        href={properties.link}
      >
        <button className="mt-2 rounded-lg border-2 border-black/50 p-2  text-white">
          Переглянути збір
        </button>
      </a>
    </div>
  );
}

function GlobalContent() {
  const [items, setFetchedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/global/dangers`);
        setFetchedItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const listItems = items.map((item) => <Card key={item.id} {...item} />);

  return (
    <>
      {items.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-2 gap-9">{listItems}</div>
      ) : null}
    </>
  );
}

function Homepage() {
  const [select, setSelect] = useState("Local");
  const [marker, setMarker] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastLatPosition, setLatPosition] = useState(0);
  const [lastLngPosition, setLngPosition] = useState(0);
  const [problemName, setProblemName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isRequestMade, setIsRequestMade] = useState(false);
  const [userStatus, setUserStatus] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [markersArray, setMarkersArray] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 49.839684, lng: 24.029716 });
  let isMounted = false
  const changeHandler = (e, setter) => {
    setter(e.target.value);
  };

  function scrollDown() {
    window.scroll({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  const submitData = async (event) => {
    event.preventDefault();
    let response;
    try {
      const data = {
        user_id: localStorage.getItem("userId"),
        name: problemName,
        description: description,
        coordinates: {
          latitude: lastLatPosition,
          longitude: lastLngPosition,
        },
        date_time: "2",
        accessToken: "examplevlaue",
      };
      response = await axios.post(URL + "/local/dangers/create", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserStatus(localStorage.getItem("isAuthenticated"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isRequestMade) {
          const response = await axios.get(URL + "/local/dangers");
          const elements = response.data;

          setIsRequestMade(true);

          const ul = document.getElementById("myMarkersList");
          if (isMounted) return;

          elements.forEach((element) => {
            const li = document.createElement("li");
            li.textContent = element.name + "    " + element.description;
            li.classList.add(
              "flex",
              "m-2",
              "border-2",
              "rounded-xl",
              "border-black",
              "p-1",
              "justify-between",
            );

            const img = document.createElement("img");
            img.src = "edit.svg";
            img.classList = "h-6 w-6 ml-4 hover:cursor-pointer";

            li.addEventListener("click", () => {
              highlightMapMarker(element.coordinates.latitude, element.coordinates.longitude);
            });

            li.appendChild(img);
            ul.appendChild(li);
            isMounted = true;
          });

          const updatedMarkersArray = elements.map((element) => ({ ...element }));
          setMarkersArray(updatedMarkersArray);
        }
      } catch (error) {
        console.error("Помилка запиту:", error);
      }
    };

    fetchData();
  }, [isRequestMade]);

  const onMapClick = (event) => {
    setLatPosition(event.latLng.lat());
    setLngPosition(event.latLng.lng());
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onMarkerClick = () => {
    toggleDropdown();
  };

  function highlightMapMarker(lat, lng) {
    console.log({ lat: lat, lng: lng })
    setMapCenter({ lat: lat, lng: lng });
  };

  return (
    <div className=" h-screen w-screen bg-khaki-green2">
      <nav className="flex h-[61px] w-screen justify-between bg-beige2 p-3">
        <p className="flex text-3xl font-semibold">
          <img className=" m-1.5 h-7 w-7" src={heartImg}></img>
          HlpMe
        </p>
        {userStatus ? (
          <a
            className="text-3xl font-semibold hover:cursor-pointer"
            onClick={() => {
              localStorage.setItem("isAuthenticated", false);
              localStorage.setItem("userToken", "");
              setUserStatus(false);
              setUserToken("");
            }}
          >
            Log Out
          </a>
        ) : (
          <Link to="/tg"
            className="text-3xl font-semibold hover:cursor-pointer"

          >
            Sign In
          </Link>
        )}
      </nav>
      <div className="flex h-[750px] items-center justify-center p-6">
        <div className="flex items-center justify-around gap-[100px] p-12">
          <img src={jar} className=" h-[450px] w-[400px] rounded-2xl"></img>
          <p className="m-4 max-w-[300px] flex-wrap text-center text-2xl font-medium text-beige2">
            Доможи людям, що потребують допомоги біля тебе, або доєднайся до глобальних зборів. Навіть малий внесок може вплинути на результат всієї картини. Ми - це Україна
          </p>
          <img src={helpingImg} className=" h-[450px] w-[400px] rounded-2xl"></img>
        </div>
      </div>
      <div className="flex w-screen justify-around pb-[62px]">
        <p
          className="mt-[-50px] rounded-2xl border-4 border-beige2 bg-beige2 px-20 py-8 text-3xl font-semibold duration-300 ease-out hover:cursor-pointer hover:border-4 hover:border-black"
          onClick={() => {
            setSelect("Global");
            scrollDown();
          }}
        >
          Глобальна допомога
        </p>
        <p
          className="mt-[-50px] rounded-2xl border-4 border-beige2 bg-beige2 px-20 py-8 text-3xl font-semibold hover:cursor-pointer hover:border-4 hover:border-black"
          onClick={() => {
            setSelect("Local");
            scrollDown();
          }}
        >
          Локальна допомога
        </p>
      </div>
      <div className="flex h-screen w-screen flex-grow items-center justify-center bg-beige2">
        <LoadScript googleMapsApiKey={API_KEY}>
          {select === "Global" ? <GlobalContent /> : null}
          {select === "Local" ? (
            <div className="flex justify-center py-12">
              <GoogleMap
                id="example-map"
                mapContainerStyle={{
                  width: "600px",
                  height: "600px",
                  borderRadius: "24px",
                  marginRight: "32px",
                }}
                zoom={13}
                center={mapCenter}
                onClick={onMapClick}
              >
                {marker && (
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={onMarkerClick}
                    icon={
                      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
                    }
                  />
                )}

                {markersArray.map((marker, index) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
                    onClick={() => onMarkerClick({ x: event.clientX, y: event.clientY })}
                    icon={"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"}
                  />
                ))}

              </GoogleMap>
              <div className="ml-8 h-[600px] w-[600px] rounded-2xl border-4 border-black bg-white">
                <h3 className="m-2 flex items-center justify-center text-2xl font-semibold">
                  Мітки:
                </h3>
                <ul
                  id="myMarkersList"
                  className=" h-[300px] max-h-[250px] overflow-scroll"
                ></ul>
                <div className="flex items-center justify-center border-t-4 border-black text-lg font-medium">
                  Остання мітка:
                  <p className="mx-2 w-[175px] p-1 text-lg font-medium text-gray-900">
                    {lastLatPosition}
                  </p>
                  і
                  <p className="mx-2 w-[170px] p-1 text-lg font-medium text-gray-900">
                    {lastLngPosition}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-around ">
                  <input
                    type="text"
                    placeholder="Назва проблеми"
                    className="m-2 h-[40px] w-[550px] rounded-xl border-2 border-black p-4 text-xl"
                    onChange={(e) => {
                      changeHandler(e, setProblemName);
                    }}
                  />
                  <textarea
                    placeholder="Опис проблеми"
                    className="m-2 h-[100px] w-[550px] break-words rounded-xl border-2 border-black p-4 text-lg"
                    onChange={(e) => {
                      changeHandler(e, setDescription);
                    }}
                  ></textarea>
                </div>
                <div
                  onClick={submitData}
                  className="flex items-center justify-center"
                >
                  <span className="rounded-2xl border-8 border-khaki-green2 bg-khaki-green2 px-12 py-4 text-xl font-semibold text-beige2 duration-300 ease-out hover:cursor-pointer hover:border-black/25">
                    Створити мітку
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </LoadScript>
      </div>
      {isDropdownOpen && (
        <div style={{ position: 'absolute', top: dropdownPosition.y, left: dropdownPosition.x }}>
          <div style={{ background: 'white', width: '200px', height: '200px' }}>
            hello
          </div>
        </div>
      )}
      <div className="flex items-center justify-center bg-khaki-green2 py-6 text-4xl text-beige2">
        Продовжуючи допомагати іншим, ми зберігаємо свою людяність.
      </div>
    </div>
  );
}
export default Homepage;
