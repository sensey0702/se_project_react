import { useState, useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, handleEditProfile, onClose }) {
  const currentUser = useContext(CurrentUserContext);

  // Initialize state with conditional values
  const [data, setData] = useState({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  // Use effect to reset the state when the currentUser changes
  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return handleEditProfile(data);
  };

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      onClose={onClose}
      isOpen={activeModal === "edit-profile"}
      name="edit-profile"
      onSubmit={handleSubmit}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          name="avatar"
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
