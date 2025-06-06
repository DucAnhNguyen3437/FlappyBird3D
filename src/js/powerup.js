import * as THREE from "three";

export const POWERUP_TYPES = {
  IMMUNE: "immune",
  SPEED_UP: "speed_up",
  SLOW_DOWN: "slow_down",
};

export class PowerUp {
  constructor(scene, type, position) {
    this.type = type;
    this.mesh = this.createMesh();
    this.mesh.position.copy(position);
    scene.add(this.mesh);
    this.active = true;
  }

  createMesh() {
    switch (this.type) {
      case POWERUP_TYPES.IMMUNE:
        const shieldGroup = new THREE.Group();
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.1),
          new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0.7, roughness: 0.3 })
        );
        sphere.rotation.x = Math.PI;
        shieldGroup.add(sphere);
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(1.0, 0.5, 0.3),
          new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.7, roughness: 0.3 })
        );
        box.position.y = -0.55;
        shieldGroup.add(box);
        return shieldGroup;

      case POWERUP_TYPES.SPEED_UP:
        const arrowUpGroup = new THREE.Group();
        const coneUp = new THREE.Mesh(
          new THREE.ConeGeometry(0.32, 0.64, 16),
          new THREE.MeshStandardMaterial({ color: 0x00ffff })
        );
        coneUp.position.y = 0.56;
        arrowUpGroup.add(coneUp);
        const cylinderUp = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.64, 16),
          new THREE.MeshStandardMaterial({ color: 0x00ffff })
        );
        cylinderUp.position.y = 0.09;
        arrowUpGroup.add(cylinderUp);
        return arrowUpGroup;

      case POWERUP_TYPES.SLOW_DOWN:
        const arrowDownGroup = new THREE.Group();
        const coneDown = new THREE.Mesh(
          new THREE.ConeGeometry(0.32, 0.64, 16),
          new THREE.MeshStandardMaterial({ color: 0xff00ff })
        );
        coneDown.position.y = -0.56;
        coneDown.rotation.x = Math.PI;
        arrowDownGroup.add(coneDown);
        const cylinderDown = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.64, 16),
          new THREE.MeshStandardMaterial({ color: 0xff00ff })
        );
        cylinderDown.position.y = -0.09;
        arrowDownGroup.add(cylinderDown);
        return arrowDownGroup;

      default:
        return new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
    }
  }

  remove(scene) {
    scene.remove(this.mesh);
    this.active = false;
  }
}