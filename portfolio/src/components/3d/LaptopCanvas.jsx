import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import Laptop from './laptop.jsx'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(0)}% loaded</Html>
}

export default function LaptopCanvas() {
  return (
    <Canvas camera={{ position: [3, 1, 3], fov: 5 }}>
      <hemisphereLight intensity={1.2} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <Suspense fallback={<Loader />}>
        <Laptop />
      </Suspense>
    </Canvas>
  )
}
