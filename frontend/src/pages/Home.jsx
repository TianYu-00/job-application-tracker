import { useState, useEffect } from "react";
import { fetchJob } from "../api";

function home() {
  const [data, setData] = useState(null);
  const [jobLink, setJobLink] = useState("");

  const handleFetch = () => {
    fetchJob(jobLink)
      .then((res) => {
        setData(res.data.data);
      })
      .catch(console.error);
  };

  return (
    <div>
      <input
        className="border-2"
        value={jobLink}
        onChange={(e) => setJobLink(e.target.value)}
        placeholder="Paste job link here"
      />
      <button className="border-2" onClick={handleFetch}>
        Fetch job
      </button>
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.company}</p>
          <p>{data.location}</p>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
}

export default home;
