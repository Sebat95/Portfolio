import { Ref, Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from './common/CanvasLoader';
import DemoComputer from '../components/Computer';
import { jobsAndProjs } from '../common/constants';


const ComputerCombo = () => {
    const [curProj, setCurProj] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>();
    const divRef = useRef<HTMLDivElement>();

    return (<>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 w-full h-full absolute inset-0'>
            <div className='flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2-xl shadow-black-200'>
                <div className='flex flex-col gap-5 text-white-600 my-5 sm:my-10'>
                    <p className='text-white text-xl font-semibold'>{jobsAndProjs[curProj].title}</p>
                    <p>{jobsAndProjs[curProj].desc}</p>
                    <p>{jobsAndProjs[curProj].subdesc}</p>
                </div>
                <div className='flex items-center justify-between flex-wrap gap-5'>
                    <div className='flex items-center gap-3'>{jobsAndProjs[curProj].tags.map((tag, ind) =>(
                            <div key={ind} className='tech-logo'>
                                <img src={tag.path} alt={tag.name} />
                            </div>
                        ))}
                    </div>
                    <a className='flex items-center gap-2 cursor-pointer text-white-600'
                        href={jobsAndProjs[curProj].href} target='_blank' rel='noreferrer'>
                            <p>Learn more</p>
                            <img src='/assets/arrow-up.png' className='w-3 h-2' alt='arrow-up'/>
                    </a>
                </div>
                <div className='flex justify-between items-start mt-7 flex-col'>
                    <div className='flex justify-between items-center'>
                        <p className='text-white pr-3'>Work Experiences:</p>
                        {
                            jobsAndProjs.filter(x => x.isWork).map(prj => (
                                <button key={prj.ind} className={`arrow-btn m-3 ${prj.ind == curProj ? "bg-gray-600" : ""}`}
                                    onClick={() => setCurProj(() => prj.ind)}>
                                        <img src={prj.logo} alt={`arrow-${prj.title}`} className='w-4 h-4'/>
                                </button>
                            ))
                        }
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-white pr-3'>Projects:</p>
                        {
                            jobsAndProjs.filter(x => !x.isWork).map(prj => (
                                <button key={prj.ind} className={`arrow-btn m-3 ${prj.ind == curProj ? "bg-gray-600" : ""}`}
                                    onClick={() => setCurProj(() => prj.ind)}>
                                        <img src={prj.logo} alt={`arrow-${prj.title}`} className='w-4 h-4'/>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full' ref={divRef as Ref<HTMLDivElement>}>
                <Canvas ref={canvasRef as Ref<HTMLCanvasElement>}>
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
    </>)
}

export default ComputerCombo;



