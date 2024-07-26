import React, { useState } from 'react';
import {
  FaWifi,
  FaUtensils,
  FaCar,
  FaMusic,
  FaBeer,
  FaPaw,
  FaAccessibleIcon,
  FaHandsHelping,
  FaGuilded,
} from 'react-icons/fa'; // Add more icons as needed
import { FaArrowUpShortWide, FaHandBackFist } from 'react-icons/fa6';

// Icons for different amenities
const amenityIcons = {
  'Wi-Fi': <FaWifi />,
  'Outdoor Seating': <FaUtensils />,
  'Parking': <FaCar />,
  'Live Music': <FaMusic />,
  'Bar/Alcohol Service': <FaBeer />,
  'Pet-Friendly': <FaPaw />,
  'Accessible Restrooms': <FaAccessibleIcon />,
  // Add more mappings here
};

// Default amenities with their icons
const availableAmenities = Object.keys(amenityIcons);

// Randomly select an icon from the available icons for custom facilities
const randomIcon = () => {
  const icons = Object.values(amenityIcons);
  return icons[Math.floor(Math.random() * icons.length)];
};

const FacilitiesForm = ({ onAddAmenity }) => {
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [customFacility, setCustomFacility] = useState('');

  const handleSelect = (amenity) => {
    setSelectedAmenity(amenity);
  };

  const handleAddAmenity = () => {
    if (selectedAmenity) {
      onAddAmenity(selectedAmenity);
      setSelectedAmenity('');
    }
  };

  const handleAddCustomFacility = () => {
    if (customFacility.trim() && !amenityIcons[customFacility]) {
      onAddAmenity(customFacility.trim());
      setCustomFacility('');
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="amenity-select" className="block text-lg font-semibold mb-2">
        Select Facility
      </label>
      <div className="flex flex-wrap gap-4 mb-4">
        {availableAmenities.map((amenity) => (
          <div
            key={amenity}
            className={`flex items-center cursor-pointer ${
              selectedAmenity === amenity ? 'text-admin_primary' : 'hover:text-admin_primary'
            }`}
            onClick={() => handleSelect(amenity)}
          >
            <div className="text-2xl mr-2">{amenityIcons[amenity]}</div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddAmenity}
        className="p-2 bg-admin_primary text-white rounded hover:bg-pink-700 mb-4"
      >
        Add Amenity
      </button>
      <div className="mb-4">
        <label htmlFor="custom-facility" className="block text-lg font-semibold mb-2">
          Add a Custom Facility
        </label>
        <input
          id="custom-facility"
          type="text"
          value={customFacility}
          onChange={(e) => setCustomFacility(e.target.value)}
          className="p-2 border rounded w-full mb-2"
          placeholder="Enter custom facility"
        />
        <button
          onClick={handleAddCustomFacility}
          className="p-2 bg-admin_primary text-white rounded hover:bg-pink-700"
        >
          Add Custom Facility
        </button>
      </div>
    </div>
  );
};

const Amenities = () => {
  const [facilities, setFacilities] = useState([
    'Wi-Fi',
    'Outdoor Seating',
    'Parking',
    // Add more default amenities here
  ]);

  const handleAddAmenity = (amenity) => {
    if (!facilities.includes(amenity)) {
      setFacilities((prevAmenities) => [...prevAmenities, amenity]);
    }
  };

  return (
    <div>
      <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey mb-4">Restaurant Facilites</h2>
      <FacilitiesForm onAddAmenity={handleAddAmenity} />
      <div className="flex flex-wrap gap-4">
        {facilities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-white border rounded-lg p-2 shadow-md"
          >
            <div className="text-lg">
              {amenityIcons[amenity] || <FaArrowUpShortWide />}
            </div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
