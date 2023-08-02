const axios = require('axios');

  const login = async (email,password) => {
    try {
        let data = {email,password}
        let response = await axios.post('http://localhost:8080/login',data)
        console.log(`Response is ${JSON.stringify(response.data)}`)
        return JSON.stringify(response.data)
    }    
    catch (error) {
        console.error('Error sending data:', error.message);
        return JSON.stringify(error.message)
    }

}
  const  create = async (email,password,name,type)=> {
    try {
        let data = {email,password,name,type}
      
        let response = await axios.post('http://localhost:8080/create',data)
        console.log(`Response is ${JSON.stringify(response.data)}`)
    }    
    catch (error) {
        console.error('Error sending data:', error.message);
    }

}

module.exports = { login ,create};