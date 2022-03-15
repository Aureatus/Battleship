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
      - shipArray that starts as an empty array the same length as the ships Length.
      - ##### Hit function
        - Takes a number as an argument, and marks that position as hit.
      - ##### isSunk function
        - Calculates based on length and if all positions of the ship have been hit.

  - ### Players

    - Created via a factory function
    - Players take turns playing the game by attacking enemy gameboard.
    - Enemy player is a computer, give it a basic AI (random plays that are legal).

  - ### DOM module

    - Contains all functions for DOM manipulation.
    - Display both gameboards.

  - ### Game Loop function

    - Sets up a game by creating players and gameboards. Gameboards should have predetermined coordinates to begin with.
    - Method to render gameboards using functions from the DOM module.
    - Method to take tuser input for attacking via a click on a coordinate.

    - #### Game loop should only use methods from other objects whilst stepping through the game turn by turn.

    - Condition for game to end once all ships of one player has been sunk. (This function can be defined in game loop module)
