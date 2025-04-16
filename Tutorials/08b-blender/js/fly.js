//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"), alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(20, 5, 16, 100);
const texture = new THREE.TextureLoader().load('texture/CoolFroge.png');
const material = new THREE.MeshBasicMaterial( { map: texture } );

const torus = new THREE.Mesh( geometry, material );

scene.add(torus);
torus.position.z = -55;
torus.position.x = -10;
function moveCam() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * 0.03;
    camera.position.x = t * 0.01;
}

document.body.onscroll = moveCam;

moveCam()

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.z += 0.02;

    renderer.render(scene, camera);
}
animate()