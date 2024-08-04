import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    plugins: [
      injectHTML({
        // Aktualizacja opcji dla injectHTML
        order: 'pre', // Użyj 'order' zamiast 'enforce'
        handler: (html, { fileName }) => {
          // Twoja logika transformacji HTML
          return html;
        },
      }),
      FullReload(['./src/**/**.html']),
    ],
    optimizeDeps: {
      include: [
        // Ręczne określenie zależności do pre-bundlingu
        'axios',
        'vite-plugin-full-reload',
      ],
    },
  };
});
