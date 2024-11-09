import * as THREE from 'three';
import GamePlayer from '../objects/player.object'; // Import the GamePlayer class

interface SceneOptions {
  backgroundColor?: number; 
  fov?: number; 
  aspectRatio?: number; 
  near?: number; 
  far?: number; 
  position?: THREE.Vector3; 
}

export default class GameScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private player: GamePlayer | null = null; // Add a reference to the player

  constructor(options: SceneOptions = {}) {
    const {
      backgroundColor = 0x87ceeb,
      fov = 75,
      aspectRatio = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 1000,
      position = new THREE.Vector3(0, 5, 10),
    } = options;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(backgroundColor);

    this.addLights();

    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    this.camera.position.copy(position);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  public setPlayer(player: GamePlayer) {
    this.player = player;
    this.scene.add(this.player.getMesh());
  }

  private addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    this.scene.add(directionalLight);
  }

  public addSkyBox(texturePaths: string[]) {
    if (texturePaths.length !== 6) {
      console.warn('Skybox requires 6 texture paths');
      return;
    }

    const loader = new THREE.CubeTextureLoader();
    const skyBoxTexture = loader.load(texturePaths);
    this.scene.background = skyBoxTexture;
  }

  public render = () => {
    if (this.player) {
      const playerPosition = this.player.getMesh().position;
      this.camera.position.set(playerPosition.x, playerPosition.y + 5, playerPosition.z + 10);
      this.camera.lookAt(playerPosition);
    }

    this.renderer.render(this.scene, this.camera);
  };
}