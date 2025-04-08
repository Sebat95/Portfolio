import { Dispatch } from "react";
import { RefProps } from "../common/RefProps";
import React from "react";

interface HobbyProps extends RefProps {
    ind: number;
    setHighlighted: Dispatch<React.SetStateAction<number>>;
}

const Hobby = (props: HobbyProps) => {
    const childProps = {...props} as RefProps;
    if(childProps.position){
        delete childProps.position;
    };

    return (
        <group {...props} dispose={null} position={props.position} ref={props.innerRef}
            onClick={() => props.setHighlighted((prev) => prev == -1 ? props.ind : -1)}>
            { React.cloneElement(props.children as JSX.Element, {...childProps})}
            <mesh scale={2}>
                <sphereGeometry />
                <meshStandardMaterial opacity={0.5} color={'white'} emissive={'white'} emissiveIntensity={2} transparent />
            </mesh>
        </group>
    )
}

export default Hobby;
