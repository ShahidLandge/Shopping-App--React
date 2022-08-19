import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaWindowClose } from "react-icons/fa";
import { Loader } from "../Loader/Loader";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputId, setInputId] = useState("");
  const [buttonId, setButtonId] = useState(0);

  const navigate = useNavigate();
  const handleClick = () => {
    setButtonId(inputId);
  };

  useEffect(() => {
    setLoading(true);
    console.log(buttonId);
    buttonId !== 0
      ? fetch(`https://jsonplaceholder.typicode.com/todos/${buttonId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setPosts([data]);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e.message);
          })
      : fetch(`https://jsonplaceholder.typicode.com/todos`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setPosts(data);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e.message);
          });
  }, [buttonId]);
  const completedButton = () => {
    let filter = posts.filter((item) => {
      return item.completed;
    });
    setPosts(filter);
  };
  const notCompletedButton = () => {
    let filter = posts.filter((item) => {
      return !item.completed;
    });
    setPosts(filter);
  };

  return (
    <>
      <h2> Home Page</h2>
      <br />
      <input
        type="number"
        placeholder="Enter Post Id"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <button onClick={() => handleClick()} className="filterButton">
        Fetch Post
      </button>
      <button onClick={() => completedButton()} className="filterButton">
        Completed
      </button>
      <button onClick={() => notCompletedButton()} className="filterButton">
        Not Completed
      </button>
      <br />
      <br />
      {loading ? (
        <Loader />
      ) : (
        <>
          <table>
            <thead>
              <th>
                <h3>User Id</h3>
              </th>
              <th>
                <h3>Id</h3>
              </th>
              <th>
                <h3>Title</h3>
              </th>
              <th>
                <h3>Completed</h3>
              </th>
            </thead>

            {posts.map((item) => {
              return (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.userId}</td>
                    <td>{item.id}</td>
                    <td>
                      <button
                        className="navBtn"
                        onClick={() => navigate(`${item.id}`)}
                      >
                        {item.title}
                      </button>
                    </td>
                    {item.completed ? (
                      <td>
                        <FaCheck />
                      </td>
                    ) : (
                      <td>
                        <FaWindowClose />{" "}
                      </td>
                    )}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      )}
    </>
  );
};
