const axios = require('axios');
const jsdom = require("jsdom");

async function request(url){
  const resp = await axios.get(url);
  return resp.data;
};

async function parse(url){
  var req = await request(url)
  const dom = new jsdom.JSDOM(req);
  const document = dom.window.document

  let lis2 = document.querySelectorAll("#menu-repas .slides > li")

  let liste2 = []
  for (let tr of lis2) {
      let nlist = []
      console.log(tr)
      var title = tr.querySelectorAll("h3")[0].textContent.split("Menu du ")[1]
      var date = new Date(title)
      var datenow = Date.now()
      if(date.getTime()+72900000 > datenow){
          nlist.push(title)
          let div = tr.querySelectorAll(".content > div")

          for (let content of div){
              nlist.push(content.innerHTML)
          }
          liste2.push(nlist)
      }
  }
  return liste2
}

module.exports = async function (req, res) {
    //try{
      var url = "https://www.crous-rennes.fr/restaurant/resto-u-"+req.query.q
      var result = await parse(url)
      res.status(200).json(result);
    //} 
    //catch (error) {
    //  return res.status(200).json(error);
    //}
}
