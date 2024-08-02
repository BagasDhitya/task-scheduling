import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "../../utils/redux/taskSlice";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Task } from "../../utils/interface/types";
import { RootState } from "../../utils/redux/store";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [task, setTask] = useState<Task>({ id: 0, title: "", description: "" });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = async () => {
    setLoading({ status: true, message: "Adding Task..." });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(addTask({ ...task, id: Date.now() }));
    setTask({ id: 0, title: "", description: "" });
    setLoading({ status: false, message: "" });
  };

  const handleUpdateTask = async (task: Task) => {
    setLoading({ status: true, message: "Updating Task..." });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(updateTask(task));
    setShowModal(false);
    setLoading({ status: false, message: "" });
  };

  const handleDeleteTask = async (id: number) => {
    setLoading({ status: true, message: "Deleting Task..." });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(deleteTask(id));
    setLoading({ status: false, message: "" });
  };

  const openEditModal = (task: Task) => {
    setEditTask(task);
    setShowModal(true);
  };

  if (!isMounted || loading.status) {
    return (
      <Loading message={loading.message ? loading.message : "Loading..."} />
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-md my-20 mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <Input
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Title"
          />
          <Input
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Description"
          />
          <Button onClick={handleAddTask} className="w-full">
            Add Task
          </Button>

          <ul className="mt-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-gray-100 p-2 mb-2 rounded">
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <Button
                  onClick={() => openEditModal(task)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {editTask && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title="Edit Task"
          >
            <Input
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              placeholder="Title"
            />
            <Input
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              placeholder="Description"
            />
            <Button
              onClick={() => handleUpdateTask(editTask)}
              className="bg-blue-500 text-white p-1 rounded w-full"
            >
              Update Task
            </Button>
          </Modal>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
