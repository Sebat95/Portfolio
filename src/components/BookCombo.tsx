import { Float, OrbitControls } from '@react-three/drei';
import Book from '../components/Book';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import CanvasLoader from './common/CanvasLoader';
import BookButtons from './BookButtons';

const BookCombo = () => {
  const [page, setPage] = useState(0);
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerMoving, setPointerMoving] = useState(false);

  return (
    <>
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          className="h-full w-full"
          onPointerDown={() => setPointerDown(true)}
          onPointerUp={() => {
            setPointerDown(false);
            setPointerMoving(false);
          }}
          onPointerMove={() => {
            if (pointerDown) setPointerMoving(true);
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <Float
              rotation-x={-Math.PI / 4}
              floatIntensity={0.5}
              speed={0.5}
              rotationIntensity={0.5}
            >
              <Book
                scale={2.75}
                page={page}
                changePage={setPage}
                enableChange={!pointerDown || !pointerMoving}
              />
            </Float>
            <OrbitControls />
            <directionalLight position={[2, 5, 2]} intensity={1} castShadow />
            <ambientLight intensity={1} />
          </Suspense>
        </Canvas>
      </div>

      <div className="z-50 mt-auto items-end justify-between">
        <BookButtons page={page} setPage={setPage} />
      </div>
    </>
  );
};

export default BookCombo;
