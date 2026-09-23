import { useState, useEffect } from 'react';

/**
 * Global WebGL Spline Scene Manager
 * Ensures maximum active WebGL context limit is respected (max 1 on mobile, 2 on desktop).
 * Pauses background/out-of-view 3D canvases and handles tab-visibility pause.
 */
class SceneRegistry {
  constructor() {
    this.activeScenes = new Set();
    this.listeners = new Set();
    this.maxConcurrent = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;
    this.isTabVisible = typeof document !== 'undefined' ? !document.hidden : true;

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        this.maxConcurrent = window.innerWidth < 768 ? 1 : 2;
        this.notify();
      });

      document.addEventListener('visibilitychange', () => {
        this.isTabVisible = !document.hidden;
        this.notify();
      });
    }
  }

  register(sceneId) {
    this.activeScenes.add(sceneId);
    this.notify();
  }

  unregister(sceneId) {
    this.activeScenes.delete(sceneId);
    this.notify();
  }

  canRender(sceneId) {
    if (!this.isTabVisible) return false;
    const activeList = Array.from(this.activeScenes);
    const index = activeList.indexOf(sceneId);
    return index !== -1 && index < this.maxConcurrent;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

const registry = new SceneRegistry();

export function useActiveSceneManager(sceneId, isVisibleInViewport) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisibleInViewport) {
      registry.register(sceneId);
    } else {
      registry.unregister(sceneId);
    }

    return () => {
      registry.unregister(sceneId);
    };
  }, [sceneId, isVisibleInViewport]);

  useEffect(() => {
    const checkStatus = () => {
      setShouldRender(registry.canRender(sceneId));
    };

    checkStatus();
    return registry.subscribe(checkStatus);
  }, [sceneId]);

  return { shouldRender, isTabVisible: registry.isTabVisible };
}
