import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  deleteCard,
  getItems,
  addNewCard,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { f: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleModalChange = () => {
    if (activeModal === "register") {
      closeActiveModal();
      setActiveModal("login");
    }
    if (activeModal === "login") {
      closeActiveModal();
      setActiveModal("register");
    }
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item) => {
    console.log(item);
    const jwt = getToken();
    //adding the card to the server
    return addNewCard(item, jwt).then((newCard) => {
      //addiing the card to the dom
      console.log(newCard);
      setClothingItems([newCard, ...clothingItems]);
      console.log(newCard);
      closeActiveModal();
    });
  };

  const handleDeleteCard = () => {
    const jwt = getToken();
    return deleteCard(selectedCard, jwt)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (user) => {
    console.log(user);
    return auth
      .login(user)
      .then((res) => {
        console.log(res.token);
        setToken(res.token);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = (user) => {
    const password = user.password;

    return auth
      .register(user)
      .then((registeredUser) => {
        handleLogin({ ...registeredUser, password });
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditProfile = (data) => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    return editProfile(data, jwt)
      .then((updatedProfileInfo) => {
        setCurrentUser(updatedProfileInfo);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    // Call the function, passing it the JWT.
    auth
      .getUserInfo(jwt)
      .then((userData) => {
        // If the response is successful, log the user in, save their
        // data to state
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        // set the clothing items using the data that was returned
        setClothingItems(data);
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    // pass clothingItems as a prop
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              activeModal={activeModal}
              onAddItem={handleAddItemSubmit}
              onClose={closeActiveModal}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              isOpen={activeModal === "preview"}
              name="preview"
              deleteCard={handleDeleteCard}
            />
            <LoginModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleOrButton={handleToggleModalChange}
            ></LoginModal>
            <RegisterModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleRegister={handleRegister}
              handleOrButton={handleToggleModalChange}
            ></RegisterModal>
            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleEditProfile={handleEditProfile}
            ></EditProfileModal>
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
