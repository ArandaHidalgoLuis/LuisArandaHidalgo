// public/scripts/laptop.js.js
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = document.getElementById('laptop-canvas-container')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
camera.position.set(0, 1, 5)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(container.clientWidth, container.clientHeight)
container.appendChild(renderer.domElement)

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(3, 5, 2)
scene.add(directionalLight)

// Cargar modelo GLB
const loader = new GLTFLoader()
loader.load('/models/laptop.glb', (gltf) => {
  const model = gltf.scene
  scene.add(model)
}, undefined, (error) => {
  console.error('Error loading GLB:', error)
})

// Animar
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
