import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import LogOutForm from "./components/LogOutForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [notification, setNotification] = useState({});
  const [blogs, setBlogs] = useState([]);
  // User login object with the token etc
  const [user, setUser] = useState(null);
  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // New blog post state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const showNotification = (status, message) => {
    setNotification({ status, message });
    setTimeout(() => {
      clearNotification();
    }, 5000);
  };

  const clearNotification = () => {
    setNotification({ status: "", message: "" });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      showNotification("error", "invalid credentials");
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setUsername("");
    setPassword("");
    setBlogs([]);
  };

  const showLoginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    );
  };

  const showLogoutForm = () => {
    return <LogOutForm handleLogout={handleLogout} />;
  };

  const addBlog = (event) => {
    event.preventDefault();

    // Create the object
    const blog = {
      author,
      title,
      url,
    };

    // Persist to database
    blogService
      .create(blog)
      .then((response) => {
        setBlogs(blogs.concat(response));
        setAuthor("");
        setTitle("");
        setUrl("");
        showNotification("success", `${title} added successfully`);
      })
      .catch((error) => {
        console.error(error);
        showNotification(
          "error",
          `Error adding blog post: ${JSON.stringify(error.response.data)}`
        );
      });
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const showBlogForm = () => {
    return (
      <div>
        <h2>Add a new blog</h2>
        <BlogForm
          addBlog={addBlog}
          author={author}
          title={title}
          url={url}
          handleAuthorChange={handleAuthorChange}
          handleTitleChange={handleTitleChange}
          handleUrlChange={handleUrlChange}
        />
      </div>
    );
  };

  const deleteHandler = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      blogService
        .remove(id)
        .then((response) => {
          // Delete from local view too
          setBlogs(blogs.filter((blog) => blog.id !== id));
          showNotification("success", `"${title}" deleted successfully`);
        })
        .catch((error) => {
          console.error(error);
          showNotification(
            "error",
            `Error deleting: ${JSON.stringify(error.response.data)}`
          );
        });
    }
  };

  const showBlogList = () => {
    return (
      <>
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteHandler={() => deleteHandler(blog.id, blog.title)}
          />
        ))}
      </>
    );
  };

  return (
    <main className="main">
      <h1>Bloglist app</h1>
      <Notification notification={notification} />
      {user === null && showLoginForm()}
      {user !== null && showBlogForm()}
      {user !== null && showBlogList()}
      {user !== null && showLogoutForm()}
    </main>
  );
};

export default App;
