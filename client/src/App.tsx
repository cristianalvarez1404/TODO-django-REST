import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import type { TaskType } from "./utilities/Types";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedTask, setCompletedTask] = useState(false);

  const fetchTask = () => {
    fetch("http://127.0.0.1:8000/api-tasks/tasks", { method: "GET" })
      .then((res) => {
        if (res.ok && res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error("Error in request, check again");
        }
      })
      .then((data) => setTasks(data.results))
      .catch((err) => setError(err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const task = {
      title,
      description,
      completed: completedTask,
    };

    fetch("http://127.0.0.1:8000/api-tasks/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (res.ok && res.status >= 200 && res.status < 300) {
          return res.json();
        } else {
          throw new Error("Error in request, check again");
        }
      })
      .then(() => {
        setOpenModal(false);
        setTitle("");
        setDescription("");
        setCompletedTask(false);
        fetchTask();
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    const searchData = fetchTask;
    searchData();
  }, []);

  return (
    <>
      <div className="text-white">
        <h1 className="text-3xl mb-5">Tasks</h1>
        <div className="flex justify-end items-center text-3xl mb-5 cursor-pointer">
          <i
            className="fa-solid fa-plus"
            onClick={() => setOpenModal(!openModal)}
          ></i>
        </div>
        <div className="flex gap-5 flex-wrap justify-start">
          {tasks && tasks.length > 0 ? (
            tasks.map((task: TaskType) => <Task task={task} key={task.id} />)
          ) : (
            <div>There's not tasks now 😭</div>
          )}
          {error && <p>{error}</p>}
        </div>
        {openModal && (
          <div className="rounded-4xl bg-gray-500 opacity-95 border-gray-400 border absolute top-1/4 left-1/4 w-1/2 h-1/3 p-6 flex flex-col text-left ">
            <h3 className="text-2xl text-center mb-2">Creating task...</h3>
            <div className="flex justify-end text-2xl">
              <i
                className="fa-solid fa-xmark cursor-pointer"
                onClick={() => setOpenModal(!openModal)}
              ></i>
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="" className=" rounded-2xl p-1 mr-2">
                  Title:{" "}
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={title}
                  className="w-1/2 outline-none  border-b-1 border-b-white"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="" className=" rounded-2xl p-1 mr-2">
                  Description:{" "}
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={description}
                  className=" w-1/2 outline-none  border-b-1 border-b-white"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label htmlFor="" className="rounded-2xl p-1 mr-2">
                  Completed:{" "}
                </label>
                <input
                  type="checkbox"
                  className="ml-2 w-[15px] h-[15px] border-2 rounded-[5px]"
                  checked={completedTask}
                  onChange={() => setCompletedTask(!completedTask)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 p-2 rounded-2xl cursor-pointer"
                  type="submit"
                >
                  Create task
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
