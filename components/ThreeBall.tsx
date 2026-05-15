"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ThreeBall() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio * 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    let object: THREE.Group | undefined;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const loader = new GLTFLoader();
    loader.load("/models/leo_ball/scene.gltf", (gltf) => {
      object = gltf.scene;
      scene.add(object);
    });

    scene.add(new THREE.AmbientLight(0xdaf5ff, 1));

    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      if (object) {
        object.rotation.y = -1 + (mouseX / window.innerWidth) * 3;
        object.rotation.x = -1 + (mouseY * 2.5) / window.innerHeight;
      }
      renderer.render(scene, camera);
    }

    animate();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div id="container3D" ref={containerRef} />;
}
