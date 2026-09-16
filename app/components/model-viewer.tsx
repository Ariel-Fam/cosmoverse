"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Box3, Group, Vector3 } from "three";
import gsap from "gsap";
import { modelPoses, type ModelKind } from "@/lib/model-choreography";

export type { ModelKind } from "@/lib/model-choreography";
const paths: Record<ModelKind, string> = {
  astro: "/models/astroHighPoly.glb",
  ark: "/models/ark11.glb",
  crystal: "/models/AmethystCluster.glb",
};
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(error: Error) {
    console.error("Unable to render Cosmoverse model", error);
    this.props.onError();
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
function Model({
  kind,
  progress,
  registerInvalidate,
  onReady,
}: {
  kind: ModelKind;
  progress: RefObject<number>;
  registerInvalidate: (fn: () => void) => void;
  onReady: () => void;
}) {
  const { scene } = useGLTF(paths[kind], false);
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = 3.4 / Math.max(size.x, size.y, size.z);
    clone.position.copy(center.multiplyScalar(-scale));
    clone.scale.setScalar(scale);
    return clone;
  }, [scene]);
  useEffect(() => {
    registerInvalidate(invalidate);
    onReady();
    invalidate();
    return () => registerInvalidate(() => {});
  }, [invalidate, registerInvalidate, onReady]);
  const choreography = useMemo(() => {
    const pose = { ...modelPoses[kind][0] };
    const timeline = gsap.timeline({ paused: true });
    modelPoses[kind].slice(1).forEach((next) => {
      timeline.to(pose, { ...next, duration: 1, ease: "sine.inOut" });
    });
    return { pose, timeline };
  }, [kind]);
  useEffect(() => () => { choreography.timeline.kill(); }, [choreography]);
  const viewport = useThree((state) => state.viewport);
  useFrame(() => {
    if (!group.current) return;
    choreography.timeline.progress(progress.current);
    const { x, y, rx, ry, rz, scale } = choreography.pose;
    // Fit the same composition into a portrait viewport without cropping the silhouette.
    const fit = Math.min(1, viewport.width / 4.4);
    group.current.rotation.set(rx, ry, rz);
    group.current.position.set(x * fit, y * fit, 0);
    group.current.scale.setScalar(scale * fit);
  });
  return (
    <group ref={group}>
      <primitive object={normalized} dispose={null} />
    </group>
  );
}
export default function ModelViewer({
  kind,
  progress,
  registerInvalidate,
  onReady,
  onError,
}: {
  kind: ModelKind;
  progress: RefObject<number>;
  registerInvalidate: (fn: () => void) => void;
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <SceneBoundary onError={onError}>
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute(
            "aria-label",
            `${kind === "astro" ? "AstroMech" : kind === "ark" ? "Ark 11" : "Amethyst cluster"} 3D model. Scroll through the section to explore all angles.`,
          );
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={3.2}
          color="#ffead4"
        />
        <directionalLight position={[-4, 1, 2]} intensity={2} color="#79e9f0" />
        <directionalLight position={[0, 2, -4]} intensity={4} color="#ff7259" />
        <Suspense fallback={null}>
          <Environment resolution={128}>
            <Lightformer
              position={[0, 5, -3]}
              scale={[10, 5, 1]}
              intensity={2}
              color="#ffffff"
            />
            <Lightformer
              position={[-5, 0, 3]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[5, 5, 1]}
              intensity={3}
              color="#64b8c3"
            />
            <Lightformer
              position={[5, 2, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[5, 8, 1]}
              intensity={3}
              color="#ffd4a0"
            />
          </Environment>
          <Model
            kind={kind}
            progress={progress}
            registerInvalidate={registerInvalidate}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>
    </SceneBoundary>
  );
}
