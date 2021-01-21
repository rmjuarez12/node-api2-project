// Import Modules
import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function PostList() {
  //* State for when we are fetching data
  const [isFetching, setIsFetching] = useState(true);

  //* State to save all posts
  const [posts, setPosts] = useState([]);

  //* State for any errors
  const [errors, setErrors] = useState("");

  //* Get the posts list from API
  useEffect(() => {
    loadPosts();
  }, []);

  //* Function to load/reload posts
  const loadPosts = () => {
    const APIURL = "http://localhost:4000/api/posts";

    axios
      .get(APIURL)
      .then((res) => {
        setPosts(res.data);

        setTimeout(() => {
          setIsFetching(false);
        }, 1000);
      })
      .catch((err) => {
        setErrors(err.message);
        setIsFetching(false);
      });
  };

  return (
    <div id='posts-list'>
      {isFetching ? (
        <div className='loading'>
          <h3>Fetching...</h3>
        </div>
      ) : posts.length > 0 ? (
        <ul>
          {posts.map((post) => {
            return <PostItem key={post.id} post={post} loadPosts={loadPosts} />;
          })}
        </ul>
      ) : (
        <div className='no-results'>
          <h3>No posts found</h3>
        </div>
      )}

      {errors !== "" && <div className='errors'>{errors}</div>}
    </div>
  );
}
