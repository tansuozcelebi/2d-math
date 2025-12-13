import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import gsap from 'gsap';
import { useLanguage } from '../hooks/useLanguage';
import { APP_VERSION } from '../config/version';
import ShapeCard from '../components/ShapeCard';
import { buildShapes } from '../config/shapesList';

const CARD_WIDTH = 400;
const CARD_HEIGHT = 500;
const CARD_GAP = 20;

const getColumnsCount = () => {
  const availableWidth = window.innerWidth - 48; // padding
  return Math.max(1, Math.floor(availableWidth / (CARD_WIDTH + CARD_GAP)));
};

const createLayouts = (shapeList) => {
  const cols = getColumnsCount();
  return shapeList.reduce((acc, shape, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    acc[shape.id] = {
      x: col * (CARD_WIDTH + CARD_GAP),
      y: row * (CARD_HEIGHT + CARD_GAP),
      w: CARD_WIDTH,
      h: CARD_HEIGHT
    };
    return acc;
  }, {});
};

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [maximizedCard, setMaximizedCard] = useState(null);
  const { t } = useLanguage();
  const safeT = t || { shapes: {}, home: { title: 'Shapes', subtitle: '', size: 'Size', px: 'px' }, buttons: { showFormula: 'Show', hideFormula: 'Hide' } };
  const shapes = useMemo(() => buildShapes(safeT), [safeT]);
  const [layouts, setLayouts] = useState(() => createLayouts(shapes));

  useEffect(() => {
    const handleResize = () => {
      setLayouts(createLayouts(shapes));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [shapes]);

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
    setLayouts(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        w: Math.max(300, prev[id].w + deltaX),
        h: Math.max(300, prev[id].h + deltaY)
      }
    }));
  };

  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  const getZIndex = (id) => {
    if (maximizedCard === id) return 1000;
    if (activeCard === id) return 100;
    return 10;
  };

  useEffect(() => {
    const focusFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      // Set active and gently scroll card into view
      setActiveCard(hash);
      setMaximizedCard(null);
      const el = document.querySelector(`[data-card-id="${hash}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        // brief highlight via box-shadow bump
        try {
          gsap.fromTo(el, { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 30px 80px rgba(0,0,0,0.6)', duration: 0.3, yoyo: true, repeat: 1 });
        } catch {}
      }
    };

    // Initial load
    focusFromHash();
    // Listen to hash changes
    window.addEventListener('hashchange', focusFromHash);
    return () => window.removeEventListener('hashchange', focusFromHash);
  }, []);

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
              <Rnd
                key={shape.id}
                default={{
                  x: layout.x,
                  y: layout.y,
                  width: layout.w,
                  height: layout.h
                }}
                minWidth={300}
                minHeight={300}
                maxWidth={window.innerWidth - 20}
                maxHeight={window.innerHeight - 20}
                bounds="window"
                dragHandleClassName="card-drag-handle"
                style={{
                  zIndex: getZIndex(shape.id)
                }}
                onDragStart={() => handleCardClick(shape.id)}
                onResizeStart={() => handleCardClick(shape.id)}
                onDrag={(e, d) => {
                  setLayouts(prev => ({
                    ...prev,
                    [shape.id]: { ...prev[shape.id], x: d.x, y: d.y }
                  }));
                }}
                onResize={(e, direction, ref, delta, position) => {
                  setLayouts(prev => ({
                    ...prev,
                    [shape.id]: {
                      ...prev[shape.id],
                      w: parseInt(ref.style.width),
                      h: parseInt(ref.style.height),
                      ...position
                    }
                  }));
                }}
              >
                <div 
                  onClick={() => handleCardClick(shape.id)}
                  className="w-full h-full"
                  style={{
                    boxShadow: activeCard === shape.id 
                      ? '0 20px 60px rgba(0, 0, 0, 0.5)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.25)',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  <ShapeCard
                    title={shape.title}
                    shapeType={shape.type}
                    defaultParams={shape.params}
                    paramMeta={shape.paramMeta}
                    isMaximized={false}
                    onMaximize={() => handleMaximize(shape.id)}
                    cardWidth={layout.w}
                    cardHeight={layout.h}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                    id={shape.id}
                  />
                </div>
              </Rnd>
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
                      cardWidth={window.innerWidth - 32}
                      cardHeight={window.innerHeight - 32}
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
