// src/scenes/index.scene.ts
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GamePlayer from '../objects/player.object';

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
  public controls: OrbitControls;
  private player: GamePlayer | null = null;
  private cameraTarget: THREE.Vector3;

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
    
    this.cameraTarget = new THREE.Vector3(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(this.renderer.domElement);

    // Initialize OrbitControls with proper settings for third-person
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.setupOrbitControls();

    this.loadHDRI();
    this.addDirectionalLight();
    this.handleResize();
  }

  private setupOrbitControls() {
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    
    // Set distance limits
    this.controls.minDistance = 5;
    this.controls.maxDistance = 15;
    
    // Set vertical rotation limits
    this.controls.minPolarAngle = Math.PI * 0.25; // 45 degrees from top
    this.controls.maxPolarAngle = Math.PI * 0.75; // 135 degrees from top
    
    // Optional: Set horizontal rotation limits
    // this.controls.minAzimuthAngle = -Math.PI / 2; // -90 degrees
    // this.controls.maxAzimuthAngle = Math.PI / 2;  // 90 degrees
    
    this.controls.target = this.cameraTarget;
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private loadHDRI() {
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('/hdr/sky.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
      this.scene.background = texture;
    });
  }

  private addDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;

    const shadowSize = 100;
    directionalLight.shadow.camera.left = -shadowSize;
    directionalLight.shadow.camera.right = shadowSize;
    directionalLight.shadow.camera.top = shadowSize;
    directionalLight.shadow.camera.bottom = -shadowSize;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;

    this.scene.add(directionalLight);
  }

  public setPlayer(player: GamePlayer) {
    this.player = player;
    this.scene.add(this.player.getMesh());
  }

  public updateCamera() {
    if (!this.player) return;

    const playerPosition = this.player.getMesh().position;
    
    // Update the orbit controls target to follow the player
    this.cameraTarget.copy(playerPosition).add(new THREE.Vector3(0, 1, 0));
    this.controls.target = this.cameraTarget;
    
    // Update controls
    this.controls.update();
  }

  public getCameraDirection(): THREE.Vector3 {
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    return direction;
  }

  public render = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}