// Shared shape definitions so Navbar and Home stay in sync
export const buildShapes = (safeT) => {
  const names = (safeT && safeT.shapes) || {};

  const baseShapes = [
    {
      title: names.rose || 'Rose',
      type: 'rose',
      params: { n: 5, d: 1, size: 135 },
      paramMeta: {
        n: { min: 1, max: 20, step: 1, label: 'n' },
        d: { min: 1, max: 10, step: 1, label: 'd' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'rose1'
    },
    {
      title: names.spiral || 'Spiral',
      type: 'spiral',
      params: { turns: 3, size: 125, lines: 12 },
      paramMeta: {
        turns: { min: 1, max: 10, step: 1, label: 'turns' },
        size: { min: 50, max: 145, step: 1, label: 'size' },
        lines: { min: 1, max: 20, step: 1, label: 'lines' }
      },
      id: 'spiral'
    },
    {
      title: names.lissajous || 'Lissajous',
      type: 'lissajous',
      params: { a: 3, b: 4, delta: Math.PI / 2, size: 125 },
      paramMeta: {
        a: { min: 1, max: 10, step: 1, label: 'a' },
        b: { min: 1, max: 10, step: 1, label: 'b' },
        delta: { min: 0, max: Math.PI * 2, step: 0.1, label: 'δ' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'lissajous'
    },
    {
      title: names.polygon || 'Rotating Polygon',
      type: 'polygon',
      params: { sides: 6, layers: 12, size: 135 },
      paramMeta: {
        sides: { min: 3, max: 12, step: 1, label: 'sides' },
        layers: { min: 1, max: 20, step: 1, label: 'layers' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'polygon'
    },
    {
      title: names.triangle || 'Layered Triangle',
      type: 'triangleSpiral',
      params: { layers: 15, size: 135, twist: 2 },
      paramMeta: {
        layers: { min: 1, max: 25, step: 1, label: 'layers' },
        size: { min: 50, max: 145, step: 1, label: 'size' },
        twist: { min: 0, max: 5, step: 0.1, label: 'twist' }
      },
      id: 'triangle'
    },
    {
      title: names.superellipse || 'Superellipse',
      type: 'superellipse',
      params: { n1: 4, n2: 2.5, n3: 2.5, size: 135 },
      paramMeta: {
        n1: { min: 1, max: 10, step: 0.1, label: 'n1' },
        n2: { min: 0.5, max: 5, step: 0.1, label: 'n2' },
        n3: { min: 0.5, max: 5, step: 0.1, label: 'n3' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'superellipse'
    },
    {
      title: names.rose2 || 'Rose (alt)',
      type: 'rose',
      params: { n: 7, d: 3, size: 135 },
      paramMeta: {
        n: { min: 1, max: 20, step: 1, label: 'n' },
        d: { min: 1, max: 10, step: 1, label: 'd' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'rose2'
    },
    {
      title: names.rose3 || 'Rose (alt 2)',
      type: 'rose',
      params: { n: 11, d: 4, size: 135 },
      paramMeta: {
        n: { min: 1, max: 20, step: 1, label: 'n' },
        d: { min: 1, max: 10, step: 1, label: 'd' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'rose3'
    },
    {
      title: names.polygon2 || 'Rotating Polygon (8)',
      type: 'polygon2',
      params: { sides: 8, layers: 10, size: 135 },
      paramMeta: {
        sides: { min: 3, max: 12, step: 1, label: 'sides' },
        layers: { min: 1, max: 20, step: 1, label: 'layers' },
        size: { min: 50, max: 145, step: 1, label: 'size' }
      },
      id: 'polygon2'
    }
  ];

  const advancedShapes = [
    {
      title: 'Lissajous (Pro)',
      type: 'lissajousPro',
      params: { A: 140, B: 140, a: 3, b: 2, delta: 0.7 },
      paramMeta: {
        A: { min: 10, max: 200, step: 1, label: 'A' },
        B: { min: 10, max: 200, step: 1, label: 'B' },
        a: { min: 1, max: 15, step: 1, label: 'a' },
        b: { min: 1, max: 15, step: 1, label: 'b' },
        delta: { min: 0, max: Math.PI * 2, step: 0.01, label: 'δ (rad)' }
      },
      id: 'lissajousPro'
    },
    {
      title: 'Hypotrochoid',
      type: 'hypotrochoid',
      params: { R: 140, r: 45, d: 85 },
      paramMeta: {
        R: { min: 20, max: 200, step: 1, label: 'R' },
        r: { min: 5, max: 180, step: 1, label: 'r' },
        d: { min: 0, max: 200, step: 1, label: 'd' }
      },
      id: 'hypotrochoid'
    },
    {
      title: 'Epitrochoid',
      type: 'epitrochoid',
      params: { R: 110, r: 45, d: 90 },
      paramMeta: {
        R: { min: 20, max: 200, step: 1, label: 'R' },
        r: { min: 5, max: 180, step: 1, label: 'r' },
        d: { min: 0, max: 200, step: 1, label: 'd' }
      },
      id: 'epitrochoid'
    },
    {
      title: 'Archimedean Spiral',
      type: 'arch_spiral',
      params: { a: 0, b: 6, turns: 10 },
      paramMeta: {
        a: { min: 0, max: 200, step: 1, label: 'a' },
        b: { min: 0.5, max: 20, step: 0.1, label: 'b' },
        turns: { min: 1, max: 30, step: 1, label: 'turns' }
      },
      id: 'arch_spiral'
    },
    {
      title: 'Log Spiral',
      type: 'log_spiral',
      params: { a: 3, b: 0.08, turns: 9 },
      paramMeta: {
        a: { min: 1, max: 50, step: 1, label: 'a' },
        b: { min: 0.01, max: 0.25, step: 0.01, label: 'b' },
        turns: { min: 1, max: 20, step: 1, label: 'turns' }
      },
      id: 'log_spiral'
    },
    {
      title: 'Fermat Spiral',
      type: 'fermat_spiral',
      params: { scale: 18, turns: 18 },
      paramMeta: {
        scale: { min: 2, max: 50, step: 1, label: 'scale' },
        turns: { min: 1, max: 40, step: 1, label: 'turns' }
      },
      id: 'fermat_spiral'
    },
    {
      title: 'Lemniscate (∞)',
      type: 'lemniscate',
      params: { a: 140, b: 1 },
      paramMeta: { 
        a: { min: 20, max: 200, step: 1, label: 'a' },
        b: { min: 0.5, max: 2, step: 0.1, label: 'b' }
      },
      id: 'lemniscate'
    },
    {
      title: 'Astroid',
      type: 'astroid',
      params: { a: 150, n: 3 },
      paramMeta: { 
        a: { min: 20, max: 200, step: 1, label: 'a' },
        n: { min: 2, max: 10, step: 0.5, label: 'n' }
      },
      id: 'astroid'
    },
    {
      title: 'Deltoid',
      type: 'deltoid',
      params: { a: 60, k: 3 },
      paramMeta: { 
        a: { min: 10, max: 120, step: 1, label: 'a' },
        k: { min: 2, max: 8, step: 1, label: 'k' }
      },
      id: 'deltoid'
    },
    {
      title: 'Cardioid',
      type: 'cardioid',
      params: { a: 110, offset: 1 },
      paramMeta: { 
        a: { min: 10, max: 200, step: 1, label: 'a' },
        offset: { min: 0.5, max: 2, step: 0.1, label: 'offset' }
      },
      id: 'cardioid'
    },
    {
      title: 'Nephroid',
      type: 'nephroid',
      params: { a: 120, offset: 1 },
      paramMeta: { 
        a: { min: 10, max: 200, step: 1, label: 'a' },
        offset: { min: 0.5, max: 2, step: 0.1, label: 'offset' }
      },
      id: 'nephroid'
    },
    {
      title: 'Cycloid',
      type: 'cycloid',
      params: { r: 55, turns: 6 },
      paramMeta: {
        r: { min: 5, max: 100, step: 1, label: 'r' },
        turns: { min: 1, max: 15, step: 1, label: 'turns' }
      },
      id: 'cycloid'
    },
    {
      title: 'Epicycloid',
      type: 'epicycloid',
      params: { r: 35, k: 4 },
      paramMeta: {
        r: { min: 5, max: 120, step: 1, label: 'r' },
        k: { min: 2, max: 20, step: 1, label: 'k' }
      },
      id: 'epicycloid'
    },
    {
      title: 'Hypocycloid',
      type: 'hypocycloid',
      params: { r: 40, k: 7 },
      paramMeta: {
        r: { min: 5, max: 120, step: 1, label: 'r' },
        k: { min: 2, max: 20, step: 1, label: 'k' }
      },
      id: 'hypocycloid'
    },
    {
      title: 'Superformula',
      type: 'superformula-advanced',
      params: { m: 7, a: 1, b: 1, n1: 0.3, n2: 0.3, n3: 0.3 },
      paramMeta: {
        m: { min: 0, max: 20, step: 1, label: 'm' },
        a: { min: 0.1, max: 5, step: 0.1, label: 'a' },
        b: { min: 0.1, max: 5, step: 0.1, label: 'b' },
        n1: { min: 0.1, max: 5, step: 0.1, label: 'n1' },
        n2: { min: 0.1, max: 5, step: 0.1, label: 'n2' },
        n3: { min: 0.1, max: 5, step: 0.1, label: 'n3' }
      },
      id: 'superformula-advanced'
    },
    {
      title: 'Wave Circle',
      type: 'wave_circle',
      params: { a: 120, b: 18, k: 12 },
      paramMeta: {
        a: { min: 10, max: 200, step: 1, label: 'a' },
        b: { min: 0, max: 150, step: 1, label: 'b' },
        k: { min: 1, max: 40, step: 1, label: 'k' }
      },
      id: 'wave_circle'
    },
    {
      title: 'Moiré (Polar)',
      type: 'moire_polar',
      params: { a: 80, b: 60, k: 9, m: 14 },
      paramMeta: {
        a: { min: 0, max: 150, step: 1, label: 'a' },
        b: { min: 0, max: 150, step: 1, label: 'b' },
        k: { min: 1, max: 40, step: 1, label: 'k' },
        m: { min: 1, max: 40, step: 1, label: 'm' }
      },
      id: 'moire_polar'
    },
    {
      title: 'Polygon Morph (Polar)',
      type: 'polygon_polar',
      params: { n: 7, morph: 0.25 },
      paramMeta: {
        n: { min: 3, max: 20, step: 1, label: 'n' },
        morph: { min: 0, max: 1, step: 0.01, label: 'morph' }
      },
      id: 'polygon_polar'
    },
    {
      title: 'Parametric Noise',
      type: 'param_noise',
      params: { r: 120, eps: 25, n: 13, m: 17 },
      paramMeta: {
        r: { min: 10, max: 200, step: 1, label: 'r' },
        eps: { min: 0, max: 100, step: 1, label: 'ε' },
        n: { min: 1, max: 40, step: 1, label: 'n' },
        m: { min: 1, max: 40, step: 1, label: 'm' }
      },
      id: 'param_noise'
    },
    {
      title: 'Rose Combo',
      type: 'rose_combo',
      params: { a: 120, b: 40, k: 7, m: 11 },
      paramMeta: {
        a: { min: 0, max: 200, step: 1, label: 'a' },
        b: { min: 0, max: 200, step: 1, label: 'b' },
        k: { min: 1, max: 30, step: 1, label: 'k' },
        m: { min: 1, max: 30, step: 1, label: 'm' }
      },
      id: 'rose_combo'
    },
    {
      title: 'Trefoil Knot',
      type: 'trefoil',
      params: { a: 35, b: 70, n: 2 },
      paramMeta: {
        a: { min: 10, max: 100, step: 1, label: 'a' },
        b: { min: 10, max: 150, step: 1, label: 'b' },
        n: { min: 1, max: 15, step: 1, label: 'n' }
      },
      id: 'trefoil'
    }
  ];

  return [...baseShapes, ...advancedShapes];
};
