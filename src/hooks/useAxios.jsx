import axios from "axios";

const token = JSON.parse(localStorage.getItem("auth"))

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://ayotto-test-server-five.vercel.app/api",
  withCredentials: true,
  headers:{
    Authorization: `${token?.token}`
  }
});
console.log(token?.token);
const useAxios = () => {
  
  return axiosPublic;
};

export default useAxios;
