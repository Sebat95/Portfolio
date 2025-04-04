import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CanvasLoader from "./CanvasLoader";
import Basketball from "./Basketball";
import Flask from "./Flask";
import Pizza from "./PIzza";
import Sword from "./Sword";
import StylizedTree from "./StylizedTree";
import Resistor from "./Resistor";

const HobbyCombo = () => {
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
                    <Basketball position={[0, 8, -10]}/>
                    <Flask position={[10, 2, -10]}/>
                    <Pizza position={[10, -4, -10]}/>
                    <Sword position={[0, -10, -10]}/>
                    <StylizedTree position={[-10, -5, -10]}/>
                    <Resistor position={[-10, 3, -10]} />
                </Suspense>
            </Canvas>
        </div>
  )
}

export default HobbyCombo;
