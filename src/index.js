import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {cube1, cube2, cube3, cube4, cube5, cube6} from './geometrias/cubo_1.js';
import {plane, plane1, plane2, plane3, plane4, plane5, plane6, plane7} from './geometrias/plano.js';
import {ambientLight, spotLightHelper, spotLight} from './luces/luz_ambiente.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(plane);
scene.add(plane1);
scene.add(plane2);
scene.add(plane3);
scene.add(plane4);
scene.add(plane5);
scene.add(plane6);
scene.add(plane7);
scene.add(ambientLight);
scene.add(spotLight);
scene.add(spotLightHelper);

const loader = new GLTFLoader();
loader.load(
  'minecraft.glb',
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error('Error al cargar el modelo:', error);
  }
);

//posiciones
plane1.position.x = 45.05;
plane1.position.y =  3.19;
plane1.position.z = 59.63;

plane2.position.x = 44.60;
plane2.position.y =  4.90;
plane2.position.z = 51.26;

plane3.position.x = 58.91;
plane3.position.y =  5.70;
plane3.position.z = 51.10;

plane4.position.x = 30.10;
plane4.position.y =  5.70;
plane4.position.z = 51.10;

plane5.position.x = 58.46;
plane5.position.y =  7.90;
plane5.position.z = 42.74;

plane6.position.x = 29.65;
plane6.position.y =  7.90;
plane6.position.z = 42.74;

plane7.position.x = 42.76;
plane7.position.y =  8.99;
plane7.position.z = 31.24;


//rotaciones
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;

plane1.rotation.x = -Math.PI / 2;

plane2.rotation.x = -Math.PI / 2;

plane3.rotation.x = -Math.PI / 2;

plane4.rotation.x = -Math.PI / 2;

plane5.rotation.x = -Math.PI / 2;

plane6.rotation.x = -Math.PI / 2;

plane7.rotation.x = -Math.PI / 2;


spotLight.position.set(2, 50, 50);
spotLight.lookAt(cube1.position);
spotLight.angle = Math.PI / 4; // apertura del foco
spotLight.distance = 30;       // distancia
spotLight.penumbra = 0.5;      // bordes

camera.position.set(75, 75, 75);
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