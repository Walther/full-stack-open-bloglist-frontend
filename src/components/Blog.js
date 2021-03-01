import React, { useState } from "react";

const Blog = ({ blog, deleteHandler, likeHandler }) => {
  const [details, setDetails] = useState(false);

  const blogStyles = {
    border: "1px solid #aaa",
    marginTop: "1rem",
    padding: "1rem",
  };

  const likeStyles = {
    padding: ".25rem",
  };

  const showDetails = () => {
    return (
      <>
        <br />
        <a href={blog.url} rel="noreferrer">
          {blog.url}
        </a>
        <br />
        <span style={likeStyles}>{blog.likes}</span>likes
        <button onClick={likeHandler}>like</button>
        <br />
        <button onClick={deleteHandler}>delete</button>
      </>
    );
  };

  return (
    <div style={blogStyles}>
      {blog.author}: "{blog.title}"
      <button onClick={() => setDetails(!details)}>
        {details ? "hide" : "view"}
      </button>
      {details && showDetails()}
    </div>
  );
};

export default Blog;
