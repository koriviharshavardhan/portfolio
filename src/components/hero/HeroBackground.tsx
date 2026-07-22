'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deviceProfile, setDeviceProfile] = useState<'low' | 'high'>('high');

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current || !containerRef.current) return;

    // Detect basic device performance properties
    let particleCount = 15000;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile || navigator.hardwareConcurrency < 4) {
      setDeviceProfile('low');
      particleCount = 5000;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04070B, 0.0008);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 500;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: isMobile ? false : true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle Constellation Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorPrimary = new THREE.Color(0x00E5FF); // Cyan
    const colorSecondary = new THREE.Color(0x7B61FF); // Purple
    const colorWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create sphere/cloud configuration
      const radius = 600;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random()); // Stagger particles in volume

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;

      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;

      // Color distribution (30% cyan, 30% purple, 40% white/gray)
      const rand = Math.random();
      let pColor = colorWhite;
      if (rand < 0.3) {
        pColor = colorPrimary;
      } else if (rand < 0.6) {
        pColor = colorSecondary;
      }

      colors[i] = pColor.r;
      colors[i + 1] = pColor.g;
      colors[i + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture - Custom Round Glow Dot using Canvas
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: isMobile ? 3 : 2,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // AI Core Sphere - Floating in Center Background
    const coreGroup = new THREE.Group();
    const coreGeom = new THREE.IcosahedronGeometry(75, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Outer orbiting ring
    const ringGeom = new THREE.RingGeometry(110, 111, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7B61FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    coreGroup.add(ringMesh);

    scene.add(coreGroup);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00E5FF, 1.5, 800);
    pointLight.position.set(0, 0, 100);
    scene.add(pointLight);

    // Mouse Tracking Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationId = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse coordinate inertia
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Parallax camera rotation
      camera.position.x = mouseX * 220;
      camera.position.y = mouseY * 220;
      camera.lookAt(scene.position);

      // Rotate particle constellation
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.005;

      // Rotate central AI Core
      coreGroup.rotation.y = -elapsed * 0.08;
      coreGroup.rotation.x = elapsed * 0.05;
      coreGroup.position.y = Math.sin(elapsed * 1.5) * 15; // Floating vertical movement

      // Mouse repulsion simulation on particles
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const count = posAttr.count;

      if (!isMobile) {
        // Compute 3D mouse vector
        const mouseVec = new THREE.Vector3(mouseX * 400, mouseY * 400, 0);
        
        for (let i = 0; i < count; i++) {
          const px = originalPositions[i * 3];
          const py = originalPositions[i * 3 + 1];
          const pz = originalPositions[i * 3 + 2];

          // Rotate local positions matching particles rotation to accurately check repulsion
          const pVec = new THREE.Vector3(px, py, pz);
          pVec.applyEuler(particles.rotation);

          const dist = pVec.distanceTo(mouseVec);
          if (dist < 180) {
            // Push away
            const dir = pVec.clone().sub(mouseVec).normalize();
            const push = (180 - dist) * 0.25;
            pVec.addScaledVector(dir, push);
          }

          // Restore back to coordinates (rotated backward)
          const invEuler = new THREE.Euler(
            -particles.rotation.x,
            -particles.rotation.y,
            -particles.rotation.z,
            'ZYX'
          );
          pVec.applyEuler(invEuler);

          posAttr.setXYZ(i, pVec.x, pVec.y, pVec.z);
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Background radial gradient mask for color blending */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 z-[1]" />
      
      {/* Ambient background colors */}
      <div className="aurora-bg z-0" />
      
      {/* Three.js canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block z-0"
      />
    </div>
  );
};
