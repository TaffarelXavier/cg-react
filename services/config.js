/**
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
 
export default config[INDEX];