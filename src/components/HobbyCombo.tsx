import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Dispatch, RefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import CanvasLoader from "./CanvasLoader";
import Flask from "./Flask";
import Pizza from "./PIzza";
import Sword from "./Sword";
import StylizedTree from "./StylizedTree";
import Resistor from "./Resistor";
import { Group, Object3DEventMap } from "three";
import gsap from 'gsap';
import { numsToVector3 } from "../common/utils";
import { Html } from "@react-three/drei";
import { hobbies } from "../common/constants";
import Hobby from "./Hobby";
import Basketball from "./Basketball";


const doSetHighlighted = (id: number, setter: Dispatch<React.SetStateAction<number>>, event: ThreeEvent<MouseEvent> | React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    setter(prev => prev == -1 ? id : -1);
    event.stopPropagation();
}


const HobbyCombo = () => {
    const bbRef = useRef<Group<Object3DEventMap>>();
    const flaskRef = useRef<Group<Object3DEventMap>>();
    const pizzaRef = useRef<Group<Object3DEventMap>>();
    const swordRef = useRef<Group<Object3DEventMap>>();
    const stRef = useRef<Group<Object3DEventMap>>();
    const resistorRef = useRef<Group<Object3DEventMap>>();
    const [posInd, setPosInd] = useState(0);
    const [highlighted, setHighlighted] = useState(-1);
    const positionsArray = useMemo(
        () => [
            [0, 8, -10],
            [4, 6.9, -10],
            [6.9, 4, -10],
            [8, 0, -10],
            [6.9, -4, -10],
            [4, -6.9, -10],
            [0, -8, -10],
            [-4, -6.9, -10],
            [-6.9, -4, -10],
            [-8, 0, -10],
            [-6.9, 4, -10],
            [-4, 6.9, -10],
        ].map(v => numsToVector3(v)),
        []
    );
    const refArray = useMemo(
        () => [
            bbRef,
            flaskRef,
            pizzaRef,
            swordRef,
            stRef,
            resistorRef
        ],
        []
    );

    const measuredRef = useCallback(() => setPosInd(prev => prev + 1), []);
    useEffect(() => {
        console.log(highlighted)
        if(highlighted == -1) {
            refArray.forEach((ref, i) => {
                if(ref.current && highlighted == -1) {
                    const ctx = gsap.to(ref.current.position, {
                        x: positionsArray[(2*i + posInd) % positionsArray.length].x,
                        y: positionsArray[(2*i + posInd) % positionsArray.length].y,
                        z: positionsArray[(2*i + posInd) % positionsArray.length].z,
                        ease: "none",
                        duration: 1
                    });
                    if (i == refArray.length - 1) {
                        ctx.then(() => setPosInd(prev => (prev + 1) % positionsArray.length));
                    }
                }
            })
        } else {
            if (refArray[highlighted].current) {
                gsap.to(refArray[highlighted].current.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 0.5
                });
            }
        }
    },[refArray, positionsArray, posInd, highlighted]);
   
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas className='w-full h-full'>
                <ambientLight intensity={1}/>
                <directionalLight
                    position={[0, 0, 4]}
                    intensity={2}
                    castShadow
                />
                <Suspense fallback={<CanvasLoader/>} >
                    <Hobby position={positionsArray[0]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(0, setHighlighted, e)}
                        innerRef={bbRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <Basketball callback={measuredRef}/>
                    </Hobby>
                    <Hobby position={positionsArray[2]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(1, setHighlighted, e)}
                        innerRef={flaskRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <Flask />
                    </Hobby>
                    <Hobby position={positionsArray[4]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(2, setHighlighted, e)}
                        innerRef={pizzaRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <Pizza />
                    </Hobby>
                    <Hobby position={positionsArray[6]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(3, setHighlighted, e)}
                        innerRef={swordRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <Sword />
                    </Hobby>
                    <Hobby position={positionsArray[8]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(4, setHighlighted, e)}
                        innerRef={stRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <StylizedTree />
                    </Hobby>
                    <Hobby position={positionsArray[10]}
                        highlighted={highlighted != -1}
                        onClick={e => doSetHighlighted(5, setHighlighted, e)}
                        innerRef={resistorRef as RefObject<Group<Object3DEventMap>>}
                    >
                        <Resistor />
                    </Hobby>
                    {highlighted != -1 &&
                        <Html as="div" center style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                opacity: '90%',
                                width: '75%'
                            }}
                            className="pop-up !relative"
                            onClick={e => doSetHighlighted(-1, setHighlighted, e)}>
                            {
                                hobbies[highlighted].map((h,i) => (
                                    <p
                                        className={i == 0 ? "grid-headtext" : "grid-subtext"}
                                        onClick={e => doSetHighlighted(-1, setHighlighted, e)}>
                                            {h}
                                    </p>
                                ))
                            }
                        </Html>
                    }
                </Suspense>
            </Canvas>
        </div>
    )
}


export default HobbyCombo;
