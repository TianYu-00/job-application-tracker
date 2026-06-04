import { useState, useEffect } from "react";
import ApplicationTable from "../components/ApplicationTable";
import { fetchApplications } from "../api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApplications({ page, search })
      .then((res) => {
        setApplications(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, search]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ApplicationTable
          data={applications}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          search={search}
          onSearchChange={handleSearch}
        />
      )}
    </div>
  );
}

export default Applications;
