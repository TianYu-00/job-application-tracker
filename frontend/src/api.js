import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchJob = (url) => {
  return api.post("/scrape", {
    url,
  });
};

export const fetchApplications = ({ page = 1, limit = 15, search = "" } = {}) => {
  return api.get("/applications", { params: { page, limit, search } });
};

export default api;
