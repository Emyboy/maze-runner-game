import * as THREE from 'three';

interface PlayerOptions {
  color?: number;
  position?: THREE.Vector3;
}

/**
 * @description for creating a player entity
 */
export default class GamePlayer {
  private mesh: THREE.Mesh;

  constructor(options: PlayerOptions = {}) {
    const color = options.color || 0xffd700; // Gold color
    const position = options.position || new THREE.Vector3(0, 1, 0);

    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const material = new THREE.MeshStandardMaterial({ color });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }
}
