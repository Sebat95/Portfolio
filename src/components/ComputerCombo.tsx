import { Ref, Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import CanvasLoader from './common/CanvasLoader';
import DemoComputer from '../components/Computer';
import { jobsAndProjs } from '../common/constants';

const ComputerCombo = () => {
  const [curProj, setCurProj] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>();
  const divRef = useRef<HTMLDivElement>();

  return (
    <>
      <div className="absolute inset-0 grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="shadow-2-xl relative flex flex-col gap-5 px-5 py-10 shadow-black-200 sm:p-10">
          <div className="my-5 flex flex-col gap-5 text-white-600 sm:my-10">
            <p className="text-xl font-semibold text-white">
              {jobsAndProjs[curProj].title}
            </p>
            <p>{jobsAndProjs[curProj].desc}</p>
            <p>{jobsAndProjs[curProj].subdesc}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              {jobsAndProjs[curProj].tags.map((tag, ind) => (
                <div key={ind} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>
            <a
              className="flex cursor-pointer items-center gap-2 text-white-600"
              href={jobsAndProjs[curProj].href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Learn more</p>
              <img
                src="/assets/arrow-up.png"
                className="h-2 w-3"
                alt="arrow-up"
              />
            </a>
          </div>
          <div className="mt-7 flex flex-col items-start justify-between">
            <div className="flex items-center justify-between">
              <p className="pr-3 text-white">Work Experiences:</p>
              {jobsAndProjs
                .filter((x) => x.isWork)
                .map((prj) => (
                  <button
                    key={prj.ind}
                    className={`arrow-btn m-3 ${prj.ind == curProj ? 'bg-gray-600' : ''}`}
                    onClick={() => setCurProj(() => prj.ind)}
                  >
                    <img
                      src={prj.logo}
                      alt={`arrow-${prj.title}`}
                      className="h-4 w-4"
                    />
                  </button>
                ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="pr-3 text-white">Projects:</p>
              {jobsAndProjs
                .filter((x) => !x.isWork)
                .map((prj) => (
                  <button
                    key={prj.ind}
                    className={`arrow-btn m-3 ${prj.ind == curProj ? 'bg-gray-600' : ''}`}
                    onClick={() => setCurProj(() => prj.ind)}
                  >
                    <img
                      src={prj.logo}
                      alt={`arrow-${prj.title}`}
                      className="h-4 w-4"
                    />
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div
          className="h-96 rounded-lg border border-black-300 bg-black-200 md:h-full"
          ref={divRef as Ref<HTMLDivElement>}
        >
          <Canvas ref={canvasRef as Ref<HTMLCanvasElement>}>
            <ambientLight intensity={3} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={jobsAndProjs[curProj].texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default ComputerCombo;
