// Personnages des illustrations : un petit « squelette » (articulations) dessiné en aplats.
// Toutes les silhouettes partent des mêmes proportions d'adulte, ce qui les garde cohérentes :
// pour une hauteur debout H = 150 × s, tête ≈ 1/7 H, bras jusqu'à mi-cuisse, jambes ≈ 1/2 H.
// On place les articulations (souvent à partir de standing()), figure() génère les formes.

export type P = [number, number];
export type El = { tag: 'path' | 'circle' | 'ellipse'; a: Record<string, string | number> };

export type Pose = {
  view: 'front' | 'back' | 'side';
  dir?: 1 | -1; // vue de profil : 1 = regarde à droite, -1 = à gauche
  s: number; // échelle (1 = 150 px debout)
  head: P;
  neck: P;
  shL: P; shR: P; // épaules (de profil : arrière / avant du buste)
  elL: P; elR: P;
  wrL: P; wrR: P;
  hipL: P; hipR: P;
  knL: P; knR: P;
  anL: P; anR: P;
  tilt?: number; // inclinaison de la tête, en degrés
  hair?: 'bun' | 'long';
  hide?: { legs?: boolean; head?: boolean; armL?: boolean; armR?: boolean };
  colors: { top: string; bottom: string; skin: string; hair: string; shoes: string };
};

const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const len = (v: P) => Math.hypot(v[0], v[1]) || 1;
const unit = (v: P): P => [v[0] / len(v), v[1] / len(v)];
const mul = (v: P, k: number): P => [v[0] * k, v[1] * k];
const pt = (p: P) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

