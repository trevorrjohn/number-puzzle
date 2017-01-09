$(document).ready(() => {
  const board = new Board();
  const helper = new Helper();
  const animator = new Animator(helper);
  const game = new Game(board, animator, helper);
  const solver = new Solver(helper)
  const uiHandler = new UiHandler(game, solver);
  uiHandler.listen();
});
