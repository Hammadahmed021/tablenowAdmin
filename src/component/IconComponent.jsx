import React from "react";
import { FaEye, FaBan, FaCheck, FaUndo } from "react-icons/fa";
import Tooltip from "./Tooltip"; // Import the Tooltip component

const ApproveIcon = ({ onClick }) => (
  <Tooltip text="Approve">
    <FaCheck
      className="text-green-500 hover:text-green-700 cursor-pointer"
      onClick={onClick}
    />
  </Tooltip>
);

const BlockIcon = ({ onClick }) => (
  <Tooltip text="Block">
    <FaBan
      className="text-red-500 hover:text-red-700 cursor-pointer"
      onClick={onClick}
    />
  </Tooltip>
);

const UnblockIcon = ({ onClick }) => (
  <Tooltip text="Unblock">
    <FaUndo
      className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
      onClick={onClick}
    />
  </Tooltip>
);

const ViewIcon = ({ onClick }) => (
  <Tooltip text="View Details">
    <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={onClick} />
  </Tooltip>
);

export { ApproveIcon, BlockIcon, UnblockIcon, ViewIcon };
