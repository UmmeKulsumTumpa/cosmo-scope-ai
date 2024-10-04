// src/components/ThreeDMap.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Papa from 'papaparse';
import '../App.css';  // Make sure the styles are imported

function ThreeDMap() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    class StellarEntity {
      constructor(distance, radius, color, speed, angle, name, isStar = false) {
        this.distance = distance;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.name = name;
        this.isStar = isStar;
        this.mesh = this.setUp();
      }

      setUp() {
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: this.color, transparent: true, opacity: this.isStar ? 0 : 1 });
        const celestialBody = new THREE.Mesh(geometry, material);

        if (!this.isStar) celestialBody.position.x = this.distance;

        celestialBody.userData = { distance: this.distance, speed: this.speed, angle: this.angle, name: this.name };

        scene.add(celestialBody);
        return celestialBody;
      }
    }

    // Load the exoplanet data from CSV
    Papa.parse('/data/exoplanets.csv', {
      download: true,
      header: true,
      complete: function (results) {
        let hostStars = {};
        let exoplanets = [];

        results.data.forEach(row => {
          if (row.pl_name && row.hostname && row.st_rad && row.pl_rade && row.pl_orbper && row.pl_orbsmax) {
            exoplanets.push(row);
          }
        });

        const shuffledExoplanets = exoplanets.sort(() => 0.5 - Math.random()).slice(0, 50);

        shuffledExoplanets.forEach(row => {
          let starName = row.hostname;

          if (!hostStars[starName]) {
            hostStars[starName] = {
              radius: Math.random() * 0.5 + 0.5,
              planets: []
            };
          }

          hostStars[starName].planets.push({
            name: row.pl_name,
            radius: Math.random() * 3 + 1,
            orbitalPeriod: parseFloat(row.pl_orbper),
            semiMajorAxis: Math.random() * 500 + 100
          });
        });

        Object.keys(hostStars).forEach(starName => {
          const starData = hostStars[starName];
          const star = new StellarEntity(0, starData.radius, 0xffff00, 0, 0, starName, true);
          star.setUp();

          starData.planets.forEach((planet) => {
            const planetColor = Math.random() * 0xffffff;
            const planetSpeed = planet.orbitalPeriod / 1000 / 100;
            const randomAngle = Math.random() * Math.PI * 2;
            new StellarEntity(planet.semiMajorAxis, planet.radius, planetColor, planetSpeed, randomAngle, planet.name);
          });
        });
      }
    });

    camera.position.set(100, 200, 300);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.userData.speed) {
          child.userData.angle += child.userData.speed;
          child.position.x = child.userData.distance * Math.cos(child.userData.angle);
          child.position.z = child.userData.distance * Math.sin(child.userData.angle);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement); // Ensure that the element exists before trying to remove it
      }
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default ThreeDMap;
