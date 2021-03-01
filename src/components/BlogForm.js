import React, { useState } from "react";

const BlogForm = ({ submitBlog }) => {
  // New blog post state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    // Create the object
    const blog = {
      author,
      title,
      url,
    };

    // Submit
    submitBlog(blog);

    // Clear the form
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      Title: <input value={title} onChange={handleTitleChange} />
      <br />
      Author: <input value={author} onChange={handleAuthorChange} />
      <br />
      URL: <input value={url} onChange={handleUrlChange} />
      <br />
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;
