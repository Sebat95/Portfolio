import { Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import CanvasLoader from "../components/CanvasLoader"

const Experience = () => {
  const [expInd, setExpInd] = useState(0);

  const handleNavigation = (back = false) => {
    if (back) {
      setExpInd((prev) => prev > 0 ? (prev - 1) : 2);
    } else {
      setExpInd((prev) => prev < 2 ? (prev + 1)  : 0);
    }
  }

  return (
    <section className='w-full flex flex-col relative justify-center' style={{height: '90vh'}} id='exp'>
      <div className="w-full h-full absolute inset-0">
        <Canvas className='w-full h-full'>
          <Suspense fallback={<CanvasLoader/>} >
            {expInd == 0 &&
            <Float
              rotation-x={-Math.PI / 4}
              floatIntensity={1}
              speed={2}
              rotationIntensity={2}
            >
              <Book scale={2.5}/>
            </Float>}
            <OrbitControls />
            <directionalLight
              position={[2, 5, 2]}
              intensity={2.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
            <ambientLight intensity={3} />
          </Suspense>
        </Canvas>
      </div>
      <div className='flex justify-between items-center mt-7 z-50'>
        <button className="arrow-button" onClick={() => handleNavigation(true)}>
          <img src="/assets/left-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
        <button className="arrow-button" onClick={() => handleNavigation(true)}>
          <img src="/assets/right-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
      </div>
  
    </section>
  )
}

export default Experience
