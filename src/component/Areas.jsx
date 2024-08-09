import React, { useState } from "react";
import {
  FaWifi,
  FaUtensils,
  FaCar,
  FaMusic,
  FaBeer,
  FaPaw,
  FaAccessibleIcon,
  FaArrowRight,
} from "react-icons/fa";
import useAreas from "../hooks/useAreas";
import Loader from "./Loader";

// Icons for different amenities
const amenityIcons = {
  "Wi-Fi": <FaWifi />,
  "Outdoor Seating": <FaUtensils />,
  Parking: <FaCar />,
  "Live Music": <FaMusic />,
  "Bar/Alcohol Service": <FaBeer />,
  "Pet-Friendly": <FaPaw />,
  "Accessible Restrooms": <FaAccessibleIcon />,
  // Add more mappings here
};

const Areas = () => {
  const {
    areas,
    loading,
    error,
    addNewarea,
    updateExistingArea,
    deleteExistingArea,
    refetchareas,
  } = useAreas();

  const [selectedarea, setSelectedarea] = useState(null);
  const [areaName, setareaName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEditarea = (area) => {
    setSelectedarea(area);
    setareaName(area.name);
  };

  const handleAddOrUpdatearea = async () => {
    if (isProcessing) return; // Prevent further action while processing

    setIsProcessing(true);

    try {
      if (selectedarea) {
        // Update existing area
        await updateExistingArea(selectedarea.id, { name: areaName.trim() });
        setSelectedarea(null);
      } else if (areaName.trim()) {
        // Add new area
        await addNewarea({ name: areaName.trim() });
      }
      setareaName("");
      // Refetch areas after successful add/update
      await refetchareas();
    } catch (err) {
      console.error(
        selectedarea
          ? "Error updating area:"
          : "Error adding area:",
        err
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeletearea = async (areaId) => {
    if (isProcessing) return; // Prevent further action while processing

    try {
      await deleteExistingArea(areaId);
      // Refetch areas after successful delete
      await refetchareas();
    } catch (err) {
      console.error("Error deleting area:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey mb-4">
        Restaurant areas
      </h2>

      <div className="mb-4">
        <label
          htmlFor="area-name"
          className="block text-lg font-semibold mb-2"
        >
          Add/Update area
        </label>
        <input
          id="area-name"
          type="text"
          value={areaName}
          onChange={(e) => setareaName(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter area name"
        />
        <button
          onClick={handleAddOrUpdatearea}
          className={`p-2 mt-2 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-admin_primary hover:bg-pink-700"
          } text-white rounded`}
          disabled={isProcessing}
        >
          {isProcessing
            ? "Processing..."
            : selectedarea
            ? "Update area"
            : "Add area"}
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className="flex items-center space-x-2 bg-white border rounded-lg p-2 shadow-md"
          >
            <div className="text-lg">
              {amenityIcons[area.name] || <FaArrowRight />}
            </div>
            <span>{area.name}</span>
            <button
              onClick={() => handleEditarea(area)}
              className="text-blue-500 text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeletearea(area.id)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Areas;
