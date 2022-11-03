const clearBoard = () => {
  const grid1 = document.querySelector("main").children[0].children[0];
  const grid2 = document.querySelector("main").children[1].children[0];
  removeAllChildren(grid1);
  removeAllChildren(grid2);
};

export default clearBoard;
