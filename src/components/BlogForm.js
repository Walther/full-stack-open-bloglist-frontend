import React from "react";

const BlogForm = ({
  addBlog,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => (
  <form onSubmit={addBlog}>
    Title: <input value={title} onChange={handleTitleChange} />
    Author: <input value={author} onChange={handleAuthorChange} />
    URL: <input value={url} onChange={handleUrlChange} />
    <button type="submit">save</button>
  </form>
);

export default BlogForm;
