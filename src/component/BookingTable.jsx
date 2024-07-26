import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaTrash, FaSearch } from 'react-icons/fa'; // Import the delete and search icons
import Modal from "./Modal"; // Adjust the path if needed

const BookingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace this with your data fetching logic
    const fetchData = async () => {
      try {
        // Example dummy data
        const result = [
          {
            id: "1",
            restaurantName: "The Gourmet Bistro",
            menu: "Pizza, Pasta",
            date: "2024-07-26",
            time: "19:00",
            price: "$50",
          },
          {
            id: "2",
            restaurantName: "Sushi Palace",
            menu: "Sushi, Ramen",
            date: "2024-07-27",
            time: "20:00",
            price: "$70",
          },
          // Add more bookings as needed
        ];
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
    () => data.filter(item => 
      item.restaurantName.toLowerCase().includes(search.toLowerCase())
    ),
    [data, search]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Restaurant Name",
        accessor: "restaurantName",
      },
      {
        Header: "Menu",
        accessor: "menu",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedBookingId(value);
                setShowModal(true);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDeleteBooking = () => {
    console.log(`Deleting booking with ID: ${selectedBookingId}`);
    // Implement the deletion logic here
    setData(data.filter(booking => booking.id !== selectedBookingId));
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey">
          Bookings
        </h2>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Restaurant Name"
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
          onYes={handleDeleteBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BookingTable;
