import {Canvas} from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from '../components/CanvasLoader';
import Explosion from '../components/Explosion';

const Intro = () => {
  return (
    <section className='min-h-screen w-full flex flex-col relative' id='home'>
      <div className="w-full h-full absolute inset-0">
        <Canvas className='w-full h-full'>
            <ambientLight intensity={7} />
            <directionalLight position={[10,10,10]} intensity={0.5}/>
            <OrbitControls enableZoom={false}/>
            <Suspense fallback={<CanvasLoader/>} >
                <PerspectiveCamera makeDefault position={[0,0,20]}/>
                <Explosion scale={1} position={[0,0,0]}/>
            </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Intro;