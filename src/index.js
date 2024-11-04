import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {cube1, cube2, cube3, cube4, cube5, cube6} from './geometrias/cubo_1.js';
import {plane, plane1, plane2} from './geometrias/plano.js';
import {ambientLight, spotLightHelper, spotLight} from './luces/luz_ambiente.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
scene.add(cube5);
scene.add(cube6);
scene.add(plane);
scene.add(plane1);
scene.add(plane2);
scene.add(ambientLight);
scene.add(spotLight);
scene.add(spotLightHelper);

//posiciones
cube1.position.y = 0.40;

cube2.position.y = -0.05;

cube3.position.z = 0.85;

cube4.position.z = 0.85;
cube4.position.y = -0.35;

cube5.position.z = 1.5
cube5.position.y = -0.35;

cube6.position.z = 1.5;
cube6.position.y = -0.70;

//rotaciones
cube1.rotation.y = Math.PI/4;

cube2.rotation.y = Math.PI/4;

cube3.rotation.y = Math.PI/4;

cube4.rotation.y = Math.PI/4;

plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
plane1.position.z = -5 ;
plane1.position.y = 4.5 ;
plane2.rotation.y = -Math.PI/2; 
plane2.position.x = -5;
plane2.position.y = 4.5;

spotLight.position.set(2, 15, 15);
spotLight.lookAt(cube1.position);
spotLight.angle = Math.PI / 4; // apertura del foco
spotLight.distance = 30;       // distancia
spotLight.penumbra = 0.5;      // bordes

camera.position.set(2, 5, 10);
camera.lookAt(cube1.position);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target = cube1.position;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    spotLightHelper.update();
}

animate();