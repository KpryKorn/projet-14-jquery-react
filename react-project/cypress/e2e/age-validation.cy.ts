describe("Validation de l'âge dans le formulaire d'employé", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.get('[name="first-name"]').type("John");
    cy.get('[name="last-name"]').type("Doe");
    cy.get('[name="street"]').type("123 Main St");
    cy.get('[name="city"]').type("Anytown");
    cy.get('select[name="state"]').select("texas");
    cy.get('[name="zip-code"]').type("12345");
    cy.get('select[name="department"]').select("Sales");

    const currentDate = new Date().toISOString().split("T")[0];
    cy.get('input[name="start-date"]').type(currentDate);
  });

  it("affiche une alerte pour les employés de moins de 18 ans et n'enregistre pas", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    const today = new Date();
    const tooYoungDate = new Date(
      today.getFullYear() - 17,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    cy.get('input[name="date-of-birth"]').type(tooYoungDate);

    cy.contains("Employee has been added").should("not.exist");
  });

  it("n'affiche pas d'alerte et enregistre les employés d'exactement 18 ans", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    const today = new Date();
    const exactAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];

    cy.get('input[name="date-of-birth"]').type(exactAgeDate);
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        expect(alertStub).not.to.have.been.called;
      });

    cy.contains("Employee has been added").should("be.visible");
  });

  it("n'affiche pas d'alerte et enregistre les employés de plus de 18 ans", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    const olderAgeDate = "1990-01-15";

    cy.get('input[name="date-of-birth"]').type(olderAgeDate);
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        expect(alertStub).not.to.have.been.called;
      });

    cy.contains("Employee has been added").should("be.visible");
  });
});
