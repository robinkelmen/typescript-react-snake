import React, { useState, useEffect, useRef, Component } from "react";
import "./Gameboard.css";
import { useInterval } from "./useInterval";

import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";
import { Dirent } from "fs";

const Gameboard: React.FC = () => {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(SNAKE_START);

  const [apple, setApple] = useState(APPLE_START);
  const startdir = [0, -1];
  const [dir, setDir] = useState(startdir);
  const [points, setPoints] = useState(0);

  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [snakeColor, setSnakeColor] = useState("pink");
  const [appleColor, setAppleColor] = useState("lightblue");
  const [canvasColor, setCanvasColor] = useState(""); // going to change class
  const [border, setBoarder] = useState("1px solid black");
  const [wrap, setWrap] = useState(true); // if the snake should wrap around when it hits border

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    setSnakeColor("grey");
  };

  const moveSnake = ({ keyCode }) => {
    if (keyCode === 38 && dir === DIRECTIONS[40]) {
      console.log("tried");
      return;
    }

    if (keyCode === 40 && dir === DIRECTIONS[38]) {
      return;
    }
    if (keyCode === 37 && dir === DIRECTIONS[39]) {
      return;
    }
    if (keyCode === 39 && dir === DIRECTIONS[37]) {
      return;
    }

    // if its pointing up, ignore down
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };
  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return 1;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return 2;
    }
    return false;
  };
  const randColor = () => {
    const r = Math.floor(Math.random() * 254);
    const g = Math.floor(Math.random() * 254);
    const b = Math.floor(Math.random() * 254);
    return `rgb(${r},${g}, ${b})`;
  };

  const checkAppleCollision = (newSnake) => {
    var pointsCur = JSON.parse(JSON.stringify(points));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      pointsCur++;
      setPoints(pointsCur);
      setSnakeColor(randColor());
      setAppleColor(randColor());
      if (pointsCur % 5 === 0) {
        setCanvasColor("crazy");
        setSpeed(50); // how fast the snake moves in a challenging part
        setWrap(false);
        setBoarder("10px dashed white");
      } else {
        setCanvasColor("");
        setSpeed(SPEED);
        setWrap(true);
        setBoarder("1px solid black");
      }
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));

    var newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead) === 2) {
      endGame();
    }

    if (checkCollision(newSnakeHead) == 1 && wrap == true) {
      if (newSnakeHead[0] * SCALE >= CANVAS_SIZE[0]) {
        newSnakeHead[0] = 0;
      }
      if (newSnakeHead[0] < 0) {
        newSnakeHead[0] = CANVAS_SIZE[1] / SCALE;
      }
      if (newSnakeHead[1] * SCALE >= CANVAS_SIZE[1]) {
        newSnakeHead[1] = 0;
      }
      if (newSnakeHead[1] < 0) {
        newSnakeHead[1] = CANVAS_SIZE[1] / SCALE;
      }
    } else if (checkCollision(newSnakeHead) == 1 && wrap == false) {
      endGame();
    }
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    }
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setPoints(0);
    setGameOver(false);
    setAppleColor(randColor());
    setSnakeColor(randColor());
    setCanvasColor("");
    setBoarder("1px solid black");
    setWrap(true);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = snakeColor;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = appleColor;
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver, points]);

  useInterval(() => gameLoop(), speed);

  document.onkeydown = moveSnake;

  return (
    <div role="button" className="Grid">
      {
        <button className="button startbutt" onClick={startGame}>
          Start Game
        </button>
      }
      {<div className="points">You have {points} points</div>}
      {!wrap && <div className="warning">DONT TOUCH WALLS</div>}
      {gameOver && <div className="blinking">GAME OVER!</div>}

      <canvas
        className={`${canvasColor}`}
        style={{ border: `${border}` }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      ></canvas>
    </div>
  );
};

export default Gameboard;
