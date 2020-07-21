import Config from './config';
  const axios = require("axios");
  
  const instance = axios.create({
    baseURL: Config.baseUrlApiRest
  });
  
  export default instance 