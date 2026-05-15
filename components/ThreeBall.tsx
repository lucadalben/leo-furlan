"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { BallSettings } from "@/lib/sanity/queries";

export default function ThreeBall({ settings }: { settings?: BallSettings }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lightColor = settings?.lightColor ?? "#daf5ff";
    const lightIntensity = settings?.lightIntensity ?? 1;
    const sensitivityY = settings?.sensitivityY ?? 3;
    const sensitivityX = settings?.sensitivityX ?? 2.5;
    const ambientColor = settings?.ambientColor ?? "#ffffff";
    const ambientIntensity = settings?.ambientIntensity ?? 0.5;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    let object: THREE.Group | undefined;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load("/models/leo_ball/scene.glb", (gltf) => {
      object = gltf.scene;
      scene.add(object);
    });

    scene.add(new THREE.AmbientLight(lightColor, lightIntensity));
    scene.add(new THREE.AmbientLight(ambientColor, ambientIntensity));

    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      if (object) {
        object.rotation.y = -1 + (mouseX / window.innerWidth) * sensitivityY;
        object.rotation.x = -1 + (mouseY * sensitivityX) / window.innerHeight;
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
      dracoLoader.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="container3D" ref={containerRef} />;
}
