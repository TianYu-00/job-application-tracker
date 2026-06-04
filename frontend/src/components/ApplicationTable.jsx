import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { useState, useEffect } from "react";

const columns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "work_type", header: "Work Type" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "applied_at",
    header: "Applied At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
];

function ApplicationTable({ data, page, totalPages, onPageChange, search, onSearchChange }) {
  const [sorting, setSorting] = useState([]);
  const [inputValue, setInputValue] = useState(search);
  const [pageInput, setPageInput] = useState(page);

  useEffect(() => {
    setPageInput(page);
  }, [page]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchChange(inputValue);
    }
  };

  const handlePageInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      onPageChange(val);
    } else {
      setPageInput(page);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search applications... (press Enter)"
        className="border p-2 mb-4 w-full"
      />

      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border p-2 cursor-pointer select-none text-left"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span>Page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onBlur={handlePageInput}
          onKeyDown={(e) => e.key === "Enter" && handlePageInput(e)}
          className="border px-2 py-1 w-16 text-center"
        />
        <span>of {totalPages}</span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ApplicationTable;
