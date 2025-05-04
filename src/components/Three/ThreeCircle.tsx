import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreePieChart: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || 300;
    const height = mountRef.current?.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // прозрачный фон
    mountRef.current!.appendChild(renderer.domElement);

    // Создаём pie chart из секторов
    const totalSectors = 3;
    const sectorColors = [0xff0000, 0x00ff00, 0x0000ff];
    const sectorAngles = [Math.PI * 0.5, Math.PI * 0.25, Math.PI * 0.25]; // 50%, 25%, 25%

    let startAngle = 0;
    for (let i = 0; i < totalSectors; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.arc(0, 0, 2, startAngle, startAngle + sectorAngles[i], false);
      shape.lineTo(0, 0);

      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({ color: sectorColors[i], side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      startAngle += sectorAngles[i];
    }

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.z += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-72 h-72" />;
};

export default ThreePieChart;
