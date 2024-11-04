import * as THREE from 'three';

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xd4d9fc, side: THREE.DoubleSide });
export const plane = new THREE.Mesh(planeGeometry, planeMaterial);

const planeGeometry1 = new THREE.PlaneGeometry(10, 10);
const planeMaterial1 = new THREE.MeshStandardMaterial({ color: 0xd4d9fc, side: THREE.DoubleSide });
export const plane1 = new THREE.Mesh(planeGeometry1, planeMaterial1);

const planeGeometry2 = new THREE.PlaneGeometry(10, 10);
const planeMaterial2 = new THREE.MeshStandardMaterial({ color: 0xd4d9fc, side: THREE.DoubleSide });
export const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);