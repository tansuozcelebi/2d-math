import React, { useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import { APP_VERSION } from '../config/version';
import ShapeCard from '../components/ShapeCard';

const CARD_WIDTH = 400;
const CARD_HEIGHT = 500;
const CARD_GAP = 20;

const createLayouts = (shapeList) => shapeList.reduce((acc, shape, index) => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  acc[shape.id] = {
    x: col * (CARD_WIDTH + CARD_GAP),
    y: row * (CARD_HEIGHT + CARD_GAP),
    w: CARD_WIDTH,
    h: CARD_HEIGHT
  };
  return acc;
}, {});

export default function Home() {
  const [maximizedCard, setMaximizedCard] = useState(null);
  const { t } = useLanguage();
  const safeT = t || { shapes: {}, home: { title: 'Shapes', subtitle: '', size: 'Size', px: 'px' }, buttons: { showFormula: 'Show', hideFormula: 'Hide' } };
  const shapes = useMemo(() => {
    const baseShapes = [
      {
        title: safeT.shapes.rose || 'Rose',
        type: 'rose',
        params: { n: 5, d: 1, size: 135 },
        id: 'rose1'
      },
      {
        title: safeT.shapes.spiral || 'Spiral',
        type: 'spiral',
        params: { turns: 3, size: 125, lines: 12 },
        id: 'spiral'
      },
      {
        title: safeT.shapes.lissajous || 'Lissajous',
        type: 'lissajous',
        params: { a: 3, b: 4, delta: Math.PI / 2, size: 125 },
        id: 'lissajous'
      },
      {
        title: safeT.shapes.polygon || 'Rotating Polygon',
        type: 'polygon',
        params: { sides: 6, layers: 12, size: 135 },
        id: 'polygon'
      },
      {
        title: safeT.shapes.triangle || 'Layered Triangle',
        type: 'triangleSpiral',
        params: { layers: 15, size: 135, twist: 2 },
        id: 'triangle'
      },
      {
        title: safeT.shapes.superellipse || 'Superellipse',
        type: 'superellipse',
        params: { n1: 4, n2: 2.5, n3: 2.5, size: 135 },
        id: 'superellipse'
      },
      {
        title: safeT.shapes.rose2 || 'Rose (alt)',
        type: 'rose',
        params: { n: 7, d: 3, size: 135 },
        id: 'rose2'
      },
      {
        title: safeT.shapes.rose3 || 'Rose (alt 2)',
        type: 'rose',
        params: { n: 11, d: 4, size: 135 },
        id: 'rose3'
      },
      {
        title: safeT.shapes.polygon2 || 'Rotating Polygon (8)',
        type: 'polygon2',
        params: { sides: 8, layers: 10, size: 135 },
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
        params: { a: 140 },
        paramMeta: { a: { min: 20, max: 200, step: 1, label: 'a' } },
        id: 'lemniscate'
      },
      {
        title: 'Astroid',
        type: 'astroid',
        params: { a: 150 },
        paramMeta: { a: { min: 20, max: 200, step: 1, label: 'a' } },
        id: 'astroid'
      },
      {
        title: 'Deltoid',
        type: 'deltoid',
        params: { a: 60 },
        paramMeta: { a: { min: 10, max: 120, step: 1, label: 'a' } },
        id: 'deltoid'
      },
      {
        title: 'Cardioid',
        type: 'cardioid',
        params: { a: 110 },
        paramMeta: { a: { min: 10, max: 200, step: 1, label: 'a' } },
        id: 'cardioid'
      },
      {
        title: 'Nephroid',
        type: 'nephroid',
        params: { a: 120 },
        paramMeta: { a: { min: 10, max: 200, step: 1, label: 'a' } },
        id: 'nephroid'
      },
      {
        title: 'Cycloid',
        type: 'cycloid',
        params: { r: 55, turns: 6 },
        paramMeta: {
          r: { min: 10, max: 120, step: 1, label: 'r' },
          turns: { min: 1, max: 20, step: 1, label: 'turns' }
        },
        id: 'cycloid'
      },
      {
        title: 'Epicycloid',
        type: 'epicycloid',
        params: { r: 35, k: 4 },
        paramMeta: {
          r: { min: 10, max: 120, step: 1, label: 'r' },
          k: { min: 1, max: 12, step: 1, label: 'k' }
        },
        id: 'epicycloid'
      },
      {
        title: 'Hypocycloid',
        type: 'hypocycloid',
        params: { r: 45, k: 5 },
        paramMeta: {
          r: { min: 10, max: 120, step: 1, label: 'r' },
          k: { min: 2, max: 12, step: 1, label: 'k' }
        },
        id: 'hypocycloid'
      },
      {
        title: 'Superformula',
        type: 'superformula',
        params: { m: 7, a: 1, b: 1, n1: 0.6, n2: 1.7, n3: 1.7 },
        paramMeta: {
          m: { min: 0, max: 20, step: 1, label: 'm' },
          a: { min: 0.1, max: 2, step: 0.01, label: 'a' },
          b: { min: 0.1, max: 2, step: 0.01, label: 'b' },
          n1: { min: 0.1, max: 10, step: 0.01, label: 'n1' },
          n2: { min: 0.1, max: 10, step: 0.01, label: 'n2' },
          n3: { min: 0.1, max: 10, step: 0.01, label: 'n3' }
        },
        id: 'superformula-advanced'
      },
      {
        title: 'Wave Circle',
        type: 'wave_circle',
        params: { a: 120, b: 35, k: 12 },
        paramMeta: {
          a: { min: 10, max: 200, step: 1, label: 'a' },
          b: { min: 0, max: 120, step: 1, label: 'b' },
          k: { min: 1, max: 40, step: 1, label: 'k' }
        },
        id: 'wave_circle'
      },
      {
        title: 'Moiré (Polar)',
        type: 'moire_polar',
        params: { a: 75, b: 55, k: 17, m: 19 },
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
      }
    ];

    return [...baseShapes, ...advancedShapes];
  }, [t]);

  const [layouts, setLayouts] = useState(() => createLayouts(shapes));

  const handleMaximize = useCallback((id) => {
    const element = document.querySelector(`[data-card-id="${id}"]`);
    if (element) {
      if (maximizedCard === id) {
        gsap.to(element, {
          inset: 'auto',
          width: layouts[id].w,
          height: layouts[id].h,
          duration: 0.5,
          ease: 'back.out',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
        });
      } else {
        gsap.to(element, {
          inset: '1rem',
          width: 'auto',
          height: 'auto',
          duration: 0.5,
          ease: 'back.out',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
        });
      }
    }
    setMaximizedCard(maximizedCard === id ? null : id);
  }, [maximizedCard, layouts]);

  const handleCardResize = (id, deltaX, deltaY) => {
    setLayouts(prev => {
      const newLayout = {
        ...prev,
        [id]: {
          ...prev[id],
          w: Math.max(300, prev[id].w + deltaX),
          h: Math.max(300, prev[id].h + deltaY)
        }
      };
      
      const element = document.querySelector(`[data-card-id="${id}"]`);
      if (element) {
        gsap.to(element, {
          width: newLayout[id].w,
          height: newLayout[id].h,
          duration: 0.1,
          overwrite: 'auto'
        });
      }
      
      return newLayout;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 overflow-auto">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-full">
        <div className="text-center mb-8 sticky top-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {safeT.home?.title || 'Parametric 2D Shape Generator'}
          </h1>
          <p className="text-blue-200 text-lg">
            {safeT.home?.subtitle || ''}
          </p>
        </div>

        <div className="relative" style={{ height: 'auto', minHeight: '100vh' }}>
          {shapes.map((shape) => {
            if (maximizedCard === shape.id) return null;
            
            const layout = layouts[shape.id] || { x: 0, y: 0, w: CARD_WIDTH, h: CARD_HEIGHT };
            return (
              <div
                key={shape.id}
                className="absolute transition-all"
                id={shape.id}
                style={{
                  left: `${layout.x}px`,
                  top: `${layout.y}px`,
                  width: `${layout.w}px`,
                  height: `${layout.h}px`,
                  zIndex: maximizedCard === shape.id ? 50 : 10,
                }}
              >
                <ShapeCard
                  title={shape.title}
                  shapeType={shape.type}
                  defaultParams={shape.params}
                  paramMeta={shape.paramMeta}
                  isMaximized={false}
                  onMaximize={() => handleMaximize(shape.id)}
                  onResize={(dx, dy) => handleCardResize(shape.id, dx, dy)}
                  style={{ position: 'relative' }}
                  id={shape.id}
                />
              </div>
            );
          })}

          {maximizedCard && (
            <div className="fixed inset-0 z-50 p-4 bg-black/50">
              {shapes.map((shape) => (
                maximizedCard === shape.id && (
                  <div key={shape.id} className="w-full h-full">
                    <ShapeCard
                      title={shape.title}
                      shapeType={shape.type}
                      defaultParams={shape.params}
                      paramMeta={shape.paramMeta}
                      isMaximized={true}
                      onMaximize={() => handleMaximize(shape.id)}
                    />
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-blue-300 text-sm">
          <p>{safeT.home?.footer || ''}</p>
          <p className="mt-2 text-blue-400/60 text-xs">v{APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
}
