"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";

/**
 * If WebGL is unavailable (old devices, blocked GPU) or a chunk fails to load,
 * render nothing instead of taking the whole page down.
 */
class SafeWebGL extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.warn("3D scene disabled:", err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// WebGL scenes load in the browser only, after the page is interactive.
const HeroSceneInner = dynamic(() => import("./hero-scene"), { ssr: false });
const GlobeInner = dynamic(() => import("./globe"), { ssr: false });

export function HeroScene() {
  return (
    <SafeWebGL>
      <HeroSceneInner />
    </SafeWebGL>
  );
}

export function Globe() {
  return (
    <SafeWebGL>
      <GlobeInner />
    </SafeWebGL>
  );
}
