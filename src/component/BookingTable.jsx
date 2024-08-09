import React, { useState, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const BookingTable = ({ data = [], loading, error }) => {
  const [search, setSearch] = useState("");

  // Filter data based on search input
  const filteredData = useMemo(
    () => data.filter(booking => {
      const restaurantName = booking.hotel?.name || "";
      const userName = booking.user?.name || "";
      return (
        restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        userName.toLowerCase().includes(search.toLowerCase())
      );
    }),
    [data, search]
  );

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Restaurant Name",
        accessor: booking => booking.hotel?.name || "", // Adjusted for nested objects
      },
      {
        Header: "User Name",
        accessor: booking => booking.user?.name || "Guest", // Adjusted for nested objects
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      // Remove the following columns
      // {
      //   Header: "Menu",
      //   accessor: "menu",
      // },
      // {
      //   Header: "Price",
      //   accessor: "price",
      // },
      // {
      //   Header: "Actions",
      //   accessor: "id",
      //   Cell: ({ row }) => (
      //     <div className="flex space-x-2">
      //       <Link to={`/bookings/${row.original.id}`}>
      //         <FaEye className="text-blue-500 hover:text-blue-700" />
      //       </Link>
      //     </div>
      //   ),
      // },
    ],
    []
  );

  // Set up table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  // Handle loading and error states
  if (loading) return <p className="text-center"><Loader /></p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey">
          Bookings
        </h2>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Restaurant Name or User Name"
            className="p-2 border rounded w-auto"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : "🔽"}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map(row => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-1 py-0 bg-admin_dark text-white rounded"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-1 py-0 bg-admin_dark text-white rounded"
          >
            {"<"}
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-1 py-0 bg-admin_dark text-white rounded"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="px-1 py-0 bg-admin_dark text-white rounded"
          >
            {">>"}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingTable;
