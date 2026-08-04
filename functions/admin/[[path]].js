// Sanity Studio es una SPA: cualquier /admin/... sirve /admin/index.html.
// (En Cloudflare Pages la regla `200` con splat de _redirects se ignora.)
export const onRequest = ({ request, env }) =>
  env.ASSETS.fetch(new URL('/admin/index.html', request.url));
