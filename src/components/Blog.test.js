import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test example",
    author: "Test",
    likes: 1,
    url: "https://example.com",
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("Test: Test example");
});

test("doesn't render details by default", () => {
  const blog = {
    title: "Test example",
    author: "Test",
    likes: 1,
    url: "https://example.com",
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).not.toHaveTextContent("example.com");
});

test("details can be rendered by clicking the button", () => {
  const blog = {
    title: "Test example",
    author: "Test",
    likes: 1,
    url: "https://example.com",
  };

  const loggedUser = {
    id: 1,
  };

  const component = render(<Blog blog={blog} loggedUser={loggedUser} />);
  const button = component.getByText("view");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("https://example.com");
  expect(component.container).toHaveTextContent("likes");
});

test("like button can be pressed twice", () => {
  const blog = {
    title: "Test example",
    author: "Test",
    likes: 1,
    url: "https://example.com",
  };

  const loggedUser = {
    id: 1,
  };

  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} likeHandler={mockHandler} loggedUser={loggedUser} />
  );
  const viewButton = component.getByText("view");
  fireEvent.click(viewButton);
  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
