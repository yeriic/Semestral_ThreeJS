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
plane1.position.y = 3.19;
plane1.position.z = 59.63;

plane2.position.x = 44.60;
plane2.position.y = 4.90;
plane2.position.z = 51.26;

plane3.position.x = 58.91;
plane3.position.y = 5.70;
plane3.position.z = 51.10;

plane4.position.x = 30.10;
plane4.position.y = 5.70;
plane4.position.z = 51.10;

plane5.position.x = 58.46;
plane5.position.y = 7.90;
plane5.position.z = 42.74;

plane6.position.x = 29.65;
plane6.position.y = 7.90;
plane6.position.z = 42.74;

plane7.position.x = 42.76;
plane7.position.y = 8.99;
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
let characterMesh, characterBoundingBox;

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
let characterControls, characterHelper;
loader.load('steveRigV3_2.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
    });
    scene.add(model);

    model.position.set(25, 2, 25);
    model.scale.set(1.5, 1.5, 1.5);
    const axesHelper = new THREE.AxesHelper(5);
    model.add(axesHelper);

    const gltfAnimations = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap = new Map();
    gltfAnimations.filter(a => a.name !== 'TPose').forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
    });

    characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, 'IDLE');
    characterMesh = model;

    // Crear la caja de colisión del personaje
    characterBoundingBox = new THREE.Box3().setFromObject(model);
     // Agregar un BoxHelper para visualizar la caja del personaje
     characterHelper = new THREE.BoxHelper(model, 0x00ff00); // Verde para el personaje
     scene.add(characterHelper);

     model.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        } else if (object.isObject3D && object.children.length === 0) {
            // Eliminar nodos innecesarios
            model.remove(object);
        }
    });  
});

// Crear las cajas de colisión para los planos
const platformBoundingBoxes = [plane1, plane2, plane3, plane4, plane5, plane6, plane7].map(plane => new THREE.Box3().setFromObject(plane));

const platformHelpers = [plane1, plane2, plane3, plane4, plane5, plane6, plane7].map((plane) => {
    const helper = new THREE.BoxHelper(plane, 0xff0000); // Rojo para las cajas de los planos
    scene.add(helper);
    return helper;
});

// CONTROL KEYS
const keysPressed = {};
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


        // Actualizar la caja de colisión del personaje
        if (characterMesh) {
            characterBoundingBox.setFromObject(characterMesh);

            // Comprobar colisiones con plataformas
            let isOnPlatform = false;
            platformBoundingBoxes.forEach((platformBoundingBox) => {
                if (characterBoundingBox.intersectsBox(platformBoundingBox)) {
                    isOnPlatform = true;

                    // Ajustar la posición del personaje a la superficie de la plataforma
                    const platformTopY = platformBoundingBox.max.y;
                    characterMesh.position.y = platformTopY;
                }
            });

            // Si no está en una plataforma y no está saltando, aplicar gravedad
            if (!isOnPlatform && !characterControls.isJumping) {
                characterMesh.position.y -= 0.1; // Gravedad
                if (characterMesh.position.y < characterControls.initialY) {
                    characterMesh.position.y = characterControls.initialY; // Evitar atravesar el suelo
                }
            }
        }
    }
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    platformBoundingBoxes.forEach((platformBoundingBox, index) => {
        platformHelpers[index].update(); // Actualizar los helpers de las plataformas
    });
    if (characterHelper) characterHelper.update(); // Actualizar el helper del personaje
    
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

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
}