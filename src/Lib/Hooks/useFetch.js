import { useState, useEffect } from "react";

const JsonBigInt = require("json-bigint")({"storeAsString": true});

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
      return res.text();
    })
      .then((text) => {
        return JsonBigInt.parse(text)
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
    let paginatedUrl = `${endpoint}&page=${page}`
    fetch(paginatedUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      if (!res.ok){
        throw Error(res.statusText);
      }
      return res.text();
    })
      .then((text) => {
        return JsonBigInt.parse(text)
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

    setEndpoint(
      `${endpoint}&page=${page}`
    )
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
      return res.text();
    })
      .then((text) => {
        return JsonBigInt.parse(text)
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

  function normalFetch(normalUrl){
    const fullNormalUrl = `${process.env.REACT_APP_BACKEND_API_URL}${normalUrl}`;
    fetch(fullNormalUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + tokens
      }
    })
    .then((res) => {
      if (!res.ok){
        throw Error(res.statusText);
      }
      return res.text();
    })
      .then((text) => {
        return JsonBigInt.parse(text)
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

  return {data, isLoading, error, setData, fetchData, handleSearchInput, paginator, normalFetch};
};

export default useFetch;
