import React from "react";
const Blog = ({ blog, deleteHandler }) => {
  const likeStyles = {
    background: "#fd971f",
    padding: ".25rem",
    margin: "1rem",
  };

  return (
    <div>
      {blog.author}: "{blog.title}" at {blog.url}
      <span style={likeStyles}>{blog.likes}</span>
      <button onClick={deleteHandler}>delete</button>
    </div>
  );
};

export default Blog;
