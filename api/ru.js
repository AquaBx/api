const axios = require('axios');
const jsdom = require("jsdom");

async function request(url){
  const resp = await axios.get(url);
  return resp.data;
};

function parse_date(str){
  str = str.split(" ")
  let mois = {"janvier":"01","février":"02","mars":"03","avril":"04","mai":"05","juin":"06","juillet":"07","août":"08","septembre":"09","octobre":"10","novembre":"11","décembre":"12"}
  return Date.parse(str[1] + "/" + mois[str[2]] + "/" + str[3])
}

async function parse(url){
  var req = await request(url)
  const dom = new jsdom.JSDOM(req);
  const document = dom.window.document

  let lis2 = document.querySelectorAll("#menu-repas .slides > li")

  let liste2 = []
  for (let tr of lis2) {
      let nlist = {}
      var title = tr.querySelectorAll("h3")[0].textContent.split("Menu du ")[1]
      var date = parse_date(title)
      var datenow = Date.now()

      if(date+72900000 > datenow){
          nlist["date"] = title

          let div = tr.querySelectorAll(".content > div")          
          
          for (let content of div){
            let h4 = content.querySelectorAll("h4")[0].textContent
            let menu = content.querySelectorAll(".content-repas")[0].textContent

            nlist[h4] = menu
          }
          liste2.push(nlist)
      }
  }
  return liste2
}

module.exports = async function (req, res) {
    try{
      var url = "https://www.crous-rennes.fr/restaurant/resto-u-"+req.query.q
      var result = await parse(url)
      res.status(200).json(result);
    } 
    catch (error) {
      return res.status(200).json(error);
    }
}
