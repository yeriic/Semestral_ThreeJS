import * as THREE from 'three';

export const spotLight = new THREE.SpotLight(0xffffff, 1000); 
export const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
export const spotLightHelper = new THREE.SpotLightHelper(spotLight);

