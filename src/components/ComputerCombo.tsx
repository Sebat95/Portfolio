import { LegacyRef, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import DemoComputer from '../components/Computer';
import { jobsAndProjs } from '../constants/general';


const ComputerCombo = () => {
    const [curProj, setCurProj] = useState(0);

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
                <div className='flex flex-col gap-5 text-white-600 my-5'>
                    <p className='text-white text-2xl font-semibold animatedText'>{jobsAndProjs[curProj].title}</p>
                    <p className='animatedText'>{jobsAndProjs[curProj].desc}</p>
                    <p className='animatedText'>{jobsAndProjs[curProj].subdesc}</p>
                </div>
                <div className='flex items-center justify-between flex-wrap gap-5'>
                    <div className='flex items-center gap-3'>{jobsAndProjs[curProj].tags.map((tag, ind) =>(
                            <div key={ind} className='tech-logo'>
                                <img src={tag.path} alt={tag.name} />
                            </div>
                        ))}
                    </div>
                    {/*
                    <a className='flex items-center gap-2 cursor-pointer text-white-600'
                        href={jobsAndProjs[curProj].href} target='_blank' rel='noreferrer'>
                            <p>Check live site</p>
                            <img src='/assets/arrow-up.png' className='w-3 h-2' alt='arrow-up'/>
                    </a>
                    */}
                </div>
                <div className='flex justify-between items-start mt-7 flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='text-white animatedText pr-3'>Work Experiences:</p>
                        {
                        jobsAndProjs.filter(x => x.isWork).map((prj, ind) =>(
                            <button key={ind} className='arrow-btn m-3' onClick={() => setCurProj(() => ind)}>
                                <img src={prj.logo} alt={`arrow-${prj.title}`} className='w-4 h-4'/>
                            </button>
                        ))
                        }
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-white animatedText pr-3'>Projects:</p>
                        {
                        jobsAndProjs.filter(x => !x.isWork).map((prj, ind) =>(
                            <button key={ind} className='arrow-btn m-3' onClick={() => setCurProj(() => ind)}>
                                <img src={prj.logo} alt={`arrow-${prj.title}`} className='w-4 h-4'/>
                            </button>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full' ref={(divRef as unknown) as LegacyRef<HTMLDivElement>}>
                <Canvas ref={(canvasRef as unknown) as LegacyRef<HTMLCanvasElement>}>
                    <ambientLight intensity={3}/>
                    <directionalLight position={[10, 10, 5]} />
                    <Center>
                        <Suspense fallback={<CanvasLoader/>}>
                            <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                <DemoComputer texture={jobsAndProjs[curProj].texture} />
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



