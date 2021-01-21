// Import Modules
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Post() {
  //* Get the ID from the route
  const { id } = useParams();

  //* Get the post info
  const [post, setPost] = useState("");
  console.log(post);

  useEffect(() => {
    const APIURL = `http://localhost:4000/api/posts/${id}`;

    axios
      .get(APIURL)
      .then((res) => {
        setPost(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return <div>{post.title}</div>;
}
