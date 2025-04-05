import { Canvas } from "@react-three/fiber";
import { RefObject, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import CanvasLoader from "./CanvasLoader";
import Basketball from "./Basketball";
import Flask from "./Flask";
import Pizza from "./PIzza";
import Sword from "./Sword";
import StylizedTree from "./StylizedTree";
import Resistor from "./Resistor";
import { Group, Object3DEventMap } from "three";
import gsap from 'gsap';
import { numsToVector3 } from "../common/general";

const HobbyCombo = () => {
    const bbRef = useRef<Group<Object3DEventMap>>();
    const flaskRef = useRef<Group<Object3DEventMap>>();
    const pizzaRef = useRef<Group<Object3DEventMap>>();
    const swordRef = useRef<Group<Object3DEventMap>>();
    const stRef = useRef<Group<Object3DEventMap>>();
    const resistorRef = useRef<Group<Object3DEventMap>>();
    const [posInd, setPosInd] = useState(0);
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
        console.log(refArray)
        refArray.forEach((ref, i) => {
            console.log('fuck')
            if(ref.current) {
                console.log(i)
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
    },[refArray, positionsArray, posInd]);
    
    
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
                    <Basketball position={positionsArray[0]} innerRef={bbRef as RefObject<Group<Object3DEventMap>>} callback={measuredRef}/>
                    <Flask position={positionsArray[2]} innerRef={flaskRef as RefObject<Group<Object3DEventMap>>}/>
                    <Pizza position={positionsArray[4]} innerRef={pizzaRef as RefObject<Group<Object3DEventMap>>}/>
                    <Sword position={positionsArray[6]} innerRef={swordRef as RefObject<Group<Object3DEventMap>>}/>
                    <StylizedTree position={positionsArray[8]} innerRef={stRef as RefObject<Group<Object3DEventMap>>}/>
                    <Resistor position={positionsArray[10]} innerRef={resistorRef as RefObject<Group<Object3DEventMap>>}/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default HobbyCombo;
