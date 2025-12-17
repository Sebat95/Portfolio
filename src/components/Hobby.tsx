import { useState } from 'react';
import { HobbyObjectProps, RefProps } from '../common/props';
import React from 'react';

interface HobbyProps extends RefProps {
  highlighted: boolean;
}

const Hobby = (props: HobbyProps) => {
  const [hover, setHover] = useState(false);
  const { innerRef, children, position, highlighted, ...rest } = props;
  const childProps = { ...rest } as HobbyObjectProps;
  if (childProps.position) {
    delete childProps.position;
  }
  childProps.emissive = hover;

  return (
    <group
      {...rest}
      dispose={null}
      position={position}
      ref={innerRef}
      onPointerEnter={() => setHover(!highlighted)}
      onPointerLeave={() => setHover(false)}
    >
      {React.cloneElement(React.Children.only(children) as JSX.Element, {
        ...childProps
      })}
    </group>
  );
};

export default Hobby;
