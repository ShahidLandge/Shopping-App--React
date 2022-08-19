import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";

export const Post = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    try {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPost(data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.message);
        });
    } catch (e) {
      console.log(e);
    }
    console.log("status");
  }, [params.postId]);
  return (
    <>
      <h2>Post {post.id} Data</h2>
      <br />
      {loading ? (
        <Loader />
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Post: {post.id}</td>
              <td>User Id: {post.userId}</td>
              <td>Title: {post.title}</td>
              <td>Body: {post.body}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
