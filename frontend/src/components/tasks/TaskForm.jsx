/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { taskAPI } from "../../utils/api";

const TaskForm = ({ onClose, taskToEdit, onTaskUpdate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const { handleError, handleSuccess } = useAuth();

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        _id: taskToEdit._id,
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (taskToEdit) {
        const { _id, ...updateData } = task;
        response = await taskAPI.updateTask(_id, updateData);
      } else {
        response = await taskAPI.createTask(task);
      }

      if (response.data) {
        onTaskUpdate(response.data);
        handleSuccess(taskToEdit ? "Task updated" : "Task created");
        onClose();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {taskToEdit ? "Edit Task" : "Create Task"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {taskToEdit ? "Update" : "Create"}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
