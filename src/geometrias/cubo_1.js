import * as THREE from 'three'

const geometry = new THREE.BoxGeometry( 1.005, 0.1, 1.005 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
export const cube1 = new THREE.Mesh( geometry, material );
 
const geometry1 = new THREE.BoxGeometry( 1, 0.90, 1 );
const material1 = new THREE.MeshStandardMaterial( { color: 0x8b4513  } );
export const cube2 = new THREE.Mesh( geometry1, material1 );

const geometry3 = new THREE.BoxGeometry( 1.005, 0.1, 1.005 );
const material3 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
export const cube3 = new THREE.Mesh( geometry3, material3 );
 
const geometry4 = new THREE.BoxGeometry( 1, 0.65, 1 );
const material4 = new THREE.MeshStandardMaterial( { color: 0x8b4513  } );
export const cube4 = new THREE.Mesh( geometry4, material4 );

const geometry5 = new THREE.BoxGeometry( 1.005, 0.1, 1.005 );
const material5 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
export const cube5 = new THREE.Mesh( geometry5, material5 );
 
const geometry6 = new THREE.BoxGeometry( 1, 0.65, 1 );
const material6 = new THREE.MeshStandardMaterial( { color: 0x8b4513  } );
export const cube6 = new THREE.Mesh( geometry6, material6 );