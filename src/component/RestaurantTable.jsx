import React, { useMemo, useState, useCallback } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { fallback } from "../assets";
import { ApproveIcon, BlockIcon, UnblockIcon, ViewIcon } from "./IconComponent";
import Modal from "./Modal";
import Loader from "./Loader";
import { approveHotel, toggleBlockUnblockHotel } from "../utils/Api";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { FaBan, FaCheck, FaClock } from "react-icons/fa";

const RestaurantTable = ({ data = [], isLoading, onActionCompleted }) => {
  const [filterInput, setFilterInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const token = useSelector((state) => state.auth.userData?.token);

  const handleAction = useCallback(async () => {
    setIsUpdating(true);
    try {
      if (actionType === "active") {
        await approveHotel(selectedId, { is_approved: true }, token);
      } else if (actionType === "block") {
        await toggleBlockUnblockHotel(selectedId, { status: "block" }, token);
      } else if (actionType === "unblock") {
        await toggleBlockUnblockHotel(selectedId, { status: "active" }, token);
      }

      onActionCompleted();
      setShowModal(false);
    } catch (error) {
      console.error(`Error in ${actionType}:`, error);
      setShowModal(false);
    } finally {
      setIsUpdating(false);
    }
  }, [actionType, selectedId, token, onActionCompleted]);

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
        accessor: "profile_image",
        Cell: ({ value }) => (
          <img
            src={value || fallback}
            alt="Profile"
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
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => value || "No Description",
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ value }) => value || "No Address",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          switch (value) {
            case "active":
              return <FaCheck className="text-green-500" />;
            case "block":
              return <FaBan className="text-red-500" />;
            default:
              return "Unknown";
          }
        },
      },
      {
        Header: "Actions",
        Cell: ({ row }) => {
          const { status, id } = row.original;
          const isApproved = status === "active";
          const isBlocked = status === "block";

          return (
            <div className="flex space-x-2">
              <Link
                to={`/restaurants/${row.original.id}`}
                className="text-blue-500 hover:underline"
              >
                {" "}
                <ViewIcon />
              </Link>
              {!isApproved && !isBlocked && (
                <ApproveIcon
                  onClick={() => {
                    setSelectedId(id);
                    setActionType("active");
                    setShowModal(true);
                  }}
                />
              )}
              {isBlocked && (
                <UnblockIcon
                  onClick={() => {
                    setSelectedId(id);
                    setActionType("unblock");
                    setShowModal(true);
                  }}
                />
              )}
              {isApproved && !isBlocked && (
                <BlockIcon
                  onClick={() => {
                    setSelectedId(id);
                    setActionType("block");
                    setShowModal(true);
                  }}
                />
              )}
            </div>
          );
        },
      },
    ],
    []
  );

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

  if (isLoading || isUpdating) {
    return <Loader />;
  }

  if (filteredData.length === 0) {
    return <p>No data found.</p>;
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
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
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
          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={classNames({
                    "opacity-50 cursor-not-allowed":
                      row.original.status === "block",
                  })}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                    >
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
          {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleAction}
          title={`Confirm ${
            actionType === "active" ? "Approval" : "Block/Unblock"
          }`}
        >
          {isUpdating ? (
            <Loader />
          ) : (
            <p>
              Are you sure you want to{" "}
              {actionType === "active" ? "approve" : "block/unblock"} this
              hotel?
            </p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default RestaurantTable;
