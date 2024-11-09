// src/controllers/cube.controller.ts

import * as THREE from 'three';

export class CarController {
  private car: THREE.Mesh;
  private movement = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  constructor(car: THREE.Mesh) {
    this.car = car;
  }

  // Update car position based on movement flags
  updatePosition() {
    const moveSpeed = 0.15;
    if (this.movement.left) this.car.position.x -= moveSpeed;
    if (this.movement.right) this.car.position.x += moveSpeed;
    if (this.movement.up) this.car.position.z -= moveSpeed;
    if (this.movement.down) this.car.position.z += moveSpeed;
  }

  // Handle key press
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.movement.left = true;
        break;
      case 'ArrowRight':
        this.movement.right = true;
        break;
      case 'ArrowUp':
        this.movement.up = true;
        break;
      case 'ArrowDown':
        this.movement.down = true;
        break;
    }
  }

  // Handle key release
  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.movement.left = false;
        break;
      case 'ArrowRight':
        this.movement.right = false;
        break;
      case 'ArrowUp':
        this.movement.up = false;
        break;
      case 'ArrowDown':
        this.movement.down = false;
        break;
    }
  }
}
