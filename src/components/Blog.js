import React, { useState } from "react";

const Blog = ({ blog, deleteHandler, likeHandler, loggedUser }) => {
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

  const showDeleteButton = () => (
    <button onClick={deleteHandler}>delete</button>
  );

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
        {loggedUser.id == user && showDeleteButton()}
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
