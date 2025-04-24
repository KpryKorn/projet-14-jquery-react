describe("Data Table Visibility", () => {
  beforeEach(() => {
    cy.visit("localhost:5173/employee");
  });

  it("should display the data table container", () => {
    cy.get(".overflow-x-auto.bg-white.rounded-lg.shadow-md").should(
      "be.visible"
    );
  });

  it("should display the table element", () => {
    cy.get("table.min-w-full.divide-y.divide-gray-200").should("be.visible");
  });

  it("should display the table header", () => {
    cy.get("table thead").should("be.visible");
  });

  it("should display the table body", () => {
    cy.get("table tbody").should("be.visible");
  });

  it("should display table header columns", () => {
    cy.get("table thead tr th").should("have.length.greaterThan", 0);
    cy.get("table thead tr th").first().should("be.visible");
    cy.contains("th", "Name").should("be.visible");
    cy.contains("th", "Start Date").should("be.visible");
    cy.contains("th", "Department").should("be.visible");
    cy.contains("th", "Date of Birth").should("be.visible");
    cy.contains("th", "Address").should("be.visible");
  });
});
