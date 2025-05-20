// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';
// import { fragmentShaderB } from './shaders';
// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// import postprocessing
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

window.onload = function() {
  
    var file = document.getElementById("inputFile");
    var audio = document.getElementById("audio");
  
    file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
}};
const inputButton = document.getElementById('inputFile');
const fileName = document.getElementById('fileChosen');
inputButton.addEventListener('change', function() {
    fileName.textContent = this.files[0].name
});


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
    red: 0.8,
    green: 0.6,
    blue: 1.0,
    threshold: 0.5,
    strength: 0.4,
    radius: 0.8,
    noise: 4.0
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
sound.setMediaElementSource(audioElement);
const analyser = new THREE.AudioAnalyser(sound, 32);

// gridlines
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(6);
// scene.add(axesHelper);

// const light = new THREE.DirectionalLight(0xffffff, 2);
// light.position.set(2, 6, 10);

// scene.add(light);

const uniforms = {
    u_time: { type: 'f', value: 0.0},
    u_frequency: { value: 0.0 },
    u_red: { value: params.red },
    u_green: { value: params.green },
    u_blue: { value: params.blue },
    u_amplitude: { type: 'f', value: 3.0},
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

// const planeMat = THREE.ShaderMaterial({
//     wireframe: true,
//     uniforms,
//     vertexShader: document.getElementById('vertexshader').textContent,
//     fragmentShader: fragmentShaderB(),
// });
const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
const planeMesh = new THREE.Mesh(planeGeometry, mat);
planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 10;
// planeMesh.scale.x = 2;
// planeMesh.scale.y = 2;
// planeMesh.scale.z = 2;
planeMesh.position.y = -10;
planeMesh.position.z = -10;
scene.add(planeMesh);

// coob

const cubeGeo = new THREE.BoxGeometry( 2, 2, 2 );
const cubeMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.7,
    color: 0x80ffff,
});
const cubeR1 = new THREE.Mesh( cubeGeo, cubeMat );
cubeR1.position.x = 10;
const cubeR2 = new THREE.Mesh( cubeGeo, cubeMat );
cubeR2.position.x = 10;
const cubeMat2 = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.7,
    color: 0x00ff80,
});
const cubeL1 = new THREE.Mesh( cubeGeo, cubeMat2 );
cubeL1.position.x = -10;
const cubeL2 = new THREE.Mesh( cubeGeo, cubeMat2 );
cubeL2.position.x = -10;
scene.add( cubeR1 );
scene.add( cubeR2 );
scene.add( cubeL1 );
scene.add( cubeL2 );

//toob
const tubeGeo = new THREE.CylinderGeometry( 5, 5, 600, 64 );
const tubeText = new THREE.TextureLoader().load('media/tubegradient1.png');
const tubeMat = new THREE.MeshBasicMaterial({
    transparent: true,
    map: tubeText,
    opacity: 0.5,
    // color: 0xffff00,
});
const tube = new THREE.Mesh( tubeGeo, tubeMat );
tube.position.y = 10;
tube.position.z = -30;
tube.rotation.x = (Math.PI / 2);
tube.rotation.z = (Math.PI / 2);
//scene.add( tube );

const tube2Geo = new THREE.CylinderGeometry( 500, 2, 600, 64 );
const tube2Text = new THREE.TextureLoader().load('media/tubegradient1.png');
const tube2Mat = new THREE.MeshBasicMaterial({
    transparent: true,
    wireframe: true,
    map: tube2Text,
    opacity: 0.2,
    // color: 0xffff00,
});
const tube2 = new THREE.Mesh( tube2Geo, tube2Mat );
tube2.rotation.x = (Math.PI / 2);
scene.add( tube2 );

//gui
const gui = new GUI();
gui.close()
const objHolder = {
'Reset Camera': function() {
    orbit.reset();
    orbit.update();
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);
}};



gui.add( objHolder, 'Reset Camera');

gui.add(params, 'noise', 0, 20).onChange(function (value) {
    uniforms.u_amplitude.value = Number(value);
});

//color control
const colorsFolder = gui.addFolder('Shader Colors');
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
const averageFrequency = analyser.getAverageFrequency();
let noiseFloat;
function animate() {



    uniforms.u_time.value = clock.getElapsedTime();
    uniforms.u_frequency.value = analyser.getAverageFrequency();
    noiseFloat = Number((uniforms.u_frequency.value / 3) * uniforms.u_amplitude.value);

    cubeR1.rotation.x += (0.0005 * noiseFloat);
    cubeR1.rotation.y =  Math.sin(Date.now() / 2400) * (-0.005 * noiseFloat);
    cubeR1.rotation.z = Math.sin(Date.now() / 1000) * 0.04
    //cubeR1.position.x = (Math.sin(uniforms.u_frequency.value / 200) * 4)+ 8;
    cubeR1.position.y = Math.sin(noiseFloat / 200) * 3;
    //cubeR1.position.z = Math.sin(Date.now() / 220) * 3;

    cubeR2.rotation.x += (0.0005 * noiseFloat);
    cubeR2.rotation.y =  Math.sin(Date.now() / 2400) * (-0.005 * noiseFloat);
    cubeR2.rotation.z = Math.sin(Date.now() / 1000) * 0.04
    //cubeR2.position.x = Math.sin((uniforms.u_frequency.value / 200) * 4)+ 8;
    cubeR2.position.y = Math.sin(noiseFloat / 200) * -3;
    //cubeR2.position.z = Math.sin(Date.now() / 220) * 3;

    cubeL1.rotation.x += (0.0005 * noiseFloat);
    cubeL1.rotation.y = Math.sin(Date.now() / 2400) * (0.005 * noiseFloat);
    cubeL1.rotation.z = Math.sin(Date.now() / 1000) * -0.04
    cubeL1.position.y = Math.sin(noiseFloat / 200) * 3;

    cubeL2.rotation.x += (0.0005 * noiseFloat);
    cubeL2.rotation.y = Math.sin(Date.now() / 2400) * (0.005 * noiseFloat);
    cubeL2.rotation.z = Math.sin(Date.now() / 1000) * -0.04
    cubeL2.position.y = Math.sin(noiseFloat / 200) * -3;

    tube.rotation.x += (0.0001 * noiseFloat);
    // tube.rotation.y = Math.sin(Date.now() / 1000) * 0.0005

    tube2.rotation.y += (0.0001 * noiseFloat);
    tube2.rotation.x = (Math.sin(Date.now() / 1000) * 0.0045) + (Math.PI / 2)
    tube2.rotation.z = Math.sin(Date.now() / 1000) * 0.008

    planeMesh.rotation.y = Math.sin(Date.now() / 1000) * 0.04
    mesh.rotation.z = Math.sin(Date.now() / 1000) * 0.08

    bloomComposer.render();
    requestAnimationFrame(animate);
    //renderer.render(scene, camera);
    //console.log(analyser.getAverageFrequency());
    console.log(noiseFloat);
}
animate();
//renderer.setAnimationLoop( animate );

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
});