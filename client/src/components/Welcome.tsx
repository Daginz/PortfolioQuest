import { Link } from "wouter";
import { motion } from "framer-motion";

const PixelButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="relative group"
  >
    <Link href={href}>
      <button className="relative px-8 py-4 font-pixel text-lg bg-primary text-primary-foreground
        border-4 border-primary hover:bg-primary/90 transition-colors
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full
        before:bg-primary/20 before:transform before:origin-left hover:before:scale-x-0
        before:transition-transform">
        {children}
      </button>
    </Link>
  </motion.div>
);

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Pixel Art Character SVG */}
      <svg width="200" height="200" viewBox="0 0 64 64" className="mb-8">
        <g className="animate-float">
          <rect x="24" y="12" width="16" height="16" fill="currentColor" />
          <rect x="20" y="28" width="24" height="24" fill="currentColor" />
          <rect x="16" y="20" width="4" height="12" fill="currentColor" />
          <rect x="44" y="20" width="4" height="12" fill="currentColor" />
        </g>
      </svg>

      <h1 className="text-4xl md:text-6xl font-pixel mb-12 text-center animate-pulse">
        ようこそ!<br />
        <span className="text-primary">Welcome to My World</span>
      </h1>

      <div className="grid gap-6 w-full max-w-md">
        <PixelButton href="/who-am-i">Begin Your Journey</PixelButton>
        <PixelButton href="/projects">Enter the Cave</PixelButton>
        <PixelButton href="/family">Meet the Family</PixelButton>
        <PixelButton href="/games">Play Games</PixelButton>
      </div>
    </div>
  );
}
