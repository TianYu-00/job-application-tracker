import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const workTypeBadgeVariant = (workType) => {
  switch (workType) {
    case "Remote":
      return "default";
    case "Hybrid":
      return "secondary";
    case "On-site":
      return "outline";
    default:
      return "outline";
  }
};

const statusBadgeVariant = (status) => {
  switch (status) {
    case "Applied":
      return "secondary";
    case "Interview":
      return "default";
    case "Offer":
      return "success";
    case "Rejected":
      return "danger";
    default:
      return "outline";
  }
};

const columns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "work_type",
    header: "Work Type",
    cell: (info) => {
      const val = info.getValue();
      return val ? (
        <Badge variant={workTypeBadgeVariant(val)}>{val}</Badge>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const val = info.getValue();
      return val ? (
        <Badge variant={statusBadgeVariant(val)} className="w-20 justify-center">
          {val}
        </Badge>
      ) : null;
    },
  },
  {
    accessorKey: "applied_at",
    header: "Applied At",
    cell: (info) => (
      <span className="text-muted-foreground text-sm">{new Date(info.getValue()).toLocaleDateString()}</span>
    ),
  },
];

function SortIcon({ column }) {
  if (column.getIsSorted() === "asc") return <ChevronUp className="w-3 h-3" />;
  if (column.getIsSorted() === "desc") return <ChevronDown className="w-3 h-3" />;
  return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
}

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
    <div className="flex flex-col gap-4">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search applications... (press Enter)"
      />

      <div className="rounded-lg border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIcon column={header.column} />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-t border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
            Prev
          </Button>

          <Input
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onBlur={handlePageInput}
            onKeyDown={(e) => e.key === "Enter" && handlePageInput(e)}
            className="w-14 text-center appearance-none"
          />

          <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTable;
