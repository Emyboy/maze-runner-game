import * as THREE from 'three';
import GamePlayer from './objects/player.object';
import GameScene from './scenes/index.scene';

export default class Game {
  private gameScene: GameScene;
  private player: GamePlayer;
  private ground!: THREE.Mesh;
  private cube!: THREE.Mesh;

  constructor() {
    this.gameScene = new GameScene({
      backgroundColor: 0x87ceeb,
      fov: 75,
      near: 0.1,
      far: 1000,
      position: new THREE.Vector3(0, 5, 10),
    });

    this.addLights();
    this.createGround();

    this.player = new GamePlayer();
    this.gameScene.scene.add(this.player.getMesh());

    this.createCube();
    this.animate();
  }

  private addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.gameScene.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    this.gameScene.scene.add(directionalLight);
  }

  private createGround() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = 0;
    this.gameScene.scene.add(this.ground);
  }

  private createCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(2, 1, 0);
    this.gameScene.scene.add(this.cube);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.gameScene.render(); 
  };
}

new Game();
