// Import Modules
import { Link } from "react-router-dom";
import axios from "axios";

export default function PostItem(props) {
  const { post, loadPosts } = props;

  const deletePost = () => {
    const APIURL = `http://localhost:4000/api/posts/${post.id}`;

    if (window.confirm("Delete the item?")) {
      axios
        .delete(APIURL)
        .then((res) => {
          console.log(res);
          loadPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <li id={`post-${post.id}`}>
      <div className='title'>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </div>

      <div className='button-group'>
        <button onClick={deletePost}>Delete</button>
        <button>Edit</button>
      </div>
    </li>
  );
}
