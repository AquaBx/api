//import { JSDOM } from 'jsdom';
const axios = require('axios')

module.exports = async function (req, res) {
  const url = "https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/KYNvDgYv.shu";
  try {
    const result = await axios.get(url);

    return res.status(200).json(result.data);
  } 
  catch (error) {
    return res.status(200).json(error);
  }
};