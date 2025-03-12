import { LegacyRef, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import DemoComputer from '../components/Computer';
import { myProjects } from '../constants/general';


const ComputerCombo = () => {
    const [curProj, setCurProj] = useState(0);


    const handleNavigation = (previous = false) => {
        if(previous) {
            setCurProj((prev) => prev > 0 ? (prev - 1) : myProjects.length - 1)
        } else {
            setCurProj((prev) => prev < myProjects.length - 1 ? prev + 1 : 0)
        }
    }


    const canvasRef = useRef<HTMLCanvasElement>();
    const divRef = useRef<HTMLDivElement>();
       
    useEffect(() => {
        let observerRefValue = null;
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                canvasRef.current!.style.display = 'inherit';
            } else {
                canvasRef.current!.style.display = 'none';
            }
            },
            {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
            }
        );


        if (divRef.current) {
            observer.observe(divRef.current);
            observerRefValue = divRef.current;
        }


        return () => {
            if (observerRefValue) {
            observer.unobserve(observerRefValue);
            }
        };
    }, []);


  return (
    <>
        <div className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full'>
            <div className='flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2-xl shadow-black-200'>
                <div className='absolute top-0 right-0'>
                    <img src={myProjects[curProj].spotlight} alt='spotlight' className='w-full h-96 object-cover rounded-xl'/>
                </div>
                <div className='p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg' style={myProjects[curProj].logoStyle}>
                    <img src={myProjects[curProj].logo} alt='logo' className='w-10 h-10 shadow-sm'/>
                </div>
                <div className='flex flex-col gap-5 text-white-600 my-5'>
                    <p className='text-white text-2xl font-semibold animatedText'>{myProjects[curProj].title}</p>
                    <p className='animatedText'>{myProjects[curProj].desc}</p>
                    <p className='animatedText'>{myProjects[curProj].subdesc}</p>
                </div>
                <div className='flex items-center justify-between flex-wrap gap-5'>
                    <div className='flex items-center gap-3'>{myProjects[curProj].tags.map((tag, ind) =>(
                            <div key={ind} className='tech-logo'>
                                <img src={tag.path} alt={tag.name} />
                            </div>
                        ))}
                    </div>
                    <a className='flex items-center gap-2 cursor-pointer text-white-600'
                        href={myProjects[curProj].href} target='_blank' rel='noreferrer'>
                            <p>Check live site</p>
                            <img src='/assets/arrow-up.png' className='w-3 h-2' alt='arrow-up'/>
                    </a>
                </div>
                <div className='flex justify-between items-center mt-7'>
                    <button className='arrow-btn' onClick={() => handleNavigation(true)}>
                        <img src='/assets/left-arrow.png' alt='left arrow' className='w-4 h-4'/>
                    </button>
                    <button className='arrow-btn' onClick={() => handleNavigation()}>
                        <img src='/assets/right-arrow.png' alt='right arrow' className='w-4 h-4'/>
                    </button>
                </div>
            </div>
            <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full' ref={(divRef as unknown) as LegacyRef<HTMLDivElement>}>
                <Canvas ref={(canvasRef as unknown) as LegacyRef<HTMLCanvasElement>}>
                    <ambientLight intensity={3}/>
                    <directionalLight position={[10, 10, 5]} />
                    <Center>
                        <Suspense fallback={<CanvasLoader/>}>
                            <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                <DemoComputer texture={myProjects[curProj].texture}/>
                            </group>
                        </Suspense>
                    </Center>
                    <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}/>
                </Canvas>
            </div>
        </div>
    </>
  )
}

export default ComputerCombo;



