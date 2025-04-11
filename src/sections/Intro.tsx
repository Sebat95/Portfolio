import {Canvas} from '@react-three/fiber';
import { LegacyRef, Ref, RefObject, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Html, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/common/CanvasLoader';
import Explosion from '../components/Explosion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Group, Object3DEventMap } from 'three';
import { JourneyContext } from '../components/context/JourneyContext';
import { experiences } from '../common/constants';
import { useMediaQuery } from 'react-responsive';

const Intro = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const divRef = useRef<HTMLDivElement>();
  const explRef = useRef<Group<Object3DEventMap>>();
  const [full, setFull] = useState(false); // explosion is fully scaled up
  const [killed, setKilled] = useState(true); // explosion scale up has been interrupted
  const [tweenOut, setTweenOut] = useState({});
  const [tweenIn, setTweenIn] = useState({});
  const [hovering, setHovering] = useState(false);
  const { setExperience } = useContext(JourneyContext);
  const isNotPC = useMediaQuery({maxWidth: 1024}); // is not PC start journey automatically
  const [, setExpStart] = useState(-1); // if not on PC, timeout to open experience automatically
   
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
          duration: isNotPC ? 1 : 2,
          onComplete: () => setFull(true)
        }));
      } else {
        gsap.killTweensOf(tweenIn);
        setKilled(true);
        setTweenOut(gsap.to(explRef.current.scale, {
          y: `1`,
          x: `1`,
          z: `1`,
          duration: isNotPC ? 2 : 3,
          onComplete: () => setFull(false)
        }));
      }
    }
  }, {
    dependencies: [hovering]
  });

  // if we are not on PC start experience automaticaly 
  useEffect(() => {
    let timeout = -1;
    if(isNotPC && full && !killed){
      timeout = setTimeout(() => {
        setExperience(experiences[0]);
      }, 1000); 
    }
    setExpStart(prev => {
      clearTimeout(prev);
      return timeout;
    });
  }, [isNotPC, full, killed, setExperience])

  return (
    <section className='min-h-screen w-full flex flex-col relative' id='home'>
      <div className="w-full h-full absolute inset-0" ref={divRef as LegacyRef<HTMLDivElement>}>
        <Canvas className='w-full h-full' ref={canvasRef as Ref<HTMLCanvasElement>}
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
                <Html as="div" center zIndexRange={[-10, -10]}
                  style={{
                    visibility: full && !killed ? 'visible' : 'hidden',
                    opacity: full && !killed ? '1' : '0',
                    transition: 'visibility 0s, opacity 0.3s linear',
                    zIndex: -1
                  }}  
                >
                  <h3 className='text-white font-semibold text-gray_gradient text-2xl lg:w-96 md:w-80 sm:w-40 mt-40'>
                    {isNotPC ? "Starting the journey..." : "Click to start the journery"}
                  </h3>
                </Html>
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
};

export default Intro;
