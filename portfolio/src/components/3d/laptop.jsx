import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function Laptop(props) {
  const groupRef = useRef()
  const gltf = useLoader(GLTFLoader, '/models/Laptop_video.glb')

  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/videos/mitski.mp4'
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.autoplay = true
    video.play()

    const texture = new THREE.VideoTexture(video)
    texture.flipY = false
    texture.encoding = THREE.sRGBEncoding

    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material?.name === 'video') {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })

    // Centrado automático del modelo
    const box = new THREE.Box3().setFromObject(gltf.scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    gltf.scene.position.sub(center) // centra el modelo en el origen
  }, [gltf])

  // Rotación sobre eje Y
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef} {...props}>
      <primitive object={gltf.scene} />
    </group>
  )
}
