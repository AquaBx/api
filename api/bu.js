const axios = require('axios');
const jsdom = require("jsdom");

async function request(url){
  const resp = await axios.get(url);
  return resp.data;
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var hh = this.getHours()
  var dd = (hh>20 ? 1 : 0) + this.getDate();        
  return [this.getFullYear().toString(), (mm>9 ? '' : '0') + mm.toString(), (dd>9 ? '' : '0') + dd.toString()].join('-');
};

async function parse(url){
    var req = await request(url)
    const dom = new jsdom.JSDOM(req);
    const document = dom.window.document
    var lis2 = document.querySelectorAll("tr")
    var liste2 = []
    for (var tr of lis2) {
        var nlist = []
        var th = tr.querySelectorAll("th")
      if (th.length == 0){
        th = tr.querySelectorAll("td")
      }

      for (var td of th){
            var txt = td.textContent
            txt = txt.split("\n").join("")
            txt = txt.split(" ").join("")     
            nlist.push(txt)
      }
      liste2.push(nlist)
    }
    liste2[0][0] = "Jours"
    return liste2
}

module.exports = async function (req, res) {
    let date
    if (req.query.date){
      //let time = req.query.date
      //date = (new Date(time)).yyyymmdd();
      date = req.query.date
    }
    
    var url = "https://univ-rennes1.libcal.com/widget/hours/grid?systemTime=1&date="+date
    try{
      var result = await parse(url)
      res.status(200).json(result);
    } 
    catch (error) {
      return res.status(200).json(error);
    }
}