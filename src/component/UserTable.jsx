import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaEye, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { getAllUsers } from "../utils/localDB";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(
    () => data.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Link to={`/users/${row.original.id}`}>
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

  const handleDeleteUser = () => {
    console.log(`Deleting user with ID: ${selectedUserId}`);
    // Implement the deletion logic here
    setData(data.filter(user => user.id !== selectedUserId));
    setShowModal(false);
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey">
          Users
        </h2>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
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
                        : " 🔽"}
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
      <div className="flex justify-between mt-4 items-center">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>{"<"}</button>
          <span className="mx-2">Page {pageIndex + 1} of {pageOptions.length}</span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>{">"}</button>
          <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>{">>"}</button>
        </div>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="ml-2 p-1 border rounded">
          {[5, 10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>Show {size}</option>
          ))}
        </select>
      </div>

      {/* Custom Modal for confirming deletion */}
      {showModal && (
        <Modal
          title="Confirm Deletion"
          onYes={handleDeleteUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
