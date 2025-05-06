import { useState } from 'react';
import { HobbyObjectProps, RefProps } from '../common/props';
import React from 'react';

interface HobbyProps extends RefProps {
  highlighted: boolean;
}

const Hobby = (props: HobbyProps) => {
  const [hover, setHover] = useState(false);
  const childProps = { ...props } as HobbyObjectProps;
  if (childProps.position) {
    delete childProps.position;
  }
  childProps.emissive = hover;

  return (
    <group
      {...props}
      dispose={null}
      position={props.position}
      ref={props.innerRef}
      onPointerEnter={() => setHover(!props.highlighted)}
      onPointerLeave={() => setHover(false)}
    >
      {React.cloneElement(React.Children.only(props.children) as JSX.Element, {
        ...childProps
      })}
    </group>
  );
};

export default Hobby;
