import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ activeModal, onLogin, onClose }) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
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
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      {/* <Link>or Register</Link> */}
    </ModalWithForm>
  );
}

export default LoginModal;
