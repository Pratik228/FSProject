/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ConfirmationModal from "../ConfirmationModal";

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const statusColors = {
    pending: "bg-amber-100 text-amber-900",
    completed: "bg-blue-100 text-blue-900",
    done: "bg-emerald-100 text-emerald-900",
  };

  const nextStatus = {
    pending: "completed",
    completed: "done",
    done: "pending",
  };

  useEffect(() => {
    setCurrentStatus(task.status);
  }, [task.status]);

  const handleStatusChange = async () => {
    const newStatus = nextStatus[currentStatus];
    setCurrentStatus(newStatus);
    onStatusChange(task._id, newStatus);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const openModal = () => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    await onDelete(taskToDelete._id);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`card ${statusColors[currentStatus]} rounded-lg p-4 mb-2 transition-all duration-300`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium mb-1">{task.title}</h4>
            <p className="text-sm opacity-75">{task.description}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={handleStatusChange}
              className="text-sm px-2 py-1 bg-white/50 rounded hover:bg-white/70 transition-colors"
            >
              Move to {nextStatus[currentStatus]}
            </button>
            <button
              onClick={openModal}
              className="hover:bg-opacity-20 rounded p-1"
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="text-xs opacity-60 flex justify-between mt-2">
          <span>Created: {formatDate(task.createdAt)}</span>
          <span>Updated: {formatDate(task.updatedAt)}</span>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TaskCard;
