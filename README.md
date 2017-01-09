# README

## Info

Html / Javascript game implementation of a 15-puzzle. Deployed on [Heroku](https://fifteen-puz.herokuapp.com).

## Instructions

Game can be played with the keyboard only or via touch gestures. There are two modes of play, you can configure the board into a specific configuration and then click "Count" to play. Or you can click "Shuffle" and a random board will be generated for you. Use the "Hint" button to get the next best move. The "Target Steps" is the minimum number of steps needed to solve the puzzle.

## Architecture

The underlying solver and board were designed to accomodate grids of n size where n > 2. However larger boards will cause the solution algorithm to use a lot of memory and would need to be to handle such cases. The idea was to build the Board, Solver, MinHeap and Node classes to not rely on the UI. However the board does take an animator to animate the UI. Any animator class could be passed in, the only method it must implement is `animate`.

## Installation

1. Install ruby (> 2.2)
2. clone repo ; cd repo
3. `$ bundle install`
4. `$ rake db:setup`
5. `$ rails s`
6. visit [http://localhost:3000]() in your browser 

## Specs

Game logic classes are tested using [Jasmine](https://jasmine.github.io/2.5/introduction). If I were to continue I would try to add tests surrounding the game play (`UiHandler` class) and refactor the `Animator` so that it is less dependent on the specific html implementation. 

You can view the specs [https://localhost:3000/specs]().
