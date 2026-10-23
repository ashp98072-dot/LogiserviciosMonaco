import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function copySiteDataPlugin(): Plugin {
  const rootFile = path.resolve(__dirname, 'site-data.json');

  return {
    name: 'copy-site-data',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/site-data.json') return next();
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          res.statusCode = 405;
          res.setHeader('Allow', 'GET, HEAD');
          return res.end();
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(rootFile));
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'site-data.json', source: fs.readFileSync(rootFile) });
    },
  };
}

function copyPublicAssetsPlugin(): Plugin {
  const assetsDir = path.resolve(__dirname, 'src/assets');
  const publicDir = path.resolve(__dirname, 'public');

  const copyIfExists = (src: string, dest: string) => {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  };

  const syncPublicAssets = () => {
    copyIfExists(path.join(assetsDir, 'logo.png'), path.join(publicDir, 'logo.png'));
    copyIfExists(path.join(assetsDir, 'favicon.png'), path.join(publicDir, 'favicon.png'));
    copyIfExists(path.join(assetsDir, 'favicon.png'), path.join(publicDir, 'favicon.ico'));
    copyIfExists(path.join(assetsDir, 'favicon.png'), path.join(publicDir, 'apple-touch-icon.png'));
    copyIfExists(path.join(assetsDir, 'logo_1.png'), path.join(publicDir, 'branding/hero.png'));
    copyIfExists(path.join(assetsDir, 'warehouse.jpg'), path.join(publicDir, 'branding/warehouse.jpg'));
    copyIfExists(path.join(assetsDir, 'guatemala-map.jpg'), path.join(publicDir, 'branding/guatemala-map.jpg'));
    copyIfExists(path.join(assetsDir, 'cabezales.png'), path.join(publicDir, 'fleet/cabezales.png'));
    copyIfExists(path.join(assetsDir, 'Unidades de 12 Ton.png'), path.join(publicDir, 'fleet/unidades-12ton.png'));
    copyIfExists(path.join(assetsDir, 'Unidades de 5 Ton.png'), path.join(publicDir, 'fleet/unidades-5ton.png'));
    copyIfExists(path.join(assetsDir, 'Unidades de 2.7 Ton.png'), path.join(publicDir, 'fleet/unidades-2.7ton.png'));
    copyIfExists(path.join(assetsDir, 'Panel 1.5 Ton.png'), path.join(publicDir, 'fleet/panel-1.5ton.png'));
    copyIfExists(path.join(assetsDir, 'Panele 1 Ton .png'), path.join(publicDir, 'fleet/panele-1ton.png'));
    copyIfExists(path.join(assetsDir, 'piloto cabezales.jpeg'), path.join(publicDir, 'vacancies/piloto-cabezales.jpeg'));
    copyIfExists(path.join(assetsDir, 'piloto 5 ton.jpeg'), path.join(publicDir, 'vacancies/piloto-5-ton.jpeg'));
    copyIfExists(path.join(assetsDir, 'piloto 10 ton.jpeg'), path.join(publicDir, 'vacancies/piloto-10-ton.jpeg'));
  };

  return {
    name: 'copy-public-assets',
    buildStart: syncPublicAssets,
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyPublicAssetsPlugin(), copySiteDataPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
