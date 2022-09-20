import { useState, useEffect } from "react";

const useFetch = (url) => {

  const full_url = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;
  const [endpoint, setEndpoint] = useState(full_url);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokens, ] = useState(localStorage.getItem("news-app-authToken") || {});


  function fetchData(){
    fetch(full_url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      if (!res.ok){
        throw Error(res.statusText);
      }
      return res.json();
    })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
        .catch((err) => {
          if (err.message === "Failed to fetch"){
            setError("Please check your internet connection")
          }else{
            setError(err.message);
          }
          setIsLoading(false);
        })
  };

  function paginator(page){
    setEndpoint(
      `${endpoint}&page=${page}`
    )
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      if (!res.ok){
        throw Error(res.statusText);
      }
      return res.json();
    })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
        .catch((err) => {
          if (err.message === "Failed to fetch"){
            setError("Please check your internet connection")
          }else{
            setError(err.message);
          }
          setIsLoading(false);
        })
  };
  
  function handleSearchInput(value){
    for (var key of Object.keys(value)){
      setEndpoint(endpoint.concat("&", key, "=", value[key]));
    }
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      if (!res.ok){
        throw Error(res.statusText);
      }
      return res.json();
    })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
        .catch((err) => {
          if (err.message === "Failed to fetch"){
            setError("Please check your internet connection")
          }else{
            setError(err.message);
          }
          setIsLoading(false);
        })
  };
  // eslint-disable-next-line
  useEffect(fetchData, [url]);

  return {data, isLoading, error, setData, fetchData, handleSearchInput, paginator};
};

export default useFetch;
