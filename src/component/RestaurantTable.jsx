import React, { useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { fallback } from "../assets";
import { FaEye, FaBan } from "react-icons/fa";
import Modal from "./Modal"; // Make sure to import the Modal component

const RestaurantTable = ({ data = [], isLoading }) => {
  const [filterInput, setFilterInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) =>
      (item.name || "").toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [data, filterInput]);

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "galleries",
        Cell: ({ value }) => (
          <img
            src={value && value.length > 0 ? value[0].image : fallback}
            alt="Restaurant"
            className="w-16 h-16 object-cover"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Link
            to={`/restaurants/${row.original.id}`}
            className="text-blue-500 hover:underline"
          >
            {row.values.name || "No Name"}
          </Link>
        ),
      },
      {
        Header: "Cuisine",
        accessor: "menu_types",
        Cell: ({ value }) =>
          value && value.length > 0
            ? value.map((type) => type.name).join(", ")
            : "No Cuisine",
      },
      {
        Header: "Facilities",
        accessor: "facilities",
        Cell: ({ value }) =>
          value && value.length > 0
            ? value.map((facility) => facility.name).join(", ")
            : "No Facilities",
      },
      {
        Header: "Location",
        accessor: "address",
        Cell: ({ value }) => value || "No Address",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link to={`/restaurants/${row.original.id}`}>
              <FaEye className="text-blue-500 hover:text-blue-700" />
            </Link>
            <FaBan
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => {
                setSelectedUserId(row.original.id);
                setShowModal(true);
              }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleBlockUser = () => {
    console.log(`Blocking user with ID: ${selectedUserId}`);
    // Add your block user logic here
  };

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

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (filteredData.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey m-0">
          Restaurants
        </h2>
        <input
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value || "")}
          placeholder="Search by name"
          className="p-2 border rounded w-auto"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : " 🔽"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        {cell.render("Cell")}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4 items-center">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
          <span className="mx-2">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-2 p-1 border rounded"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {showModal && (
        <Modal
          title="Are you sure you want to block this user?"
          onYes={handleBlockUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RestaurantTable;
