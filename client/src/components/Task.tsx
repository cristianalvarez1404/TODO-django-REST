import React, { useState } from "react";
import type { TaskType, CreateTask } from "../utilities/Types";

const Task = ({ task }: { task: TaskType }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [completedTask, setCompletedTask] = useState(task.completed || false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const data: CreateTask = {
      title,
      description,
      completed: completedTask,
    };

    fetch("http://127.0.0.1:8000/api-tasks/tasks/" + task.id + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error in request, check again");
        window.location.href = "/";
      })
      .catch((err) => setError(err));
  };

  const handleDelete = async () => {
    fetch(`http://127.0.0.1:8000/api-tasks/tasks/` + task.id + "/", {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error in request, check again");
        console.log("Deleted");
        window.location.href = "/";
      })
      .catch((err) => setError(err));
  };

  const handleToggleCompleted = async () => {
    const updatedData: CreateTask = {
      completed: !completedTask,
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api-tasks/tasks/" + task.id + "/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Error updating task");
      setCompletedTask(!completedTask);
    } catch (err) {
      setError("Failed to update task" + err);
    }
  };

  return (
    <>
      <div className="flex flex-col w-1/5 justify-start items-start border-6 rounded-2xl p-5 border-gray-400 hover:bg-blue-400  transition-all cursor-pointer">
        <h2 className="border-b-2 mb-2">{task.title}</h2>
        <p className="text-left mb-2">{task.description}</p>
        <span className="">
          Completed:
          <input
            type="checkbox"
            checked={completedTask}
            onChange={handleToggleCompleted}
            className="ml-2 w-[15px] h-[15px] border-2 rounded-[5px]"
          />
        </span>
        <div className="flex items-center gap-2">
          <small className="bg-blue-900 rounded-2xl p-1 text-[8px] mt-2">
            Created at: {task.created_at}
          </small>
          <i
            onClick={() => setOpenUpdateModal(!openUpdateModal)}
            className="fa-solid fa-pen-to-square text-white-400 cursor-pointer"
          ></i>
          <i
            onClick={handleDelete}
            className="fa-solid fa-trash text-red-400 cursor-pointer"
          ></i>
        </div>
      </div>
      {openUpdateModal && (
        <div className="rounded-4xl bg-gray-500 opacity-95 border-gray-400 border absolute top-1/4 w-1/2 h-1/3 p-6 flex flex-col text-left ">
          <div className="flex justify-end text-2xl">
            <i
              className="fa-solid fa-xmark cursor-pointer"
              onClick={() => setOpenUpdateModal(!openUpdateModal)}
            ></i>
          </div>
          <h3 className="text-2xl text-center">Updating task...</h3>
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="" className="bg-blue-600 rounded-2xl p-1 mr-2">
                Title:{" "}
              </label>
              <input
                type="text"
                placeholder=""
                value={title}
                className=" outline-none border-none"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="bg-blue-600 rounded-2xl p-1 mr-2">
                Description:{" "}
              </label>
              <input
                type="text"
                placeholder=""
                value={description}
                className=" outline-none border-none"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label htmlFor="" className="bg-blue-600 rounded-2xl p-1 mr-2">
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
                Update task
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
};

export default Task;
