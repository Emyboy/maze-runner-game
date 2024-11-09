import * as THREE from 'three';

interface CoinOptions {
  color?: number;
  size?: number;
  position?: THREE.Vector3;
}

export default class Coin {
  private coinMesh: THREE.Mesh;

  constructor(options: CoinOptions = {}) {
    const { color = 0x0000ff, size = 1, position = new THREE.Vector3(0, 1, 0) } = options;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    this.coinMesh = new THREE.Mesh(geometry, material);
    this.coinMesh.position.copy(position);
  }

  public getMesh(): THREE.Mesh {
    return this.coinMesh;
  }
}
