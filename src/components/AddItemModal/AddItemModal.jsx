import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ activeModal, onAddItem, onClose }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };
  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  useEffect(() => {
    if (!activeModal) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [activeModal]);

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      onClose={onClose}
      isOpen={activeModal === "add-garment"}
      name="add-garment"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather-type"
            type="radio"
            className="modal__radio-input"
            id="cold"
            checked={weather === "cold"}
            value="cold"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
