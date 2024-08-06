import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../store/homeSlice";

const useFetch = (url, params = {}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userData?.token);

  // Corrected the state access to use the correct data structure
  const data = useSelector((state) => state.home.data[url]?.data || []);
  const loading = useSelector((state) => state.home.loading);
  const error = useSelector((state) => state.home.error);

  // Fetch data function
  const fetchData = useCallback(() => {
    console.log(data, " before if in fetch data");

    if (token && data) {
      console.log(data, " inside if in fetch data");

      dispatch(fetchApiData({ url, params, token }));
    }
    console.log(data, " after if in fetch data");
  }, [url, dispatch]);

  // Use effect to fetch data initially
  useEffect(() => {
    console.log(data, " inside useEffect");

    if (!data.length && !loading && !error) {
      fetchData();
    }
    console.log(data, " inside useEffect after if");
  }, [data.length, loading, error]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
