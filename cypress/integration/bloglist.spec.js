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
});
