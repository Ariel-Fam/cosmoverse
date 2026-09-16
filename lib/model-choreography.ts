/** Art-directed poses, in radians, on the chapter's shared 0–1 scroll clock. */
export type ModelKind = 'astro' | 'ark' | 'crystal';
export type ModelPose = { x: number; y: number; rx: number; ry: number; rz: number; scale: number };
export const modelPoses: Record<ModelKind, readonly ModelPose[]> = {
  astro: [
    { x: 0, y: -.06, rx: .04, ry: -.5, rz: -.04, scale: .88 },
    { x: .14, y: -.68, rx: .08, ry: .3, rz: .04, scale: 1.5 },
    { x: -.12, y: -.12, rx: -.06, ry: 3.65, rz: -.08, scale: 1.04 },
    { x: 0, y: -.02, rx: .02, ry: 5.9, rz: 0, scale: .94 },
  ],
  ark: [
    { x: -.12, y: .06, rx: .45, ry: -.65, rz: -.18, scale: .93 },
    { x: .18, y: -.04, rx: 1.08, ry: .28, rz: .28, scale: 1.2 },
    { x: -.12, y: .12, rx: .32, ry: 2.55, rz: -.22, scale: 1.13 },
    { x: .12, y: .15, rx: .38, ry: 5.5, rz: -.12, scale: .9 },
  ],
  crystal: [
    { x: 0, y: -.04, rx: .12, ry: -.45, rz: -.12, scale: .78 },
    { x: .1, y: -.2, rx: -.18, ry: 1.1, rz: .15, scale: 1.17 },
    { x: -.12, y: .12, rx: .4, ry: 3.5, rz: -.16, scale: .96 },
    { x: 0, y: 0, rx: .12, ry: 5.85, rz: 0, scale: .83 },
  ],
};
