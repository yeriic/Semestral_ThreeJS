import { CharacterControls } from './characterControls.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { plane, plane1, plane2, plane3, plane4, plane5, plane6, plane7, plane8,plane9,plane10 } from './geometrias/plano.js';


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

scene.add(plane1, plane2, plane3, plane3,plane4, plane5,plane6,plane7,plane8,plane9,plane10);


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

// Crear el trigger (por ejemplo, un cubo invisible)
const triggerPosition = new THREE.Vector3(35.11, 9.14, 30.82); // Posición del trigger
const triggerSize = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry = new THREE.BoxGeometry(triggerSize.x, triggerSize.y, triggerSize.z);
const triggerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: true }); // Visible para debug
const triggerMesh = new THREE.Mesh(triggerGeometry, triggerMaterial);
triggerMesh.position.copy(triggerPosition);
scene.add(triggerMesh);

// Crear la caja de colisión del trigger
const triggerBoundingBox = new THREE.Box3().setFromObject(triggerMesh);

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

    model.position.set(46, 2, 65);
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
const platformBoundingBoxes = [plane1, plane2, plane3, plane4, plane5, plane6, plane7,plane8,plane9,plane10].map(plane => new THREE.Box3().setFromObject(plane));

const platformHelpers = [plane1, plane2, plane3, plane4, plane5, plane6, plane7,plane8,plane9,plane10].map((plane) => {
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
             // Verificar colisión con el trigger
             if (characterBoundingBox.intersectsBox(triggerBoundingBox)) {
                // Teletransportar al personaje
                characterMesh.position.set(10, 5, 10); // Nueva posición
                console.log('Teletransportado!');
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