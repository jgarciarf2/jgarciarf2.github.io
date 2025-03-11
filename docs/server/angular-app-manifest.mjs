
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/jgarciarf2.github.io/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/jgarciarf2.github.io"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 509, hash: '41e34e3cb351705a2c994741633b278f013c297ac948ff8d7d8d63d66e2ff051', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1022, hash: '12caee1c0b839dcca12671b7cfabb206c239d9bfaca4117a81a4deb322816841', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 767, hash: 'c2d18941590a70c1dcf02916b6d4713eea14970f484c857d24fdacce816e1488', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
