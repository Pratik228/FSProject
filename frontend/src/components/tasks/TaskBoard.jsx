import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import { taskAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const TaskBoard = () => {
  const { handleError } = useAuth();
  const [tasks, setTasks] = useState({
    pending: [],
    completed: [],
    done: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const loadTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      const grouped = response.data.reduce(
        (acc, task) => {
          acc[task.status] = [...(acc[task.status] || []), task];
          return acc;
        },
        { pending: [], completed: [], done: [] }
      );
      setTasks(grouped);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };

      // If editing, remove from all statuses first to prevent duplicates
      Object.keys(newTasks).forEach((status) => {
        newTasks[status] = newTasks[status].filter(
          (t) => t._id !== updatedTask._id
        );
      });

      // Add to new status
      const status = updatedTask.status || "pending";
      newTasks[status] = [updatedTask, ...newTasks[status]];

      return newTasks;
    });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        await taskAPI.deleteTask(taskId);
        setTasks((prevTasks) => {
          const newTasks = { ...prevTasks };
          Object.keys(newTasks).forEach((status) => {
            newTasks[status] = newTasks[status].filter((t) => t._id !== taskId);
          });
          return newTasks;
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await taskAPI.updateTask(taskId, { status: newStatus });
      if (response.data) {
        handleTaskUpdate(response.data);
      }
    } catch (error) {
      handleError(error);
      loadTasks(); // Fallback reload on error
    }
  };

  const columns = [
    { id: "pending", title: "Pending" },
    { id: "completed", title: "Completed" },
    { id: "done", title: "Done" },
  ];

  return (
    <div className="p-4 bg-base-300 min-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setTaskToEdit(null);
          }}
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          onClose={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
          taskToEdit={taskToEdit}
          onTaskUpdate={handleTaskUpdate}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(({ id, title }) => (
          <div
            key={id}
            className="bg-base-100 p-6 rounded-lg shadow-lg min-h-[200px]"
          >
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <div className="space-y-4">
              {tasks[id]?.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
