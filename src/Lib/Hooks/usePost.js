import { useState } from "react";


const usePost = (url) => {
    
    const full_url = `${process.env.REACT_APP_BACKEND_API_URL}${url}`;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const tokens = localStorage.getItem("news-app-authToken") || {};

    
    function handleAuth(formData){
        fetch(full_url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + tokens
        },
        body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        localStorage.setItem("news-app-authToken", resObj?.authToken)
                        setIsLoading(false);
                        setError(false)
                        setData(resObj);
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(true)
                        setData(resObj);
                    })
            }
        })
    };
    
    function handlePut(formData){
        fetch(full_url, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + tokens
        },
        body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(false)
                        setData(resObj);
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(true)
                        setData(resObj);
                    })
            }
        })
    };
    
    function handlePost(formData){
        fetch(full_url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + tokens
        },
        body: JSON.stringify(formData)
        })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(false)
                        setData(resObj);
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(true)
                        setData(resObj);
                    })
            }
        })
    };
    
    function handleDelete(id){
        const payload = {
            id: id
        }
        fetch(full_url, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + tokens
        },
        body: JSON.stringify(payload)
        })
        .then((response) => {
            if (response.ok){
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(false)
                        setData(resObj);
                        })
            } else {
                let promise = response.json()
                promise
                    .then((resObj) => {
                        setIsLoading(false);
                        setError(true)
                        setData(resObj);
                    })
            }
        })
    };

    return {data, isLoading, error, setData,  handleAuth, handlePut, handlePost, handleDelete};
}
 
export default usePost;