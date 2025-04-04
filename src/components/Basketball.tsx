import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber';
import { Mesh } from 'three';

const Basketball = (props: GroupProps) => {
  const { nodes, materials } = useGLTF('/models/basketball.glb');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.3}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Basketball_0 as Mesh).geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Basketball_1 as Mesh).geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
};

useGLTF.preload('/models/basketball.glb');

export default Basketball;
