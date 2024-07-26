import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FaPowerOff } from "react-icons/fa";

export default function LogoutBtn({ className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler =  () => {
    try {
      dispatch(logout()); // Dispatch your logout action
    } catch (error) {
      console.error("Logout failed:", error.message);
      // Handle logout failure if needed
    }
  };

  const handleYes = () => {
    console.log("Yes clicked");
    logoutHandler();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={` inline-flex items-center px-0 py-0 sm:px-4 sm:py-2 duration-200 text-admin_dark hover:text-admin_primary w-auto text-start`}
        onClick={() => setIsModalOpen(true)}
      >
        <FaPowerOff className="mr-2"  size={20} />
        {/* Logout */}
      </button>
      {isModalOpen && (
        <Modal title="Are you sure?" onYes={handleYes} onClose={handleClose} />
      )}
    </>
  );
}
