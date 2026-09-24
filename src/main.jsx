import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



// Intercept Chrome Windows WebGPU powerPreference & GPUValidation console messages
if (typeof window !== 'undefined') {
  if (window.navigator && window.navigator.gpu && typeof window.navigator.gpu.requestAdapter === 'function') {
    try {
      const origRequestAdapter = window.navigator.gpu.requestAdapter.bind(window.navigator.gpu);
      window.navigator.gpu.requestAdapter = async function (options) {
        let cleanOptions = options;
        if (options && typeof options === 'object') {
          const { powerPreference, ...rest } = options;
          cleanOptions = rest;
        }
        const adapter = await origRequestAdapter(cleanOptions);
        if (adapter && typeof adapter.requestDevice === 'function') {
          const origRequestDevice = adapter.requestDevice.bind(adapter);
          adapter.requestDevice = async function (descriptor) {
            const device = await origRequestDevice(descriptor);
            if (device) {
              device.addEventListener('uncapturederror', (e) => {
                const msg = String(e?.error?.message || e?.error || e?.message || '');
                if (msg.includes('ShadowDepthTexture') || msg.includes('Destroyed texture') || msg.includes('renderContext')) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                }
              }, true);
            }
            return device;
          };
        }
        return adapter;
      };
    } catch {
      // Guard for read-only property environments
    }
  }

  const origError = console.error;
  const origWarn = console.warn;

  console.error = function (...args) {
    const text = args.map((a) => (typeof a === 'object' && a !== null ? (a.message || String(a)) : String(a))).join(' ');
    if (
      text.includes('GPUValidationError') ||
      text.includes('ShadowDepthTexture') ||
      text.includes('powerPreference') ||
      text.includes('requestAdapter') ||
      text.includes('WebGPURenderer') ||
      text.includes('Destroyed texture') ||
      text.includes('pipeline') ||
      text.includes('CommandBuffer')
    ) {
      return;
    }
    origError.apply(console, args);
  };

  console.warn = function (...args) {
    const text = args.map((a) => (typeof a === 'object' && a !== null ? (a.message || String(a)) : String(a))).join(' ');
    if (
      text.includes('powerPreference') ||
      text.includes('requestAdapter') ||
      text.includes('WebGPURenderer') ||
      text.includes('Spline Hero scene load issue')
    ) {
      return;
    }
    origWarn.apply(console, args);
  };

  window.addEventListener('error', (e) => {
    const msg = e?.message || e?.error?.message || '';
    if (
      msg.includes('GPUValidationError') ||
      msg.includes('ShadowDepthTexture') ||
      msg.includes('powerPreference') ||
      msg.includes('pipeline') ||
      msg.includes('WebGPURenderer')
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



