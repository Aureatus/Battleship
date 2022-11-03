import { shipFactory } from "../modules/logic/ship";

let ship;

beforeEach(() => {
  ship = shipFactory(3);
});

test("shipLength", () => {
  expect(ship.shipLength).toBe(3);
});

test("shipHit", () => {
  ship.hit(0);
  expect(ship.hitArray[0]).toBe("hit");
});

test("shipSunk", () => {
  ship.hitArray.forEach((element, index) => {
    ship.hit(index);
  });
  expect(ship.isSunk()).toBe(true);
});
