// components/Globe.js
'use client';

import { useRef } from 'react';
import {Canvas ,useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Componente que renderiza el globo terráqueo 3D.
 */
function GlobeMesh() {
    // Carga la textura del mapa del mundo. La imagen debe estar en la carpeta /public
    const texture = useLoader(THREE.TextureLoader, '/images/globe.jpg');

    // useRef para tener acceso directo al mesh y poder rotarlo
    const meshRef = useRef();

    // useFrame es un hook de R3F que ejecuta código en cada frame (60fps)
    useFrame(() => {
        if (meshRef.current) {
            // Rotación automática sutil para que el globo no esté estático
            meshRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={meshRef} scale={2.5}> {/* Hacemos el globo un poco más grande */}
            {/* La geometría es la forma del objeto, en este caso una esfera. */}
            <sphereGeometry args={[1, 64, 64]} /> {/* args: [radio, segmentosAncho, segmentosAlto] */}

            {/* El material es la "piel" del objeto. Usamos un material estándar que reacciona a la luz. */}
            <meshStandardMaterial
                map={texture} // Aplicamos la textura del mapa
                metalness={0.4} // Hacemos que tenga un brillo ligeramente metálico
                roughness={0.7} // Le damos un poco de rugosidad para que no sea un espejo perfecto
            />
        </mesh>
    );
}


/**
 * Componente principal que configura la escena 3D.
 */
export default function Globe() {
    return (
        <div className="w-full h-screen">
            {/* Canvas es el componente de R3F que crea la escena WebGL */}
            <Canvas>
                {/* Luz ambiental: ilumina todos los objetos de la escena de manera uniforme */}
                <ambientLight intensity={0.5} />

                {/* Luz puntual: como una bombilla, para crear sombras y reflejos */}
                <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

                {/* Componente de Drei para renderizar un fondo de estrellas */}
                <Stars
                    radius={300} // Radio de la esfera donde se generan las estrellas
                    depth={60}
                    count={20000} // Número de estrellas
                    factor={7} // Tamaño de las estrellas
                    saturation={0}
                    fade={true}
                />

                {/* Nuestro componente del globo */}
                <GlobeMesh />

                {/* Controles de órbita: Permite girar, hacer zoom y mover la cámara con el mouse */}
                <OrbitControls
                    enableZoom={true} // Permitir zoom
                    enablePan={true} // Permitir mover la cámara
                    enableRotate={true} // Permitir rotación
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </Canvas>
        </div>
    );
}