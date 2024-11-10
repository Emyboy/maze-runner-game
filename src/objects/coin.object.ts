// src/objects/coin.object.ts
import * as THREE from 'three';
import { getRandomNumber } from '../utils/random.utils';

interface CoinOptions {
  color?: number;
  size?: number;
  position?: THREE.Vector3;
  mesh?: THREE.Mesh;
  numCoins?: number;
}

export default class Coin {
  private coinMeshes: THREE.Mesh[] = [];

  constructor(options: CoinOptions = {}) {
    const { color = 0xffd700, size = 0.40, position = new THREE.Vector3(0, 10, 0), mesh, numCoins = 10 } = options;

    if (mesh) {
      this.generateCoinsOnMesh(mesh, numCoins, color, size);
    } else {
      const geometry = new THREE.CylinderGeometry(size, size, 0.1, 32);
      const material = new THREE.MeshStandardMaterial({ color });
      const coinMesh = new THREE.Mesh(geometry, material);
      coinMesh.position.copy(position);
      coinMesh.rotation.x = Math.PI / 2; // Rotate 90 degrees
      coinMesh.castShadow = true; // Enable casting shadows
      coinMesh.receiveShadow = true; // Enable receiving shadows
      this.coinMeshes.push(coinMesh);
    }
  }

  private generateCoinsOnMesh(mesh: THREE.Mesh, numCoins: number, color: number, size: number) {
    const meshBoundingBox = new THREE.Box3().setFromObject(mesh);
    const min = meshBoundingBox.min;
    const max = meshBoundingBox.max;

    for (let i = 0; i < numCoins; i++) {
      const x = getRandomNumber(min.x, max.x);
      const y = 0.5;
      const z = getRandomNumber(min.z, max.z);

      const geometry = new THREE.CylinderGeometry(size, size, 0.1, 32);
      const material = new THREE.MeshStandardMaterial({ color });
      const coinMesh = new THREE.Mesh(geometry, material);
      coinMesh.position.set(x, y, z);
      coinMesh.rotation.x = Math.PI / 2; // Rotate 90 degrees
      coinMesh.castShadow = true; // Enable casting shadows
      coinMesh.receiveShadow = true; // Enable receiving shadows

      const floatSpeed = getRandomNumber(0.02, 0.05);
      const rotationSpeed = getRandomNumber(0.01, 0.03);
      const floatDirection = 0.40; 
      const rotationDirection = Math.random() > 0.5 ? 1 : -1; 

      coinMesh.userData = {
        floatSpeed,
        rotationSpeed,
        floatDirection,
        rotationDirection,
        offset: Math.random() * Math.PI * 2, 
      };

      this.coinMeshes.push(coinMesh);
    }
  }

  public animateCoins(deltaTime: number) {
    this.coinMeshes.forEach((coinMesh) => {
      const { floatSpeed, floatDirection } = coinMesh.userData;
      coinMesh.position.y += floatSpeed * floatDirection;

      if (coinMesh.position.y > 1.5 || coinMesh.position.y < 0.5) {
        coinMesh.userData.floatDirection = -floatDirection;
      }

      const { rotationSpeed, rotationDirection, offset } = coinMesh.userData;
      coinMesh.rotation.z += rotationSpeed * rotationDirection;
      coinMesh.rotation.z += offset * deltaTime; 
    });
  }

  public getMeshes(): THREE.Mesh[] {
    return this.coinMeshes;
  }
}