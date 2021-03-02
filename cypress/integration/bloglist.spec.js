describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Front page can be opened", () => {
    cy.contains("Bloglist app");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();
      cy.get("#logout-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("invalid");
      cy.get("#password").type("invalid");
      cy.get("#login-button").click();
      cy.get(".error").contains("invalid credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpassword" });
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("title");
      cy.get("#author").type("author");
      cy.get("#url").type("url");
      cy.contains("save").click();
      cy.get(".success").contains("added successfully");
      cy.contains("author: title");
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "A",
        author: "A",
        url: "example.com",
        likes: 0,
      });
      cy.contains("view").click();
      cy.get("#like-button").click();
      cy.contains("1");
      cy.contains("likes");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "A",
          author: "A",
          url: "example.com",
          likes: 0,
        });
        cy.createBlog({
          title: "B",
          author: "B",
          url: "example.com",
          likes: 5,
        });
        cy.createBlog({
          title: "C",
          author: "C",
          url: "example.com",
          likes: 10,
        });
      });
    });
  });
});
