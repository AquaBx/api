let esir = require("./libs/sallesESIR.js")

const axios = require('axios');

async function request(url){
  let resp = await axios.get(url);
  return resp.data;
};

module.exports = async function (req, res) {
    let all_salles = await request("https://cdn.jsdelivr.net/gh/AquaBx/salles_esir@latest/salles/data.json")
  
    let date = Date.now()
    if (req.query.time){
        date = req.query.time
    }

  try {
    let salles = JSON.parse(req.query.salles)
    let resp = {}
    
    if (req.query.type == "events"){
        for (let salle of salles){
            let key = all_salles[salle]          
            let result = await esir.salleEvents(key,date);
            resp[salle] = result
        }
    }
    else if (req.query.type == "libres"){
        for (let salle of salles){
            let key = all_salles[salle]            
            let result = await esir.salleLibres(key,date);
            resp[salle] = result
        }
    }
    else{
    }  

    return res.status(200).json(resp);
  } 
  catch (error) {
    return res.status(500).json(error);
  }
};
