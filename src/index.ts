import { CharacterControls } from './characterControls.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { plane, plane1, plane2, plane3, plane4, plane5, plane6, plane7 } from './geometrias/plano.js';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

scene.add(plane1);
scene.add(plane2);
scene.add(plane3);
scene.add(plane4);
scene.add(plane5);
scene.add(plane6);
scene.add(plane7);

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
plane1.rotation.x = -Math.PI / 2;

plane2.rotation.x = -Math.PI / 2;

plane3.rotation.x = -Math.PI / 2;

plane4.rotation.x = -Math.PI / 2;

plane5.rotation.x = -Math.PI / 2;

plane6.rotation.x = -Math.PI / 2;

plane7.rotation.x = -Math.PI / 2;

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 5;
camera.position.x = 0;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 15;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.update();


// LIGHTS
light();

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

// MODEL WITH ANIMATIONS
let characterControls: CharacterControls;
loader.load('steveRigV3_2.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object: any) {
        if (object.isMesh) object.castShadow = true;
    });
    scene.add(model);

    model.position.set(25, 2, 25);
    model.scale.set(1.5, 1.5, 1.5);
    const axesHelper = new THREE.AxesHelper(5); // 5 es el tamaño del helper
    model.add(axesHelper);

    const gltfAnimations: THREE.AnimationClip[] = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap: Map<string, THREE.AnimationAction> = new Map();
    gltfAnimations.filter(a => a.name !== 'TPose').forEach((a: THREE.AnimationClip) => {
        animationsMap.set(a.name, mixer.clipAction(a));
    });

    characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, 'IDLE');
});

// CONTROL KEYS
const keysPressed: { [key: string]: boolean } = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
}, false);

const clock = new THREE.Clock();

// ANIMATE
function animate() {
    const mixerUpdateDelta = clock.getDelta();
    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keysPressed);
    }
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();

// RESIZE HANDLER
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function wrapAndRepeatTexture(map: THREE.Texture) {
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.x = map.repeat.y = 10;
}

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
}
