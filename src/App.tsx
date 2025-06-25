import { StrictMode, useEffect, useRef, useState, type ReactNode, type Ref, type RefObject } from "react";
import * as THREE from "three";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

function App() {
    const [count, setCount] = useState(0);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
    return (
        <StrictMode>
            <main>
                <Canvas shadows={true} camera={cameraRef.current!}>
                    <Camera cameraRef={cameraRef}></Camera>
                    <ambientLight intensity={Math.PI / 2}></ambientLight>
                    <pointLight
                        position={[0, 5, 0]}
                        intensity={3}
                        decay={0}
                    ></pointLight>

                    <Box></Box>
                </Canvas>
            </main>
        </StrictMode>
    );
}
function Camera({ cameraRef }: { cameraRef: RefObject<THREE.PerspectiveCamera> }): ReactNode {
    
    useEffect(() => {
        cameraRef!.current.lookAt(new THREE.Vector3(0, 0, 0));
    }, []);
    //let [z, setZ] = useState(-10);
    useFrame((state, delta) => {
        //z += delta
    })
    return (
        <>
            <perspectiveCamera
                ref={cameraRef}
                position={[10, 0, -10]}

            ></perspectiveCamera>
        </>
    );
}
function Box(): ReactNode {
    let meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta;
    });

    return (
        <>
            <mesh ref={meshRef} rotation={[0.1, 0.2, 0.3]}>
                <boxGeometry args={[1, 2, 3]}></boxGeometry>
                <meshStandardMaterial color="red"></meshStandardMaterial>
            </mesh>
        </>
    );
}
export default App;
