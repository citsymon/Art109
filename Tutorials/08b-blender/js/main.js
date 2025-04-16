// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

//let canvas;
/*
function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2);
    background(50);
}
*/
let scene, camera, renderer, ball, cone, dog;
let mixer, actionPant, actionTail;
let sceneContainer = document.querySelector("#scene-container");

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3c3c1d);
    const light = new THREE.DirectionalLight(0xffffff, 7);
    light.position.set(1, 6, 10);
    scene.add(light);
    camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);



    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.SphereGeometry( 1.5, 32, 16 );
    const texture = new THREE.TextureLoader().load('texture/14505931_640x640.png');
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    ball = new THREE.Mesh( geometry, material );
    ball.position.x = 1.5;
    scene.add( ball );

    camera.position.z = 5;

}

function init2() {
    
    const geometry = new THREE.ConeGeometry( 1, 3, 30 );
    const texture = new THREE.TextureLoader().load('texture/1553284341039.jpg');
    const material = new THREE.MeshBasicMaterial( { map: texture } ); 
    cone = new THREE.Mesh( geometry, material );
    cone.position.x = -1.5;
    scene.add( cone );

}
function initModel() {
    const loader = new GLTFLoader(); // to load 3d models

    loader.load('model/dog_shiny.gltf', function(gltf){
        dog = gltf.scene;
        scene.add( dog );
        dog.scale.set(3, 3, 3);
        dog.position.x = 4;
        dog.position.y = -2;
        mixer = new THREE.AnimationMixer(dog);
        const clips = gltf.animations;

        const clipPant = THREE.AnimationClip.findByName(clips, 'pant');
        actionPant = mixer.clipAction(clipPant);
        //actionPant.play();

        const clipTail = THREE.AnimationClip.findByName(clips, 'tail');
        actionTail = mixer.clipAction(clipTail);
        actionTail.play();

        /*clips.forEach(function(clip){
            const action = mixer.clipAction(clip);
            action.play();
        })*/

    }
    )
}
// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

let mouseHeld = false;

document.querySelector("body").addEventListener("mousedown", () => {
    actionPant.play();
    actionPant.paused = false;
    mouseHeld = true;
    console.log("mousedown");
})
document.querySelector("body").addEventListener("mouseup", () => {
    //actionPant.stop();
    actionPant.paused = true;
    mouseHeld = false;
    console.log("mouseup");
})
document.querySelector("body").addEventListener("mousemove", () => {
    if(mouseHeld == true){
        console.log("mousemove");
        ball.rotation.x += 0.8;
    }
})


const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;
    cone.rotation.y = Math.sin(Date.now() / 120) * 4;
    if (dog){
    dog.rotation.x += 0.0;
    dog.rotation.y = Math.sin(Date.now() / 1430) * 2;
    }

    ball.position.x = Math.sin(Date.now() / 200) * 3;
    ball.position.y = Math.sin(Date.now() / 240) * 3;
    ball.position.z = Math.sin(Date.now() / 220) * 3;

    if (mixer){
    mixer.update(clock.getDelta());
    }

    renderer.render( scene, camera );
}
//  renderer.setAnimationLoop( animate );

function windowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', windowResize, false);

//setup();
init();
init2();
initModel();
animate();
