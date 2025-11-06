import { CyberpunkButton } from "../components/CyberpunkButton";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(100%_60%_at_50%_0%,#00111a_0%,#000_60%)]">
      <div className="relative w-full max-w-3xl mx-auto p-8 md:p-12 text-center noise-overlay">
        <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(at_50%_110%,#00eaff22,#ff00ea22,#00eaff22)] blur-2xl opacity-60 pointer-events-none animate-[glow-flicker_3s_ease-in-out_infinite]" />

        <h1 className="relative z-10 mb-8 text-3xl md:text-5xl font-bold tracking-[0.25em] uppercase text-white [text-shadow:0_0_24px_#00f0ffaa,0_0_60px_#ff00eaaa]">
          Cyberpunk Interface
        </h1>

        <div className="relative z-10 grid gap-6 md:grid-cols-2">
          <CyberpunkButton glowColor="#00F0FF" accentColor="#FF00EA" size="lg">
            Engage
          </CyberpunkButton>
          <CyberpunkButton glowColor="#8AFF00" accentColor="#00FFD1" size="lg">
            Override
          </CyberpunkButton>
        </div>
      </div>
    </div>
  );
}
