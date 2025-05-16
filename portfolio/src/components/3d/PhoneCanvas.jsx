import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import Phone from './Phone'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(0)}% loaded</Html>
}

export default function PhoneCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 2]}}>
    <color attach="background" args={['#000']} />

      {/* Iluminación mejorada */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 300]} intensity={1} />
      <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={1} />

      <Suspense fallback={<Loader />}>
        <Phone position={[0, 0, 0]} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
