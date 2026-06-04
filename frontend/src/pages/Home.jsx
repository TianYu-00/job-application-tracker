import { useState } from "react";
import { fetchJob, saveApplication } from "../api";

const emptyForm = {
  title: "",
  company: "",
  location: "",
  work_type: "",
  description: "",
  url: "",
  applied_at: new Date().toISOString().split("T")[0],
};

function Home() {
  const [mode, setMode] = useState("scrape");
  const [jobLink, setJobLink] = useState("");
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleFetch = () => {
    setSaved(false);
    fetchJob(jobLink)
      .then((res) =>
        setData({
          ...res.data.data,
          applied_at: new Date().toISOString().split("T")[0],
        }),
      )
      .catch(console.error);
  };

  const handleSave = () => {
    saveApplication(data)
      .then(() => setSaved(true))
      .catch(console.error);
  };

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setData(newMode === "manual" ? emptyForm : null);
    setSaved(false);
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-6">
        <button
          className={`border-2 px-4 py-2 ${mode === "scrape" ? "bg-black text-white" : ""}`}
          onClick={() => handleModeSwitch("scrape")}
        >
          Auto
        </button>
        <button
          className={`border-2 px-4 py-2 ${mode === "manual" ? "bg-black text-white" : ""}`}
          onClick={() => handleModeSwitch("manual")}
        >
          Manual
        </button>
      </div>

      {mode === "scrape" && (
        <div className="flex gap-2 mb-6">
          <input
            className="border-2 p-2 flex-1"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            placeholder="Paste job link here"
          />
          <button className="border-2 px-4 py-2" onClick={handleFetch}>
            Fetch job
          </button>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-4">
          {mode === "manual" && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">URL</label>
              <input
                className="border-2 p-2"
                value={data.url || ""}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Title</label>
            <input
              className="border-2 p-2"
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Company</label>
            <input
              className="border-2 p-2"
              value={data.company || ""}
              onChange={(e) => setData({ ...data, company: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Location</label>
            <input
              className="border-2 p-2"
              value={data.location || ""}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Work Type</label>
            <select
              className="border-2 p-2"
              value={data.work_type || ""}
              onChange={(e) => setData({ ...data, work_type: e.target.value })}
            >
              <option value="">Unknown</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="border-2 p-2 h-40 resize-none"
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              readOnly={mode === "scrape"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Applied At</label>
            <input
              type="date"
              className="border-2 p-2"
              value={data.applied_at || new Date().toISOString().split("T")[0]}
              onChange={(e) => setData({ ...data, applied_at: e.target.value })}
            />
          </div>

          <button className="border-2 px-4 py-2 w-fit" onClick={handleSave}>
            Save Application
          </button>

          {saved && <p className="text-green-600">Application saved!</p>}
        </div>
      )}
    </div>
  );
}

export default Home;
