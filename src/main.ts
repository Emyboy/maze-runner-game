import * as THREE from 'three';
import GamePlayer from './objects/player.object';
import Coin from './objects/coin.object';
import GameScene from './scenes/index.scene';
import GroundPlane from './objects/ground.object';

export default class Game {
  private gameScene: GameScene;
  private player: GamePlayer;
  private ground: GroundPlane;
  private coin: Coin;
  private keyStates: { [key: string]: boolean } = {};

  constructor() {
    this.gameScene = new GameScene({
      backgroundColor: 0x87ceeb,
      fov: 75,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(0, 5, 10),
    });

    this.ground = new GroundPlane({
      color: 0x228b22,
      width: 100,
      height: 100,
      position: new THREE.Vector3(0, 0, 0),
    });
    this.gameScene.scene.add(this.ground.getMesh());

    this.player = new GamePlayer();
    this.gameScene.scene.add(this.player.getMesh());

    this.coin = new Coin({
      color: 0x0000ff,
      size: 1,
      position: new THREE.Vector3(2, 1, 0),
    });
    this.gameScene.scene.add(this.coin.getMesh());

    this.setupControls();
    this.animate();
  }

  private handlePlayerControls() {
    const speed = 0.1;

    if (this.keyStates['ArrowUp']) {
      this.player.move(new THREE.Vector3(0, 0, -speed));
    }
    if (this.keyStates['ArrowDown']) {
      this.player.move(new THREE.Vector3(0, 0, speed));
    }
    if (this.keyStates['ArrowLeft']) {
      this.player.move(new THREE.Vector3(-speed, 0, 0));
    }
    if (this.keyStates['ArrowRight']) {
      this.player.move(new THREE.Vector3(speed, 0, 0));
    }
    if (this.keyStates[' ']) {
      this.player.jump();
    }
  }

  private setupControls() {
    window.addEventListener('keydown', (event) => {
      this.keyStates[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      this.keyStates[event.key] = false;
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.handlePlayerControls();
    this.player.update();
    this.gameScene.render();
  };
}

new Game();
