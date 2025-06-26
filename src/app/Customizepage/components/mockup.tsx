"use client";
import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react";
import classNames from "classnames";

// T-shirt Model Component
const TshirtModel = ({ color, image }: { color: string; image: string }) => {
  const { scene } = useGLTF("/mockup/Tshirt Mockup BrockCreative Final.glb");
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (image) {
      const loader = new THREE.TextureLoader();
      loader.load(image, (loadedTexture) => {
        loadedTexture.flipY = false;
        setTexture(loadedTexture);
      });
    } else {
      setTexture(null);
    }
  }, [image]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const applyMaterial = (material: THREE.Material) => {
          const mat = material as THREE.MeshStandardMaterial;
          mat.color.set(color);
          mat.map = texture || null;
          mat.needsUpdate = true;
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(applyMaterial);
        } else {
          applyMaterial(mesh.material);
        }
      }
    });
  }, [scene, color, texture]);

  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
      <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
        <ambientLight intensity={3} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[0, 5, -5]} intensity={2} />
        <group position={[-0.2, -2, 0]} scale={[1.3, 1.3, 1.3]}>
          <primitive object={scene} />
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

// Color Picker
const ColorPicker = ({ color, setColor }: { color: string; setColor: (c: string) => void }) => {
  const presetColors = ["#ffffff", "#a855f7", "#9ca3af", "#000000", "#15803d", "#f9a8d4"];
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Color</p>
      <div className="flex space-x-2 items-center">
        <Popover className="relative">
          <Popover.Button
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer bg-white"
            title="Custom Color"
          >
            <span className="text-lg font-bold text-blue-500">+</span>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 mt-2 left-0">
            <div className="p-3 bg-white rounded-xl shadow-lg border w-[240px]">
              <HexColorPicker color={color} onChange={setColor} />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-2 w-full border px-2 py-1 rounded text-sm"
                aria-label="color"
              />
            </div>
          </Popover.Panel>
        </Popover>

        {presetColors.map((preset) => (
          <div
            key={preset}
            onClick={() => setColor(preset)}
            className="w-8 h-8 rounded-full border-2 cursor-pointer"
            style={{ backgroundColor: preset }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
};

// Tab Image Gallery
const TabImageGallery = ({
  onSelectImage,
}: {
  onSelectImage: (url: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<"patterns" | "inspirations">("patterns");

  const patternImages = [
    "/fabric patterns/726.jpg",
    "/fabric patterns/4443133.jpg",
    "/fabric patterns/9534078.jpg",
    "/fabric patterns/seamless-8139411_1280.png",
  ];
  const inspirationImages = [
    "/inspirations/inspo1.png",
    "/inspirations/inspo2.png",
    "/inspirations/inspo3.png",
  ];

  const images = activeTab === "patterns" ? patternImages : inspirationImages;

  return (
    <div className="space-y-2">
      <div className="flex space-x-2 justify-center mb-5 mt-5">
        <button
          onClick={() => setActiveTab("patterns")}
          className={classNames(
            "px-3 py-1 rounded-full text-sm font-semibold",
            activeTab === "patterns" ? "bg-purple-600 text-white" : "bg-gray-200"
          )}
        >
          Patterns
        </button>
        <button
          onClick={() => setActiveTab("inspirations")}
          className={classNames(
            "px-3 py-1 rounded-full text-sm font-semibold",
            activeTab === "inspirations" ? "bg-purple-600 text-white" : "bg-gray-200"
          )}
        >
          Inspirations
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 max-h-[300px] overflow-y-scroll pr-1">
        {images.map((imgUrl, i) => (
          <img
            key={i}
            src={imgUrl}
            alt="pattern"
            onClick={() => onSelectImage(imgUrl)}
            className="w-full aspect-square object-cover rounded-lg cursor-pointer border hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

// Home Component
export default function Home() {
  const [color, setColor] = useState("#003366");
  const [image, setImage] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setColor("#003366");
    setImage("");
    setImageName("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-screen gap-6 p-4 bg-gray-50">
      {/* Model Display comes first in mobile layout */}
      <div className="order-1 lg:order-none">
        <div className="w-full rounded-xl shadow-2xl">
          <TshirtModel color={color} image={image} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full max-w-[400px] h-full max-h-[700px] mx-auto p-6 rounded-lg space-y-6 shadow-xl bg-white order-2 lg:order-none">
        <h2 className="text-xl font-bold text-black-600 mb-6">Chicmix Studio</h2>

        <ColorPicker color={color} setColor={setColor} />

        <TabImageGallery onSelectImage={setImage} />

        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
            aria-label="image"
          />
          <button
            onClick={() => document.getElementById("imageUpload")?.click()}
            className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-all mt-4"
          >
            Upload Image
          </button>

          <button
            onClick={handleClear}
            className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-all mt-4"
          >
            Remove Design
          </button>
        </div>
      </aside>
    </div>
  );
}
