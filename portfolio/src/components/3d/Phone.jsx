import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function Phone(props) {
  const gltf = useLoader(GLTFLoader, '/models/red_iphone.glb')
  const groupRef = useRef()
  const videoRef = useRef(null)

  useEffect(() => {
    if (gltf?.scene) {
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = new THREE.Vector3()
      box.getCenter(center)
      gltf.scene.position.sub(center)

      const video = document.createElement('video')
      video.src = '/videos/mitski.mp4'
      video.crossOrigin = 'anonymous'
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      video.play()
      videoRef.current = video

      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.flipY = false
      videoTexture.encoding = THREE.sRGBEncoding

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material?.name === 'screen.001') {
          child.material = new THREE.MeshBasicMaterial({ map: videoTexture })
        }
      })
    }
  }, [gltf])

  useFrame(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
    }
  })

  return (
    <group ref={groupRef} {...props}>
      <primitive object={gltf.scene} />
    </group>
  )
}
