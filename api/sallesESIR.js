let esir = require("https://raw.githubusercontent.com/AquaBx/salles_esir/main/module_salles.js");

module.exports = async function (req, res) {
  let date = Date.now()
  if (req.query.time){
      date = req.query.datimete
  }

  try {
    let salles = JSON.parse(req.query.salles)
    let resp = {}
    if (req.query.type == "events"){
        for (let key of salles){
            let result = await esir.salleEvents(key,date);
            resp[key] = result
        }
    }
    else if (req.query.type == "libres"){
        for (let key of salles){
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
