import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ activeModal, handleLogin, onClose, handleOrButton }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleLogin(data)
      .then(() => {
        setData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      onClose={onClose}
      isOpen={activeModal === "login"}
      name="login"
      onSubmit={handleSubmit}
      handleOrButton={handleOrButton}
      orButtonText="or Sign in"
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
