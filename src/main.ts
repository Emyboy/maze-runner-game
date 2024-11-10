// src/main.ts
import "./style.css";
import * as THREE from "three";
import GamePlayer from "./objects/player.object";
import Coin from "./objects/coin.object";
import GameScene from "./scenes/index.scene";
import GroundPlane from "./objects/ground.object";
import { getRandomNumber } from "./utils/random.utils";
import { GameStatusComponent } from "./ui/components/game-status.component";
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
  private gameMetrics: GameStatusComponent;
  private score: number = 0;

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

    this.player = new GamePlayer({
      color: 0x000080,
    });
    this.gameScene.setPlayer(this.player); // Set the player in the GameScene

    this.coin = new Coin({
      color: 0xffd700,
      size: 0.40,
      mesh: this.ground.getMesh(),
      numCoins: getRandomNumber(50, 100),
    });

    this.coin.getMeshes().forEach((coinMesh) => {
      this.gameScene.scene.add(coinMesh);
    });

    CreateGameLeaderBoard({ parent: this.leaderBoardElement, players });
    this.gameMetrics = new GameStatusComponent(this.gameMetricsElement as HTMLElement);

    this.setupControls();
    this.animate();
  }

  private handlePlayerControls() {
    if (!this.player) return;

    const speed = 0.40;
    const movement = new THREE.Vector3();

    const cameraDirection = this.gameScene.getCameraDirection();
    const cameraForward = new THREE.Vector3(
      cameraDirection.x,
      0,
      cameraDirection.z
    ).normalize();
    const cameraRight = new THREE.Vector3(
      cameraForward.z,
      0,
      -cameraForward.x
    );

    if (this.keyStates["ArrowUp"] || this.keyStates["w"]) {
      movement.add(cameraForward.multiplyScalar(speed));
    }
    if (this.keyStates["ArrowDown"] || this.keyStates["s"]) {
      movement.add(cameraForward.multiplyScalar(-speed));
    }
    if (this.keyStates["ArrowLeft"] || this.keyStates["a"]) {
      movement.add(cameraRight.multiplyScalar(speed));
    }
    if (this.keyStates["ArrowRight"] || this.keyStates["d"]) {
      movement.add(cameraRight.multiplyScalar(-speed));
    }

    if (movement.length() > 0) {
      movement.normalize().multiplyScalar(speed);
      
      if (movement.length() > 0) {
        const angle = Math.atan2(movement.x, movement.z);
        this.player.getMesh().rotation.y = angle;
      }
      
      this.player.move(movement);
    }

    if (this.keyStates[" "]) {
      this.player.jump();
    }
  }

  private checkCollisions() {
    const playerPosition = this.player.getMesh().position;
    this.coin.getMeshes().forEach((coinMesh, index) => {
      const distance = playerPosition.distanceTo(coinMesh.position);
      if (distance < 1) {
        this.gameScene.scene.remove(coinMesh);
        this.coin.getMeshes().splice(index, 1);
        this.score++;
        this.gameMetrics.updateScore(this.score.toString());
      }
    });
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
    this.checkCollisions();

    this.gameScene.updateCamera();
    this.gameScene.render();
  };
}

new Game();