import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchJob = (url) => {
  return api.get("/scrape", {
    params: { url },
  });
};

export default api;
