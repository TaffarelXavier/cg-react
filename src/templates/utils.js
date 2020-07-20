export function sanitizeStringWithComma(fields) {
  fields = fields
    .split(';')
    .map((item) => {
      return item.trim();
    })
    .filter((item) => {
      return item.length;
    });
  return fields;
}

export function nameCapitalized(field) {
  return field.charAt(0).toUpperCase() + field.slice(1);
}

export function FolderServices() {
  let data = `import Config from './config';
  const axios = require("axios");
  
  const instance = axios.create({
    baseURL: Config.baseUrlApiRest
  });
  
  export default instance `;
  return data;
}

export function TemplateComponentReact(options, crudName, data) {
  return `import React, { useState, useEffect } from 'react';
 import api from '../../services/axios';

 const ${options.componentName + crudName} = () => {
  ${data}
}

export default ${options.componentName + crudName};
 `;
}

export function FileConfigApi() {
  let data = `/**
  * ESTA CONFIGURAÇÃO SERVE PARA QUANDO ESTIVERMOS EM MODO DE DESENVOLVIMENTO
  * OU EM PRODUÇÃO OU EM USANDO OUTROS COMPUTADORES PARA CRIAR O SISTEMA.
  */
 const config = [
   {
     baseUrlApiRest: "http://192.168.129.171:3333",
   }
 ];
 
 const INDEX = 0; //Muda este número conforme seu dispositivo de implantação ou desenvolvimento.
 
//  Object.assign(config[INDEX], {
//    storage_firebase_url:
//      "https://firebasestorage.googleapis.com/v0/b/friendlychat-a879a.appspot.com/o/",
//  });
 
export default config[INDEX];`;
  return data;
}

export default function mathRandomGenerator() {
  return Math.floor(Math.random() * 100);
}
