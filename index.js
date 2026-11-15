// src/event_bus.ts
var e = new EventTarget(), t = {
	emit(t, n = {}) {
		e.dispatchEvent(new CustomEvent(t, { detail: n })), window.dispatchEvent(new CustomEvent("vp:event", { detail: {
			name: t,
			payload: n,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		} }));
	},
	subscribe(t, n) {
		return e.addEventListener(t, n), () => {
			e.removeEventListener(t, n);
		};
	}
}, n = class extends Error {
	constructor(e) {
		super(e), this.name = "AssertionError";
	}
};
function r(e, t) {
	if (e) throw new n(t);
}
// src/try_catch.ts
async function i(e, t) {
	try {
		return [null, await e];
	} catch (e) {
		return o(e, t);
	}
}
function a(e, t) {
	if (typeof e != "function") {
		let e = "First parameter is not a function";
		return [Error(t ? `Operation "${t}" failed: ${e}` : e)];
	}
	try {
		return [null, e()];
	} catch (e) {
		return o(e, t);
	}
}
function o(e, t) {
	let n = e instanceof Error ? e : Error(String(e));
	return t && (n.message = `Operation "${t}" failed: ${n.message}`), [n];
}
// src/debounce.ts
function s(e, t) {
	let n;
	return function(...r) {
		clearTimeout(n), n = setTimeout(() => e.apply(this, r), t);
	};
}
export { n as AssertionError, r as assert, s as debounce, t as eventBus, o as processError, i as tryCatch, a as tryCatchSync };
