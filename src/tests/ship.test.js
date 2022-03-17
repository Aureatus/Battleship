const { shipFactory } = require("../modules/ship");

test("shipLength", () => {
  expect(shipFactory(2).shipLength).toBe(2);
});
