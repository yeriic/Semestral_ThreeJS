import { CharacterControls } from './characterControls.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { plane, plane1, plane2, plane3, plane4, plane5, plane6, plane7, plane8,plane9,plane10, plane11, plane12,plane13, plane14, plane15, plane16, plane17, plane18, plane19, plane20, plane21, plane22, plane23, plane24, plane25, plane26, plane27 } from './geometrias/plano.js';


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

//posiciones
plane1.position.x = 44.19;
plane1.position.y = 2.94;
plane1.position.z = 60.06;

plane2.position.x = 44.55;
plane2.position.y = 3.40;
plane2.position.z = 55.03;

plane3.position.x = 35.34;
plane3.position.y = 3.90;
plane3.position.z = 52.42;

plane4.position.x = 53.69;
plane4.position.y = 3.90;
plane4.position.z = 52.42;

plane5.position.x = 35.34;
plane5.position.y = 4.96;
plane5.position.z = 47.57;

plane6.position.x = 53.69;
plane6.position.y = 4.96;
plane6.position.z = 47.57;

plane7.position.x = 53.69;
plane7.position.y = 5.55;
plane7.position.z = 42.68;

plane8.position.x = 35.34;
plane8.position.y = 5.55;
plane8.position.z = 42.68;

plane9.position.x = 35.56;
plane9.position.y = 6.11;
plane9.position.z = 35.01;

plane10.position.x = 53.45;
plane10.position.y = 6.11;
plane10.position.z = 35.01;

plane11.position.x = 57.81;
plane11.position.y = 14.50;
plane11.position.z = -43.16;

plane12.position.x = 49.62;
plane12.position.y = 12.85;
plane12.position.z = -42.64;

plane13.position.x = 47.62;
plane13.position.y = 12.99;
plane13.position.z = -42.64;

plane14.position.x = 43.62;
plane14.position.y = 11.70;
plane14.position.z = -42.64;

plane15.position.x = 39.90;
plane15.position.y = 10.15;
plane15.position.z = -42.64;

plane16.position.x = 35.90;
plane16.position.y = 8.65;
plane16.position.z = -42.64;

plane17.position.x = 25.90;
plane17.position.y = 8.65;
plane17.position.z = -42.64;

plane18.position.x = -63.727;
plane18.position.y = 6.1;
plane18.position.z = 35.85;

plane18.position.x = -63.727;
plane18.position.y = 6.1;
plane18.position.z = 35.85;

plane19.position.x = -51.727;
plane19.position.y = 6.1;
plane19.position.z = 35.85;

plane20.position.x = -48.10;
plane20.position.y = 7.70;
plane20.position.z = 35.85;

plane21.position.x = -44.0;
plane21.position.y = 9.30;
plane21.position.z = 35.85;

plane22.position.x = -32.0;
plane22.position.y = 10.80;
plane22.position.z = 35.85;

plane23.position.x = -46.31;
plane23.position.y = 7.40;
plane23.position.z = -26.17;

plane24.position.x = -45.75;
plane24.position.y = 7.40;
plane24.position.z = -38.17;

plane25.position.x = -45.75;
plane25.position.y = 8.95;
plane25.position.z = -42.17;

plane26.position.x = -45.75;
plane26.position.y = 10.45;
plane26.position.z = -46.17;

plane27.position.x = -45.75;
plane27.position.y = 12;
plane27.position.z = -58.17;

//rotaciones
plane1.rotation.x = -Math.PI / 2;

plane2.rotation.x = -Math.PI / 2;

plane3.rotation.x = -Math.PI / 2;

plane4.rotation.x = -Math.PI / 2;

plane5.rotation.x = -Math.PI / 2;

plane6.rotation.x = -Math.PI / 2;

plane7.rotation.x = -Math.PI / 2;

plane8.rotation.x = -Math.PI / 2;

plane9.rotation.x = -Math.PI / 2;

plane10.rotation.x = -Math.PI / 2;

plane11.rotation.x = -Math.PI / 2;

plane12.rotation.x = -Math.PI / 2;

plane13.rotation.x = -Math.PI / 2;

plane14.rotation.x = -Math.PI / 2;

plane15.rotation.x = -Math.PI / 2;

plane16.rotation.x = -Math.PI / 2;

plane17.rotation.x = -Math.PI / 2;

plane18.rotation.x = -Math.PI / 2;

