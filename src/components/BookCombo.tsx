import { Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import CanvasLoader from "./common/CanvasLoader"
import BookButtons from "./BookButtons"

const BookCombo = () => {
  const [page, setPage] = useState(0);

  return (
    <>
        <div className="w-full h-full absolute inset-0">
            <Canvas className='w-full h-full'>
                <Suspense fallback={<CanvasLoader/>} >
                    <Float
                        rotation-x={-Math.PI / 4}
                        floatIntensity={0.5}
                        speed={0.5}
                        rotationIntensity={1}
                    >
                        <Book scale={2.75} page={page} changePage={setPage}/>
                    </Float>
                <OrbitControls />
                <directionalLight
                    position={[2, 5, 2]}
                    intensity={1}
                    castShadow
                />
                <ambientLight intensity={1} />
                </Suspense>
            </Canvas>
        </div>
        
        <div className='justify-between items-end mt-auto z-50'>
            <BookButtons page={page} setPage={setPage} />
        </div>
    </>
  )
};

export default BookCombo;
