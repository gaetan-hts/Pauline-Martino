// Worker Cloudflare devant les fichiers statiques de dist/ (voir wrangler.jsonc).
// Pendant le développement, le navigateur demande un mot de passe (nom d'utilisateur libre)
// avant d'afficher quoi que ce soit, et les moteurs de recherche ne peuvent pas indexer le site.
//
// Mise en ligne publique : Cloudflare → Workers & Pages → pauline-martino → Settings →
// Variables and Secrets → ajouter SITE_PUBLIC = true, puis redéployer.
//
// Mot de passe volontairement en dur (demande de Gaëtan) : il ne protège qu'une préversion.
const PASSWORD = 'Paupau1337';

function isAuthorized(request) {
  const [scheme, encoded] = (request.headers.get('Authorization') || '').split(' ');
  if (scheme !== 'Basic' || !encoded) return false;
  try {
    const decoded = atob(encoded);
    return decoded.slice(decoded.indexOf(':') + 1) === PASSWORD;
  } catch {
    return false;
  }
}

export default {
  async fetch(request, env) {
    if (env.SITE_PUBLIC === 'true') return env.ASSETS.fetch(request);

    if (!isAuthorized(request)) {
      return new Response('Site en préparation : mot de passe requis.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Pauline Martino - preversion", charset="UTF-8"',
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    const response = await env.ASSETS.fetch(request);
    const res = new Response(response.body, response);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  },
};
