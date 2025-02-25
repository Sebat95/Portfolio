import {Canvas} from '@react-three/fiber';
import { LegacyRef, RefObject, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Html, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import Explosion from '../components/Explosion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Group, Object3DEventMap } from 'three';
import { explosionDuration } from '../constants/general';
import { ExperienceContext } from '../components/ExperienceContext';

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
          y: `13`,
          x: `13`,
          z: `13`,
          duration: explosionDuration,
          onComplete: () => setFull(true)
        }));
      } else {
        gsap.killTweensOf(tweenIn);
        setKilled(true);
        setTweenOut(gsap.to(explRef.current.scale, {
          y: `1`,
          x: `1`,
          z: `1`,
          duration: explosionDuration,
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
          onClick={() => full && !killed && setExperience(true)}>
            <ambientLight intensity={5} />
            <directionalLight position={[10,10,10]} intensity={5}/>
            <Suspense fallback={<CanvasLoader/>} >
                <PerspectiveCamera makeDefault position={[0,0,20]}/>
                <Explosion
                  onPointerEnter={() => setHovering(true)}
                  onPointerLeave={() => setHovering(false)}
                  position={[0,0,0]}
                  innerRef={explRef as RefObject<Group<Object3DEventMap>>}/>
                <Html
                  style={{
                    visibility: full && !killed ? 'visible' : 'hidden',
                    opacity: full && !killed ? '1' : '0',
                    transition: 'visibility 0s, opacity 0.5s linear'
                  }}  
                  position={[-5,-3,0]}
                  occlude
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