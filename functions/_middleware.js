// 301 de los dominios antiguos al definitivo, conservando ruta y query.
// (No toca *.pages.dev para no romper los previews.)
const NEW_HOST = 'iamastery.store';
const OLD_HOSTS = new Set([
  'iamastery.creatorclub.store',
  'www.iamastery.store',
]);

export const onRequest = (context) => {
  const url = new URL(context.request.url);
  if (OLD_HOSTS.has(url.hostname)) {
    url.protocol = 'https:';
    url.hostname = NEW_HOST;
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
};
