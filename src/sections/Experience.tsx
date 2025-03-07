import { Float, OrbitControls } from "@react-three/drei"
import Book from "../components/Book"
import { Canvas } from "@react-three/fiber"
import { Dispatch, SetStateAction, Suspense, useContext, useState } from "react"
import CanvasLoader from "../components/CanvasLoader"
import { ExperienceContext } from "../components/ExperienceContext"
import { experiences, pages } from "../constants/general"

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

const Experience = () => {
  const [expInd, setExpInd] = useState(0);
  const {setExperience } = useContext(ExperienceContext);
  const [page, setPage] = useState(0);

  const handleNavigation = (back = false) => {
    console.log(pages);
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
            {expInd === 0 &&
              <Float
                rotation-x={-Math.PI / 4}
                floatIntensity={1}
                speed={2}
                rotationIntensity={2}
              >
                <Book scale={2.5} page={page} changePage={setPage}/>
              </Float>
            }
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
      <div className={'flex justify-between items-center z-50 ' + (expInd === 0 ? 'mt-auto' : 'mt-7')} >
        <button className="arrow-button" onClick={() => handleNavigation(true)}>
          <img src="/assets/left-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
        <button className="arrow-button" onClick={() => handleNavigation()}>
          <img src="/assets/right-arrow.png" alt="back" className="w-5 h-5"/>
        </button>
      </div>
      
      {/* Optional utilities based on selected exp */}
      {expInd === 0 &&
        <div className='justify-between items-end mt-auto z-50'>
          <BookButtons page={page} setPage={setPage} />
        </div>
      }
    </section>
  )
};

export default Experience;