plane19.rotation.x = -Math.PI / 2;

plane20.rotation.x = -Math.PI / 2;

plane21.rotation.x = -Math.PI / 2;

plane22.rotation.x = -Math.PI / 2;

plane23.rotation.x = -Math.PI / 2;

plane24.rotation.x = -Math.PI / 2;

plane25.rotation.x = -Math.PI / 2;

plane26.rotation.x = -Math.PI / 2;

plane27.rotation.x = -Math.PI / 2;

// Crear el trigger (por ejemplo, un cubo invisible)
const triggerPosition = new THREE.Vector3(35.11, 9.14, 30.82); // Posición del trigger
const triggerSize = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry = new THREE.BoxGeometry(triggerSize.x, triggerSize.y, triggerSize.z);
const triggerMesh = new THREE.Mesh(triggerGeometry);
triggerMesh.position.copy(triggerPosition);
const triggerBoundingBox = new THREE.Box3().setFromObject(triggerMesh);


const triggerPosition1 = new THREE.Vector3(57.5, 16.69, -47.95); // Posición del trigger
const triggerSize1 = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry1 = new THREE.BoxGeometry(triggerSize1.x, triggerSize1.y, triggerSize1.z);
const triggerMesh1 = new THREE.Mesh(triggerGeometry1);
triggerMesh1.position.copy(triggerPosition1);
const triggerBoundingBox1 = new THREE.Box3().setFromObject(triggerMesh1);

const triggerPosition2 = new THREE.Vector3(-30.99, 12, 42); // Posición del trigger
const triggerSize2 = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry2 = new THREE.BoxGeometry(triggerSize2.x, triggerSize2.y, triggerSize2.z);
const triggerMesh2 = new THREE.Mesh(triggerGeometry2);
triggerMesh2.position.copy(triggerPosition2);
const triggerBoundingBox2 = new THREE.Box3().setFromObject(triggerMesh2);

const triggerPosition3 = new THREE.Vector3(-45.90, 12.52, -64.7643); // Posición del trigger
const triggerSize3 = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry3 = new THREE.BoxGeometry(triggerSize3.x, triggerSize3.y, triggerSize3.z);
const triggerMesh3 = new THREE.Mesh(triggerGeometry3, );
triggerMesh3.position.copy(triggerPosition3);
const triggerBoundingBox3 = new THREE.Box3().setFromObject(triggerMesh3);

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 5;
camera.position.x = 5;

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

    model.position.set(45,2,65);
    model.scale.set(1.5, 1.5, 1.5);
    

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
const platformBoundingBoxes =   [plane1, plane2, plane3, plane4, plane5, plane6, plane7,plane8,
                                plane9,plane10, plane11, plane12,plane13, plane14, plane15
                                ,plane16, plane17,plane18,plane19,plane20,plane21,plane22,
                                plane23,plane24,plane25,plane26,plane27].map(plane => new THREE.Box3().setFromObject(plane));

const platformHelpers = [plane1, plane2, plane3, plane4, plane5, plane6, plane7,plane8,
                        plane9,plane10,plane11,plane12,plane13,plane14, plane15,plane16
                        ,plane17, plane18,plane19,plane20,plane21,plane22,plane23,plane24
                        ,plane25,plane26,plane27].map((plane) => {
    const helper = new THREE.BoxHelper(plane, 0xff0000); // Rojo para las cajas de los planos
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
             // Verificar colisión con el trigger
             if (characterBoundingBox.intersectsBox(triggerBoundingBox)) {
                // Teletransportar al personaje
                characterMesh.position.set(25.83, 7.477, -43.3); // Nueva posición
                console.log('Teletransportado!');
             }

             if (characterBoundingBox.intersectsBox(triggerBoundingBox1)) {
                // Teletransportar al personaje
                characterMesh.position.set(-63.72, 4.81, 35.85); // Nueva posición
                console.log('Teletransportado!');
             }

             if (characterBoundingBox.intersectsBox(triggerBoundingBox2)) {
                // Teletransportar al personaje
                characterMesh.position.set(-46.319,8.53,-26.171); // Nueva posición
                console.log('Teletransportado!');
             }

             if (characterBoundingBox.intersectsBox(triggerBoundingBox3)) {
                // Teletransportar al personaje
                characterMesh.position.set(45,2,65); // Nueva posición
                console.log('Teletransportado!');
             }
        }
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

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
}