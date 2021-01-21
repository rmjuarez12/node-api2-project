import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostForm() {
  const { id } = useParams();

  //* Initial state
  const initialState = {
    title: "",
    contents: "",
  };

  //* Form Data
  const [postData, setPostData] = useState(initialState);

  useEffect(() => {}, [id]);

  //* Handle form field change
  const handleChange = (e) => {
    const newData = {
      ...postData,
      [e.target.name]: e.target.value,
    };

    setPostData(newData);
  };

  //* Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const APIURL = "http://localhost:4000/api/posts";

    axios
      .post(APIURL, postData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div id='post-form'>
      <h3>Add Post</h3>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>
            Title
            <input
              id='title'
              type='text'
              name='title'
              value={postData.title}
              onChange={handleChange}
            />
          </label>

          <label htmlFor='contents'>
            Content
            <textarea
              id='contents'
              name='contents'
              value={postData.contents}
              onChange={handleChange}
            />
          </label>

          <button>ADd Post</button>
        </form>
      </div>
    </div>
  );
}
