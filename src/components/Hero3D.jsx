import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ASSETS } from '../config/assets';

/* =========================================================================
   COMPONENT: Hero3D
   Interactive 3D Realistic Fashion Atelier at the Hero Section.
   Meets Pinterest-style 3D rotating garment reels:
   - Real, authentic clothing silhouettes with natural fabric folds, collar, sleeves & zari trims
   - Realistic garment textures mapped with specular silk/velvet luster
   - Smooth 360° rotation with mouse/touch drag orbit
   - Seamless cloth morph / transition to next garment as it rotates
   - Official Saha Couture Logo card prominently integrated
   ========================================================================= */

const GARMENTS = [
  {
    id: 'saree',
    name: 'Banarasi Festive Saree',
    type: 'Heritage Handloom',
    fabric: 'Pure Kanjeevaram Silk · 24k Zari Hem',
    image: ASSETS.hero.saree,
    color: '#9e3f35', // Deep terracotta crimson silk
    accentColor: '#e5c065', // Shimmering Zari gold
    bgGradient: 'radial-gradient(circle at 55% 45%, #3d1c16 0%, #170e0c 100%)',
    tag: '01 / Festive Heritage',
    description: 'Authentic draped pleated silhouette featuring handwoven zari borders and a graceful diagonal pallu cascading over the shoulder.',
    anchor: '#women',
  },
  {
    id: 'kurta',
    name: 'Royal Raw Silk Kurta',
    type: 'Tailored Atelier',
    fabric: 'Tussar Raw Silk · Antique Gold Brocade Stole',
    image: ASSETS.hero.kurta,
    color: '#e8ded0', // Champagne ivory raw silk
    accentColor: '#c89d46', // Antique gold
    bgGradient: 'radial-gradient(circle at 55% 45%, #252e23 0%, #0f140e 100%)',
    tag: '02 / Royal Bespoke',
    description: 'Impeccably tailored Mandarin bandhgala kurta with metallic buttons, side vents, and an embroidered royal stole draped over the shoulder.',
    anchor: '#women',
  },
  {
    id: 'lehenga',
    name: 'Heritage Bridal Lehenga',
    type: 'Occasion Couture',
    fabric: 'Royal Wine Velvet · Hand-cut Zardozi Embroidery',
    image: ASSETS.hero.storefront,
    color: '#691823', // Royal ruby velvet
    accentColor: '#f1cf75', // Zardozi gold
    bgGradient: 'radial-gradient(circle at 55% 45%, #351318 0%, #14070a 100%)',
    tag: '03 / Bridal Luxury',
    description: 'Sweeping 16-panel circular flared kalis skirt with scalloped gold zari borders, fitted choli blouse, and sheer floating dupatta veil.',
    anchor: '#women',
  },
  {
    id: 'everyday',
    name: 'Everyday Linen Dress',
    type: 'Modern Boutique',
    fabric: 'Breathable Organic Linen · Relaxed Silhouette',
    image: ASSETS.hero.everyday,
    color: '#526c59', // Soft sage green
    accentColor: '#d6b69f', // Rose champagne
    bgGradient: 'radial-gradient(circle at 55% 45%, #1e2c22 0%, #0d150f 100%)',
    tag: '04 / Everyday Edit',
    description: 'Soft structure with relaxed lines designed for effortless movement, tailored pockets, and all-day comfort in Bengaluru.',
    anchor: '#women',
  },
];

