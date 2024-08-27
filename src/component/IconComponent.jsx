import React from "react";
import {
  FaCheck,
  FaBan,
  FaUndo,
  FaRegEye,
} from "react-icons/fa";
import Tooltip from "./Tooltip"; // Import the Tooltip component

const iconBaseStyles =
  "cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 p-2 rounded-full";

const ApproveIcon = ({ onClick }) => (
  <Tooltip text="Approve">
    <div
      className={`bg-green-100 hover:bg-green-200 text-green-600 ${iconBaseStyles} shadow-md`}
      onClick={onClick}
    >
      <FaCheck size={14} />
    </div>
  </Tooltip>
);

const BlockIcon = ({ onClick }) => (
  <Tooltip text="Block">
    <div
      className={`bg-red-100 hover:bg-red-200 text-red-600 ${iconBaseStyles} shadow-md`}
      onClick={onClick}
    >
      <FaBan size={14} />
    </div>
  </Tooltip>
);

const UnblockIcon = ({ onClick }) => (
  <Tooltip text="Unblock">
    <div
      className={`bg-yellow-100 hover:bg-yellow-200 text-yellow-600 ${iconBaseStyles} shadow-md`}
      onClick={onClick}
    >
      <FaUndo size={14} />
    </div>
  </Tooltip>
);

const ViewIcon = ({ onClick }) => (
  <Tooltip text="View Details">
    <div
      className={`bg-admin_light hover:bg-admin_light_grey text-admin_dark ${iconBaseStyles} shadow-md`}
      onClick={onClick}
    >
      <FaRegEye size={14} />
    </div>
  </Tooltip>
);

export { ApproveIcon, BlockIcon, UnblockIcon, ViewIcon };
