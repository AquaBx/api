let esir = require("./libs/sallesESIR.js")

const axios = require('axios');

async function fetch(url){
  const resp = await axios.get(url);
  return JSON.parse(resp.data);
};

module.exports = async function (req, res) {
    let all_salles = await fetch("https://cdn.jsdelivr.net/gh/AquaBx/salles_esir@latest/salles/data.json")
  
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
            resp[key] = result
        }
    }
    else if (req.query.type == "libres"){
        for (let salle of salles){
            let key = all_salles[salle]
            
            let result = await esir.salleLibres(key,date);
            resp[key] = result
        }
    }
    else{
    }  

    return res.status(200).json(resp);
  } 
  catch (error) {
    return res.status(200).json(error);
  }
};
