// src/main.ts

import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { CarController } from './controllers/cube.controller';

class GameApp {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private carController?: CarController;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 8, 30);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.addLighting();
    this.addPlane();
    this.loadCarModel();
    this.setupEventListeners();

    this.animate();
  }

  // Add lighting (HDR image-based)
  private addLighting() {
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/hdr/sky.hdr', // HDR file path
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      },
      undefined,
      (error) => {
        console.error('Error loading HDR image:', error);
      }
    );
  }

  // Add ground plane with texture
  private addPlane() {
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load('/textures/rock.jpg'); // Load the texture
    groundTexture.wrapS = THREE.RepeatWrapping; // Repeat texture horizontally
    groundTexture.wrapT = THREE.RepeatWrapping; // Repeat texture vertically
    groundTexture.repeat.set(4, 4); // Repeat the texture 4 times in each direction

    const planeGeometry = new THREE.PlaneGeometry(80, 80);
    const planeMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    this.scene.add(plane);
  }

  // Load the car model and initialize the CarController
  private loadCarModel() {
    const loader = new GLTFLoader();
    loader.load(
      '/models/car.glb',
      (gltf) => {
        const carMesh = gltf.scene as any;
        carMesh.position.set(0, 0.5, 0);
        this.scene.add(carMesh);

        this.carController = new CarController(carMesh);
      },
      undefined,
      (error) => {
        console.error('Error loading car model:', error);
      }
    );
  }

  // Setup event listeners for window resize and keyboard controls
  private setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('keydown', (event) => this.carController?.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.carController?.onKeyUp(event));
  }

  // Handle window resizing
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Animation loop
  private animate() {
    requestAnimationFrame(() => this.animate());

    if (this.carController) {
      this.carController.updatePosition();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate the GameApp
new GameApp();
