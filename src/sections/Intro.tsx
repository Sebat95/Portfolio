import { Canvas } from '@react-three/fiber';
import {
  LegacyRef,
  Ref,
  RefObject,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy
} from 'react';
import { Html, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/common/CanvasLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Group, Object3DEventMap } from 'three';
import { JourneyContext } from '../components/context/JourneyContext';
import { experiences } from '../common/constants';
import { useMediaQuery } from 'react-responsive';

const Explosion = lazy(() => import('../components/Explosion'));

const Intro = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const divRef = useRef<HTMLDivElement>();
  const explRef = useRef<Group<Object3DEventMap>>();
  const [full, setFull] = useState(false); // explosion is fully scaled up
  const [tweenOut, setTweenOut] = useState<gsap.core.Tween>();
  const [tweenIn, setTweenIn] = useState<gsap.core.Tween>();
  const [hovering, setHovering] = useState(false);
  const { setExperience } = useContext(JourneyContext);
  const isNotPC = useMediaQuery({ maxWidth: 1024 }); // is not PC start journey automatically
  const [, setExpStart] = useState(-1); // if not on PC, timeout to open experience automatically

  // unload if scrolled out of sight
  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (canvasRef.current) {
          if (entry.isIntersecting) {
            canvasRef.current.style.display = 'inherit';
          } else {
            canvasRef.current.style.display = 'none';
            setHovering(false);
          }
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
  useGSAP(
    () => {
      if (explRef.current) {
        if (tweenIn) {
          tweenIn.kill();
        }
        if (tweenOut) {
          tweenOut.kill();
        }
        if (hovering) {
          setTweenIn(
            gsap.to(explRef.current.scale, {
              y: `9`,
              x: `9`,
              z: `9`,
              duration: isNotPC ? 1 : 2,
              onComplete: () => setFull(true),
              onInterrupt: () => setFull(false),
              onStart: () => setFull(false)
            })
          );
        } else {
          setTweenOut(
            gsap.to(explRef.current.scale, {
              y: `1`,
              x: `1`,
              z: `1`,
              duration: isNotPC ? 2 : 3,
              onStart: () => setFull(false),
              onComplete: () => setFull(false)
            })
          );
        }
      }
    },
    {
      dependencies: [hovering]
    }
  );

  // if we are not on PC start experience automaticaly
  useEffect(() => {
    let timeout = -1;
    if (isNotPC && full) {
      timeout = setTimeout(() => {
        setExperience(experiences[0]);
      }, 1000);
    }
    setExpStart((prev) => {
      clearTimeout(prev);
      return timeout;
    });
  }, [isNotPC, full, setExperience]);

  return (
    <section className="relative flex min-h-screen w-full flex-col" id="home">
      <div className="w-full-screen" ref={divRef as LegacyRef<HTMLDivElement>}>
        <Canvas
          className="h-full w-full"
          ref={canvasRef as Ref<HTMLCanvasElement>}
          onClick={() => full && setExperience(experiences[0])}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
        >
          <ambientLight intensity={5} />
          <directionalLight position={[10, 10, 10]} intensity={5} />
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <Explosion
              position={[0, 0, 0]}
              innerRef={explRef as RefObject<Group<Object3DEventMap>>}
            />
            <Html
              as="div"
              center
              zIndexRange={[-10, -10]}
              style={{
                visibility: full ? 'visible' : 'hidden',
                opacity: full ? '1' : '0',
                transition: 'visibility 0s, opacity 0.3s linear',
                zIndex: -1
              }}
            >
              <h3 className="text-gray_gradient mt-40 text-2xl font-semibold text-white sm:w-40 md:w-80 lg:w-96">
                {isNotPC
                  ? 'Starting the journey...'
                  : 'Click to start the journey'}
              </h3>
            </Html>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Intro;
