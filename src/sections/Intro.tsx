import {Canvas} from '@react-three/fiber';
import { LegacyRef, RefObject, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Html, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import Explosion from '../components/Explosion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Group, Object3DEventMap } from 'three';
import { ExperienceContext } from '../components/ExperienceContext';
import { experiences } from '../constants/general';

const Intro = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const divRef = useRef<HTMLDivElement>();
  const explRef = useRef<Group<Object3DEventMap>>();
  const [full, setFull] = useState(false);
  const [killed, setKilled] = useState(true);
  const [tweenOut, setTweenOut] = useState({});
  const [tweenIn, setTweenIn] = useState({});
  const [hovering, setHovering] = useState(false);
  const {setExperience } = useContext(ExperienceContext);
   
  // unload if scrolled out of sight
  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          canvasRef.current!.style.display = 'inherit';
        } else {
          canvasRef.current!.style.display = 'none';
          setHovering(false);
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

  // scale up and text appears
  useGSAP(() => {
    if (explRef.current) {
      setFull(false);
      if(hovering) {
        setKilled(false);
        gsap.killTweensOf(tweenOut);
        setTweenIn(gsap.to(explRef.current.scale, {
          y: `9`,
          x: `9`,
          z: `9`,
          duration: 3,
          onComplete: () => setFull(true)
        }));
      } else {
        gsap.killTweensOf(tweenIn);
        setKilled(true);
        setTweenOut(gsap.to(explRef.current.scale, {
          y: `1`,
          x: `1`,
          z: `1`,
          duration: 3,
          onComplete: () => setFull(false)
        }));
      }
    }
  }, {
    dependencies: [hovering]
  });

  return (
    <section className='min-h-screen w-full flex flex-col relative' id='home'>
      <div className="w-full h-full absolute inset-0" ref={divRef as LegacyRef<HTMLDivElement>}>
        <Canvas className='w-full h-full' ref={canvasRef as LegacyRef<HTMLCanvasElement>}
          onClick={() => full && !killed && setExperience(experiences[0])}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}>
            <ambientLight intensity={5} />
            <directionalLight position={[10,10,10]} intensity={5}/>
            <Suspense fallback={<CanvasLoader/>} >
                <PerspectiveCamera makeDefault position={[0,0,20]}/>
                <Explosion
                  position={[0,0,0]}
                  innerRef={explRef as RefObject<Group<Object3DEventMap>>}/>
                <Html zIndexRange={[-10, -10]}
                  style={{
                    visibility: full && !killed ? 'visible' : 'hidden',
                    opacity: full && !killed ? '1' : '0',
                    transition: 'visibility 0s, opacity 0.5s linear',
                    zIndex: -1
                  }}  
                  position={[-5,-3,0]}
                >
                  <h3 className='text-white head-text w-96'>Click to start the journery</h3>
                </Html>
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
};

export default Intro;