import axios from "axios";
import { baseUrlStaging, baseUrlTest } from "./baseUrl";

const instance = axios.create({
  baseURL: `${baseUrlTest}/api/`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
