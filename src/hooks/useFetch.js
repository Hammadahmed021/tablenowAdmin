// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchApiData } from "../store/homeSlice";

// const useFetch = (url, params = {}) => {
//   const dispatch = useDispatch();
  
//   const token = useSelector((state) => state.auth.userData?.token);

//   const data = useSelector((state) => {
//     const homeData = state.home?.data || {}; // Safely access the `home.data`
//     return homeData[url] || []; // Return data for the specific URL or an empty array
//   });

//   const loading = useSelector((state) => state.home.loading);
//   const error = useSelector((state) => state.home.error);

//   const fetchData = useCallback(() => {
//     if (token && !loading && !data.length && !error) {
//       dispatch(fetchApiData({ url, params, token }));
//     }
//   }, [url, params, token, dispatch, loading, data.length, error]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { data, error, loading, refetch: fetchData };
// };

// export default useFetch;


import { useState, useEffect, useCallback } from "react";
import { getListDetails } from "../utils/Api"; // Assuming this function is used for fetching data

const useFetch = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('adminToken');

  // useCallback to prevent fetchData from being re-created on every render
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getListDetails(url, params, token);
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url, params, token]);

  useEffect(() => {
    fetchData();
  }, []); // Only runs when fetchData changes

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;


