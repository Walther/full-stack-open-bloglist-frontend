import React, { useState } from "react";

const Blog = ({ blog, deleteHandler, likeHandler }) => {
  const { id, user, author, title, url, likes } = blog;

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
        <a href={url} rel="noreferrer">
          {url}
        </a>
        <br />
        <span style={likeStyles}>{likes}</span>likes
        <button
          onClick={() =>
            likeHandler({ id, user, author, title, url, likes: likes + 1 })
          }
        >
          like
        </button>
        <br />
        <button onClick={deleteHandler}>delete</button>
      </>
    );
  };

  return (
    <div style={blogStyles}>
      {author}: "{title}"
      <button onClick={() => setDetails(!details)}>
        {details ? "hide" : "view"}
      </button>
      {details && showDetails()}
    </div>
  );
};

export default Blog;
