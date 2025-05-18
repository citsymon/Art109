// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// import postprocessing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//parameters
const params = {
    red: 1.0,
    green: 1.0,
    blue: 1.0,
    threshold: 0.5,
    strength: 0.4,
    radius: 0.8,
}

// colors
renderer.outputColorSpace = THREE.SRGBColorSpace;

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight)
);
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const outputPass = new OutputPass();
bloomComposer.addPass(outputPass);

camera.position.set(0, 3, 10);
camera.lookAt(0, 0, 0);

//audio reading
// create a global audio source
const listener = new THREE.AudioListener();
camera.add( listener );
const sound = new THREE.Audio( listener );

// get the <audio> element
const audioElement = document.querySelector('audio');
const track = sound.setMediaElementSource(audioElement);
const analyser = new THREE.AudioAnalyser(sound, 32);

// gridlines
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);
const axesHelper = new THREE.AxesHelper(6);
scene.add(axesHelper);

// const light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(2, 6, 10);

// scene.add(light);

// coob

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// cube.position.x = 0;
// scene.add( cube );

const uniforms = {
    u_time: { type: 'f', value: 0.0},
    u_frequency: { value: 0.0 },
    u_red: { value: params.red },
    u_green: { value: params.green },
    u_blue: { value: params.blue },
};

//icolash
const mat = new THREE.ShaderMaterial({
    wireframe: true,
    uniforms,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
});
const geo = new THREE.IcosahedronGeometry(4, 48);
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
const planeMesh = new THREE.Mesh(planeGeometry, mat);
planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 10;
// planeMesh.scale.x = 2;
// planeMesh.scale.y = 2;
// planeMesh.scale.z = 2;
planeMesh.position.y = -10;
planeMesh.position.z = -10;
scene.add(planeMesh);

//gui
const gui = new GUI();
//color control
const colorsFolder = gui.addFolder('Colors');
colorsFolder.add(params, 'red', 0, 1).onChange(function (value) {
    uniforms.u_red.value = Number(value);
});
colorsFolder.add(params, 'green', 0, 1).onChange(function (value) {
    uniforms.u_green.value = Number(value);
});
colorsFolder.add(params, 'blue', 0, 1).onChange(function (value) {
    uniforms.u_blue.value = Number(value);
});

const bloomFolder = gui.addFolder('Bloom');
bloomFolder.add(params, 'threshold', 0, 1).onChange(function (value) {
    bloomPass.threshold = Number(value);
});
bloomFolder.add(params, 'strength', 0, 3).onChange(function (value) {
    bloomPass.strength = Number(value);
});
bloomFolder.add(params, 'radius', 0, 1).onChange(function (value) {
    bloomPass.radius = Number(value);
});

const clock = new THREE.Clock();

function animate() {

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // mesh.rotation.x += 0.003;

    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_frequency.value = analyser.getAverageFrequency();
    bloomComposer.render();
    requestAnimationFrame(animate);
    //renderer.render(scene, camera);
}
animate();
//renderer.setAnimationLoop( animate );

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
});