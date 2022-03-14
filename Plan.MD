# Battleship Plan

- ## Components of battleship

  - ### Gameboard

    - Created via a factory function.

    - 10x10

    - Places ships at specific coordinates by calling ship factory function.

    - #### Properties
      - ##### recieveAttack function
        - Takes a pair of coordinates, and if the attack hits any ships, send a hit function to the correct ship, if shot missed then record it's coordinates.
      - ##### allShipsSunk
        - Calls isSunk function on all ships.

  - ### Ships

    - Created via a factory function.

    - #### Properties

      - Length
      - ##### Hit function
        - Takes a number as an argument, and marks that position as hit on the enemies grid.
      - ##### isSunk function
        - Calculates based on length and if all positions of the ship have been hit.

  - ### Players
    - Created via a factory function
    - Players take turns playing the game by attacking enemy gameboard.
    - Enemy player is a computer, give it a basic AI (random plays that are legal).
