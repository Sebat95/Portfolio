import { Environment, Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CanvasLoader from "../components/CanvasLoader"

const Experience = () => {
  return (
    <section className='w-full flex flex-col relative' style={{height: '90vh'}} id='exp'>
      <div className="w-full h-full absolute inset-0">
        <Canvas className='w-full h-full'>
          <Suspense fallback={<CanvasLoader/>} >
            <Float
              rotation-x={-Math.PI / 4}
              floatIntensity={1}
              speed={2}
              rotationIntensity={2}
            >
              <Book scale={2}/>
            </Float>
            <OrbitControls />
            <Environment preset="studio"></Environment>
            <directionalLight
              position={[2, 5, 2]}
              intensity={2.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Experience
