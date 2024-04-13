import axios from "../http";

function getvideourl(params) {
  return axios.post("/dou/getvideourl", params);
}

export default {
  getvideourl,
};
