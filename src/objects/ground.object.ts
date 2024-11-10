// src/objects/ground.object.ts
import * as THREE from 'three';

interface GroundOptions {
  color?: number;
  width?: number;
  height?: number;
  position?: THREE.Vector3;
}

export default class GroundPlane {
  private mesh: THREE.Mesh;

  constructor(options: GroundOptions = {}) {
    const color = options.color || 0x228b22;
    const width = options.width || 40;
    const height = options.height || 100;
    const position = options.position || new THREE.Vector3(0, 0, 0);

    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ color });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    this.mesh.receiveShadow = true; // Enable receiving shadows
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }
}