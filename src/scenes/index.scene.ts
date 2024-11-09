import * as THREE from 'three';

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

    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    this.camera.position.copy(position);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
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
    this.renderer.render(this.scene, this.camera);
  };
}