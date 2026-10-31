(function (root) {
  'use strict';
  root.CampCore = {
    litDays(lighting, now = Date.now()) {
      const first = Date.parse(lighting?.firstLightAt);
      if (!Number.isFinite(first) || !Number.isFinite(now)) return 0;
      return Math.max(0, Math.min(7, Math.floor((now - first) / 86400000) + 1));
    },
    escape(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
    safeFile(value) { return typeof value === 'string' && /^assets\/[\w\u3400-\u9fff ./()\-]+\.(png|jpe?g|webp|gif|pdf)$/i.test(value) && !value.split('/').includes('..') ? value : ''; },
    previewFile(value) { const path = this.safeFile(value); return /\.(png|jpe?g)$/i.test(path) ? path.replace(/^assets\//, 'assets/optimized/').replace(/\.(png|jpe?g)$/i, '.webp') : path; },
    safeForm(value) { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } },
    clampPage(page, count) { return Math.max(0, Math.min(count - 1, page)); },
    pick(items, random = Math.random) { return items.length ? items[Math.floor(random() * items.length)] : null; },
    mapFile(day) { const d = Math.max(0, Math.min(7, Math.floor(Number(day) || 0))); return `assets/optimized/map-${d}.webp`; }
  };
})(typeof window !== 'undefined' ? window : globalThis);
