// src/main.ts
import "./style.css";
import * as THREE from "three";
import GamePlayer from "./objects/player.object";
import Coin from "./objects/coin.object";
import GameScene from "./scenes/index.scene";
import GroundPlane from "./objects/ground.object";
import { getRandomNumber } from "./utils/random.utils";
import { CreateGameStatusComponent } from "./ui/components/game-status.component";
import { CreateGameLeaderBoard } from "./ui/components/game-leaderboard.component";
import { players } from "./__mock__/player.mock";

export default class Game {
  private gameScene: GameScene;
  private player: GamePlayer;
  private ground: GroundPlane;
  private coin: Coin;
  private keyStates: { [key: string]: boolean } = {};
  private gameMetricsElement: HTMLElement | null;
  private leaderBoardElement: HTMLElement | null;

  constructor() {
    this.gameMetricsElement = document.querySelector("#game-metrics");
    this.leaderBoardElement = document.querySelector("#leader-board");

    this.gameScene = new GameScene({
      backgroundColor: 0x87ceeb,
      fov: 75,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(0, 5, 10),
    });

    this.ground = new GroundPlane({
      color: 0x228b22,
      width: 40,
      height: 100,
      position: new THREE.Vector3(0, 0, 0),
    });
    this.gameScene.scene.add(this.ground.getMesh());

    this.player = new GamePlayer();
    this.gameScene.scene.add(this.player.getMesh());

    this.coin = new Coin({
      color: 0x0000ff,
      size: 1,
      mesh: this.ground.getMesh(),
      numCoins: getRandomNumber(50, 100),
    });

    this.coin.getMeshes().forEach((coinMesh) => {
      this.gameScene.scene.add(coinMesh);
    });

    CreateGameLeaderBoard({ parent: this.leaderBoardElement, players });
    CreateGameStatusComponent(this.gameMetricsElement);

    this.setupControls();
    this.animate();
  }

  private handlePlayerControls() {
    const speed = 0.1;

    if (this.keyStates["ArrowUp"]) {
      this.player.move(new THREE.Vector3(0, 0, -speed));
    }
    if (this.keyStates["ArrowDown"]) {
      this.player.move(new THREE.Vector3(0, 0, speed));
    }
    if (this.keyStates["ArrowLeft"]) {
      this.player.move(new THREE.Vector3(-speed, 0, 0));
    }
    if (this.keyStates["ArrowRight"]) {
      this.player.move(new THREE.Vector3(speed, 0, 0));
    }
    if (this.keyStates[" "]) {
      this.player.jump();
    }
  }

  private setupControls() {
    window.addEventListener("keydown", (event) => {
      this.keyStates[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keyStates[event.key] = false;
    });
  }

  private animate = () => {
    const deltaTime = 0.0091;

    requestAnimationFrame(this.animate);

    this.handlePlayerControls();
    this.player.update();

    this.coin.animateCoins(deltaTime);

    this.gameScene.render();
  };
}

new Game();
