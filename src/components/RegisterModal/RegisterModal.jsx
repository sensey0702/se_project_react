import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ activeModal, handleRegister, onClose }) {
  //   const [email, setEmail] = useState("");
  //   const handleEmailChange = (e) => {
  //     setEmail(e.target.value);
  //   };
  //   const [password, setPassword] = useState("");
  //   const handlePasswordChange = (e) => {
  //     setPassword(e.target.value);
  //   };
  //   const [name, setName] = useState("");
  //   const handleNameChange = (e) => {
  //     setName(e.target.value);
  //   };
  //   const [avatar, setAvatar] = useState("");
  //   const handleAvatarChange = (e) => {
  //     setAvatar(e.target.value);
  //   };

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
    return handleRegister(data)
      .then(() => {
        setEmail("");
        setPassword("");
        setName("");
        setAvatar("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      onClose={onClose}
      isOpen={activeModal === "register"}
      name="register"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          name="email"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          name="password"
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL{" "}
        <input
          name="avatar"
          type="url"
          className="modal__input"
          id="avatarURL"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
