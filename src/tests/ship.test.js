const { shipFactory } = require("../modules/ship");

const ship = shipFactory(3);

test("shipLength", () => {
  expect(ship.shipLength).toBe(3);
});

test("shipHit", () => {
  ship.hit(0);
  expect(ship.hitArray[0].toBe("hit"));
});
