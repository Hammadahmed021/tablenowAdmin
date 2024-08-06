import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fallback } from "../assets";
import useFetch from "../hooks/useFetch";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading, error: fetchError } = useFetch("admin/getUsers/hotel");

  useEffect(() => {
    // Check if the data is already available
    if (data && data.length) {
      const restaurantData = data.find((rest) => rest.id.toString() === id);
      console.log(restaurantData, 'restaurantData');
      
      if (restaurantData) {
        setRestaurant(restaurantData);
        setIsLoading(false);
      } else {
        setError("Restaurant not found");
        setIsLoading(false);
      }
    } else if (!loading && fetchError) {
      // If there's an error from useFetch
      setError(fetchError);
      setIsLoading(false);
    }
  }, [data, id, loading, fetchError]);

  // If the data is still loading from the API or Redux
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching or finding the data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {restaurant.name || "No Name"}
      </h2>
      <img
        src={
          restaurant.galleries && restaurant.galleries.length > 0
            ? restaurant.galleries[0].image
            : fallback
        }
        alt="Restaurant"
        className="w-full h-64 object-cover mb-4"
      />
      <p>
        <strong>Cuisine:</strong>{" "}
        {restaurant.menu_types
          ? restaurant.menu_types.map((type) => type.name).join(", ")
          : "No Cuisine"}
      </p>
      <p>
        <strong>Location:</strong> {restaurant.address || "No Address"}
      </p>
      <p>
        <strong>Facilities:</strong>{" "}
        {restaurant.facilities
          ? restaurant.facilities.map((facility) => facility.name).join(", ")
          : "No Facilities"}
      </p>
    </div>
  );
};

export default RestaurantDetail;
