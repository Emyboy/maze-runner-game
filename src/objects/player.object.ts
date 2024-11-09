import * as THREE from 'three';

interface PlayerOptions {
  color?: number;
  position?: THREE.Vector3;
}

/**
 * @description for creating a player entity with movement controls
 */
export default class GamePlayer {
  private mesh: THREE.Mesh;
  private velocity: THREE.Vector3;
  private isOnGround: boolean;

  constructor(options: PlayerOptions = {}) {
    const color = options.color || 0xffd700; 
    const position = options.position || new THREE.Vector3(0, 1, 0);

    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const material = new THREE.MeshStandardMaterial({ color });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.isOnGround = true;
  }

  public getMesh(): THREE.Mesh {
    return this.mesh;
  }

  public move(direction: THREE.Vector3) {
    this.mesh.position.add(direction);
  }

  public jump() {
    if (this.isOnGround) {
      this.velocity.y = 0.2; 
      this.isOnGround = false;
    }
  }

  public update() {
    if (!this.isOnGround) {
      this.velocity.y -= 0.01;
    }

    this.mesh.position.add(this.velocity);

    if (this.mesh.position.y <= 1) { 
      this.mesh.position.y = 1;
      this.velocity.y = 0;
      this.isOnGround = true;
    }
  }
}