export default function Hero3D() {
  const containerRef = useRef(null);
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const garmentGroupsRef = useRef([]);
  const rotationGroupRef = useRef(null);
  const particlesRef = useRef(null);

  const isDraggingRef = useRef(false);
  const previousPointerXRef = useRef(0);
  const previousPointerYRef = useRef(0);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);

  const activeGarment = GARMENTS[activeLookIndex];

  // Helper: Build procedural woven cloth texture with zari embroidery border
  const createClothTexture = (baseColorHex, borderGoldHex, isTextured = true) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base cloth color
    ctx.fillStyle = baseColorHex;
    ctx.fillRect(0, 0, 512, 512);

    if (isTextured) {
      // Subtle fabric weave grain
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 512; i += 4) {
        ctx.fillRect(0, i, 512, 2);
      }
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      for (let j = 0; j < 512; j += 4) {
        ctx.fillRect(j, 0, 2, 512);
      }
    }

    // Rich gold zari embroidery border at the bottom
    ctx.fillStyle = borderGoldHex;
    ctx.fillRect(0, 430, 512, 82);

    // Intricate zari motifs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let x = 16; x < 512; x += 32) {
      ctx.beginPath();
      ctx.arc(x, 470, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  // Helper: Create Realistic Saree Model
  const createRealisticSaree = () => {
    const group = new THREE.Group();
    const clothTex = createClothTexture('#9e3f35', '#e5c065');

    const sareeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9e3f35'),
      map: clothTex,
      roughness: 0.38,
      metalness: 0.22,
      side: THREE.DoubleSide,
    });

    const zariMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e5c065'),
      roughness: 0.24,
      metalness: 0.88,
      side: THREE.DoubleSide,
    });

    // 1. Choli (Blouse) Bodice with contoured shoulders and sweetheart neckline
    const blouseCurve = new THREE.CylinderGeometry(0.38, 0.32, 0.72, 32);
    const blouse = new THREE.Mesh(blouseCurve, sareeMaterial);
    blouse.position.y = 1.15;
    group.add(blouse);

    // Elbow-length tailored sleeves
    const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.52, 16), sareeMaterial);
    sleeveL.position.set(-0.48, 1.16, 0);
    sleeveL.rotation.z = Math.PI / 10;
    group.add(sleeveL);

    const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.52, 16), sareeMaterial);
    sleeveR.position.set(0.48, 1.16, 0);
    sleeveR.rotation.z = -Math.PI / 10;
    group.add(sleeveR);

    // 2. Realistic Pleated Saree Skirt with natural accordion fluting
    const rings = 28;
    const segments = 64;
    const skirtGeo = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    for (let r = 0; r <= rings; r++) {
      const v = r / rings;
      const y = 0.78 - v * 2.5; // from waist to ground
      const radiusBase = 0.32 + Math.pow(v, 1.2) * 0.78;
      const pleats = 16;
      // Front pleats are deeper than back
      const pleatDepth = 0.05 * (0.2 + v * 0.8);

      for (let s = 0; s <= segments; s++) {
        const u = s / segments;
        const theta = u * Math.PI * 2;
        const frontBias = Math.sin(theta) > 0 ? 1.4 : 0.6;
        const pleatOffset = Math.sin(theta * pleats) * pleatDepth * frontBias;
        const rCurrent = radiusBase + pleatOffset;

        vertices.push(Math.cos(theta) * rCurrent, y, Math.sin(theta) * rCurrent);
      }
    }

    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < segments; s++) {
        const a = r * (segments + 1) + s;
        const b = a + 1;
        const c = (r + 1) * (segments + 1) + s;
        const d = c + 1;
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    skirtGeo.setIndex(indices);
    skirtGeo.computeVertexNormals();

    const skirt = new THREE.Mesh(skirtGeo, sareeMaterial);
    group.add(skirt);

    // 3. Golden Zari Border Ring at hem
    const hemZari = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.055, 16, 64), zariMaterial);
    hemZari.rotation.x = Math.PI / 2;
    hemZari.position.y = -1.72;
    group.add(hemZari);

    // 4. Fluid Diagonal Cross-Body Pallu
    const palluCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.36, 0.7, 0.28),
      new THREE.Vector3(0.1, 1.08, 0.36),
      new THREE.Vector3(-0.32, 1.48, 0.2),
      new THREE.Vector3(-0.44, 1.44, -0.18),
      new THREE.Vector3(-0.38, 0.9, -0.38),
      new THREE.Vector3(-0.35, 0.15, -0.44),
      new THREE.Vector3(-0.33, -0.7, -0.46),
    ]);
    const palluGeo = new THREE.TubeGeometry(palluCurve, 40, 0.22, 16, false);
    const pallu = new THREE.Mesh(palluGeo, sareeMaterial);
    group.add(pallu);

    // Gold zari border on the pallu
    const palluTrim = new THREE.Mesh(new THREE.TubeGeometry(palluCurve, 40, 0.04, 12, false), zariMaterial);
    palluTrim.position.set(0.03, 0.02, 0.03);
    group.add(palluTrim);

    return group;
  };

  // Helper: Create Realistic Kurta & Sherwani Model
  const createRealisticKurta = () => {
    const group = new THREE.Group();
    const clothTex = createClothTexture('#e8ded0', '#c89d46');

    const kurtaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8ded0'),
      map: clothTex,
      roughness: 0.44,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c89d46'),
      roughness: 0.22,
      metalness: 0.85,
      side: THREE.DoubleSide,
    });

    // 1. Straight-cut Kurta Body with side slits
    const kurtaBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 2.35, 32), kurtaMat);
    kurtaBody.position.y = 0.32;
    group.add(kurtaBody);

    // 2. Crisp Mandarin Bandhgala Collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.23, 0.18, 32), goldMat);
    collar.position.y = 1.54;
    group.add(collar);

    // 3. Center Front Button Placket
    const placket = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.05, 0.04), goldMat);
    placket.position.set(0, 0.98, 0.43);
    group.add(placket);

    // Metallic front buttons
    for (let i = 0; i < 5; i++) {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), goldMat);
      btn.position.set(0, 1.36 - i * 0.18, 0.46);
      group.add(btn);
    }

    // 4. Sleeves
    const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 1.05, 16), kurtaMat);
    sleeveL.position.set(-0.55, 0.95, 0);
    sleeveL.rotation.z = Math.PI / 12;
    group.add(sleeveL);

    const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 1.05, 16), kurtaMat);
    sleeveR.position.set(0.55, 0.95, 0);
    sleeveR.rotation.z = -Math.PI / 12;
    group.add(sleeveR);

    // 5. Royal Brocade Draped Stole
    const stoleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.42, -0.65, 0.3),
      new THREE.Vector3(-0.4, 0.6, 0.32),
      new THREE.Vector3(-0.38, 1.5, 0.1),
      new THREE.Vector3(-0.38, 1.45, -0.15),
      new THREE.Vector3(-0.4, 0.5, -0.3),
      new THREE.Vector3(-0.42, -0.75, -0.32),
    ]);
    const stole = new THREE.Mesh(new THREE.TubeGeometry(stoleCurve, 32, 0.18, 16, false), goldMat);
    group.add(stole);

    // 6. Side Vents / Slits Trims
    const slitL = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.9, 0.03), goldMat);
    slitL.position.set(-0.49, -0.35, 0);
    group.add(slitL);

    const slitR = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.9, 0.03), goldMat);
    slitR.position.set(0.49, -0.35, 0);
    group.add(slitR);

    return group;
  };

  // Helper: Create Realistic Bridal Lehenga Model
  const createRealisticLehenga = () => {
    const group = new THREE.Group();
    const clothTex = createClothTexture('#691823', '#f1cf75');

    const velvetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#691823'),
      map: clothTex,
      roughness: 0.32,
      metalness: 0.28,
      side: THREE.DoubleSide,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f1cf75'),
      roughness: 0.2,
      metalness: 0.92,
      side: THREE.DoubleSide,
    });

    // 1. Choli (Blouse)
    const choli = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.29, 0.62, 32), velvetMat);
    choli.position.y = 1.18;
    group.add(choli);

    // Gold embroidered neckline band
    const neckBand = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 12, 32), goldMat);
    neckBand.rotation.x = Math.PI / 2;
    neckBand.position.y = 1.46;
    group.add(neckBand);

    // 2. Wide Volumetric 16-Panel Kali Flared Skirt
    const rings = 28;
    const segments = 64;
    const skirtGeo = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    for (let r = 0; r <= rings; r++) {
      const v = r / rings;
      const y = 0.8 - v * 2.55;
      const radiusBase = 0.31 + Math.pow(v, 1.3) * 1.25;
      const kalis = 16;
      const kaliDepth = 0.075 * Math.pow(v, 0.85);

      for (let s = 0; s <= segments; s++) {
        const u = s / segments;
        const theta = u * Math.PI * 2;
        const wave = Math.sin(theta * kalis) * kaliDepth;
        const rCurrent = radiusBase + wave;

        vertices.push(Math.cos(theta) * rCurrent, y, Math.sin(theta) * rCurrent);
      }
    }

    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < segments; s++) {
        const a = r * (segments + 1) + s;
        const b = a + 1;
        const c = (r + 1) * (segments + 1) + s;
        const d = c + 1;
        indices.push(a, c, b);
        indices.push(b, c, d);
      }
    }

    skirtGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    skirtGeo.setIndex(indices);
    skirtGeo.computeVertexNormals();

    const skirt = new THREE.Mesh(skirtGeo, velvetMat);
    group.add(skirt);

    // Scalloped gold border at hem
    const hemBorder = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.09, 16, 64), goldMat);
    hemBorder.rotation.x = Math.PI / 2;
    hemBorder.position.y = -1.74;
    group.add(hemBorder);

    // 3. Sheer Dupatta Floating Gracefully
    const dupattaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.52, 0.35, 0.5),
      new THREE.Vector3(0.54, 1.22, 0.22),
      new THREE.Vector3(0.12, 1.54, -0.42),
      new THREE.Vector3(-0.42, 1.34, -0.32),
      new THREE.Vector3(-0.58, 0.42, 0.32),
      new THREE.Vector3(-0.42, -0.25, 0.62),
    ]);
    const dupattaMat = new THREE.MeshStandardMaterial({
      color: 0xffe0b2,
      roughness: 0.35,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const dupatta = new THREE.Mesh(new THREE.TubeGeometry(dupattaCurve, 32, 0.16, 16, false), dupattaMat);
    group.add(dupatta);

    return group;
  };

  // Helper: Create Realistic Everyday Chic Dress
  const createRealisticEveryday = () => {
    const group = new THREE.Group();
    const clothTex = createClothTexture('#526c59', '#d6b69f');

    const dressMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#526c59'),
      map: clothTex,
      roughness: 0.4,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d6b69f'),
      roughness: 0.25,
      metalness: 0.6,
      side: THREE.DoubleSide,
    });

    // 1. Dress Bodice
    const bodice = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.8, 32), dressMat);
    bodice.position.y = 1.08;
    group.add(bodice);

    // Waistband accent
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 32), trimMat);
    belt.position.y = 0.68;
    group.add(belt);

    // 2. Cascading Flared Skirt
    const skirt = new THREE.Mesh(new THREE.ConeGeometry(1.28, 2.35, 48, 16, true), dressMat);
    skirt.position.y = -0.5;
    group.add(skirt);

    // Hem trim ring
    const hemTrim = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.05, 16, 64), trimMat);
    hemTrim.rotation.x = Math.PI / 2;
    hemTrim.position.y = -1.68;
    group.add(hemTrim);

    return group;
  };

  // Base Mannequin
  const createBaseMannequin = () => {
    const mGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d271e, roughness: 0.4, metalness: 0.1 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.25, metalness: 0.85 });

    // Finial & Neck
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 0.35, 24), brassMat);
    finial.position.y = 1.95;
    mGroup.add(finial);

    const topper = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), brassMat);
    topper.position.y = 2.15;
    mGroup.add(topper);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.4, 24), woodMat);
    neck.position.y = 1.65;
    mGroup.add(neck);

    // Stand pole
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.8, 16), brassMat);
    pole.position.y = -0.6;
    mGroup.add(pole);

    // Stand base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.08, 32), woodMat);
    base.position.y = -2.0;
    mGroup.add(base);

    return mGroup;
  };

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6ed, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd6, 1.45);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf7d9bc, 1.15);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const frontFill = new THREE.PointLight(0xffffff, 0.55, 10);
    frontFill.position.set(0, 1.5, 3.5);
    scene.add(frontFill);

    // Floor Shadow Disc
    const shadowMesh = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 32),
      new THREE.MeshBasicMaterial({ color: 0x110c0a, transparent: true, opacity: 0.35 })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.01;
    scene.add(shadowMesh);

    // Master Rotational Group
    const rotationGroup = new THREE.Group();
    scene.add(rotationGroup);
    rotationGroupRef.current = rotationGroup;

    rotationGroup.add(createBaseMannequin());

    // Add Realistic Clothing Models
    const sareeMesh = createRealisticSaree();
    const kurtaMesh = createRealisticKurta();
    const lehengaMesh = createRealisticLehenga();
    const everydayMesh = createRealisticEveryday();

    garmentGroupsRef.current = [sareeMesh, kurtaMesh, lehengaMesh, everydayMesh];

    garmentGroupsRef.current.forEach((g, idx) => {
      g.visible = idx === 0;
      rotationGroup.add(g);
    });

    // Zari Dust Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.1 + Math.random() * 2.1;
      const angle = Math.random() * Math.PI * 2;
      pPositions[i * 3] = Math.cos(angle) * radius;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.2;
      pPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0xf3d9b1,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);
    particlesRef.current = particles;

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDraggingRef.current) {
        targetRotationYRef.current += delta * 0.42;
      }

      if (rotationGroupRef.current) {
        rotationGroupRef.current.rotation.y += (targetRotationYRef.current - rotationGroupRef.current.rotation.y) * 0.08;
        rotationGroupRef.current.rotation.x += (targetRotationXRef.current - rotationGroupRef.current.rotation.x) * 0.08;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, []);

  // Update visible garment with smooth pop transition
  useEffect(() => {
    if (!garmentGroupsRef.current.length) return;

    garmentGroupsRef.current.forEach((grp, idx) => {
      if (grp) {
        grp.visible = idx === activeLookIndex;
        if (idx === activeLookIndex) {
          grp.scale.set(0.96, 0.96, 0.96);
          let s = 0.96;
          const popInterval = setInterval(() => {
            s += 0.01;
            if (s >= 1.0) {
              grp.scale.set(1, 1, 1);
              clearInterval(popInterval);
            } else {
              grp.scale.set(s, s, s);
            }
          }, 16);
        }
      }
    });
  }, [activeLookIndex]);

  // Auto-cycle through looks every 5.5s
  useEffect(() => {
    if (!isAutoCycle) return;
    const timer = setInterval(() => {
      setActiveLookIndex((prev) => (prev + 1) % GARMENTS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoCycle]);

  // Pointer drag event handlers for 360° orbit
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousPointerXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    previousPointerYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - previousPointerXRef.current;
    const deltaY = clientY - previousPointerYRef.current;

    targetRotationYRef.current += deltaX * 0.009;
    targetRotationXRef.current = Math.max(-0.25, Math.min(0.25, targetRotationXRef.current + deltaY * 0.005));

    previousPointerXRef.current = clientX;
    previousPointerYRef.current = clientY;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetRotation = () => {
    targetRotationYRef.current = 0;
    targetRotationXRef.current = 0;
  };

  return (
    <section className="hero" aria-labelledby="heroMainHeading" id="hero">
      {/* 3D Realistic Rotating Garment Showcase Stage */}
      <div
        className="hero__media"
        style={{ background: activeGarment.bgGradient, transition: 'background 1s ease' }}
      >
        <div
          ref={containerRef}
          className="hero3d-canvas-wrap"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          title="Drag to rotate 360°"
          aria-label="Interactive 3D realistic clothing viewer"
        />

        <div className="hero__shade" aria-hidden="true"></div>

        {/* Studio Identifier */}
        <div className="hero__media-label">
          <span className="hero__dot"></span>
          <span>SAHA COUTURE · 3D CLOTHING REEL</span>
        </div>

        {/* Look Chip Overlay */}
        <a href={activeGarment.anchor} className="hero3d-chip" aria-label={`Browse ${activeGarment.name}`}>
          <span className="hero3d-chip__dot" style={{ background: activeGarment.accentColor }}></span>
          <span className="hero3d-chip__name">{activeGarment.name}</span>
          <span className="hero3d-chip__arrow" aria-hidden="true">→</span>
        </a>

        {/* 3D Viewport Controls */}
        <div className="hero3d-viewport-controls">
          <button
            type="button"
            className="hero3d-ctrl-btn"
            onClick={() => setIsRotating((prev) => !prev)}
            aria-label={isRotating ? 'Pause rotation' : 'Resume rotation'}
          >
            {isRotating ? '⏸ Pause' : '▶ Rotate'}
          </button>
          <button
            type="button"
            className="hero3d-ctrl-btn"
            onClick={handleResetRotation}
            aria-label="Reset camera angle"
          >
            ↺ Reset Angle
          </button>
          <span className="hero3d-drag-hint">⟲ 360° Drag &amp; Rotate</span>
        </div>

        {/* Garment Selector Tabs */}
        <div className="hero3d-tabs-wrap">
          <span className="hero3d-tabs-label">Change Outfit:</span>
          <div className="hero3d-tabs" role="tablist" aria-label="Select 3D Garment Piece">
            {GARMENTS.map((g, index) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={activeLookIndex === index}
                className={`hero3d-tab ${activeLookIndex === index ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveLookIndex(index);
                  setIsAutoCycle(false);
                }}
              >
                <span className="tab-indicator" style={{ background: g.accentColor }}></span>
                <span className="tab-text">{g.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Editorial Content */}
      <div className="hero__content">
        {/* ===== SAHA COUTURE LOGO CARD IN THE HERO ===== */}
        <div className="hero-logo-card">
          <img
            src={ASSETS.logoCard}
            alt="Saha Couture — Fashion for Women &amp; Kids"
            className="hero-logo-img"
            onError={(e) => { e.currentTarget.src = ASSETS.logoOriginal; }}
          />
        </div>

        <p className="eyebrow">DESIGNER BOUTIQUE · BENGALURU</p>

        <h1 className="hero__title" id="heroMainHeading">
          Beautifully made.<br />
          <em>Quietly discovered.</em>
        </h1>

        <p className="hero__copy">
          A considered boutique edit for women and children — shaped by authentic fabric,
          thoughtful tailoring, and the pleasure of wearing something that feels like you.
        </p>

        {/* Dynamic Spec Note for Active Garment */}
        <div className="hero__garment-spec">
          <span className="spec-tag">{activeGarment.tag}</span>
          <p className="spec-fabric">{activeGarment.fabric}</p>
          <p className="spec-desc">{activeGarment.description}</p>
        </div>

        <div className="hero__actions">
          <a href="#women" className="button button--dark">
            Explore the edit <span>↓</span>
          </a>
          <a href="#style-finder" className="button button--outline">
            Find Your Saha Edit <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
