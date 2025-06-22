import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Task =  {
  id:string;
  title:string;
  description:string;
  completed:boolean,
  created_at:string
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchData = () => {
      fetch("http://127.0.0.1:8000/api-tasks/tasks/")
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
    searchData();
  }, []);

  return (
    <>
      <div className="text-white">
        <h1 className="text-3xl mb-5">Tasks</h1>
        <div className="flex gap-5 flex-wrap justify-around">
          {tasks && tasks.length > 0 ? (
            tasks.map((task:Task) => (
              <div className="flex flex-col w-1/5 justify-start items-start border-6 rounded-2xl p-5 border-gray-400 hover:bg-blue-400  transition-all cursor-pointer" >
                <h2 className="border-b-2 mb-2">{task.title}</h2>
                <p className="text-left mb-2">
                  {task.description}
                </p>
                <span className="">
                  Completed:
                  <input
                    type="checkbox"
                    className="ml-2 w-[15px] h-[15px] border-2 rounded-[5px]"
                    
                  />
                </span>
                <div className="flex items-center gap-2">
                  <small className="bg-blue-900 rounded-2xl p-1 text-[8px] mt-2">
                    Created at: {task.created_at}
                  </small>
                  <i className="fa-solid fa-pen-to-square text-white-400 cursor-pointer"></i>
                  <i className="fa-solid fa-trash text-red-400 cursor-pointer"></i>
                </div>
              </div>
            ))
          ) : (
            <div>There's not tasks now 😭</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
