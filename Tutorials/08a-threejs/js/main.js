// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

let canvas;
/*
function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2);
    background(50);
}
*/
let scene, camera, renderer, cube, cone;

function init() {
    scene = new THREE.Scene();
    const light = new THREE.DirectionalLight(0xffffff, 7);
    light.position.set(1, 6, 10);
    scene.add(light);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const texture = new THREE.TextureLoader().load('texture/14505931_640x640.png');
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    cube = new THREE.Mesh( geometry, material );
    cube.position.x = 1.5;
    scene.add( cube );

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
        const dog = gltf.scene;
        scene.add( dog );
    }
    )
}
// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cone.rotation.y += 0.01;
    renderer.render( scene, camera );
}
//  renderer.setAnimationLoop( animate );

function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', windowResize, false);

//setup();
init();
init2();
initModel();
animate();
