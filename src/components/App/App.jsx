import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
          </Routes>

          <ModalWithForm
            buttonText="Add garment"
            title="New garment"
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            name="add-garment"
          >
            <label htmlFor="name" className="modal__label">
              Name{" "}
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="Name"
              />
            </label>
            <label htmlFor="imageURL" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageURL"
                placeholder="Image URL"
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>

              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weather-type"
                  type="radio"
                  className="modal__radio-input"
                  id="hot"
                />
                Hot
              </label>

              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weather-type"
                  type="radio"
                  className="modal__radio-input"
                  id="warm"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  name="weather-type"
                  type="radio"
                  className="modal__radio-input"
                  id="cold"
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
