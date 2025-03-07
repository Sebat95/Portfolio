import { Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Suspense, useContext, useState } from "react"
import CanvasLoader from "../components/CanvasLoader"
import { ExperienceContext } from "../components/ExperienceContext"
import { experiences } from "../constants/general"

const Experience = () => {
  const [expInd, setExpInd] = useState(0);
  const {setExperience } = useContext(ExperienceContext);

  const handleNavigation = (back = false) => {
    setExpInd((prev) => {
      let nxt = prev + (back ? -1 : 1);
      if (nxt < 0) {
        nxt = experiences.length - 1;
      } else if (nxt > experiences.length - 1) {
        nxt = 0
      }
      setExperience(experiences[nxt]);
      return nxt;
    })
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
        <button className="arrow-button" onClick={() => handleNavigation()}>
          <img src="/assets/right-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
      </div>
  
    </section>
  )
}

export default Experience
