import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export const W = 'w'
export const A = 'a'
export const S = 's'
export const D = 'd'
export const SHIFT = 'shift'
export const SPACE = 'space'
export const DIRECTIONS = [W, A, S, D]

export class CharacterControls {
    model: THREE.Group;
    mixer: THREE.AnimationMixer;
    animationsMap: Map<string, THREE.AnimationAction> = new Map(); // , Run, Idle, Jump
    orbitControl: OrbitControls;
    camera: THREE.Camera;

    // state
    currentAction: string;

    // temporary data
    walkDirection = new THREE.Vector3();
    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuarternion: THREE.Quaternion = new THREE.Quaternion();
    cameraTarget = new THREE.Vector3();

    // constants
    fadeDuration: number = 0.2;
    runVelocity = 10;
    walkVelocity = 10;
    isJumping: boolean = false; // Estado para controlar si está en salto
    jumpHeight = 8; // Altura máxima del salto
    jumpDuration = 0.9; // Duración del salto en segundos
    jumpStartTime: number = 0; // Tiempo de inicio del salto
    initialY: number = 2; // NUEVO: Altura inicial del personaje
    
    constructor(
        model: THREE.Group,
        mixer: THREE.AnimationMixer,
        animationsMap: Map<string, THREE.AnimationAction>,
        orbitControl: OrbitControls,
        camera: THREE.Camera,
        currentAction: string
    ) {
        this.model = model;
        this.mixer = mixer;
        this.animationsMap = animationsMap;
        this.currentAction = currentAction;
        this.animationsMap.forEach((value, key) => {
            if (key == currentAction) {
                value.play();
            }
        });
        this.orbitControl = orbitControl;
        this.camera = camera;
        this.updateCameraTarget(0, 0);
    }

    public update(delta: number, keysPressed: any) {
        const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);

        let play = '';
        if (this.isJumping) { // Priorizar la animación de salto
            play = 'Jump';
        } else if (keysPressed[' ']) { // Detectar tecla de salto
            this.isJumping = true;
            this.jumpStartTime = performance.now();
            play = 'Jump';
        } else if (directionPressed) {
            play = 'Walk';
        } else {
            play = 'IDLE';
        }

        if (this.currentAction != play) {
            const toPlay = this.animationsMap.get(play);
            const current = this.animationsMap.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        this.mixer.update(delta);

        if (this.isJumping) { // Aplicar la lógica de salto
            const elapsedTime = (performance.now() - this.jumpStartTime) / 1000;
            const jumpProgress = elapsedTime / this.jumpDuration;

            if (jumpProgress >= 1) { // Finalizar el salto
                this.isJumping = false;
                this.model.position.y = this.initialY; // NUEVO: Restaurar altura inicial
            } else {
                const height = this.jumpHeight * Math.sin(Math.PI * jumpProgress); // Trayectoria parabólica
                this.model.position.y = this.initialY + height; // MODIFICADO: Sumar la altura inicial
            }
        }

        if (this.currentAction == 'Walk' || this.isJumping) { // Continuar movimiento durante el salto
            const angleYCameraDirection =
                Math.atan2(this.camera.position.x - this.model.position.x, this.camera.position.z - this.model.position.z) +
                Math.PI;
            const directionOffset = this.directionOffset(keysPressed);

            this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

            this.walkDirection.set(0, 0, 1);
            this.walkDirection.applyQuaternion(this.model.quaternion);
            this.walkDirection.normalize();

            const velocity = this.walkVelocity;

            const moveX = this.walkDirection.x * velocity * delta;
            const moveZ = this.walkDirection.z * velocity * delta;
            this.model.position.x += moveX;
            this.model.position.z += moveZ;
            this.updateCameraTarget(moveX, moveZ);
        }
    }

    private updateCameraTarget(moveX: number, moveZ: number) {
        // Actualizar posición de la cámara
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;
    
        // Actualizar objetivo de la cámara
        this.cameraTarget.x = this.model.position.x;
        this.cameraTarget.y = this.model.position.y + 1; // Seguir la altura del modelo
        this.cameraTarget.z = this.model.position.z;
        this.orbitControl.target = this.cameraTarget;
    
        // Actualizar controles de la cámara para reflejar los cambios
        this.orbitControl.update();
    }
    
    

    private directionOffset(keysPressed: any) {
        let directionOffset = 0; // w

        if (keysPressed[W]) {
            if (keysPressed[A]) {
                directionOffset = Math.PI / 4; // w+a
            } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 4; // w+d
            }
        } else if (keysPressed[S]) {
            if (keysPressed[A]) {
                directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
            } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
            } else {
                directionOffset = Math.PI; // s
            }
        } else if (keysPressed[A]) {
            directionOffset = Math.PI / 2; // a
        } else if (keysPressed[D]) {
            directionOffset = -Math.PI / 2; // d
        }

        return directionOffset;
    }
}
