import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchJob = (url) => {
  return api.post("/scrape", {
    url,
  });
};

export const fetchApplications = () => {
  return api.get("/applications");
};

export default api;
