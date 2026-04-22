import { Canvas, ThreeEvent } from '@react-three/fiber';
import {
  Dispatch,
  RefObject,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import CanvasLoader from './common/CanvasLoader';
import { Group, Object3DEventMap } from 'three';
import gsap from 'gsap';
import { numsToVector3 } from '../common/utils';
import { Html } from '@react-three/drei';
import { hobbies } from '../common/constants';
import Hobby from './Hobby';
import Basketball from './hobbies/Basketball';
import Flask from './hobbies/Flask';
import Pizza from './hobbies/Pizza';
import Resistor from './hobbies/Resistor';
import StylizedTree from './hobbies/StylizedTree';
import Anvil from './hobbies/Anvil';

const doSetHighlighted = (
  id: number,
  setter: Dispatch<React.SetStateAction<number>>,
  event:
    | ThreeEvent<MouseEvent>
    | React.MouseEvent<HTMLParagraphElement, MouseEvent>
) => {
  event.nativeEvent.stopPropagation();
  event.stopPropagation();
  setter((prev) => (prev == -1 ? id : -1));
};

const HobbyCombo = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [, setResizing] = useState(-1); // is window resizing
  const [posInd, setPosInd] = useState(0); // which step of the "circle" are we on
  /* which hobby is highlighted:
        -2 means no selection and stop moving
        -1 means no selection and moving
        i means ith hobby selected and stop moving
    */
  const [highlighted, setHighlighted] = useState(-1);
  // hobbies references
  const bbRef = useRef<Group<Object3DEventMap>>();
  const flaskRef = useRef<Group<Object3DEventMap>>();
  const pizzaRef = useRef<Group<Object3DEventMap>>();
  const anvilRef = useRef<Group<Object3DEventMap>>();
  const stRef = useRef<Group<Object3DEventMap>>();
  const resistorRef = useRef<Group<Object3DEventMap>>();
  const refArray = useMemo(
    () => [bbRef, flaskRef, pizzaRef, anvilRef, stRef, resistorRef],
    []
  );
  // callback to check when at least the first hobby is rendered
  const measuredRef = useCallback(() => setPosInd((prev) => prev + 1), []);
  // positions to which move the hobbies
  const positionsArray = useMemo(() => {
    const maxStep = Math.min(Math.max(width / 128, 1), 8);
    const mediumStep = (maxStep / 8) * 6.9;
    const halfStep = maxStep / 2;
    const rawPositions: ReadonlyArray<readonly [number, number, number]> = [
      [0, maxStep, -10],
      [halfStep, mediumStep, -10],
      [mediumStep, halfStep, -10],
      [maxStep, 0, -10],
      [mediumStep, -halfStep, -10],
      [halfStep, -mediumStep, -10],
      [0, -maxStep, -10],
      [-halfStep, -mediumStep, -10],
      [-mediumStep, -halfStep, -10],
      [-maxStep, 0, -10],
      [-mediumStep, halfStep, -10],
      [-halfStep, mediumStep, -10]
    ];
    return rawPositions.map(numsToVector3);
  }, [width]);

  // useEffect for window resizing
  useEffect(() => {
    const handleResize = () => {
      setHighlighted(() => -2); // stop movement
      setResizing((prev) => {
        clearTimeout(prev);
        return setTimeout(() => setHighlighted(() => -1), 1000); // restart movement
      });
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // circle movement — runs each posInd tick, only when not highlighted
  useEffect(() => {
    if (highlighted === -1) {
      refArray.forEach((ref, i) => {
        if (ref.current) {
          const ctx = gsap.to(ref.current.position, {
            x: positionsArray[(2 * i + posInd) % positionsArray.length].x,
            y: positionsArray[(2 * i + posInd) % positionsArray.length].y,
            z: positionsArray[(2 * i + posInd) % positionsArray.length].z,
            ease: 'none',
            duration: 1
          });
          if (i == refArray.length - 1) {
            ctx.then(() =>
              setPosInd((prev) => (prev + 1) % positionsArray.length)
            );
          }
        }
      });
    }
  }, [refArray, positionsArray, posInd, highlighted]);

  // highlight — only reruns when highlighted changes, kills competing tweens first
  useEffect(() => {
    if (highlighted >= 0 && highlighted < refArray.length) {
      refArray.forEach((ref) => {
        if (ref.current) {
          gsap.killTweensOf(ref.current.position);
        }
      });
      if (refArray[highlighted].current) {
        gsap.to(refArray[highlighted].current.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'power1.out',
          duration: 0.5
        });
      }
    }
  }, [refArray, highlighted]);

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        className="h-full w-full"
        onClick={(e) => doSetHighlighted(-1, setHighlighted, e)}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[0, 0, 4]} intensity={2} castShadow />
        <Suspense fallback={<CanvasLoader />}>
          <Hobby
            position={positionsArray[0]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(0, setHighlighted, e)}
            innerRef={bbRef as RefObject<Group<Object3DEventMap>>}
          >
            <Basketball callback={measuredRef} />
          </Hobby>
          <Hobby
            position={positionsArray[2]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(1, setHighlighted, e)}
            innerRef={flaskRef as RefObject<Group<Object3DEventMap>>}
          >
            <Flask />
          </Hobby>
          <Hobby
            position={positionsArray[4]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(2, setHighlighted, e)}
            innerRef={pizzaRef as RefObject<Group<Object3DEventMap>>}
          >
            <Pizza />
          </Hobby>
          <Hobby
            position={positionsArray[6]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(3, setHighlighted, e)}
            innerRef={anvilRef as RefObject<Group<Object3DEventMap>>}
          >
            <Anvil />
          </Hobby>
          <Hobby
            position={positionsArray[8]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(4, setHighlighted, e)}
            innerRef={stRef as RefObject<Group<Object3DEventMap>>}
          >
            <StylizedTree />
          </Hobby>
          <Hobby
            position={positionsArray[10]}
            highlighted={highlighted != -1}
            onClick={(e) => doSetHighlighted(5, setHighlighted, e)}
            innerRef={resistorRef as RefObject<Group<Object3DEventMap>>}
          >
            <Resistor />
          </Hobby>
          {highlighted >= 0 && highlighted < hobbies.length && (
            <Html
              as="div"
              center
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                opacity: '90%',
                width: '75%'
              }}
              className="pop-up !relative"
            >
              {hobbies[highlighted].map((h, i) => (
                <p
                  key={i}
                  className={i == 0 ? 'grid-headtext' : 'grid-subtext'}
                >
                  {h}
                </p>
              ))}
            </Html>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HobbyCombo;
