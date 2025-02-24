import {Canvas} from '@react-three/fiber';
import { LegacyRef, Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import Explosion from '../components/Explosion';
import { explosionDuration } from '../constants/general';

const Intro = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const divRef = useRef<HTMLDivElement>();
  const [, setTo] = useState(-1);
   
  // unload if scrolled out of sight
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
    <section className='min-h-screen w-full flex flex-col relative' id='home'>
      <div className="w-full h-full absolute inset-0" ref={divRef as LegacyRef<HTMLDivElement>}>
        <Canvas className='w-full h-full' ref={canvasRef as LegacyRef<HTMLCanvasElement>}>
            <ambientLight intensity={5} />
            <directionalLight position={[10,10,10]} intensity={5}/>
            <OrbitControls enableZoom={false}/>
            <Suspense fallback={<CanvasLoader/>} >
                <PerspectiveCamera makeDefault position={[0,0,20]}/>
                <Explosion
                  position={[0,0,0]}
                  onPointerEnter={() => setTo((prev) => {
                    if(prev != -1) clearTimeout(prev);
                    return setTimeout(() => console.log('start'), explosionDuration*1000);
                  })}
                  onPointerLeave={() => setTo((prev) => {
                    if(prev != -1) clearTimeout(prev);
                    return -1;
                  })} 
                />
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
};

export default Intro;