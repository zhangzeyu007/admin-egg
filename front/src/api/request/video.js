import axios from "../http";

function getSearch(params) {
  return axios.post("/video/search", params);
}

function getVideoSourse(params) {
  return axios.post("/video/getvideosourse", params);
}

export default {
  getSearch,
  getVideoSourse,
};
