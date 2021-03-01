import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("renders content", () => {
  const component = render(<BlogForm />);
  expect(component.container).toHaveTextContent("Title:");
  expect(component.container).toHaveTextContent("Author:");
  expect(component.container).toHaveTextContent("URL:");
});

test("handler can be called", () => {
  const submitBlog = jest.fn();
  const component = render(<BlogForm submitBlog={submitBlog} />);

  const form = component.container.querySelector("form");
  const author = component.container.querySelector("#author");
  const title = component.container.querySelector("#title");
  const url = component.container.querySelector("#url");

  fireEvent.change(author, {
    target: { value: "Author" },
  });
  fireEvent.change(title, {
    target: { value: "Title" },
  });
  fireEvent.change(url, {
    target: { value: "URL" },
  });
  fireEvent.submit(form);

  expect(submitBlog.mock.calls).toHaveLength(1);
  expect(submitBlog.mock.calls[0][0].author).toBe("Author");
  expect(submitBlog.mock.calls[0][0].title).toBe("Title");
  expect(submitBlog.mock.calls[0][0].url).toBe("URL");
});
