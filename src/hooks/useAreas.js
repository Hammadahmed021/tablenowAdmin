import { useState, useEffect, useCallback } from 'react';
import { addArea, updateArea, deleteArea, getAreas } from '../utils/Api';
import { useSelector } from 'react-redux';

const useAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.userData?.token);

  const fetchareas = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAreas(token);
      console.log('Fetched areas:', data); // Debugging
      setAreas(data);
    } catch (error) {
      console.error('Error fetching areas:', error); // Debugging
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchareas();
  }, [fetchareas]);

  const addNewArea = async (area) => {
    try {
      setLoading(true);
      const newArea = await addArea(area, token);
      console.log('New area added:', newArea); // Debugging
      setAreas((prev) => [...prev, newArea]);
    } catch (error) {
      console.error('Error adding area:', error); // Debugging
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateExistingArea = async (id, area) => {
    try {
      setLoading(true);
      const updatedArea = await updateArea(id, area, token);
      console.log('Area updated:', updatedArea); // Debugging
      setAreas((prev) =>
        prev.map((f) => (f.id === id ? updatedArea : f))
      );
    } catch (error) {
      console.error('Error updating Area:', error); // Debugging
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingArea = async (id) => {
    try {
      setLoading(true);
      await deleteArea(id, token);
      console.log('Area deleted:', id); // Debugging
      setAreas((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error('Error deleting Area:', error); // Debugging
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Add refetchareas method
  const refetchareas = useCallback(() => {
    fetchareas();
  }, [fetchareas]);

  return { areas, loading, error, addNewArea, updateExistingArea, deleteExistingArea, refetchareas };
};

export default useAreas;
