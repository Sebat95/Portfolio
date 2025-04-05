import { Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Dispatch, SetStateAction, Suspense, useState } from "react"
import CanvasLoader from "../components/CanvasLoader"
import { pages } from "../common/constants"

const BookButtons = ({page, setPage}: {page: number, setPage: Dispatch<SetStateAction<number>>}) => {
  const btns = [];
  for (let i = 0; i <= pages.length; i++) {
    btns.push(<button
      key={i}
      className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
        i === page
          ? "bg-white/90 text-black"
          : "bg-black/30 text-white"
      }`}
      onClick={() => setPage(i)}
    >
      {i < pages.length ? pages[i].title : "Back"}
    </button>)
  }
  return btns;
};

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
                        speed={1}
                        rotationIntensity={1}
                    >
                        <Book scale={2.75} page={page} changePage={setPage}/>
                    </Float>
                <OrbitControls />
                <directionalLight
                    position={[2, 5, 2]}
                    intensity={2}
                    castShadow
                />
                <ambientLight intensity={3} />
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
