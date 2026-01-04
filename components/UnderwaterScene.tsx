'use client'

import UnderwaterBackground from './UnderwaterBackground'
import MarineCharacter from './MarineCharacter'

/**
 * UnderwaterScene Component
 * Main scene container with all marine characters positioned
 * Based on the provided underwater illustration description
 */
export default function UnderwaterScene() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <UnderwaterBackground />

      {/* Marine Characters positioned based on illustration description */}
      
      {/* Whale Shark - Upper right quadrant */}
      <MarineCharacter
        name="Whale Shark"
        x={70}
        y={15}
        width={25}
        height={12}
        color="#2d4a6b"
        shape="whale-shark"
      />

      {/* Manta Ray - Center-left */}
      <MarineCharacter
        name="Manta Ray"
        x={20}
        y={40}
        width={20}
        height={15}
        color="#1e3a5f"
        shape="manta-ray"
      />

      {/* Sea Turtle - Mid-right */}
      <MarineCharacter
        name="Sea Turtle"
        x={65}
        y={50}
        width={12}
        height={10}
        color="#4a7c59"
        shape="turtle"
      />

      {/* Elongated Fish/Shark - Upper right */}
      <MarineCharacter
        name="Blue Shark"
        x={75}
        y={8}
        width={8}
        height={4}
        color="#3d6b8f"
        shape="fish"
      />

      {/* Small Blue Fish - Upper left */}
      <MarineCharacter
        name="Small Blue Fish 1"
        x={15}
        y={20}
        width={4}
        height={3}
        color="#5a9bc4"
        shape="fish"
      />
      <MarineCharacter
        name="Small Blue Fish 2"
        x={18}
        y={22}
        width={4}
        height={3}
        color="#5a9bc4"
        shape="fish"
      />
      <MarineCharacter
        name="Small Blue Fish 3"
        x={12}
        y={25}
        width={4}
        height={3}
        color="#5a9bc4"
        shape="fish"
      />

      {/* Orange-Red Fish - Various positions */}
      <MarineCharacter
        name="Orange Fish 1"
        x={25}
        y={45}
        width={5}
        height={4}
        color="#d46a4a"
        shape="fish"
      />
      <MarineCharacter
        name="Orange Fish 2"
        x={20}
        y={75}
        width={5}
        height={4}
        color="#d46a4a"
        shape="fish"
      />
      <MarineCharacter
        name="Orange Fish 3"
        x={45}
        y={80}
        width={5}
        height={4}
        color="#d46a4a"
        shape="fish"
      />
      <MarineCharacter
        name="Large Orange Fish"
        x={70}
        y={85}
        width={8}
        height={6}
        color="#c55a3a"
        shape="fish"
      />

      {/* Cluster of Blue Fish - Mid-right */}
      <MarineCharacter
        name="Blue Fish Cluster 1"
        x={60}
        y={48}
        width={4}
        height={3}
        color="#4a8bb4"
        shape="fish"
      />
      <MarineCharacter
        name="Blue Fish Cluster 2"
        x={63}
        y={50}
        width={4}
        height={3}
        color="#4a8bb4"
        shape="fish"
      />
      <MarineCharacter
        name="Blue Fish Cluster 3"
        x={58}
        y={52}
        width={4}
        height={3}
        color="#4a8bb4"
        shape="fish"
      />

      {/* Stylized Blue Fish - Lower-center */}
      <MarineCharacter
        name="Stylized Blue Fish"
        x={50}
        y={75}
        width={6}
        height={5}
        color="#5a9bc4"
        shape="fish"
      />

      {/* Small Green Fish */}
      <MarineCharacter
        name="Green Fish 1"
        x={18}
        y={78}
        width={3}
        height={2.5}
        color="#6ba85a"
        shape="fish"
      />
      <MarineCharacter
        name="Green Fish 2"
        x={48}
        y={82}
        width={3}
        height={2.5}
        color="#6ba85a"
        shape="fish"
      />

      {/* Jellyfish - Mid-left */}
      <MarineCharacter
        name="Purple Jellyfish"
        x={22}
        y={55}
        width={6}
        height={8}
        color="#9a6ba8"
        shape="jellyfish"
      />
      <MarineCharacter
        name="Blue Jellyfish"
        x={25}
        y={60}
        width={4}
        height={6}
        color="#6ba8c4"
        shape="jellyfish"
      />

      {/* Small Green Fish/Turtle near larger turtle */}
      <MarineCharacter
        name="Baby Turtle"
        x={68}
        y={52}
        width={3}
        height={2.5}
        color="#5a9c6a"
        shape="turtle"
      />

      {/* Plants - Bottom edges */}
      <MarineCharacter
        name="Sea Plant 1"
        x={5}
        y={90}
        width={3}
        height={10}
        color="#4a7c59"
        shape="plant"
      />
      <MarineCharacter
        name="Sea Plant 2"
        x={12}
        y={88}
        width={2.5}
        height={12}
        color="#5a8c69"
        shape="plant"
      />
      <MarineCharacter
        name="Sea Plant 3"
        x={85}
        y={92}
        width={3}
        height={8}
        color="#4a7c59"
        shape="plant"
      />
      <MarineCharacter
        name="Sea Plant 4"
        x={92}
        y={90}
        width={2.5}
        height={10}
        color="#5a8c69"
        shape="plant"
      />
    </div>
  )
}

