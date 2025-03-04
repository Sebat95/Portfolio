import { useTexture, useCursor } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, useMemo, useState, RefObject, SetStateAction, Dispatch } from "react";
import { SRGBColorSpace, Bone, Skeleton, MeshStandardMaterial, SkinnedMesh, MathUtils, BoxGeometry, Vector3, Uint16BufferAttribute, Float32BufferAttribute, Color, Group, Object3DEventMap, BufferGeometry } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pages } from "../constants/general";

const EASING_FACTOR = 0.5; // ease of movements (the higher the smoother)
const EASING_FACTOR_FOLD = 0.3;
const INSIDE_CURVE_STR = 0.18; // inside page curve strength
const OUTSIDE_CURVE_STR = 0.05; // inside page curve strength
const TURN_CURVE_STR = 0.09; // inside page curve strength
// page dimensions
const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = PAGE_WIDTH/3*4; // aspect ratio of A4
const PAGE_DEPTH = 0.003;
// we need as many segments as possible to bind a skeleton and make the animation more smoothly
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;


// define geometry and shift it to the left for simulating a book cover
const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2
);
pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);


// create the skin indexes and weights to attach geometry (and then bones) to
const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];
for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}
pageGeometry.setAttribute(
    "skinIndex",
    new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
    "skinWeight",
    new Float32BufferAttribute(skinWeights, 4)
);


// one material for each face
const white = new Color("white");
const orange = new Color("orange");
const pageMaterials = [
    new MeshStandardMaterial({color: white}),
    new MeshStandardMaterial({color: '#111'}),
    new MeshStandardMaterial({color: white}),
    new MeshStandardMaterial({color: white})
]


// preload all textures, so nothing is missing
pages.forEach((page) => {
    useTexture.preload(`/textures/${page.front}.jpg`);
    useTexture.preload(`/textures/${page.back}.jpg`);
    useTexture.preload(`/textures/book-cover-roughness.jpg`);
})

interface PageProp extends GroupProps {
    pageNum: number,
    front: string,
    back: string,
    page: number,
    opened: boolean,
    bookClosed: boolean,
    changePage: Dispatch<SetStateAction<number>>
}


const Page = (prop: PageProp) => {
    const {pageNum, front, back, page, opened, bookClosed, changePage} = prop;
    const [frontMap, backMap, roughMap] = useTexture([
        `/textures/${front}.jpg`,
        `/textures/${back}.jpg`,
        `/textures/book-cover-roughness.jpg`
    ]);
    frontMap.colorSpace = backMap.colorSpace = SRGBColorSpace; // better colors
    const ref = useRef<Group<Object3DEventMap>>();
    const pageMeshRef = useRef<SkinnedMesh<BufferGeometry>>();
    const [turnedAt,setTurnedAt] = useState(0);
    const [lastOpened,setLastOpened] = useState(opened);


    // create the custom skinned mesh
    const pageSkinnedMesh = useMemo(() => {
        const bones = [];
        for (let i = 0; i <= PAGE_SEGMENTS; i++) {
            const bone = new Bone();
            bones.push(bone);
            if (i == 0) {
                bone.position.x = 0;
            } else {
                bone.position.x = SEGMENT_WIDTH;
                bones[i - 1].add(bone)
            }
        }
        const skeleton = new Skeleton(bones);
        const materials = [...pageMaterials,
            new MeshStandardMaterial({
                color: white,
                map: frontMap,
                ... (pageNum === 0 ?
                    { roughnessMap: roughMap} :
                    { roughness: 0.1 }
                ),
                emissive: orange,
                emissiveIntensity: 0
            }),
            new MeshStandardMaterial({
                color: white,
                map: backMap,
                ... (pageNum === pages.length - 1 ?
                    { roughnessMap: roughMap} :
                    { roughness: 0.1 }
                ),
                emissive: orange,
                emissiveIntensity: 0
            })
        ];
        const res = new SkinnedMesh(pageGeometry, materials);
        res.castShadow = true;
        res.receiveShadow = true;
        res.frustumCulled = false;
        res.add(skeleton.bones[0]);
        res.bind(skeleton);
        return res;
    }, [backMap, frontMap, pageNum, roughMap]);


    // visualize actual skeleton on screen
    // useHelper(pageMeshRef, SkeletonHelper, "red");


    useFrame((_, delta) => {
        if (ref.current && pageMeshRef.current && Array.isArray(pageMeshRef.current.material)) {
            const emissiveIntensity = highlighted ? 0.22 : 0;
            (pageMeshRef.current.material[4] as MeshStandardMaterial).emissiveIntensity = MathUtils.lerp(
                (pageMeshRef.current.material[4] as MeshStandardMaterial).emissiveIntensity,
                emissiveIntensity,
                0.1
            );
            (pageMeshRef.current.material[5] as MeshStandardMaterial).emissiveIntensity = MathUtils.lerp(
                (pageMeshRef.current.material[5] as MeshStandardMaterial).emissiveIntensity,
                emissiveIntensity,
                0.1
            );
                   
           
            if (lastOpened !== opened) {
                setTurnedAt(Date.now());
                setLastOpened(opened);
            }
            const turningTime =  Math.sin(Math.min(400, Date.now() - turnedAt) / 400 * Math.PI);

            const bones = pageMeshRef.current.skeleton.bones;
            let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
            if (!bookClosed) {
                targetRotation += degToRad(pageNum * 0.8);
            }
            for (let i = 0; i < bones.length; i++) {
                // for the first bones bend the whole page
                const target = i === 0 ? ref.current : bones[i];
                // bend the page in two opposite ways (near the spine and away)
                // furthermore avoid it when closed
                const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
                const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
                const turningIntensity = Math.sin(i * Math.PI / bones.length) * turningTime;
                const rotation = bookClosed ? (
                    i === 0 ? targetRotation : 0
                ) : (
                    INSIDE_CURVE_STR * insideCurveIntensity * targetRotation -
                    OUTSIDE_CURVE_STR * outsideCurveIntensity * targetRotation +
                    TURN_CURVE_STR * turningIntensity * targetRotation
                );
                easing.dampAngle(target.rotation,
                    "y",
                    rotation,
                    EASING_FACTOR,
                    delta
                );
                // place a fold on the x axes too to give it more realism
                const fold = bookClosed ? 0 : degToRad(Math.sign(targetRotation) * 2);
                const foldIntensity = i > 8 ? Math.sin(i * Math.PI / bones.length - 0.5) * turningTime : 0;
                easing.dampAngle(
                    target.rotation,
                    "x",
                    fold * foldIntensity,
                    EASING_FACTOR_FOLD,
                    delta
                );
            }
        }
    });


    // add click functionalities and highlight on hover
    const [highlighted, setHighlighted] = useState(false);
    useCursor(highlighted);


    return (
        <group {...prop} ref={ref as RefObject<Group<Object3DEventMap>>}
            onPointerEnter={(e) => {
                e.stopPropagation();
                setHighlighted(true);
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                setHighlighted(false);
            }}
            onClick={(e) => {
                e.stopPropagation();
                changePage(opened ? pageNum : pageNum + 1);
                setHighlighted(false);
            }}
        >
            <primitive object={pageSkinnedMesh} ref={pageMeshRef}
                position-z={-pageNum * PAGE_DEPTH + page * PAGE_DEPTH}/>
        </group>
    )
}

export default Page;