const stroke = (pts: P[], w: number, color: string): El => ({
  tag: 'path',
  a: { d: 'M' + pts.map(pt).join('L'), stroke: color, 'stroke-width': w.toFixed(1), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' },
});

/** Pose debout de face (ou de dos) : point de départ que l'on modifie ensuite */
export function standing(x: number, top: number, s: number, view: 'front' | 'back' = 'front'): Omit<Pose, 'colors'> {
  const y = (k: number) => top + k * s;
  const X = (k: number) => x + k * s;
  return {
    view,
    s,
    head: [x, y(11.5)],
    neck: [x, y(24)],
    shL: [X(-17), y(29)], shR: [X(17), y(29)],
    elL: [X(-19.5), y(56)], elR: [X(19.5), y(56)],
    wrL: [X(-19.5), y(80)], wrR: [X(19.5), y(80)],
    hipL: [X(-8.5), y(76)], hipR: [X(8.5), y(76)],
    knL: [X(-8), y(111)], knR: [X(8), y(111)],
    anL: [X(-8), y(145)], anR: [X(8), y(145)],
  };
}

export function figure(p: Pose): El[] {
  const { s, colors: c } = p;
  const dir = p.dir ?? 1;
  const out: El[] = [];

  const arm = (sh: P, el: P, wr: P) => {
    out.push(stroke([sh, el, wr], 8.4 * s, c.top));
    out.push({ tag: 'circle', a: { cx: add(wr, mul(unit(sub(wr, el)), 3 * s))[0], cy: add(wr, mul(unit(sub(wr, el)), 3 * s))[1], r: (4.5 * s).toFixed(1), fill: c.skin } });
  };
  const leg = (hip: P, kn: P, an: P, footDir: number) => {
    out.push(stroke([hip, kn], 12.6 * s, c.bottom));
    out.push(stroke([kn, an], 10.6 * s, c.bottom));
    out.push({ tag: 'ellipse', a: { cx: (an[0] + footDir * 4.5 * s).toFixed(1), cy: (an[1] + 2.5 * s).toFixed(1), rx: (7.6 * s).toFixed(1), ry: (3.9 * s).toFixed(1), fill: c.shoes } });
  };
  const footDir = p.view === 'side' ? dir : 0;

  // 1. bras et jambe « du fond » (de profil : côté L)
  if (p.view === 'side' && !p.hide?.armL) arm(midPt(p.shL, p.shR), p.elL, p.wrL);
  if (!p.hide?.legs) {
    // bassin
    out.push(stroke([p.hipL, p.hipR], 13 * s, c.bottom));
    // de profil, les deux jambes partent du milieu de la hanche
    const hm = midPt(p.hipL, p.hipR);
    const legL: P = p.view === 'side' ? [hm[0] - dir * 2 * s, hm[1] - 2] : p.hipL;
    const legR: P = p.view === 'side' ? [hm[0] + dir * 2 * s, hm[1] - 2] : p.hipR;
    leg(legL, p.knL, p.anL, footDir);
    leg(legR, p.knR, p.anR, footDir);
  }

  // 2. cou puis buste
  if (!p.hide?.head) out.push(stroke([p.neck, add(p.head, [0, 7 * s])], 7 * s, c.skin));
  const hl = add(p.hipL, [p.view === 'side' ? 0 : -2 * s, 0]);
  const hr = add(p.hipR, [p.view === 'side' ? 0 : 2 * s, 0]);
  const torso = `M${pt(p.shL)}C${pt(add(p.shL, [0, -3 * s]))} ${pt(add(p.shR, [0, -3 * s]))} ${pt(p.shR)}L${pt(hr)}L${pt(hl)}Z`;
  out.push({ tag: 'path', a: { d: torso, fill: c.top, stroke: c.top, 'stroke-width': (7 * s).toFixed(1), 'stroke-linejoin': 'round' } });

  // 3. bras de devant
  if (p.view === 'side') {
    if (!p.hide?.armR) arm(midPt(p.shL, p.shR), p.elR, p.wrR);
  } else {
    if (!p.hide?.armL) arm(p.shL, p.elL, p.wrL);
    if (!p.hide?.armR) arm(p.shR, p.elR, p.wrR);
  }

  // 4. tête et cheveux
  if (!p.hide?.head) {
    const t = p.tilt ? `rotate(${p.tilt} ${pt(p.head)})` : undefined;
    const [hx, hy] = p.head;
    const el = (tag: El['tag'], a: El['a']) => out.push({ tag, a: t ? { ...a, transform: t } : a });
    if (p.hair === 'long') {
      const back = p.view === 'side' ? -dir * 4 * s : 0;
      el('path', { d: `M${hx - 10 * s + back} ${hy}V${hy + 20 * s}Q${hx + back} ${hy + 25 * s} ${hx + 10 * s + back} ${hy + 20 * s}V${hy}Z`, fill: c.hair });
    }
    if (p.view === 'front') {
      if (p.hair !== 'long') el('circle', { cx: hx, cy: hy - 12.5 * s, r: 5.6 * s, fill: c.hair });
      el('ellipse', { cx: hx, cy: hy - 2.2 * s, rx: 10.6 * s, ry: 10.4 * s, fill: c.hair });
      el('ellipse', { cx: hx, cy: hy + 1.6 * s, rx: 8.8 * s, ry: 10.2 * s, fill: c.skin });
    } else if (p.view === 'back') {
      el('ellipse', { cx: hx - 10.2 * s, cy: hy + 1 * s, rx: 2.2 * s, ry: 3.2 * s, fill: c.skin });
      el('ellipse', { cx: hx + 10.2 * s, cy: hy + 1 * s, rx: 2.2 * s, ry: 3.2 * s, fill: c.skin });
      if (p.hair !== 'long') el('circle', { cx: hx, cy: hy - 12.5 * s, r: 5.8 * s, fill: c.hair });
      el('ellipse', { cx: hx, cy: hy, rx: 10.4 * s, ry: 11.6 * s, fill: c.hair });
    } else {
      if (p.hair !== 'long') el('circle', { cx: hx - dir * 9.5 * s, cy: hy - 6 * s, r: 5.4 * s, fill: c.hair });
      el('ellipse', { cx: hx - dir * 1.5 * s, cy: hy - 1 * s, rx: 10.2 * s, ry: 11.2 * s, fill: c.hair });
      el('ellipse', { cx: hx + dir * 2.4 * s, cy: hy + 2 * s, rx: 8.2 * s, ry: 9.8 * s, fill: c.skin });
      // nez discret
      el('path', { d: `M${hx + dir * 10.2 * s} ${hy + 1 * s}l${dir * 2.2 * s} ${3 * s}l${-dir * 2.4 * s} ${0.6 * s}Z`, fill: c.skin });
    }
  }
  return out;
}

function midPt(a: P, b: P): P {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 2];
}
