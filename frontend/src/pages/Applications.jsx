import { useState, useEffect } from "react";
import { fetchApplications } from "../api";

function Applications() {
  const [applications, setApplications] = useState([]);

  const handleFetchApplications = () => {
    fetchApplications()
      .then((res) => {
        setApplications(res.data.data);
        console.log(res.data.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleFetchApplications();
  }, []);

  return <div>Applications</div>;
}

export default Applications;
