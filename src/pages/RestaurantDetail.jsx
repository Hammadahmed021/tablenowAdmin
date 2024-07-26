import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fallback } from '../assets';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://virtualrealitycreators.com/tablenow-backend/api/filter`)
      .then((response) => {
        const restaurantData = response.data.find(rest => rest.id.toString() === id);
        if (restaurantData) {
          setRestaurant(restaurantData);
        } else {
          setError('Restaurant not found');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurant data: ", error);
        setError('Restaurant not found');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{restaurant.name || 'No Name'}</h2>
      <img
        src={restaurant.galleries && restaurant.galleries.length > 0 ? restaurant.galleries[0].image : fallback}
        alt="Restaurant"
        className="w-full h-64 object-cover mb-4"
      />
      <p><strong>Cuisine:</strong> {restaurant.menu_types ? restaurant.menu_types.map(type => type.name).join(', ') : 'No Cuisine'}</p>
      <p><strong>Location:</strong> {restaurant.address || 'No Address'}</p>
      <p><strong>Facilities:</strong> {restaurant.facilities ? restaurant.facilities.map(facility => facility.name).join(', ') : 'No Facilities'}</p>
    </div>
  );
};

export default RestaurantDetail;
