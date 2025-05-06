import { GroupProps } from '@react-three/fiber';
import { RefObject } from 'react';
import { Group, Object3DEventMap } from 'three';

export interface RefProps extends GroupProps {
  innerRef: RefObject<Group<Object3DEventMap>>;
}

export interface HobbyObjectProps extends GroupProps {
  callback?: () => void;
  emissive?: boolean;
}
