import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

console.log("Initializing scene and camera");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

console.log("Initializing renderer");
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

console.log("Appending renderer to DOM");
document.getElementById("laptop").appendChild(renderer.domElement);

console.log("Initializing OrbitControls");
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = true;
controls.enableRotate = true;
camera.position.set(0, 50, 100);

console.log("Adding lights to the scene");
const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(500, 500, 500);
directionalLight.castShadow = true;
scene.add(directionalLight);

console.log("Loading 3D model");
const loader = new GLTFLoader();
let object;

loader.load(
  `models/laptop/scene.gltf`,
  function (gltf) {
    console.log("3D model loaded successfully");
    object = gltf.scene;
    object.scale.set(15, 15, 15); // Set the initial scale
    object.position.set(-67, 28, 0); // Set the initial position

    object.traverse((child) => {
      if (child.isMesh) {
        console.log("Setting up shadows for child mesh");
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(object);

    // Remove scale adjustment
    // adjustScale();

    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Error loading 3D model", error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  // Remove rotation
  // if (object) {
  //   object.rotation.y += 0.01;
  // }

  renderer.render(scene, camera);
}

// Remove adjustScale function
// function adjustScale() {
//   // This function is no longer needed
// }

// Initial adjustment
// adjustScale();

// Adjust on window resize
window.addEventListener("resize", () => {
  console.log("Window resized");
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
