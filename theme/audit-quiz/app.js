(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
	new MutationObserver(i => {
		for (const o of i)
			if (o.type === 'childList')
				for (const s of o.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
	}).observe(document, { childList: !0, subtree: !0 });
	function n(i) {
		const o = {};
		return (
			i.integrity && (o.integrity = i.integrity),
			i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
			i.crossOrigin === 'use-credentials'
				? (o.credentials = 'include')
				: i.crossOrigin === 'anonymous'
					? (o.credentials = 'omit')
					: (o.credentials = 'same-origin'),
			o
		);
	}
	function r(i) {
		if (i.ep) return;
		i.ep = !0;
		const o = n(i);
		fetch(i.href, o);
	}
})();
function Bi(e) {
	const t = Object.create(null);
	for (const n of e.split(',')) t[n] = 1;
	return n => n in t;
}
const ce = {},
	hn = [],
	mt = () => {},
	bs = () => !1,
	Fr = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
	qi = e => e.startsWith('onUpdate:'),
	Se = Object.assign,
	Vi = (e, t) => {
		const n = e.indexOf(t);
		n > -1 && e.splice(n, 1);
	},
	bl = Object.prototype.hasOwnProperty,
	fe = (e, t) => bl.call(e, t),
	Y = Array.isArray,
	vn = e => Jn(e) === '[object Map]',
	Nr = e => Jn(e) === '[object Set]',
	po = e => Jn(e) === '[object Date]',
	Z = e => typeof e == 'function',
	Te = e => typeof e == 'string',
	yt = e => typeof e == 'symbol',
	he = e => e !== null && typeof e == 'object',
	ws = e => (he(e) || Z(e)) && Z(e.then) && Z(e.catch),
	_s = Object.prototype.toString,
	Jn = e => _s.call(e),
	wl = e => Jn(e).slice(8, -1),
	xs = e => Jn(e) === '[object Object]',
	Hr = e => Te(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
	Ln = Bi(
		',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
	),
	kr = e => {
		const t = Object.create(null);
		return n => t[n] || (t[n] = e(n));
	},
	_l = /-\w/g,
	at = kr(e => e.replace(_l, t => t.slice(1).toUpperCase())),
	xl = /\B([A-Z])/g,
	Bt = kr(e => e.replace(xl, '-$1').toLowerCase()),
	Ui = kr(e => e.charAt(0).toUpperCase() + e.slice(1)),
	ii = kr(e => (e ? `on${Ui(e)}` : '')),
	Be = (e, t) => !Object.is(e, t),
	vr = (e, ...t) => {
		for (let n = 0; n < e.length; n++) e[n](...t);
	},
	Ts = (e, t, n, r = !1) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n });
	},
	Tl = e => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	},
	Cl = e => {
		const t = Te(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t;
	};
let ho;
const jr = () =>
	ho ||
	(ho =
		typeof globalThis < 'u'
			? globalThis
			: typeof self < 'u'
				? self
				: typeof window < 'u'
					? window
					: typeof global < 'u'
						? global
						: {});
function Wi(e) {
	if (Y(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) {
			const r = e[n],
				i = Te(r) ? Al(r) : Wi(r);
			if (i) for (const o in i) t[o] = i[o];
		}
		return t;
	} else if (Te(e) || he(e)) return e;
}
const Ol = /;(?![^(]*\))/g,
	Sl = /:([^]+)/,
	El = /\/\*[^]*?\*\//g;
function Al(e) {
	const t = {};
	return (
		e
			.replace(El, '')
			.split(Ol)
			.forEach(n => {
				if (n) {
					const r = n.split(Sl);
					r.length > 1 && (t[r[0].trim()] = r[1].trim());
				}
			}),
		t
	);
}
function bn(e) {
	let t = '';
	if (Te(e)) t = e;
	else if (Y(e))
		for (let n = 0; n < e.length; n++) {
			const r = bn(e[n]);
			r && (t += r + ' ');
		}
	else if (he(e)) for (const n in e) e[n] && (t += n + ' ');
	return t.trim();
}
const Pl = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
	Dl = Bi(Pl);
function Cs(e) {
	return !!e || e === '';
}
function Ml(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = wn(e[r], t[r]);
	return n;
}
function wn(e, t) {
	if (e === t) return !0;
	let n = po(e),
		r = po(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (((n = yt(e)), (r = yt(t)), n || r)) return e === t;
	if (((n = Y(e)), (r = Y(t)), n || r)) return n && r ? Ml(e, t) : !1;
	if (((n = he(e)), (r = he(t)), n || r)) {
		if (!n || !r) return !1;
		const i = Object.keys(e).length,
			o = Object.keys(t).length;
		if (i !== o) return !1;
		for (const s in e) {
			const a = e.hasOwnProperty(s),
				l = t.hasOwnProperty(s);
			if ((a && !l) || (!a && l) || !wn(e[s], t[s])) return !1;
		}
	}
	return String(e) === String(t);
}
function Os(e, t) {
	return e.findIndex(n => wn(n, t));
}
const Ss = e => !!(e && e.__v_isRef === !0),
	Ce = e =>
		Te(e)
			? e
			: e == null
				? ''
				: Y(e) || (he(e) && (e.toString === _s || !Z(e.toString)))
					? Ss(e)
						? Ce(e.value)
						: JSON.stringify(e, Es, 2)
					: String(e),
	Es = (e, t) =>
		Ss(t)
			? Es(e, t.value)
			: vn(t)
				? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, i], o) => ((n[oi(r, o) + ' =>'] = i), n), {}) }
				: Nr(t)
					? { [`Set(${t.size})`]: [...t.values()].map(n => oi(n)) }
					: yt(t)
						? oi(t)
						: he(t) && !Y(t) && !xs(t)
							? String(t)
							: t,
	oi = (e, t = '') => {
		var n;
		return yt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
	};
let Ie;
class As {
	constructor(t = !1) {
		((this.detached = t),
			(this._active = !0),
			(this._on = 0),
			(this.effects = []),
			(this.cleanups = []),
			(this._isPaused = !1),
			(this.parent = Ie),
			!t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let t, n;
			if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let t, n;
			if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
		}
	}
	run(t) {
		if (this._active) {
			const n = Ie;
			try {
				return ((Ie = this), t());
			} finally {
				Ie = n;
			}
		}
	}
	on() {
		++this._on === 1 && ((this.prevScope = Ie), (Ie = this));
	}
	off() {
		this._on > 0 && --this._on === 0 && ((Ie = this.prevScope), (this.prevScope = void 0));
	}
	stop(t) {
		if (this._active) {
			this._active = !1;
			let n, r;
			for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
			for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
			if (((this.cleanups.length = 0), this.scopes)) {
				for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !t) {
				const i = this.parent.scopes.pop();
				i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index));
			}
			this.parent = void 0;
		}
	}
}
function Il(e) {
	return new As(e);
}
function Ps() {
	return Ie;
}
function Ll(e, t = !1) {
	Ie && Ie.cleanups.push(e);
}
let ve;
const si = new WeakSet();
class Ds {
	constructor(t) {
		((this.fn = t),
			(this.deps = void 0),
			(this.depsTail = void 0),
			(this.flags = 5),
			(this.next = void 0),
			(this.cleanup = void 0),
			(this.scheduler = void 0),
			Ie && Ie.active && Ie.effects.push(this));
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && ((this.flags &= -65), si.has(this) && (si.delete(this), this.trigger()));
	}
	notify() {
		(this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Is(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		((this.flags |= 2), vo(this), Ls(this));
		const t = ve,
			n = st;
		((ve = this), (st = !0));
		try {
			return this.fn();
		} finally {
			($s(this), (ve = t), (st = n), (this.flags &= -3));
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let t = this.deps; t; t = t.nextDep) Yi(t);
			((this.deps = this.depsTail = void 0), vo(this), this.onStop && this.onStop(), (this.flags &= -2));
		}
	}
	trigger() {
		this.flags & 64 ? si.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ci(this) && this.run();
	}
	get dirty() {
		return Ci(this);
	}
}
let Ms = 0,
	$n,
	Rn;
function Is(e, t = !1) {
	if (((e.flags |= 8), t)) {
		((e.next = Rn), (Rn = e));
		return;
	}
	((e.next = $n), ($n = e));
}
function zi() {
	Ms++;
}
function Ki() {
	if (--Ms > 0) return;
	if (Rn) {
		let t = Rn;
		for (Rn = void 0; t; ) {
			const n = t.next;
			((t.next = void 0), (t.flags &= -9), (t = n));
		}
	}
	let e;
	for (; $n; ) {
		let t = $n;
		for ($n = void 0; t; ) {
			const n = t.next;
			if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
				try {
					t.trigger();
				} catch (r) {
					e || (e = r);
				}
			t = n;
		}
	}
	if (e) throw e;
}
function Ls(e) {
	for (let t = e.deps; t; t = t.nextDep)
		((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t));
}
function $s(e) {
	let t,
		n = e.depsTail,
		r = n;
	for (; r; ) {
		const i = r.prevDep;
		(r.version === -1 ? (r === n && (n = i), Yi(r), $l(r)) : (t = r),
			(r.dep.activeLink = r.prevActiveLink),
			(r.prevActiveLink = void 0),
			(r = i));
	}
	((e.deps = t), (e.depsTail = n));
}
function Ci(e) {
	for (let t = e.deps; t; t = t.nextDep)
		if (t.dep.version !== t.version || (t.dep.computed && (Rs(t.dep.computed) || t.dep.version !== t.version)))
			return !0;
	return !!e._dirty;
}
function Rs(e) {
	if (
		(e.flags & 4 && !(e.flags & 16)) ||
		((e.flags &= -17), e.globalVersion === qn) ||
		((e.globalVersion = qn), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Ci(e)))
	)
		return;
	e.flags |= 2;
	const t = e.dep,
		n = ve,
		r = st;
	((ve = e), (st = !0));
	try {
		Ls(e);
		const i = e.fn(e._value);
		(t.version === 0 || Be(i, e._value)) && ((e.flags |= 128), (e._value = i), t.version++);
	} catch (i) {
		throw (t.version++, i);
	} finally {
		((ve = n), (st = r), $s(e), (e.flags &= -3));
	}
}
function Yi(e, t = !1) {
	const { dep: n, prevSub: r, nextSub: i } = e;
	if (
		(r && ((r.nextSub = i), (e.prevSub = void 0)),
		i && ((i.prevSub = r), (e.nextSub = void 0)),
		n.subs === e && ((n.subs = r), !r && n.computed))
	) {
		n.computed.flags &= -5;
		for (let o = n.computed.deps; o; o = o.nextDep) Yi(o, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function $l(e) {
	const { prevDep: t, nextDep: n } = e;
	(t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let st = !0;
const Fs = [];
function Pt() {
	(Fs.push(st), (st = !1));
}
function Dt() {
	const e = Fs.pop();
	st = e === void 0 ? !0 : e;
}
function vo(e) {
	const { cleanup: t } = e;
	if (((e.cleanup = void 0), t)) {
		const n = ve;
		ve = void 0;
		try {
			t();
		} finally {
			ve = n;
		}
	}
}
let qn = 0;
class Rl {
	constructor(t, n) {
		((this.sub = t),
			(this.dep = n),
			(this.version = n.version),
			(this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0));
	}
}
class Br {
	constructor(t) {
		((this.computed = t),
			(this.version = 0),
			(this.activeLink = void 0),
			(this.subs = void 0),
			(this.map = void 0),
			(this.key = void 0),
			(this.sc = 0),
			(this.__v_skip = !0));
	}
	track(t) {
		if (!ve || !st || ve === this.computed) return;
		let n = this.activeLink;
		if (n === void 0 || n.sub !== ve)
			((n = this.activeLink = new Rl(ve, this)),
				ve.deps
					? ((n.prevDep = ve.depsTail), (ve.depsTail.nextDep = n), (ve.depsTail = n))
					: (ve.deps = ve.depsTail = n),
				Ns(n));
		else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
			const r = n.nextDep;
			((r.prevDep = n.prevDep),
				n.prevDep && (n.prevDep.nextDep = r),
				(n.prevDep = ve.depsTail),
				(n.nextDep = void 0),
				(ve.depsTail.nextDep = n),
				(ve.depsTail = n),
				ve.deps === n && (ve.deps = r));
		}
		return n;
	}
	trigger(t) {
		(this.version++, qn++, this.notify(t));
	}
	notify(t) {
		zi();
		try {
			for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
		} finally {
			Ki();
		}
	}
}
function Ns(e) {
	if ((e.dep.sc++, e.sub.flags & 4)) {
		const t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let r = t.deps; r; r = r.nextDep) Ns(r);
		}
		const n = e.dep.subs;
		(n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
	}
}
const _r = new WeakMap(),
	en = Symbol(''),
	Oi = Symbol(''),
	Vn = Symbol('');
function Le(e, t, n) {
	if (st && ve) {
		let r = _r.get(e);
		r || _r.set(e, (r = new Map()));
		let i = r.get(n);
		(i || (r.set(n, (i = new Br())), (i.map = r), (i.key = n)), i.track());
	}
}
function Ot(e, t, n, r, i, o) {
	const s = _r.get(e);
	if (!s) {
		qn++;
		return;
	}
	const a = l => {
		l && l.trigger();
	};
	if ((zi(), t === 'clear')) s.forEach(a);
	else {
		const l = Y(e),
			c = l && Hr(n);
		if (l && n === 'length') {
			const u = Number(r);
			s.forEach((d, g) => {
				(g === 'length' || g === Vn || (!yt(g) && g >= u)) && a(d);
			});
		} else
			switch (((n !== void 0 || s.has(void 0)) && a(s.get(n)), c && a(s.get(Vn)), t)) {
				case 'add':
					l ? c && a(s.get('length')) : (a(s.get(en)), vn(e) && a(s.get(Oi)));
					break;
				case 'delete':
					l || (a(s.get(en)), vn(e) && a(s.get(Oi)));
					break;
				case 'set':
					vn(e) && a(s.get(en));
					break;
			}
	}
	Ki();
}
function Fl(e, t) {
	const n = _r.get(e);
	return n && n.get(t);
}
function dn(e) {
	const t = se(e);
	return t === e ? t : (Le(t, 'iterate', Vn), Ge(e) ? t : t.map(lt));
}
function qr(e) {
	return (Le((e = se(e)), 'iterate', Vn), e);
}
function Rt(e, t) {
	return Mt(e) ? (At(e) ? _n(lt(t)) : _n(t)) : lt(t);
}
const Nl = {
	__proto__: null,
	[Symbol.iterator]() {
		return ai(this, Symbol.iterator, e => Rt(this, e));
	},
	concat(...e) {
		return dn(this).concat(...e.map(t => (Y(t) ? dn(t) : t)));
	},
	entries() {
		return ai(this, 'entries', e => ((e[1] = Rt(this, e[1])), e));
	},
	every(e, t) {
		return xt(this, 'every', e, t, void 0, arguments);
	},
	filter(e, t) {
		return xt(this, 'filter', e, t, n => n.map(r => Rt(this, r)), arguments);
	},
	find(e, t) {
		return xt(this, 'find', e, t, n => Rt(this, n), arguments);
	},
	findIndex(e, t) {
		return xt(this, 'findIndex', e, t, void 0, arguments);
	},
	findLast(e, t) {
		return xt(this, 'findLast', e, t, n => Rt(this, n), arguments);
	},
	findLastIndex(e, t) {
		return xt(this, 'findLastIndex', e, t, void 0, arguments);
	},
	forEach(e, t) {
		return xt(this, 'forEach', e, t, void 0, arguments);
	},
	includes(...e) {
		return li(this, 'includes', e);
	},
	indexOf(...e) {
		return li(this, 'indexOf', e);
	},
	join(e) {
		return dn(this).join(e);
	},
	lastIndexOf(...e) {
		return li(this, 'lastIndexOf', e);
	},
	map(e, t) {
		return xt(this, 'map', e, t, void 0, arguments);
	},
	pop() {
		return Pn(this, 'pop');
	},
	push(...e) {
		return Pn(this, 'push', e);
	},
	reduce(e, ...t) {
		return mo(this, 'reduce', e, t);
	},
	reduceRight(e, ...t) {
		return mo(this, 'reduceRight', e, t);
	},
	shift() {
		return Pn(this, 'shift');
	},
	some(e, t) {
		return xt(this, 'some', e, t, void 0, arguments);
	},
	splice(...e) {
		return Pn(this, 'splice', e);
	},
	toReversed() {
		return dn(this).toReversed();
	},
	toSorted(e) {
		return dn(this).toSorted(e);
	},
	toSpliced(...e) {
		return dn(this).toSpliced(...e);
	},
	unshift(...e) {
		return Pn(this, 'unshift', e);
	},
	values() {
		return ai(this, 'values', e => Rt(this, e));
	},
};
function ai(e, t, n) {
	const r = qr(e),
		i = r[t]();
	return (
		r !== e &&
			!Ge(e) &&
			((i._next = i.next),
			(i.next = () => {
				const o = i._next();
				return (o.done || (o.value = n(o.value)), o);
			})),
		i
	);
}
const Hl = Array.prototype;
function xt(e, t, n, r, i, o) {
	const s = qr(e),
		a = s !== e && !Ge(e),
		l = s[t];
	if (l !== Hl[t]) {
		const d = l.apply(e, o);
		return a ? lt(d) : d;
	}
	let c = n;
	s !== e &&
		(a
			? (c = function (d, g) {
					return n.call(this, Rt(e, d), g, e);
				})
			: n.length > 2 &&
				(c = function (d, g) {
					return n.call(this, d, g, e);
				}));
	const u = l.call(s, c, r);
	return a && i ? i(u) : u;
}
function mo(e, t, n, r) {
	const i = qr(e);
	let o = n;
	return (
		i !== e &&
			(Ge(e)
				? n.length > 3 &&
					(o = function (s, a, l) {
						return n.call(this, s, a, l, e);
					})
				: (o = function (s, a, l) {
						return n.call(this, s, Rt(e, a), l, e);
					})),
		i[t](o, ...r)
	);
}
function li(e, t, n) {
	const r = se(e);
	Le(r, 'iterate', Vn);
	const i = r[t](...n);
	return (i === -1 || i === !1) && zr(n[0]) ? ((n[0] = se(n[0])), r[t](...n)) : i;
}
function Pn(e, t, n = []) {
	(Pt(), zi());
	const r = se(e)[t].apply(e, n);
	return (Ki(), Dt(), r);
}
const kl = Bi('__proto__,__v_isRef,__isVue'),
	Hs = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter(e => e !== 'arguments' && e !== 'caller')
			.map(e => Symbol[e])
			.filter(yt),
	);
function jl(e) {
	yt(e) || (e = String(e));
	const t = se(this);
	return (Le(t, 'has', e), t.hasOwnProperty(e));
}
class ks {
	constructor(t = !1, n = !1) {
		((this._isReadonly = t), (this._isShallow = n));
	}
	get(t, n, r) {
		if (n === '__v_skip') return t.__v_skip;
		const i = this._isReadonly,
			o = this._isShallow;
		if (n === '__v_isReactive') return !i;
		if (n === '__v_isReadonly') return i;
		if (n === '__v_isShallow') return o;
		if (n === '__v_raw')
			return r === (i ? (o ? Ws : Us) : o ? Vs : qs).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
				? t
				: void 0;
		const s = Y(t);
		if (!i) {
			let l;
			if (s && (l = Nl[n])) return l;
			if (n === 'hasOwnProperty') return jl;
		}
		const a = Reflect.get(t, n, pe(t) ? t : r);
		if ((yt(n) ? Hs.has(n) : kl(n)) || (i || Le(t, 'get', n), o)) return a;
		if (pe(a)) {
			const l = s && Hr(n) ? a : a.value;
			return i && he(l) ? sn(l) : l;
		}
		return he(a) ? (i ? sn(a) : Ur(a)) : a;
	}
}
class js extends ks {
	constructor(t = !1) {
		super(!1, t);
	}
	set(t, n, r, i) {
		let o = t[n];
		const s = Y(t) && Hr(n);
		if (!this._isShallow) {
			const c = Mt(o);
			if ((!Ge(r) && !Mt(r) && ((o = se(o)), (r = se(r))), !s && pe(o) && !pe(r))) return (c || (o.value = r), !0);
		}
		const a = s ? Number(n) < t.length : fe(t, n),
			l = Reflect.set(t, n, r, pe(t) ? t : i);
		return (t === se(i) && (a ? Be(r, o) && Ot(t, 'set', n, r) : Ot(t, 'add', n, r)), l);
	}
	deleteProperty(t, n) {
		const r = fe(t, n);
		t[n];
		const i = Reflect.deleteProperty(t, n);
		return (i && r && Ot(t, 'delete', n, void 0), i);
	}
	has(t, n) {
		const r = Reflect.has(t, n);
		return ((!yt(n) || !Hs.has(n)) && Le(t, 'has', n), r);
	}
	ownKeys(t) {
		return (Le(t, 'iterate', Y(t) ? 'length' : en), Reflect.ownKeys(t));
	}
}
class Bs extends ks {
	constructor(t = !1) {
		super(!0, t);
	}
	set(t, n) {
		return !0;
	}
	deleteProperty(t, n) {
		return !0;
	}
}
const Bl = new js(),
	ql = new Bs(),
	Vl = new js(!0),
	Ul = new Bs(!0),
	Si = e => e,
	lr = e => Reflect.getPrototypeOf(e);
function Wl(e, t, n) {
	return function (...r) {
		const i = this.__v_raw,
			o = se(i),
			s = vn(o),
			a = e === 'entries' || (e === Symbol.iterator && s),
			l = e === 'keys' && s,
			c = i[e](...r),
			u = n ? Si : t ? _n : lt;
		return (
			!t && Le(o, 'iterate', l ? Oi : en),
			{
				next() {
					const { value: d, done: g } = c.next();
					return g ? { value: d, done: g } : { value: a ? [u(d[0]), u(d[1])] : u(d), done: g };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function ur(e) {
	return function (...t) {
		return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
	};
}
function zl(e, t) {
	const n = {
		get(i) {
			const o = this.__v_raw,
				s = se(o),
				a = se(i);
			e || (Be(i, a) && Le(s, 'get', i), Le(s, 'get', a));
			const { has: l } = lr(s),
				c = t ? Si : e ? _n : lt;
			if (l.call(s, i)) return c(o.get(i));
			if (l.call(s, a)) return c(o.get(a));
			o !== s && o.get(i);
		},
		get size() {
			const i = this.__v_raw;
			return (!e && Le(se(i), 'iterate', en), i.size);
		},
		has(i) {
			const o = this.__v_raw,
				s = se(o),
				a = se(i);
			return (e || (Be(i, a) && Le(s, 'has', i), Le(s, 'has', a)), i === a ? o.has(i) : o.has(i) || o.has(a));
		},
		forEach(i, o) {
			const s = this,
				a = s.__v_raw,
				l = se(a),
				c = t ? Si : e ? _n : lt;
			return (!e && Le(l, 'iterate', en), a.forEach((u, d) => i.call(o, c(u), c(d), s)));
		},
	};
	return (
		Se(
			n,
			e
				? { add: ur('add'), set: ur('set'), delete: ur('delete'), clear: ur('clear') }
				: {
						add(i) {
							!t && !Ge(i) && !Mt(i) && (i = se(i));
							const o = se(this);
							return (lr(o).has.call(o, i) || (o.add(i), Ot(o, 'add', i, i)), this);
						},
						set(i, o) {
							!t && !Ge(o) && !Mt(o) && (o = se(o));
							const s = se(this),
								{ has: a, get: l } = lr(s);
							let c = a.call(s, i);
							c || ((i = se(i)), (c = a.call(s, i)));
							const u = l.call(s, i);
							return (s.set(i, o), c ? Be(o, u) && Ot(s, 'set', i, o) : Ot(s, 'add', i, o), this);
						},
						delete(i) {
							const o = se(this),
								{ has: s, get: a } = lr(o);
							let l = s.call(o, i);
							(l || ((i = se(i)), (l = s.call(o, i))), a && a.call(o, i));
							const c = o.delete(i);
							return (l && Ot(o, 'delete', i, void 0), c);
						},
						clear() {
							const i = se(this),
								o = i.size !== 0,
								s = i.clear();
							return (o && Ot(i, 'clear', void 0, void 0), s);
						},
					},
		),
		['keys', 'values', 'entries', Symbol.iterator].forEach(i => {
			n[i] = Wl(i, e, t);
		}),
		n
	);
}
function Vr(e, t) {
	const n = zl(e, t);
	return (r, i, o) =>
		i === '__v_isReactive'
			? !e
			: i === '__v_isReadonly'
				? e
				: i === '__v_raw'
					? r
					: Reflect.get(fe(n, i) && i in r ? n : r, i, o);
}
const Kl = { get: Vr(!1, !1) },
	Yl = { get: Vr(!1, !0) },
	Gl = { get: Vr(!0, !1) },
	Xl = { get: Vr(!0, !0) },
	qs = new WeakMap(),
	Vs = new WeakMap(),
	Us = new WeakMap(),
	Ws = new WeakMap();
function Ql(e) {
	switch (e) {
		case 'Object':
		case 'Array':
			return 1;
		case 'Map':
		case 'Set':
		case 'WeakMap':
		case 'WeakSet':
			return 2;
		default:
			return 0;
	}
}
function Jl(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Ql(wl(e));
}
function Ur(e) {
	return Mt(e) ? e : Wr(e, !1, Bl, Kl, qs);
}
function Zl(e) {
	return Wr(e, !1, Vl, Yl, Vs);
}
function sn(e) {
	return Wr(e, !0, ql, Gl, Us);
}
function eu(e) {
	return Wr(e, !0, Ul, Xl, Ws);
}
function Wr(e, t, n, r, i) {
	if (!he(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const o = Jl(e);
	if (o === 0) return e;
	const s = i.get(e);
	if (s) return s;
	const a = new Proxy(e, o === 2 ? r : n);
	return (i.set(e, a), a);
}
function At(e) {
	return Mt(e) ? At(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Mt(e) {
	return !!(e && e.__v_isReadonly);
}
function Ge(e) {
	return !!(e && e.__v_isShallow);
}
function zr(e) {
	return e ? !!e.__v_raw : !1;
}
function se(e) {
	const t = e && e.__v_raw;
	return t ? se(t) : e;
}
function tu(e) {
	return (!fe(e, '__v_skip') && Object.isExtensible(e) && Ts(e, '__v_skip', !0), e);
}
const lt = e => (he(e) ? Ur(e) : e),
	_n = e => (he(e) ? sn(e) : e);
function pe(e) {
	return e ? e.__v_isRef === !0 : !1;
}
function Re(e) {
	return zs(e, !1);
}
function it(e) {
	return zs(e, !0);
}
function zs(e, t) {
	return pe(e) ? e : new nu(e, t);
}
class nu {
	constructor(t, n) {
		((this.dep = new Br()),
			(this.__v_isRef = !0),
			(this.__v_isShallow = !1),
			(this._rawValue = n ? t : se(t)),
			(this._value = n ? t : lt(t)),
			(this.__v_isShallow = n));
	}
	get value() {
		return (this.dep.track(), this._value);
	}
	set value(t) {
		const n = this._rawValue,
			r = this.__v_isShallow || Ge(t) || Mt(t);
		((t = r ? t : se(t)), Be(t, n) && ((this._rawValue = t), (this._value = r ? t : lt(t)), this.dep.trigger()));
	}
}
function de(e) {
	return pe(e) ? e.value : e;
}
function St(e) {
	return Z(e) ? e() : de(e);
}
const ru = {
	get: (e, t, n) => (t === '__v_raw' ? e : de(Reflect.get(e, t, n))),
	set: (e, t, n, r) => {
		const i = e[t];
		return pe(i) && !pe(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r);
	},
};
function Ks(e) {
	return At(e) ? e : new Proxy(e, ru);
}
class iu {
	constructor(t) {
		((this.__v_isRef = !0), (this._value = void 0));
		const n = (this.dep = new Br()),
			{ get: r, set: i } = t(n.track.bind(n), n.trigger.bind(n));
		((this._get = r), (this._set = i));
	}
	get value() {
		return (this._value = this._get());
	}
	set value(t) {
		this._set(t);
	}
}
function Ys(e) {
	return new iu(e);
}
class ou {
	constructor(t, n, r) {
		((this._object = t),
			(this._key = n),
			(this._defaultValue = r),
			(this.__v_isRef = !0),
			(this._value = void 0),
			(this._raw = se(t)));
		let i = !0,
			o = t;
		if (!Y(t) || !Hr(String(n)))
			do i = !zr(o) || Ge(o);
			while (i && (o = o.__v_raw));
		this._shallow = i;
	}
	get value() {
		let t = this._object[this._key];
		return (this._shallow && (t = de(t)), (this._value = t === void 0 ? this._defaultValue : t));
	}
	set value(t) {
		if (this._shallow && pe(this._raw[this._key])) {
			const n = this._object[this._key];
			if (pe(n)) {
				n.value = t;
				return;
			}
		}
		this._object[this._key] = t;
	}
	get dep() {
		return Fl(this._raw, this._key);
	}
}
class su {
	constructor(t) {
		((this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0), (this._value = void 0));
	}
	get value() {
		return (this._value = this._getter());
	}
}
function au(e, t, n) {
	return pe(e) ? e : Z(e) ? new su(e) : he(e) && arguments.length > 1 ? lu(e, t, n) : Re(e);
}
function lu(e, t, n) {
	return new ou(e, t, n);
}
class uu {
	constructor(t, n, r) {
		((this.fn = t),
			(this.setter = n),
			(this._value = void 0),
			(this.dep = new Br(this)),
			(this.__v_isRef = !0),
			(this.deps = void 0),
			(this.depsTail = void 0),
			(this.flags = 16),
			(this.globalVersion = qn - 1),
			(this.next = void 0),
			(this.effect = this),
			(this.__v_isReadonly = !n),
			(this.isSSR = r));
	}
	notify() {
		if (((this.flags |= 16), !(this.flags & 8) && ve !== this)) return (Is(this, !0), !0);
	}
	get value() {
		const t = this.dep.track();
		return (Rs(this), t && (t.version = this.dep.version), this._value);
	}
	set value(t) {
		this.setter && this.setter(t);
	}
}
function cu(e, t, n = !1) {
	let r, i;
	return (Z(e) ? (r = e) : ((r = e.get), (i = e.set)), new uu(r, i, n));
}
const cr = {},
	xr = new WeakMap();
let Gt;
function fu(e, t = !1, n = Gt) {
	if (n) {
		let r = xr.get(n);
		(r || xr.set(n, (r = [])), r.push(e));
	}
}
function du(e, t, n = ce) {
	const { immediate: r, deep: i, once: o, scheduler: s, augmentJob: a, call: l } = n,
		c = f => (i ? f : Ge(f) || i === !1 || i === 0 ? Et(f, 1) : Et(f));
	let u,
		d,
		g,
		v,
		y = !1,
		b = !1;
	if (
		(pe(e)
			? ((d = () => e.value), (y = Ge(e)))
			: At(e)
				? ((d = () => c(e)), (y = !0))
				: Y(e)
					? ((b = !0),
						(y = e.some(f => At(f) || Ge(f))),
						(d = () =>
							e.map(f => {
								if (pe(f)) return f.value;
								if (At(f)) return c(f);
								if (Z(f)) return l ? l(f, 2) : f();
							})))
					: Z(e)
						? t
							? (d = l ? () => l(e, 2) : e)
							: (d = () => {
									if (g) {
										Pt();
										try {
											g();
										} finally {
											Dt();
										}
									}
									const f = Gt;
									Gt = u;
									try {
										return l ? l(e, 3, [v]) : e(v);
									} finally {
										Gt = f;
									}
								})
						: (d = mt),
		t && i)
	) {
		const f = d,
			D = i === !0 ? 1 / 0 : i;
		d = () => Et(f(), D);
	}
	const C = Ps(),
		m = () => {
			(u.stop(), C && C.active && Vi(C.effects, u));
		};
	if (o && t) {
		const f = t;
		t = (...D) => {
			(f(...D), m());
		};
	}
	let x = b ? new Array(e.length).fill(cr) : cr;
	const R = f => {
		if (!(!(u.flags & 1) || (!u.dirty && !f)))
			if (t) {
				const D = u.run();
				if (i || y || (b ? D.some((O, T) => Be(O, x[T])) : Be(D, x))) {
					g && g();
					const O = Gt;
					Gt = u;
					try {
						const T = [D, x === cr ? void 0 : b && x[0] === cr ? [] : x, v];
						((x = D), l ? l(t, 3, T) : t(...T));
					} finally {
						Gt = O;
					}
				}
			} else u.run();
	};
	return (
		a && a(R),
		(u = new Ds(d)),
		(u.scheduler = s ? () => s(R, !1) : R),
		(v = f => fu(f, !1, u)),
		(g = u.onStop =
			() => {
				const f = xr.get(u);
				if (f) {
					if (l) l(f, 4);
					else for (const D of f) D();
					xr.delete(u);
				}
			}),
		t ? (r ? R(!0) : (x = u.run())) : s ? s(R.bind(null, !0), !0) : u.run(),
		(m.pause = u.pause.bind(u)),
		(m.resume = u.resume.bind(u)),
		(m.stop = m),
		m
	);
}
function Et(e, t = 1 / 0, n) {
	if (t <= 0 || !he(e) || e.__v_skip || ((n = n || new Map()), (n.get(e) || 0) >= t)) return e;
	if ((n.set(e, t), t--, pe(e))) Et(e.value, t, n);
	else if (Y(e)) for (let r = 0; r < e.length; r++) Et(e[r], t, n);
	else if (Nr(e) || vn(e))
		e.forEach(r => {
			Et(r, t, n);
		});
	else if (xs(e)) {
		for (const r in e) Et(e[r], t, n);
		for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Et(e[r], t, n);
	}
	return e;
}
function Zn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (i) {
		Kr(i, t, n);
	}
}
function ut(e, t, n, r) {
	if (Z(e)) {
		const i = Zn(e, t, n, r);
		return (
			i &&
				ws(i) &&
				i.catch(o => {
					Kr(o, t, n);
				}),
			i
		);
	}
	if (Y(e)) {
		const i = [];
		for (let o = 0; o < e.length; o++) i.push(ut(e[o], t, n, r));
		return i;
	}
}
function Kr(e, t, n, r = !0) {
	const i = t ? t.vnode : null,
		{ errorHandler: o, throwUnhandledErrorInProduction: s } = (t && t.appContext.config) || ce;
	if (t) {
		let a = t.parent;
		const l = t.proxy,
			c = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; a; ) {
			const u = a.ec;
			if (u) {
				for (let d = 0; d < u.length; d++) if (u[d](e, l, c) === !1) return;
			}
			a = a.parent;
		}
		if (o) {
			(Pt(), Zn(o, null, 10, [e, l, c]), Dt());
			return;
		}
	}
	pu(e, n, i, r, s);
}
function pu(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
const He = [];
let pt = -1;
const mn = [];
let Ft = null,
	pn = 0;
const Gs = Promise.resolve();
let Tr = null;
function Cr(e) {
	const t = Tr || Gs;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function hu(e) {
	let t = pt + 1,
		n = He.length;
	for (; t < n; ) {
		const r = (t + n) >>> 1,
			i = He[r],
			o = Un(i);
		o < e || (o === e && i.flags & 2) ? (t = r + 1) : (n = r);
	}
	return t;
}
function Gi(e) {
	if (!(e.flags & 1)) {
		const t = Un(e),
			n = He[He.length - 1];
		(!n || (!(e.flags & 2) && t >= Un(n)) ? He.push(e) : He.splice(hu(t), 0, e), (e.flags |= 1), Xs());
	}
}
function Xs() {
	Tr || (Tr = Gs.then(Js));
}
function vu(e) {
	(Y(e) ? mn.push(...e) : Ft && e.id === -1 ? Ft.splice(pn + 1, 0, e) : e.flags & 1 || (mn.push(e), (e.flags |= 1)),
		Xs());
}
function go(e, t, n = pt + 1) {
	for (; n < He.length; n++) {
		const r = He[n];
		if (r && r.flags & 2) {
			if (e && r.id !== e.uid) continue;
			(He.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2));
		}
	}
}
function Qs(e) {
	if (mn.length) {
		const t = [...new Set(mn)].sort((n, r) => Un(n) - Un(r));
		if (((mn.length = 0), Ft)) {
			Ft.push(...t);
			return;
		}
		for (Ft = t, pn = 0; pn < Ft.length; pn++) {
			const n = Ft[pn];
			(n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
		}
		((Ft = null), (pn = 0));
	}
}
const Un = e => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Js(e) {
	try {
		for (pt = 0; pt < He.length; pt++) {
			const t = He[pt];
			t &&
				!(t.flags & 8) &&
				(t.flags & 4 && (t.flags &= -2), Zn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
		}
	} finally {
		for (; pt < He.length; pt++) {
			const t = He[pt];
			t && (t.flags &= -2);
		}
		((pt = -1), (He.length = 0), Qs(), (Tr = null), (He.length || mn.length) && Js());
	}
}
let Ke = null,
	Zs = null;
function Or(e) {
	const t = Ke;
	return ((Ke = e), (Zs = (e && e.type.__scopeId) || null), t);
}
function tn(e, t = Ke, n) {
	if (!t || e._n) return e;
	const r = (...i) => {
		r._d && Pr(-1);
		const o = Or(t);
		let s;
		try {
			s = e(...i);
		} finally {
			(Or(o), r._d && Pr(1));
		}
		return s;
	};
	return ((r._n = !0), (r._c = !0), (r._d = !0), r);
}
function Ei(e, t) {
	if (Ke === null) return e;
	const n = Jr(Ke),
		r = e.dirs || (e.dirs = []);
	for (let i = 0; i < t.length; i++) {
		let [o, s, a, l = ce] = t[i];
		o &&
			(Z(o) && (o = { mounted: o, updated: o }),
			o.deep && Et(s),
			r.push({ dir: o, instance: n, value: s, oldValue: void 0, arg: a, modifiers: l }));
	}
	return e;
}
function zt(e, t, n, r) {
	const i = e.dirs,
		o = t && t.dirs;
	for (let s = 0; s < i.length; s++) {
		const a = i[s];
		o && (a.oldValue = o[s].value);
		let l = a.dir[r];
		l && (Pt(), ut(l, n, 8, [e.el, a, e, t]), Dt());
	}
}
const mu = Symbol('_vte'),
	ea = e => e.__isTeleport,
	Ct = Symbol('_leaveCb'),
	fr = Symbol('_enterCb');
function ta() {
	const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
	return (
		un(() => {
			e.isMounted = !0;
		}),
		ua(() => {
			e.isUnmounting = !0;
		}),
		e
	);
}
const et = [Function, Array],
	na = {
		mode: String,
		appear: Boolean,
		persisted: Boolean,
		onBeforeEnter: et,
		onEnter: et,
		onAfterEnter: et,
		onEnterCancelled: et,
		onBeforeLeave: et,
		onLeave: et,
		onAfterLeave: et,
		onLeaveCancelled: et,
		onBeforeAppear: et,
		onAppear: et,
		onAfterAppear: et,
		onAppearCancelled: et,
	},
	ra = e => {
		const t = e.subTree;
		return t.component ? ra(t.component) : t;
	},
	gu = {
		name: 'BaseTransition',
		props: na,
		setup(e, { slots: t }) {
			const n = er(),
				r = ta();
			return () => {
				const i = t.default && Xi(t.default(), !0);
				if (!i || !i.length) return;
				const o = ia(i),
					s = se(e),
					{ mode: a } = s;
				if (r.isLeaving) return ui(o);
				const l = yo(o);
				if (!l) return ui(o);
				let c = Wn(l, s, r, n, d => (c = d));
				l.type !== ke && an(l, c);
				let u = n.subTree && yo(n.subTree);
				if (u && u.type !== ke && !Qt(u, l) && ra(n).type !== ke) {
					let d = Wn(u, s, r, n);
					if ((an(u, d), a === 'out-in' && l.type !== ke))
						return (
							(r.isLeaving = !0),
							(d.afterLeave = () => {
								((r.isLeaving = !1), n.job.flags & 8 || n.update(), delete d.afterLeave, (u = void 0));
							}),
							ui(o)
						);
					a === 'in-out' && l.type !== ke
						? (d.delayLeave = (g, v, y) => {
								const b = oa(r, u);
								((b[String(u.key)] = u),
									(g[Ct] = () => {
										(v(), (g[Ct] = void 0), delete c.delayedLeave, (u = void 0));
									}),
									(c.delayedLeave = () => {
										(y(), delete c.delayedLeave, (u = void 0));
									}));
							})
						: (u = void 0);
				} else u && (u = void 0);
				return o;
			};
		},
	};
function ia(e) {
	let t = e[0];
	if (e.length > 1) {
		for (const n of e)
			if (n.type !== ke) {
				t = n;
				break;
			}
	}
	return t;
}
const yu = gu;
function oa(e, t) {
	const { leavingVNodes: n } = e;
	let r = n.get(t.type);
	return (r || ((r = Object.create(null)), n.set(t.type, r)), r);
}
function Wn(e, t, n, r, i) {
	const {
			appear: o,
			mode: s,
			persisted: a = !1,
			onBeforeEnter: l,
			onEnter: c,
			onAfterEnter: u,
			onEnterCancelled: d,
			onBeforeLeave: g,
			onLeave: v,
			onAfterLeave: y,
			onLeaveCancelled: b,
			onBeforeAppear: C,
			onAppear: m,
			onAfterAppear: x,
			onAppearCancelled: R,
		} = t,
		f = String(e.key),
		D = oa(n, e),
		O = (k, B) => {
			k && ut(k, r, 9, B);
		},
		T = (k, B) => {
			const K = B[1];
			(O(k, B), Y(k) ? k.every(M => M.length <= 1) && K() : k.length <= 1 && K());
		},
		L = {
			mode: s,
			persisted: a,
			beforeEnter(k) {
				let B = l;
				if (!n.isMounted)
					if (o) B = C || l;
					else return;
				k[Ct] && k[Ct](!0);
				const K = D[f];
				(K && Qt(e, K) && K.el[Ct] && K.el[Ct](), O(B, [k]));
			},
			enter(k) {
				let B = c,
					K = u,
					M = d;
				if (!n.isMounted)
					if (o) ((B = m || c), (K = x || u), (M = R || d));
					else return;
				let Q = !1;
				const te = (k[fr] = me => {
					Q || ((Q = !0), me ? O(M, [k]) : O(K, [k]), L.delayedLeave && L.delayedLeave(), (k[fr] = void 0));
				});
				B ? T(B, [k, te]) : te();
			},
			leave(k, B) {
				const K = String(e.key);
				if ((k[fr] && k[fr](!0), n.isUnmounting)) return B();
				O(g, [k]);
				let M = !1;
				const Q = (k[Ct] = te => {
					M || ((M = !0), B(), te ? O(b, [k]) : O(y, [k]), (k[Ct] = void 0), D[K] === e && delete D[K]);
				});
				((D[K] = e), v ? T(v, [k, Q]) : Q());
			},
			clone(k) {
				const B = Wn(k, t, n, r, i);
				return (i && i(B), B);
			},
		};
	return L;
}
function ui(e) {
	if (Yr(e)) return ((e = kt(e)), (e.children = null), e);
}
function yo(e) {
	if (!Yr(e)) return ea(e.type) && e.children ? ia(e.children) : e;
	if (e.component) return e.component.subTree;
	const { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && Z(n.default)) return n.default();
	}
}
function an(e, t) {
	e.shapeFlag & 6 && e.component
		? ((e.transition = t), an(e.component.subTree, t))
		: e.shapeFlag & 128
			? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
			: (e.transition = t);
}
function Xi(e, t = !1, n) {
	let r = [],
		i = 0;
	for (let o = 0; o < e.length; o++) {
		let s = e[o];
		const a = n == null ? s.key : String(n) + String(s.key != null ? s.key : o);
		s.type === xe
			? (s.patchFlag & 128 && i++, (r = r.concat(Xi(s.children, t, a))))
			: (t || s.type !== ke) && r.push(a != null ? kt(s, { key: a }) : s);
	}
	if (i > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
	return r;
}
function ln(e, t) {
	return Z(e) ? Se({ name: e.name }, t, { setup: e }) : e;
}
function sa(e) {
	e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
const Sr = new WeakMap();
function Fn(e, t, n, r, i = !1) {
	if (Y(e)) {
		e.forEach((y, b) => Fn(y, t && (Y(t) ? t[b] : t), n, r, i));
		return;
	}
	if (Nn(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Fn(e, t, n, r.component.subTree);
		return;
	}
	const o = r.shapeFlag & 4 ? Jr(r.component) : r.el,
		s = i ? null : o,
		{ i: a, r: l } = e,
		c = t && t.r,
		u = a.refs === ce ? (a.refs = {}) : a.refs,
		d = a.setupState,
		g = se(d),
		v = d === ce ? bs : y => fe(g, y);
	if (c != null && c !== l) {
		if ((bo(t), Te(c))) ((u[c] = null), v(c) && (d[c] = null));
		else if (pe(c)) {
			c.value = null;
			const y = t;
			y.k && (u[y.k] = null);
		}
	}
	if (Z(l)) Zn(l, a, 12, [s, u]);
	else {
		const y = Te(l),
			b = pe(l);
		if (y || b) {
			const C = () => {
				if (e.f) {
					const m = y ? (v(l) ? d[l] : u[l]) : l.value;
					if (i) Y(m) && Vi(m, o);
					else if (Y(m)) m.includes(o) || m.push(o);
					else if (y) ((u[l] = [o]), v(l) && (d[l] = u[l]));
					else {
						const x = [o];
						((l.value = x), e.k && (u[e.k] = x));
					}
				} else y ? ((u[l] = s), v(l) && (d[l] = s)) : b && ((l.value = s), e.k && (u[e.k] = s));
			};
			if (s) {
				const m = () => {
					(C(), Sr.delete(e));
				};
				((m.id = -1), Sr.set(e, m), ze(m, n));
			} else (bo(e), C());
		}
	}
}
function bo(e) {
	const t = Sr.get(e);
	t && ((t.flags |= 8), Sr.delete(e));
}
jr().requestIdleCallback;
jr().cancelIdleCallback;
const Nn = e => !!e.type.__asyncLoader,
	Yr = e => e.type.__isKeepAlive;
function bu(e, t) {
	aa(e, 'a', t);
}
function wu(e, t) {
	aa(e, 'da', t);
}
function aa(e, t, n = $e) {
	const r =
		e.__wdc ||
		(e.__wdc = () => {
			let i = n;
			for (; i; ) {
				if (i.isDeactivated) return;
				i = i.parent;
			}
			return e();
		});
	if ((Gr(t, r, n), n)) {
		let i = n.parent;
		for (; i && i.parent; ) (Yr(i.parent.vnode) && _u(r, t, n, i), (i = i.parent));
	}
}
function _u(e, t, n, r) {
	const i = Gr(t, e, r, !0);
	Qi(() => {
		Vi(r[t], i);
	}, n);
}
function Gr(e, t, n = $e, r = !1) {
	if (n) {
		const i = n[e] || (n[e] = []),
			o =
				t.__weh ||
				(t.__weh = (...s) => {
					Pt();
					const a = tr(n),
						l = ut(t, n, e, s);
					return (a(), Dt(), l);
				});
		return (r ? i.unshift(o) : i.push(o), o);
	}
}
const It =
		e =>
		(t, n = $e) => {
			(!Yn || e === 'sp') && Gr(e, (...r) => t(...r), n);
		},
	xu = It('bm'),
	un = It('m'),
	Tu = It('bu'),
	la = It('u'),
	ua = It('bum'),
	Qi = It('um'),
	Cu = It('sp'),
	Ou = It('rtg'),
	Su = It('rtc');
function Eu(e, t = $e) {
	Gr('ec', e, t);
}
const Au = 'directives',
	Pu = Symbol.for('v-ndc');
function Du(e) {
	return Mu(Au, e);
}
function Mu(e, t, n = !0, r = !1) {
	const i = Ke || $e;
	if (i) {
		const o = i.type,
			s = wo(i[e] || o[e], t) || wo(i.appContext[e], t);
		return !s && r ? o : s;
	}
}
function wo(e, t) {
	return e && (e[t] || e[at(t)] || e[Ui(at(t))]);
}
function nn(e, t, n, r) {
	let i;
	const o = n,
		s = Y(e);
	if (s || Te(e)) {
		const a = s && At(e);
		let l = !1,
			c = !1;
		(a && ((l = !Ge(e)), (c = Mt(e)), (e = qr(e))), (i = new Array(e.length)));
		for (let u = 0, d = e.length; u < d; u++) i[u] = t(l ? (c ? _n(lt(e[u])) : lt(e[u])) : e[u], u, void 0, o);
	} else if (typeof e == 'number') {
		i = new Array(e);
		for (let a = 0; a < e; a++) i[a] = t(a + 1, a, void 0, o);
	} else if (he(e))
		if (e[Symbol.iterator]) i = Array.from(e, (a, l) => t(a, l, void 0, o));
		else {
			const a = Object.keys(e);
			i = new Array(a.length);
			for (let l = 0, c = a.length; l < c; l++) {
				const u = a[l];
				i[l] = t(e[u], u, l, o);
			}
		}
	else i = [];
	return i;
}
const Ai = e => (e ? (Pa(e) ? Jr(e) : Ai(e.parent)) : null),
	Hn = Se(Object.create(null), {
		$: e => e,
		$el: e => e.vnode.el,
		$data: e => e.data,
		$props: e => e.props,
		$attrs: e => e.attrs,
		$slots: e => e.slots,
		$refs: e => e.refs,
		$parent: e => Ai(e.parent),
		$root: e => Ai(e.root),
		$host: e => e.ce,
		$emit: e => e.emit,
		$options: e => fa(e),
		$forceUpdate: e =>
			e.f ||
			(e.f = () => {
				Gi(e.update);
			}),
		$nextTick: e => e.n || (e.n = Cr.bind(e.proxy)),
		$watch: e => Wu.bind(e),
	}),
	ci = (e, t) => e !== ce && !e.__isScriptSetup && fe(e, t),
	Iu = {
		get({ _: e }, t) {
			if (t === '__v_skip') return !0;
			const { ctx: n, setupState: r, data: i, props: o, accessCache: s, type: a, appContext: l } = e;
			if (t[0] !== '$') {
				const g = s[t];
				if (g !== void 0)
					switch (g) {
						case 1:
							return r[t];
						case 2:
							return i[t];
						case 4:
							return n[t];
						case 3:
							return o[t];
					}
				else {
					if (ci(r, t)) return ((s[t] = 1), r[t]);
					if (i !== ce && fe(i, t)) return ((s[t] = 2), i[t]);
					if (fe(o, t)) return ((s[t] = 3), o[t]);
					if (n !== ce && fe(n, t)) return ((s[t] = 4), n[t]);
					Pi && (s[t] = 0);
				}
			}
			const c = Hn[t];
			let u, d;
			if (c) return (t === '$attrs' && Le(e.attrs, 'get', ''), c(e));
			if ((u = a.__cssModules) && (u = u[t])) return u;
			if (n !== ce && fe(n, t)) return ((s[t] = 4), n[t]);
			if (((d = l.config.globalProperties), fe(d, t))) return d[t];
		},
		set({ _: e }, t, n) {
			const { data: r, setupState: i, ctx: o } = e;
			return ci(i, t)
				? ((i[t] = n), !0)
				: r !== ce && fe(r, t)
					? ((r[t] = n), !0)
					: fe(e.props, t) || (t[0] === '$' && t.slice(1) in e)
						? !1
						: ((o[t] = n), !0);
		},
		has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: o, type: s } }, a) {
			let l;
			return !!(
				n[a] ||
				(e !== ce && a[0] !== '$' && fe(e, a)) ||
				ci(t, a) ||
				fe(o, a) ||
				fe(r, a) ||
				fe(Hn, a) ||
				fe(i.config.globalProperties, a) ||
				((l = s.__cssModules) && l[a])
			);
		},
		defineProperty(e, t, n) {
			return (
				n.get != null ? (e._.accessCache[t] = 0) : fe(n, 'value') && this.set(e, t, n.value, null),
				Reflect.defineProperty(e, t, n)
			);
		},
	};
function Er(e) {
	return Y(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
function Lu(e, t) {
	return !e || !t ? e || t : Y(e) && Y(t) ? e.concat(t) : Se({}, Er(e), Er(t));
}
let Pi = !0;
function $u(e) {
	const t = fa(e),
		n = e.proxy,
		r = e.ctx;
	((Pi = !1), t.beforeCreate && _o(t.beforeCreate, e, 'bc'));
	const {
		data: i,
		computed: o,
		methods: s,
		watch: a,
		provide: l,
		inject: c,
		created: u,
		beforeMount: d,
		mounted: g,
		beforeUpdate: v,
		updated: y,
		activated: b,
		deactivated: C,
		beforeDestroy: m,
		beforeUnmount: x,
		destroyed: R,
		unmounted: f,
		render: D,
		renderTracked: O,
		renderTriggered: T,
		errorCaptured: L,
		serverPrefetch: k,
		expose: B,
		inheritAttrs: K,
		components: M,
		directives: Q,
		filters: te,
	} = t;
	if ((c && Ru(c, r, null), s))
		for (const q in s) {
			const W = s[q];
			Z(W) && (r[q] = W.bind(n));
		}
	if (i) {
		const q = i.call(n, n);
		he(q) && (e.data = Ur(q));
	}
	if (((Pi = !0), o))
		for (const q in o) {
			const W = o[q],
				be = Z(W) ? W.bind(n, n) : Z(W.get) ? W.get.bind(n, n) : mt,
				ge = !Z(W) && Z(W.set) ? W.set.bind(n) : mt,
				we = jt({ get: be, set: ge });
			Object.defineProperty(r, q, {
				enumerable: !0,
				configurable: !0,
				get: () => we.value,
				set: ye => (we.value = ye),
			});
		}
	if (a) for (const q in a) ca(a[q], r, n, q);
	if (l) {
		const q = Z(l) ? l.call(n) : l;
		Reflect.ownKeys(q).forEach(W => {
			Bu(W, q[W]);
		});
	}
	u && _o(u, e, 'c');
	function ee(q, W) {
		Y(W) ? W.forEach(be => q(be.bind(n))) : W && q(W.bind(n));
	}
	if (
		(ee(xu, d),
		ee(un, g),
		ee(Tu, v),
		ee(la, y),
		ee(bu, b),
		ee(wu, C),
		ee(Eu, L),
		ee(Su, O),
		ee(Ou, T),
		ee(ua, x),
		ee(Qi, f),
		ee(Cu, k),
		Y(B))
	)
		if (B.length) {
			const q = e.exposed || (e.exposed = {});
			B.forEach(W => {
				Object.defineProperty(q, W, { get: () => n[W], set: be => (n[W] = be), enumerable: !0 });
			});
		} else e.exposed || (e.exposed = {});
	(D && e.render === mt && (e.render = D),
		K != null && (e.inheritAttrs = K),
		M && (e.components = M),
		Q && (e.directives = Q),
		k && sa(e));
}
function Ru(e, t, n = mt) {
	Y(e) && (e = Di(e));
	for (const r in e) {
		const i = e[r];
		let o;
		(he(i) ? ('default' in i ? (o = mr(i.from || r, i.default, !0)) : (o = mr(i.from || r))) : (o = mr(i)),
			pe(o)
				? Object.defineProperty(t, r, { enumerable: !0, configurable: !0, get: () => o.value, set: s => (o.value = s) })
				: (t[r] = o));
	}
}
function _o(e, t, n) {
	ut(Y(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ca(e, t, n, r) {
	let i = r.includes('.') ? pa(n, r) : () => n[r];
	if (Te(e)) {
		const o = t[e];
		Z(o) && Xe(i, o);
	} else if (Z(e)) Xe(i, e.bind(n));
	else if (he(e))
		if (Y(e)) e.forEach(o => ca(o, t, n, r));
		else {
			const o = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
			Z(o) && Xe(i, o, e);
		}
}
function fa(e) {
	const t = e.type,
		{ mixins: n, extends: r } = t,
		{
			mixins: i,
			optionsCache: o,
			config: { optionMergeStrategies: s },
		} = e.appContext,
		a = o.get(t);
	let l;
	return (
		a
			? (l = a)
			: !i.length && !n && !r
				? (l = t)
				: ((l = {}), i.length && i.forEach(c => Ar(l, c, s, !0)), Ar(l, t, s)),
		he(t) && o.set(t, l),
		l
	);
}
function Ar(e, t, n, r = !1) {
	const { mixins: i, extends: o } = t;
	(o && Ar(e, o, n, !0), i && i.forEach(s => Ar(e, s, n, !0)));
	for (const s in t)
		if (!(r && s === 'expose')) {
			const a = Fu[s] || (n && n[s]);
			e[s] = a ? a(e[s], t[s]) : t[s];
		}
	return e;
}
const Fu = {
	data: xo,
	props: To,
	emits: To,
	methods: In,
	computed: In,
	beforeCreate: Ne,
	created: Ne,
	beforeMount: Ne,
	mounted: Ne,
	beforeUpdate: Ne,
	updated: Ne,
	beforeDestroy: Ne,
	beforeUnmount: Ne,
	destroyed: Ne,
	unmounted: Ne,
	activated: Ne,
	deactivated: Ne,
	errorCaptured: Ne,
	serverPrefetch: Ne,
	components: In,
	directives: In,
	watch: Hu,
	provide: xo,
	inject: Nu,
};
function xo(e, t) {
	return t
		? e
			? function () {
					return Se(Z(e) ? e.call(this, this) : e, Z(t) ? t.call(this, this) : t);
				}
			: t
		: e;
}
function Nu(e, t) {
	return In(Di(e), Di(t));
}
function Di(e) {
	if (Y(e)) {
		const t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Ne(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function In(e, t) {
	return e ? Se(Object.create(null), e, t) : t;
}
function To(e, t) {
	return e ? (Y(e) && Y(t) ? [...new Set([...e, ...t])] : Se(Object.create(null), Er(e), Er(t ?? {}))) : t;
}
function Hu(e, t) {
	if (!e) return t;
	if (!t) return e;
	const n = Se(Object.create(null), e);
	for (const r in t) n[r] = Ne(e[r], t[r]);
	return n;
}
function da() {
	return {
		app: null,
		config: {
			isNativeTag: bs,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let ku = 0;
function ju(e, t) {
	return function (r, i = null) {
		(Z(r) || (r = Se({}, r)), i != null && !he(i) && (i = null));
		const o = da(),
			s = new WeakSet(),
			a = [];
		let l = !1;
		const c = (o.app = {
			_uid: ku++,
			_component: r,
			_props: i,
			_container: null,
			_context: o,
			_instance: null,
			version: Tc,
			get config() {
				return o.config;
			},
			set config(u) {},
			use(u, ...d) {
				return (s.has(u) || (u && Z(u.install) ? (s.add(u), u.install(c, ...d)) : Z(u) && (s.add(u), u(c, ...d))), c);
			},
			mixin(u) {
				return (o.mixins.includes(u) || o.mixins.push(u), c);
			},
			component(u, d) {
				return d ? ((o.components[u] = d), c) : o.components[u];
			},
			directive(u, d) {
				return d ? ((o.directives[u] = d), c) : o.directives[u];
			},
			mount(u, d, g) {
				if (!l) {
					const v = c._ceVNode || Ae(r, i);
					return (
						(v.appContext = o),
						g === !0 ? (g = 'svg') : g === !1 && (g = void 0),
						e(v, u, g),
						(l = !0),
						(c._container = u),
						(u.__vue_app__ = c),
						Jr(v.component)
					);
				}
			},
			onUnmount(u) {
				a.push(u);
			},
			unmount() {
				l && (ut(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(u, d) {
				return ((o.provides[u] = d), c);
			},
			runWithContext(u) {
				const d = gn;
				gn = c;
				try {
					return u();
				} finally {
					gn = d;
				}
			},
		});
		return c;
	};
}
let gn = null;
function Bu(e, t) {
	if ($e) {
		let n = $e.provides;
		const r = $e.parent && $e.parent.provides;
		(r === n && (n = $e.provides = Object.create(r)), (n[e] = t));
	}
}
function mr(e, t, n = !1) {
	const r = er();
	if (r || gn) {
		let i = gn
			? gn._context.provides
			: r
				? r.parent == null || r.ce
					? r.vnode.appContext && r.vnode.appContext.provides
					: r.parent.provides
				: void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && Z(t) ? t.call(r && r.proxy) : t;
	}
}
const qu = Symbol.for('v-scx'),
	Vu = () => mr(qu);
function Uu(e, t) {
	return Ji(e, null, { flush: 'sync' });
}
function Xe(e, t, n) {
	return Ji(e, t, n);
}
function Ji(e, t, n = ce) {
	const { immediate: r, deep: i, flush: o, once: s } = n,
		a = Se({}, n),
		l = (t && r) || (!t && o !== 'post');
	let c;
	if (Yn) {
		if (o === 'sync') {
			const v = Vu();
			c = v.__watcherHandles || (v.__watcherHandles = []);
		} else if (!l) {
			const v = () => {};
			return ((v.stop = mt), (v.resume = mt), (v.pause = mt), v);
		}
	}
	const u = $e;
	a.call = (v, y, b) => ut(v, u, y, b);
	let d = !1;
	(o === 'post'
		? (a.scheduler = v => {
				ze(v, u && u.suspense);
			})
		: o !== 'sync' &&
			((d = !0),
			(a.scheduler = (v, y) => {
				y ? v() : Gi(v);
			})),
		(a.augmentJob = v => {
			(t && (v.flags |= 4), d && ((v.flags |= 2), u && ((v.id = u.uid), (v.i = u))));
		}));
	const g = du(e, t, a);
	return (Yn && (c ? c.push(g) : l && g()), g);
}
function Wu(e, t, n) {
	const r = this.proxy,
		i = Te(e) ? (e.includes('.') ? pa(r, e) : () => r[e]) : e.bind(r, r);
	let o;
	Z(t) ? (o = t) : ((o = t.handler), (n = t));
	const s = tr(this),
		a = Ji(i, o.bind(r), n);
	return (s(), a);
}
function pa(e, t) {
	const n = t.split('.');
	return () => {
		let r = e;
		for (let i = 0; i < n.length && r; i++) r = r[n[i]];
		return r;
	};
}
function zu(e, t, n = ce) {
	const r = er(),
		i = at(t),
		o = Bt(t),
		s = ha(e, i),
		a = Ys((l, c) => {
			let u,
				d = ce,
				g;
			return (
				Uu(() => {
					const v = e[i];
					Be(u, v) && ((u = v), c());
				}),
				{
					get() {
						return (l(), n.get ? n.get(u) : u);
					},
					set(v) {
						const y = n.set ? n.set(v) : v;
						if (!Be(y, u) && !(d !== ce && Be(v, d))) return;
						const b = r.vnode.props;
						((b &&
							(t in b || i in b || o in b) &&
							(`onUpdate:${t}` in b || `onUpdate:${i}` in b || `onUpdate:${o}` in b)) ||
							((u = v), c()),
							r.emit(`update:${t}`, y),
							Be(v, y) && Be(v, d) && !Be(y, g) && c(),
							(d = v),
							(g = y));
					},
				}
			);
		});
	return (
		(a[Symbol.iterator] = () => {
			let l = 0;
			return {
				next() {
					return l < 2 ? { value: l++ ? s || ce : a, done: !1 } : { done: !0 };
				},
			};
		}),
		a
	);
}
const ha = (e, t) =>
	t === 'modelValue' || t === 'model-value'
		? e.modelModifiers
		: e[`${t}Modifiers`] || e[`${at(t)}Modifiers`] || e[`${Bt(t)}Modifiers`];
function Ku(e, t, ...n) {
	if (e.isUnmounted) return;
	const r = e.vnode.props || ce;
	let i = n;
	const o = t.startsWith('update:'),
		s = o && ha(r, t.slice(7));
	s && (s.trim && (i = n.map(u => (Te(u) ? u.trim() : u))), s.number && (i = n.map(Tl)));
	let a,
		l = r[(a = ii(t))] || r[(a = ii(at(t)))];
	(!l && o && (l = r[(a = ii(Bt(t)))]), l && ut(l, e, 6, i));
	const c = r[a + 'Once'];
	if (c) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[a]) return;
		((e.emitted[a] = !0), ut(c, e, 6, i));
	}
}
const Yu = new WeakMap();
function va(e, t, n = !1) {
	const r = n ? Yu : t.emitsCache,
		i = r.get(e);
	if (i !== void 0) return i;
	const o = e.emits;
	let s = {},
		a = !1;
	if (!Z(e)) {
		const l = c => {
			const u = va(c, t, !0);
			u && ((a = !0), Se(s, u));
		};
		(!n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l));
	}
	return !o && !a
		? (he(e) && r.set(e, null), null)
		: (Y(o) ? o.forEach(l => (s[l] = null)) : Se(s, o), he(e) && r.set(e, s), s);
}
function Xr(e, t) {
	return !e || !Fr(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, '')), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Bt(t)) || fe(e, t));
}
function Co(e) {
	const {
			type: t,
			vnode: n,
			proxy: r,
			withProxy: i,
			propsOptions: [o],
			slots: s,
			attrs: a,
			emit: l,
			render: c,
			renderCache: u,
			props: d,
			data: g,
			setupState: v,
			ctx: y,
			inheritAttrs: b,
		} = e,
		C = Or(e);
	let m, x;
	try {
		if (n.shapeFlag & 4) {
			const f = i || r,
				D = f;
			((m = ht(c.call(D, f, u, d, v, g, y))), (x = a));
		} else {
			const f = t;
			((m = ht(f.length > 1 ? f(d, { attrs: a, slots: s, emit: l }) : f(d, null))), (x = t.props ? a : Gu(a)));
		}
	} catch (f) {
		((kn.length = 0), Kr(f, e, 1), (m = Ae(ke)));
	}
	let R = m;
	if (x && b !== !1) {
		const f = Object.keys(x),
			{ shapeFlag: D } = R;
		f.length && D & 7 && (o && f.some(qi) && (x = Xu(x, o)), (R = kt(R, x, !1, !0)));
	}
	return (
		n.dirs && ((R = kt(R, null, !1, !0)), (R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs)),
		n.transition && an(R, n.transition),
		(m = R),
		Or(C),
		m
	);
}
const Gu = e => {
		let t;
		for (const n in e) (n === 'class' || n === 'style' || Fr(n)) && ((t || (t = {}))[n] = e[n]);
		return t;
	},
	Xu = (e, t) => {
		const n = {};
		for (const r in e) (!qi(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
		return n;
	};
function Qu(e, t, n) {
	const { props: r, children: i, component: o } = e,
		{ props: s, children: a, patchFlag: l } = t,
		c = o.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && l >= 0) {
		if (l & 1024) return !0;
		if (l & 16) return r ? Oo(r, s, c) : !!s;
		if (l & 8) {
			const u = t.dynamicProps;
			for (let d = 0; d < u.length; d++) {
				const g = u[d];
				if (s[g] !== r[g] && !Xr(c, g)) return !0;
			}
		}
	} else return (i || a) && (!a || !a.$stable) ? !0 : r === s ? !1 : r ? (s ? Oo(r, s, c) : !0) : !!s;
	return !1;
}
function Oo(e, t, n) {
	const r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		const o = r[i];
		if (t[o] !== e[o] && !Xr(n, o)) return !0;
	}
	return !1;
}
function Ju({ vnode: e, parent: t }, n) {
	for (; t; ) {
		const r = t.subTree;
		if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
			(((e = t.vnode).el = n), (t = t.parent));
		else break;
	}
}
const ma = {},
	ga = () => Object.create(ma),
	ya = e => Object.getPrototypeOf(e) === ma;
function Zu(e, t, n, r = !1) {
	const i = {},
		o = ga();
	((e.propsDefaults = Object.create(null)), ba(e, t, i, o));
	for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
	(n ? (e.props = r ? i : Zl(i)) : e.type.props ? (e.props = i) : (e.props = o), (e.attrs = o));
}
function ec(e, t, n, r) {
	const {
			props: i,
			attrs: o,
			vnode: { patchFlag: s },
		} = e,
		a = se(i),
		[l] = e.propsOptions;
	let c = !1;
	if ((r || s > 0) && !(s & 16)) {
		if (s & 8) {
			const u = e.vnode.dynamicProps;
			for (let d = 0; d < u.length; d++) {
				let g = u[d];
				if (Xr(e.emitsOptions, g)) continue;
				const v = t[g];
				if (l)
					if (fe(o, g)) v !== o[g] && ((o[g] = v), (c = !0));
					else {
						const y = at(g);
						i[y] = Mi(l, a, y, v, e, !1);
					}
				else v !== o[g] && ((o[g] = v), (c = !0));
			}
		}
	} else {
		ba(e, t, i, o) && (c = !0);
		let u;
		for (const d in a)
			(!t || (!fe(t, d) && ((u = Bt(d)) === d || !fe(t, u)))) &&
				(l ? n && (n[d] !== void 0 || n[u] !== void 0) && (i[d] = Mi(l, a, d, void 0, e, !0)) : delete i[d]);
		if (o !== a) for (const d in o) (!t || !fe(t, d)) && (delete o[d], (c = !0));
	}
	c && Ot(e.attrs, 'set', '');
}
function ba(e, t, n, r) {
	const [i, o] = e.propsOptions;
	let s = !1,
		a;
	if (t)
		for (let l in t) {
			if (Ln(l)) continue;
			const c = t[l];
			let u;
			i && fe(i, (u = at(l)))
				? !o || !o.includes(u)
					? (n[u] = c)
					: ((a || (a = {}))[u] = c)
				: Xr(e.emitsOptions, l) || ((!(l in r) || c !== r[l]) && ((r[l] = c), (s = !0)));
		}
	if (o) {
		const l = se(n),
			c = a || ce;
		for (let u = 0; u < o.length; u++) {
			const d = o[u];
			n[d] = Mi(i, l, d, c[d], e, !fe(c, d));
		}
	}
	return s;
}
function Mi(e, t, n, r, i, o) {
	const s = e[n];
	if (s != null) {
		const a = fe(s, 'default');
		if (a && r === void 0) {
			const l = s.default;
			if (s.type !== Function && !s.skipFactory && Z(l)) {
				const { propsDefaults: c } = i;
				if (n in c) r = c[n];
				else {
					const u = tr(i);
					((r = c[n] = l.call(null, t)), u());
				}
			} else r = l;
			i.ce && i.ce._setProp(n, r);
		}
		s[0] && (o && !a ? (r = !1) : s[1] && (r === '' || r === Bt(n)) && (r = !0));
	}
	return r;
}
const tc = new WeakMap();
function wa(e, t, n = !1) {
	const r = n ? tc : t.propsCache,
		i = r.get(e);
	if (i) return i;
	const o = e.props,
		s = {},
		a = [];
	let l = !1;
	if (!Z(e)) {
		const u = d => {
			l = !0;
			const [g, v] = wa(d, t, !0);
			(Se(s, g), v && a.push(...v));
		};
		(!n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u));
	}
	if (!o && !l) return (he(e) && r.set(e, hn), hn);
	if (Y(o))
		for (let u = 0; u < o.length; u++) {
			const d = at(o[u]);
			So(d) && (s[d] = ce);
		}
	else if (o)
		for (const u in o) {
			const d = at(u);
			if (So(d)) {
				const g = o[u],
					v = (s[d] = Y(g) || Z(g) ? { type: g } : Se({}, g)),
					y = v.type;
				let b = !1,
					C = !0;
				if (Y(y))
					for (let m = 0; m < y.length; ++m) {
						const x = y[m],
							R = Z(x) && x.name;
						if (R === 'Boolean') {
							b = !0;
							break;
						} else R === 'String' && (C = !1);
					}
				else b = Z(y) && y.name === 'Boolean';
				((v[0] = b), (v[1] = C), (b || fe(v, 'default')) && a.push(d));
			}
		}
	const c = [s, a];
	return (he(e) && r.set(e, c), c);
}
function So(e) {
	return e[0] !== '$' && !Ln(e);
}
const Zi = e => e === '_' || e === '_ctx' || e === '$stable',
	eo = e => (Y(e) ? e.map(ht) : [ht(e)]),
	nc = (e, t, n) => {
		if (t._n) return t;
		const r = tn((...i) => eo(t(...i)), n);
		return ((r._c = !1), r);
	},
	_a = (e, t, n) => {
		const r = e._ctx;
		for (const i in e) {
			if (Zi(i)) continue;
			const o = e[i];
			if (Z(o)) t[i] = nc(i, o, r);
			else if (o != null) {
				const s = eo(o);
				t[i] = () => s;
			}
		}
	},
	xa = (e, t) => {
		const n = eo(t);
		e.slots.default = () => n;
	},
	Ta = (e, t, n) => {
		for (const r in t) (n || !Zi(r)) && (e[r] = t[r]);
	},
	rc = (e, t, n) => {
		const r = (e.slots = ga());
		if (e.vnode.shapeFlag & 32) {
			const i = t._;
			i ? (Ta(r, t, n), n && Ts(r, '_', i, !0)) : _a(t, r);
		} else t && xa(e, t);
	},
	ic = (e, t, n) => {
		const { vnode: r, slots: i } = e;
		let o = !0,
			s = ce;
		if (r.shapeFlag & 32) {
			const a = t._;
			(a ? (n && a === 1 ? (o = !1) : Ta(i, t, n)) : ((o = !t.$stable), _a(t, i)), (s = t));
		} else t && (xa(e, t), (s = { default: 1 }));
		if (o) for (const a in i) !Zi(a) && s[a] == null && delete i[a];
	},
	ze = uc;
function oc(e) {
	return sc(e);
}
function sc(e, t) {
	const n = jr();
	n.__VUE__ = !0;
	const {
			insert: r,
			remove: i,
			patchProp: o,
			createElement: s,
			createText: a,
			createComment: l,
			setText: c,
			setElementText: u,
			parentNode: d,
			nextSibling: g,
			setScopeId: v = mt,
			insertStaticContent: y,
		} = e,
		b = (p, h, w, P = null, E = null, A = null, F = void 0, $ = null, I = !!h.dynamicChildren) => {
			if (p === h) return;
			(p && !Qt(p, h) && ((P = Pe(p)), ye(p, E, A, !0), (p = null)),
				h.patchFlag === -2 && ((I = !1), (h.dynamicChildren = null)));
			const { type: S, ref: z, shapeFlag: N } = h;
			switch (S) {
				case Qr:
					C(p, h, w, P);
					break;
				case ke:
					m(p, h, w, P);
					break;
				case di:
					p == null && x(h, w, P, F);
					break;
				case xe:
					M(p, h, w, P, E, A, F, $, I);
					break;
				default:
					N & 1
						? D(p, h, w, P, E, A, F, $, I)
						: N & 6
							? Q(p, h, w, P, E, A, F, $, I)
							: (N & 64 || N & 128) && S.process(p, h, w, P, E, A, F, $, I, je);
			}
			z != null && E ? Fn(z, p && p.ref, A, h || p, !h) : z == null && p && p.ref != null && Fn(p.ref, null, A, p, !0);
		},
		C = (p, h, w, P) => {
			if (p == null) r((h.el = a(h.children)), w, P);
			else {
				const E = (h.el = p.el);
				h.children !== p.children && c(E, h.children);
			}
		},
		m = (p, h, w, P) => {
			p == null ? r((h.el = l(h.children || '')), w, P) : (h.el = p.el);
		},
		x = (p, h, w, P) => {
			[p.el, p.anchor] = y(p.children, h, w, P, p.el, p.anchor);
		},
		R = ({ el: p, anchor: h }, w, P) => {
			let E;
			for (; p && p !== h; ) ((E = g(p)), r(p, w, P), (p = E));
			r(h, w, P);
		},
		f = ({ el: p, anchor: h }) => {
			let w;
			for (; p && p !== h; ) ((w = g(p)), i(p), (p = w));
			i(h);
		},
		D = (p, h, w, P, E, A, F, $, I) => {
			if ((h.type === 'svg' ? (F = 'svg') : h.type === 'math' && (F = 'mathml'), p == null)) O(h, w, P, E, A, F, $, I);
			else {
				const S = p.el && p.el._isVueCE ? p.el : null;
				try {
					(S && S._beginPatch(), k(p, h, E, A, F, $, I));
				} finally {
					S && S._endPatch();
				}
			}
		},
		O = (p, h, w, P, E, A, F, $) => {
			let I, S;
			const { props: z, shapeFlag: N, transition: j, dirs: X } = p;
			if (
				((I = p.el = s(p.type, A, z && z.is, z)),
				N & 8 ? u(I, p.children) : N & 16 && L(p.children, I, null, P, E, fi(p, A), F, $),
				X && zt(p, null, P, 'created'),
				T(I, p, p.scopeId, F, P),
				z)
			) {
				for (const ue in z) ue !== 'value' && !Ln(ue) && o(I, ue, null, z[ue], A, P);
				('value' in z && o(I, 'value', null, z.value, A), (S = z.onVnodeBeforeMount) && ft(S, P, p));
			}
			X && zt(p, null, P, 'beforeMount');
			const ne = ac(E, j);
			(ne && j.beforeEnter(I),
				r(I, h, w),
				((S = z && z.onVnodeMounted) || ne || X) &&
					ze(() => {
						(S && ft(S, P, p), ne && j.enter(I), X && zt(p, null, P, 'mounted'));
					}, E));
		},
		T = (p, h, w, P, E) => {
			if ((w && v(p, w), P)) for (let A = 0; A < P.length; A++) v(p, P[A]);
			if (E) {
				let A = E.subTree;
				if (h === A || (Sa(A.type) && (A.ssContent === h || A.ssFallback === h))) {
					const F = E.vnode;
					T(p, F, F.scopeId, F.slotScopeIds, E.parent);
				}
			}
		},
		L = (p, h, w, P, E, A, F, $, I = 0) => {
			for (let S = I; S < p.length; S++) {
				const z = (p[S] = $ ? Nt(p[S]) : ht(p[S]));
				b(null, z, h, w, P, E, A, F, $);
			}
		},
		k = (p, h, w, P, E, A, F) => {
			const $ = (h.el = p.el);
			let { patchFlag: I, dynamicChildren: S, dirs: z } = h;
			I |= p.patchFlag & 16;
			const N = p.props || ce,
				j = h.props || ce;
			let X;
			if (
				(w && Kt(w, !1),
				(X = j.onVnodeBeforeUpdate) && ft(X, w, h, p),
				z && zt(h, p, w, 'beforeUpdate'),
				w && Kt(w, !0),
				((N.innerHTML && j.innerHTML == null) || (N.textContent && j.textContent == null)) && u($, ''),
				S ? B(p.dynamicChildren, S, $, w, P, fi(h, E), A) : F || W(p, h, $, null, w, P, fi(h, E), A, !1),
				I > 0)
			) {
				if (I & 16) K($, N, j, w, E);
				else if (
					(I & 2 && N.class !== j.class && o($, 'class', null, j.class, E),
					I & 4 && o($, 'style', N.style, j.style, E),
					I & 8)
				) {
					const ne = h.dynamicProps;
					for (let ue = 0; ue < ne.length; ue++) {
						const oe = ne[ue],
							De = N[oe],
							Me = j[oe];
						(Me !== De || oe === 'value') && o($, oe, De, Me, E, w);
					}
				}
				I & 1 && p.children !== h.children && u($, h.children);
			} else !F && S == null && K($, N, j, w, E);
			((X = j.onVnodeUpdated) || z) &&
				ze(() => {
					(X && ft(X, w, h, p), z && zt(h, p, w, 'updated'));
				}, P);
		},
		B = (p, h, w, P, E, A, F) => {
			for (let $ = 0; $ < h.length; $++) {
				const I = p[$],
					S = h[$],
					z = I.el && (I.type === xe || !Qt(I, S) || I.shapeFlag & 198) ? d(I.el) : w;
				b(I, S, z, null, P, E, A, F, !0);
			}
		},
		K = (p, h, w, P, E) => {
			if (h !== w) {
				if (h !== ce) for (const A in h) !Ln(A) && !(A in w) && o(p, A, h[A], null, E, P);
				for (const A in w) {
					if (Ln(A)) continue;
					const F = w[A],
						$ = h[A];
					F !== $ && A !== 'value' && o(p, A, $, F, E, P);
				}
				'value' in w && o(p, 'value', h.value, w.value, E);
			}
		},
		M = (p, h, w, P, E, A, F, $, I) => {
			const S = (h.el = p ? p.el : a('')),
				z = (h.anchor = p ? p.anchor : a(''));
			let { patchFlag: N, dynamicChildren: j, slotScopeIds: X } = h;
			(X && ($ = $ ? $.concat(X) : X),
				p == null
					? (r(S, w, P), r(z, w, P), L(h.children || [], w, z, E, A, F, $, I))
					: N > 0 && N & 64 && j && p.dynamicChildren
						? (B(p.dynamicChildren, j, w, E, A, F, $), (h.key != null || (E && h === E.subTree)) && Ca(p, h, !0))
						: W(p, h, w, z, E, A, F, $, I));
		},
		Q = (p, h, w, P, E, A, F, $, I) => {
			((h.slotScopeIds = $),
				p == null ? (h.shapeFlag & 512 ? E.ctx.activate(h, w, P, F, I) : te(h, w, P, E, A, F, I)) : me(p, h, I));
		},
		te = (p, h, w, P, E, A, F) => {
			const $ = (p.component = gc(p, P, E));
			if ((Yr(p) && ($.ctx.renderer = je), yc($, !1, F), $.asyncDep)) {
				if ((E && E.registerDep($, ee, F), !p.el)) {
					const I = ($.subTree = Ae(ke));
					(m(null, I, h, w), (p.placeholder = I.el));
				}
			} else ee($, p, h, w, E, A, F);
		},
		me = (p, h, w) => {
			const P = (h.component = p.component);
			if (Qu(p, h, w))
				if (P.asyncDep && !P.asyncResolved) {
					q(P, h, w);
					return;
				} else ((P.next = h), P.update());
			else ((h.el = p.el), (P.vnode = h));
		},
		ee = (p, h, w, P, E, A, F) => {
			const $ = () => {
				if (p.isMounted) {
					let { next: N, bu: j, u: X, parent: ne, vnode: ue } = p;
					{
						const Je = Oa(p);
						if (Je) {
							(N && ((N.el = ue.el), q(p, N, F)),
								Je.asyncDep.then(() => {
									p.isUnmounted || $();
								}));
							return;
						}
					}
					let oe = N,
						De;
					(Kt(p, !1),
						N ? ((N.el = ue.el), q(p, N, F)) : (N = ue),
						j && vr(j),
						(De = N.props && N.props.onVnodeBeforeUpdate) && ft(De, ne, N, ue),
						Kt(p, !0));
					const Me = Co(p),
						Qe = p.subTree;
					((p.subTree = Me),
						b(Qe, Me, d(Qe.el), Pe(Qe), p, E, A),
						(N.el = Me.el),
						oe === null && Ju(p, Me.el),
						X && ze(X, E),
						(De = N.props && N.props.onVnodeUpdated) && ze(() => ft(De, ne, N, ue), E));
				} else {
					let N;
					const { el: j, props: X } = h,
						{ bm: ne, m: ue, parent: oe, root: De, type: Me } = p,
						Qe = Nn(h);
					(Kt(p, !1), ne && vr(ne), !Qe && (N = X && X.onVnodeBeforeMount) && ft(N, oe, h), Kt(p, !0));
					{
						De.ce && De.ce._def.shadowRoot !== !1 && De.ce._injectChildStyle(Me);
						const Je = (p.subTree = Co(p));
						(b(null, Je, w, P, p, E, A), (h.el = Je.el));
					}
					if ((ue && ze(ue, E), !Qe && (N = X && X.onVnodeMounted))) {
						const Je = h;
						ze(() => ft(N, oe, Je), E);
					}
					((h.shapeFlag & 256 || (oe && Nn(oe.vnode) && oe.vnode.shapeFlag & 256)) && p.a && ze(p.a, E),
						(p.isMounted = !0),
						(h = w = P = null));
				}
			};
			p.scope.on();
			const I = (p.effect = new Ds($));
			p.scope.off();
			const S = (p.update = I.run.bind(I)),
				z = (p.job = I.runIfDirty.bind(I));
			((z.i = p), (z.id = p.uid), (I.scheduler = () => Gi(z)), Kt(p, !0), S());
		},
		q = (p, h, w) => {
			h.component = p;
			const P = p.vnode.props;
			((p.vnode = h), (p.next = null), ec(p, h.props, P, w), ic(p, h.children, w), Pt(), go(p), Dt());
		},
		W = (p, h, w, P, E, A, F, $, I = !1) => {
			const S = p && p.children,
				z = p ? p.shapeFlag : 0,
				N = h.children,
				{ patchFlag: j, shapeFlag: X } = h;
			if (j > 0) {
				if (j & 128) {
					ge(S, N, w, P, E, A, F, $, I);
					return;
				} else if (j & 256) {
					be(S, N, w, P, E, A, F, $, I);
					return;
				}
			}
			X & 8
				? (z & 16 && ae(S, E, A), N !== S && u(w, N))
				: z & 16
					? X & 16
						? ge(S, N, w, P, E, A, F, $, I)
						: ae(S, E, A, !0)
					: (z & 8 && u(w, ''), X & 16 && L(N, w, P, E, A, F, $, I));
		},
		be = (p, h, w, P, E, A, F, $, I) => {
			((p = p || hn), (h = h || hn));
			const S = p.length,
				z = h.length,
				N = Math.min(S, z);
			let j;
			for (j = 0; j < N; j++) {
				const X = (h[j] = I ? Nt(h[j]) : ht(h[j]));
				b(p[j], X, w, null, E, A, F, $, I);
			}
			S > z ? ae(p, E, A, !0, !1, N) : L(h, w, P, E, A, F, $, I, N);
		},
		ge = (p, h, w, P, E, A, F, $, I) => {
			let S = 0;
			const z = h.length;
			let N = p.length - 1,
				j = z - 1;
			for (; S <= N && S <= j; ) {
				const X = p[S],
					ne = (h[S] = I ? Nt(h[S]) : ht(h[S]));
				if (Qt(X, ne)) b(X, ne, w, null, E, A, F, $, I);
				else break;
				S++;
			}
			for (; S <= N && S <= j; ) {
				const X = p[N],
					ne = (h[j] = I ? Nt(h[j]) : ht(h[j]));
				if (Qt(X, ne)) b(X, ne, w, null, E, A, F, $, I);
				else break;
				(N--, j--);
			}
			if (S > N) {
				if (S <= j) {
					const X = j + 1,
						ne = X < z ? h[X].el : P;
					for (; S <= j; ) (b(null, (h[S] = I ? Nt(h[S]) : ht(h[S])), w, ne, E, A, F, $, I), S++);
				}
			} else if (S > j) for (; S <= N; ) (ye(p[S], E, A, !0), S++);
			else {
				const X = S,
					ne = S,
					ue = new Map();
				for (S = ne; S <= j; S++) {
					const H = (h[S] = I ? Nt(h[S]) : ht(h[S]));
					H.key != null && ue.set(H.key, S);
				}
				let oe,
					De = 0;
				const Me = j - ne + 1;
				let Qe = !1,
					Je = 0;
				const Ut = new Array(Me);
				for (S = 0; S < Me; S++) Ut[S] = 0;
				for (S = X; S <= N; S++) {
					const H = p[S];
					if (De >= Me) {
						ye(H, E, A, !0);
						continue;
					}
					let V;
					if (H.key != null) V = ue.get(H.key);
					else
						for (oe = ne; oe <= j; oe++)
							if (Ut[oe - ne] === 0 && Qt(H, h[oe])) {
								V = oe;
								break;
							}
					V === void 0
						? ye(H, E, A, !0)
						: ((Ut[V - ne] = S + 1), V >= Je ? (Je = V) : (Qe = !0), b(H, h[V], w, null, E, A, F, $, I), De++);
				}
				const _ = Qe ? lc(Ut) : hn;
				for (oe = _.length - 1, S = Me - 1; S >= 0; S--) {
					const H = ne + S,
						V = h[H],
						le = h[H + 1],
						ie = H + 1 < z ? le.el || le.placeholder : P;
					Ut[S] === 0 ? b(null, V, w, ie, E, A, F, $, I) : Qe && (oe < 0 || S !== _[oe] ? we(V, w, ie, 2) : oe--);
				}
			}
		},
		we = (p, h, w, P, E = null) => {
			const { el: A, type: F, transition: $, children: I, shapeFlag: S } = p;
			if (S & 6) {
				we(p.component.subTree, h, w, P);
				return;
			}
			if (S & 128) {
				p.suspense.move(h, w, P);
				return;
			}
			if (S & 64) {
				F.move(p, h, w, je);
				return;
			}
			if (F === xe) {
				r(A, h, w);
				for (let N = 0; N < I.length; N++) we(I[N], h, w, P);
				r(p.anchor, h, w);
				return;
			}
			if (F === di) {
				R(p, h, w);
				return;
			}
			if (P !== 2 && S & 1 && $)
				if (P === 0) ($.beforeEnter(A), r(A, h, w), ze(() => $.enter(A), E));
				else {
					const { leave: N, delayLeave: j, afterLeave: X } = $,
						ne = () => {
							p.ctx.isUnmounted ? i(A) : r(A, h, w);
						},
						ue = () => {
							(A._isLeaving && A[Ct](!0),
								N(A, () => {
									(ne(), X && X());
								}));
						};
					j ? j(A, ne, ue) : ue();
				}
			else r(A, h, w);
		},
		ye = (p, h, w, P = !1, E = !1) => {
			const {
				type: A,
				props: F,
				ref: $,
				children: I,
				dynamicChildren: S,
				shapeFlag: z,
				patchFlag: N,
				dirs: j,
				cacheIndex: X,
			} = p;
			if (
				(N === -2 && (E = !1),
				$ != null && (Pt(), Fn($, null, w, p, !0), Dt()),
				X != null && (h.renderCache[X] = void 0),
				z & 256)
			) {
				h.ctx.deactivate(p);
				return;
			}
			const ne = z & 1 && j,
				ue = !Nn(p);
			let oe;
			if ((ue && (oe = F && F.onVnodeBeforeUnmount) && ft(oe, h, p), z & 6)) _e(p.component, w, P);
			else {
				if (z & 128) {
					p.suspense.unmount(w, P);
					return;
				}
				(ne && zt(p, null, h, 'beforeUnmount'),
					z & 64
						? p.type.remove(p, h, w, je, P)
						: S && !S.hasOnce && (A !== xe || (N > 0 && N & 64))
							? ae(S, h, w, !1, !0)
							: ((A === xe && N & 384) || (!E && z & 16)) && ae(I, h, w),
					P && Ue(p));
			}
			((ue && (oe = F && F.onVnodeUnmounted)) || ne) &&
				ze(() => {
					(oe && ft(oe, h, p), ne && zt(p, null, h, 'unmounted'));
				}, w);
		},
		Ue = p => {
			const { type: h, el: w, anchor: P, transition: E } = p;
			if (h === xe) {
				Ee(w, P);
				return;
			}
			if (h === di) {
				f(p);
				return;
			}
			const A = () => {
				(i(w), E && !E.persisted && E.afterLeave && E.afterLeave());
			};
			if (p.shapeFlag & 1 && E && !E.persisted) {
				const { leave: F, delayLeave: $ } = E,
					I = () => F(w, A);
				$ ? $(p.el, A, I) : I();
			} else A();
		},
		Ee = (p, h) => {
			let w;
			for (; p !== h; ) ((w = g(p)), i(p), (p = w));
			i(h);
		},
		_e = (p, h, w) => {
			const { bum: P, scope: E, job: A, subTree: F, um: $, m: I, a: S } = p;
			(Eo(I),
				Eo(S),
				P && vr(P),
				E.stop(),
				A && ((A.flags |= 8), ye(F, p, h, w)),
				$ && ze($, h),
				ze(() => {
					p.isUnmounted = !0;
				}, h));
		},
		ae = (p, h, w, P = !1, E = !1, A = 0) => {
			for (let F = A; F < p.length; F++) ye(p[F], h, w, P, E);
		},
		Pe = p => {
			if (p.shapeFlag & 6) return Pe(p.component.subTree);
			if (p.shapeFlag & 128) return p.suspense.next();
			const h = g(p.anchor || p.el),
				w = h && h[mu];
			return w ? g(w) : h;
		};
	let We = !1;
	const _t = (p, h, w) => {
			(p == null ? h._vnode && ye(h._vnode, null, null, !0) : b(h._vnode || null, p, h, null, null, null, w),
				(h._vnode = p),
				We || ((We = !0), go(), Qs(), (We = !1)));
		},
		je = { p: b, um: ye, m: we, r: Ue, mt: te, mc: L, pc: W, pbc: B, n: Pe, o: e };
	return { render: _t, hydrate: void 0, createApp: ju(_t) };
}
function fi({ type: e, props: t }, n) {
	return (n === 'svg' && e === 'foreignObject') ||
		(n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
		? void 0
		: n;
}
function Kt({ effect: e, job: t }, n) {
	n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function ac(e, t) {
	return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ca(e, t, n = !1) {
	const r = e.children,
		i = t.children;
	if (Y(r) && Y(i))
		for (let o = 0; o < r.length; o++) {
			const s = r[o];
			let a = i[o];
			(a.shapeFlag & 1 &&
				!a.dynamicChildren &&
				((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = i[o] = Nt(i[o])), (a.el = s.el)),
				!n && a.patchFlag !== -2 && Ca(s, a)),
				a.type === Qr && a.patchFlag !== -1 && (a.el = s.el),
				a.type === ke && !a.el && (a.el = s.el));
		}
}
function lc(e) {
	const t = e.slice(),
		n = [0];
	let r, i, o, s, a;
	const l = e.length;
	for (r = 0; r < l; r++) {
		const c = e[r];
		if (c !== 0) {
			if (((i = n[n.length - 1]), e[i] < c)) {
				((t[r] = i), n.push(r));
				continue;
			}
			for (o = 0, s = n.length - 1; o < s; ) ((a = (o + s) >> 1), e[n[a]] < c ? (o = a + 1) : (s = a));
			c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
		}
	}
	for (o = n.length, s = n[o - 1]; o-- > 0; ) ((n[o] = s), (s = t[s]));
	return n;
}
function Oa(e) {
	const t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Oa(t);
}
function Eo(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Sa = e => e.__isSuspense;
function uc(e, t) {
	t && t.pendingBranch ? (Y(e) ? t.effects.push(...e) : t.effects.push(e)) : vu(e);
}
const xe = Symbol.for('v-fgt'),
	Qr = Symbol.for('v-txt'),
	ke = Symbol.for('v-cmt'),
	di = Symbol.for('v-stc'),
	kn = [];
let Ye = null;
function J(e = !1) {
	kn.push((Ye = e ? null : []));
}
function cc() {
	(kn.pop(), (Ye = kn[kn.length - 1] || null));
}
let zn = 1;
function Pr(e, t = !1) {
	((zn += e), e < 0 && Ye && t && (Ye.hasOnce = !0));
}
function Ea(e) {
	return ((e.dynamicChildren = zn > 0 ? Ye || hn : null), cc(), zn > 0 && Ye && Ye.push(e), e);
}
function re(e, t, n, r, i, o) {
	return Ea(G(e, t, n, r, i, o, !0));
}
function Ht(e, t, n, r, i) {
	return Ea(Ae(e, t, n, r, i, !0));
}
function Kn(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Qt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const Aa = ({ key: e }) => e ?? null,
	gr = ({ ref: e, ref_key: t, ref_for: n }) => (
		typeof e == 'number' && (e = '' + e),
		e != null ? (Te(e) || pe(e) || Z(e) ? { i: Ke, r: e, k: t, f: !!n } : e) : null
	);
function G(e, t = null, n = null, r = 0, i = null, o = e === xe ? 0 : 1, s = !1, a = !1) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Aa(t),
		ref: t && gr(t),
		scopeId: Zs,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: o,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Ke,
	};
	return (
		a ? (to(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= Te(n) ? 8 : 16),
		zn > 0 && !s && Ye && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && Ye.push(l),
		l
	);
}
const Ae = fc;
function fc(e, t = null, n = null, r = 0, i = null, o = !1) {
	if (((!e || e === Pu) && (e = ke), Kn(e))) {
		const a = kt(e, t, !0);
		return (
			n && to(a, n),
			zn > 0 && !o && Ye && (a.shapeFlag & 6 ? (Ye[Ye.indexOf(e)] = a) : Ye.push(a)),
			(a.patchFlag = -2),
			a
		);
	}
	if ((xc(e) && (e = e.__vccOpts), t)) {
		t = dc(t);
		let { class: a, style: l } = t;
		(a && !Te(a) && (t.class = bn(a)), he(l) && (zr(l) && !Y(l) && (l = Se({}, l)), (t.style = Wi(l))));
	}
	const s = Te(e) ? 1 : Sa(e) ? 128 : ea(e) ? 64 : he(e) ? 4 : Z(e) ? 2 : 0;
	return G(e, t, n, r, i, s, o, !0);
}
function dc(e) {
	return e ? (zr(e) || ya(e) ? Se({}, e) : e) : null;
}
function kt(e, t, n = !1, r = !1) {
	const { props: i, ref: o, patchFlag: s, children: a, transition: l } = e,
		c = t ? hc(i || {}, t) : i,
		u = {
			__v_isVNode: !0,
			__v_skip: !0,
			type: e.type,
			props: c,
			key: c && Aa(c),
			ref: t && t.ref ? (n && o ? (Y(o) ? o.concat(gr(t)) : [o, gr(t)]) : gr(t)) : o,
			scopeId: e.scopeId,
			slotScopeIds: e.slotScopeIds,
			children: a,
			target: e.target,
			targetStart: e.targetStart,
			targetAnchor: e.targetAnchor,
			staticCount: e.staticCount,
			shapeFlag: e.shapeFlag,
			patchFlag: t && e.type !== xe ? (s === -1 ? 16 : s | 16) : s,
			dynamicProps: e.dynamicProps,
			dynamicChildren: e.dynamicChildren,
			appContext: e.appContext,
			dirs: e.dirs,
			transition: l,
			component: e.component,
			suspense: e.suspense,
			ssContent: e.ssContent && kt(e.ssContent),
			ssFallback: e.ssFallback && kt(e.ssFallback),
			placeholder: e.placeholder,
			el: e.el,
			anchor: e.anchor,
			ctx: e.ctx,
			ce: e.ce,
		};
	return (l && r && an(u, l.clone(u)), u);
}
function pc(e = ' ', t = 0) {
	return Ae(Qr, null, e, t);
}
function Oe(e = '', t = !1) {
	return t ? (J(), Ht(ke, null, e)) : Ae(ke, null, e);
}
function ht(e) {
	return e == null || typeof e == 'boolean'
		? Ae(ke)
		: Y(e)
			? Ae(xe, null, e.slice())
			: Kn(e)
				? Nt(e)
				: Ae(Qr, null, String(e));
}
function Nt(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : kt(e);
}
function to(e, t) {
	let n = 0;
	const { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (Y(t)) n = 16;
	else if (typeof t == 'object')
		if (r & 65) {
			const i = t.default;
			i && (i._c && (i._d = !1), to(e, i()), i._c && (i._d = !0));
			return;
		} else {
			n = 32;
			const i = t._;
			!i && !ya(t)
				? (t._ctx = Ke)
				: i === 3 && Ke && (Ke.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		Z(t) ? ((t = { default: t, _ctx: Ke }), (n = 32)) : ((t = String(t)), r & 64 ? ((n = 16), (t = [pc(t)])) : (n = 8));
	((e.children = t), (e.shapeFlag |= n));
}
function hc(...e) {
	const t = {};
	for (let n = 0; n < e.length; n++) {
		const r = e[n];
		for (const i in r)
			if (i === 'class') t.class !== r.class && (t.class = bn([t.class, r.class]));
			else if (i === 'style') t.style = Wi([t.style, r.style]);
			else if (Fr(i)) {
				const o = t[i],
					s = r[i];
				s && o !== s && !(Y(o) && o.includes(s)) && (t[i] = o ? [].concat(o, s) : s);
			} else i !== '' && (t[i] = r[i]);
	}
	return t;
}
function ft(e, t, n, r = null) {
	ut(e, t, 7, [n, r]);
}
const vc = da();
let mc = 0;
function gc(e, t, n) {
	const r = e.type,
		i = (t ? t.appContext : e.appContext) || vc,
		o = {
			uid: mc++,
			vnode: e,
			type: r,
			parent: t,
			appContext: i,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			job: null,
			scope: new As(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(i.provides),
			ids: t ? t.ids : ['', 0, 0],
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: wa(r, i),
			emitsOptions: va(r, i),
			emit: null,
			emitted: null,
			propsDefaults: ce,
			inheritAttrs: r.inheritAttrs,
			ctx: ce,
			data: ce,
			props: ce,
			attrs: ce,
			slots: ce,
			refs: ce,
			setupState: ce,
			setupContext: null,
			suspense: n,
			suspenseId: n ? n.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return ((o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = Ku.bind(null, o)), e.ce && e.ce(o), o);
}
let $e = null;
const er = () => $e || Ke;
let Dr, Ii;
{
	const e = jr(),
		t = (n, r) => {
			let i;
			return (
				(i = e[n]) || (i = e[n] = []),
				i.push(r),
				o => {
					i.length > 1 ? i.forEach(s => s(o)) : i[0](o);
				}
			);
		};
	((Dr = t('__VUE_INSTANCE_SETTERS__', n => ($e = n))), (Ii = t('__VUE_SSR_SETTERS__', n => (Yn = n))));
}
const tr = e => {
		const t = $e;
		return (
			Dr(e),
			e.scope.on(),
			() => {
				(e.scope.off(), Dr(t));
			}
		);
	},
	Ao = () => {
		($e && $e.scope.off(), Dr(null));
	};
function Pa(e) {
	return e.vnode.shapeFlag & 4;
}
let Yn = !1;
function yc(e, t = !1, n = !1) {
	t && Ii(t);
	const { props: r, children: i } = e.vnode,
		o = Pa(e);
	(Zu(e, r, o, t), rc(e, i, n || t));
	const s = o ? bc(e, t) : void 0;
	return (t && Ii(!1), s);
}
function bc(e, t) {
	const n = e.type;
	((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Iu)));
	const { setup: r } = n;
	if (r) {
		Pt();
		const i = (e.setupContext = r.length > 1 ? _c(e) : null),
			o = tr(e),
			s = Zn(r, e, 0, [e.props, i]),
			a = ws(s);
		if ((Dt(), o(), (a || e.sp) && !Nn(e) && sa(e), a)) {
			if ((s.then(Ao, Ao), t))
				return s
					.then(l => {
						Po(e, l);
					})
					.catch(l => {
						Kr(l, e, 0);
					});
			e.asyncDep = s;
		} else Po(e, s);
	} else Da(e);
}
function Po(e, t, n) {
	(Z(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : he(t) && (e.setupState = Ks(t)), Da(e));
}
function Da(e, t, n) {
	const r = e.type;
	e.render || (e.render = r.render || mt);
	{
		const i = tr(e);
		Pt();
		try {
			$u(e);
		} finally {
			(Dt(), i());
		}
	}
}
const wc = {
	get(e, t) {
		return (Le(e, 'get', ''), e[t]);
	},
};
function _c(e) {
	const t = n => {
		e.exposed = n || {};
	};
	return { attrs: new Proxy(e.attrs, wc), slots: e.slots, emit: e.emit, expose: t };
}
function Jr(e) {
	return e.exposed
		? e.exposeProxy ||
				(e.exposeProxy = new Proxy(Ks(tu(e.exposed)), {
					get(t, n) {
						if (n in t) return t[n];
						if (n in Hn) return Hn[n](e);
					},
					has(t, n) {
						return n in t || n in Hn;
					},
				}))
		: e.proxy;
}
function xc(e) {
	return Z(e) && '__vccOpts' in e;
}
const jt = (e, t) => cu(e, t, Yn);
function Zt(e, t, n) {
	try {
		Pr(-1);
		const r = arguments.length;
		return r === 2
			? he(t) && !Y(t)
				? Kn(t)
					? Ae(e, null, [t])
					: Ae(e, t)
				: Ae(e, null, t)
			: (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Kn(n) && (n = [n]), Ae(e, t, n));
	} finally {
		Pr(1);
	}
}
const Tc = '3.5.25';
let Li;
const Do = typeof window < 'u' && window.trustedTypes;
if (Do)
	try {
		Li = Do.createPolicy('vue', { createHTML: e => e });
	} catch {}
const Ma = Li ? e => Li.createHTML(e) : e => e,
	Cc = 'http://www.w3.org/2000/svg',
	Oc = 'http://www.w3.org/1998/Math/MathML',
	Tt = typeof document < 'u' ? document : null,
	Mo = Tt && Tt.createElement('template'),
	Sc = {
		insert: (e, t, n) => {
			t.insertBefore(e, n || null);
		},
		remove: e => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, n, r) => {
			const i =
				t === 'svg'
					? Tt.createElementNS(Cc, e)
					: t === 'mathml'
						? Tt.createElementNS(Oc, e)
						: n
							? Tt.createElement(e, { is: n })
							: Tt.createElement(e);
			return (e === 'select' && r && r.multiple != null && i.setAttribute('multiple', r.multiple), i);
		},
		createText: e => Tt.createTextNode(e),
		createComment: e => Tt.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: e => e.parentNode,
		nextSibling: e => e.nextSibling,
		querySelector: e => Tt.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, '');
		},
		insertStaticContent(e, t, n, r, i, o) {
			const s = n ? n.previousSibling : t.lastChild;
			if (i && (i === o || i.nextSibling))
				for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); );
			else {
				Mo.innerHTML = Ma(r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e);
				const a = Mo.content;
				if (r === 'svg' || r === 'mathml') {
					const l = a.firstChild;
					for (; l.firstChild; ) a.appendChild(l.firstChild);
					a.removeChild(l);
				}
				t.insertBefore(a, n);
			}
			return [s ? s.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
		},
	},
	Lt = 'transition',
	Dn = 'animation',
	xn = Symbol('_vtc'),
	Ia = {
		name: String,
		type: String,
		css: { type: Boolean, default: !0 },
		duration: [String, Number, Object],
		enterFromClass: String,
		enterActiveClass: String,
		enterToClass: String,
		appearFromClass: String,
		appearActiveClass: String,
		appearToClass: String,
		leaveFromClass: String,
		leaveActiveClass: String,
		leaveToClass: String,
	},
	La = Se({}, na, Ia),
	Ec = e => ((e.displayName = 'Transition'), (e.props = La), e),
	Mr = Ec((e, { slots: t }) => Zt(yu, $a(e), t)),
	Yt = (e, t = []) => {
		Y(e) ? e.forEach(n => n(...t)) : e && e(...t);
	},
	Io = e => (e ? (Y(e) ? e.some(t => t.length > 1) : e.length > 1) : !1);
function $a(e) {
	const t = {};
	for (const M in e) M in Ia || (t[M] = e[M]);
	if (e.css === !1) return t;
	const {
			name: n = 'v',
			type: r,
			duration: i,
			enterFromClass: o = `${n}-enter-from`,
			enterActiveClass: s = `${n}-enter-active`,
			enterToClass: a = `${n}-enter-to`,
			appearFromClass: l = o,
			appearActiveClass: c = s,
			appearToClass: u = a,
			leaveFromClass: d = `${n}-leave-from`,
			leaveActiveClass: g = `${n}-leave-active`,
			leaveToClass: v = `${n}-leave-to`,
		} = e,
		y = Ac(i),
		b = y && y[0],
		C = y && y[1],
		{
			onBeforeEnter: m,
			onEnter: x,
			onEnterCancelled: R,
			onLeave: f,
			onLeaveCancelled: D,
			onBeforeAppear: O = m,
			onAppear: T = x,
			onAppearCancelled: L = R,
		} = t,
		k = (M, Q, te, me) => {
			((M._enterCancelled = me), $t(M, Q ? u : a), $t(M, Q ? c : s), te && te());
		},
		B = (M, Q) => {
			((M._isLeaving = !1), $t(M, d), $t(M, v), $t(M, g), Q && Q());
		},
		K = M => (Q, te) => {
			const me = M ? T : x,
				ee = () => k(Q, M, te);
			(Yt(me, [Q, ee]),
				Lo(() => {
					($t(Q, M ? l : o), dt(Q, M ? u : a), Io(me) || $o(Q, r, b, ee));
				}));
		};
	return Se(t, {
		onBeforeEnter(M) {
			(Yt(m, [M]), dt(M, o), dt(M, s));
		},
		onBeforeAppear(M) {
			(Yt(O, [M]), dt(M, l), dt(M, c));
		},
		onEnter: K(!1),
		onAppear: K(!0),
		onLeave(M, Q) {
			M._isLeaving = !0;
			const te = () => B(M, Q);
			(dt(M, d),
				M._enterCancelled ? (dt(M, g), $i(M)) : ($i(M), dt(M, g)),
				Lo(() => {
					M._isLeaving && ($t(M, d), dt(M, v), Io(f) || $o(M, r, C, te));
				}),
				Yt(f, [M, te]));
		},
		onEnterCancelled(M) {
			(k(M, !1, void 0, !0), Yt(R, [M]));
		},
		onAppearCancelled(M) {
			(k(M, !0, void 0, !0), Yt(L, [M]));
		},
		onLeaveCancelled(M) {
			(B(M), Yt(D, [M]));
		},
	});
}
function Ac(e) {
	if (e == null) return null;
	if (he(e)) return [pi(e.enter), pi(e.leave)];
	{
		const t = pi(e);
		return [t, t];
	}
}
function pi(e) {
	return Cl(e);
}
function dt(e, t) {
	(t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e[xn] || (e[xn] = new Set())).add(t));
}
function $t(e, t) {
	t.split(/\s+/).forEach(r => r && e.classList.remove(r));
	const n = e[xn];
	n && (n.delete(t), n.size || (e[xn] = void 0));
}
function Lo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
let Pc = 0;
function $o(e, t, n, r) {
	const i = (e._endId = ++Pc),
		o = () => {
			i === e._endId && r();
		};
	if (n != null) return setTimeout(o, n);
	const { type: s, timeout: a, propCount: l } = Ra(e, t);
	if (!s) return r();
	const c = s + 'end';
	let u = 0;
	const d = () => {
			(e.removeEventListener(c, g), o());
		},
		g = v => {
			v.target === e && ++u >= l && d();
		};
	(setTimeout(() => {
		u < l && d();
	}, a + 1),
		e.addEventListener(c, g));
}
function Ra(e, t) {
	const n = window.getComputedStyle(e),
		r = y => (n[y] || '').split(', '),
		i = r(`${Lt}Delay`),
		o = r(`${Lt}Duration`),
		s = Ro(i, o),
		a = r(`${Dn}Delay`),
		l = r(`${Dn}Duration`),
		c = Ro(a, l);
	let u = null,
		d = 0,
		g = 0;
	t === Lt
		? s > 0 && ((u = Lt), (d = s), (g = o.length))
		: t === Dn
			? c > 0 && ((u = Dn), (d = c), (g = l.length))
			: ((d = Math.max(s, c)), (u = d > 0 ? (s > c ? Lt : Dn) : null), (g = u ? (u === Lt ? o.length : l.length) : 0));
	const v = u === Lt && /\b(?:transform|all)(?:,|$)/.test(r(`${Lt}Property`).toString());
	return { type: u, timeout: d, propCount: g, hasTransform: v };
}
function Ro(e, t) {
	for (; e.length < t.length; ) e = e.concat(e);
	return Math.max(...t.map((n, r) => Fo(n) + Fo(e[r])));
}
function Fo(e) {
	return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function $i(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Dc(e, t, n) {
	const r = e[xn];
	(r && (t = (t ? [t, ...r] : [...r]).join(' ')),
		t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t));
}
const No = Symbol('_vod'),
	Mc = Symbol('_vsh'),
	Ic = Symbol(''),
	Lc = /(?:^|;)\s*display\s*:/;
function $c(e, t, n) {
	const r = e.style,
		i = Te(n);
	let o = !1;
	if (n && !i) {
		if (t)
			if (Te(t))
				for (const s of t.split(';')) {
					const a = s.slice(0, s.indexOf(':')).trim();
					n[a] == null && yr(r, a, '');
				}
			else for (const s in t) n[s] == null && yr(r, s, '');
		for (const s in n) (s === 'display' && (o = !0), yr(r, s, n[s]));
	} else if (i) {
		if (t !== n) {
			const s = r[Ic];
			(s && (n += ';' + s), (r.cssText = n), (o = Lc.test(n)));
		}
	} else t && e.removeAttribute('style');
	No in e && ((e[No] = o ? r.display : ''), e[Mc] && (r.display = 'none'));
}
const Ho = /\s*!important$/;
function yr(e, t, n) {
	if (Y(n)) n.forEach(r => yr(e, t, r));
	else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
	else {
		const r = Rc(e, t);
		Ho.test(n) ? e.setProperty(Bt(r), n.replace(Ho, ''), 'important') : (e[r] = n);
	}
}
const ko = ['Webkit', 'Moz', 'ms'],
	hi = {};
function Rc(e, t) {
	const n = hi[t];
	if (n) return n;
	let r = at(t);
	if (r !== 'filter' && r in e) return (hi[t] = r);
	r = Ui(r);
	for (let i = 0; i < ko.length; i++) {
		const o = ko[i] + r;
		if (o in e) return (hi[t] = o);
	}
	return t;
}
const jo = 'http://www.w3.org/1999/xlink';
function Bo(e, t, n, r, i, o = Dl(t)) {
	r && t.startsWith('xlink:')
		? n == null
			? e.removeAttributeNS(jo, t.slice(6, t.length))
			: e.setAttributeNS(jo, t, n)
		: n == null || (o && !Cs(n))
			? e.removeAttribute(t)
			: e.setAttribute(t, o ? '' : yt(n) ? String(n) : n);
}
function qo(e, t, n, r, i) {
	if (t === 'innerHTML' || t === 'textContent') {
		n != null && (e[t] = t === 'innerHTML' ? Ma(n) : n);
		return;
	}
	const o = e.tagName;
	if (t === 'value' && o !== 'PROGRESS' && !o.includes('-')) {
		const a = o === 'OPTION' ? e.getAttribute('value') || '' : e.value,
			l = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
		((a !== l || !('_value' in e)) && (e.value = l), n == null && e.removeAttribute(t), (e._value = n));
		return;
	}
	let s = !1;
	if (n === '' || n == null) {
		const a = typeof e[t];
		a === 'boolean'
			? (n = Cs(n))
			: n == null && a === 'string'
				? ((n = ''), (s = !0))
				: a === 'number' && ((n = 0), (s = !0));
	}
	try {
		e[t] = n;
	} catch {}
	s && e.removeAttribute(i || t);
}
function no(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function Fc(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
const Vo = Symbol('_vei');
function Nc(e, t, n, r, i = null) {
	const o = e[Vo] || (e[Vo] = {}),
		s = o[t];
	if (r && s) s.value = r;
	else {
		const [a, l] = Hc(t);
		if (r) {
			const c = (o[t] = Bc(r, i));
			no(e, a, c, l);
		} else s && (Fc(e, a, s, l), (o[t] = void 0));
	}
}
const Uo = /(?:Once|Passive|Capture)$/;
function Hc(e) {
	let t;
	if (Uo.test(e)) {
		t = {};
		let r;
		for (; (r = e.match(Uo)); ) ((e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0));
	}
	return [e[2] === ':' ? e.slice(3) : Bt(e.slice(2)), t];
}
let vi = 0;
const kc = Promise.resolve(),
	jc = () => vi || (kc.then(() => (vi = 0)), (vi = Date.now()));
function Bc(e, t) {
	const n = r => {
		if (!r._vts) r._vts = Date.now();
		else if (r._vts <= n.attached) return;
		ut(qc(r, n.value), t, 5, [r]);
	};
	return ((n.value = e), (n.attached = jc()), n);
}
function qc(e, t) {
	if (Y(t)) {
		const n = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				(n.call(e), (e._stopped = !0));
			}),
			t.map(r => i => !i._stopped && r && r(i))
		);
	} else return t;
}
const Wo = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
	Vc = (e, t, n, r, i, o) => {
		const s = i === 'svg';
		t === 'class'
			? Dc(e, r, s)
			: t === 'style'
				? $c(e, n, r)
				: Fr(t)
					? qi(t) || Nc(e, t, n, r, o)
					: (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : Uc(e, t, r, s))
						? (qo(e, t, r),
							!e.tagName.includes('-') &&
								(t === 'value' || t === 'checked' || t === 'selected') &&
								Bo(e, t, r, s, o, t !== 'value'))
						: e._isVueCE && (/[A-Z]/.test(t) || !Te(r))
							? qo(e, at(t), r, o, t)
							: (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r), Bo(e, t, r, s));
	};
function Uc(e, t, n, r) {
	if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Wo(t) && Z(n)));
	if (
		t === 'spellcheck' ||
		t === 'draggable' ||
		t === 'translate' ||
		t === 'autocorrect' ||
		(t === 'sandbox' && e.tagName === 'IFRAME') ||
		t === 'form' ||
		(t === 'list' && e.tagName === 'INPUT') ||
		(t === 'type' && e.tagName === 'TEXTAREA')
	)
		return !1;
	if (t === 'width' || t === 'height') {
		const i = e.tagName;
		if (i === 'IMG' || i === 'VIDEO' || i === 'CANVAS' || i === 'SOURCE') return !1;
	}
	return Wo(t) && Te(n) ? !1 : t in e;
}
const Fa = new WeakMap(),
	Na = new WeakMap(),
	Ir = Symbol('_moveCb'),
	zo = Symbol('_enterCb'),
	Wc = e => (delete e.props.mode, e),
	zc = Wc({
		name: 'TransitionGroup',
		props: Se({}, La, { tag: String, moveClass: String }),
		setup(e, { slots: t }) {
			const n = er(),
				r = ta();
			let i, o;
			return (
				la(() => {
					if (!i.length) return;
					const s = e.moveClass || `${e.name || 'v'}-move`;
					if (!Xc(i[0].el, n.vnode.el, s)) {
						i = [];
						return;
					}
					(i.forEach(Kc), i.forEach(Yc));
					const a = i.filter(Gc);
					($i(n.vnode.el),
						a.forEach(l => {
							const c = l.el,
								u = c.style;
							(dt(c, s), (u.transform = u.webkitTransform = u.transitionDuration = ''));
							const d = (c[Ir] = g => {
								(g && g.target !== c) ||
									((!g || g.propertyName.endsWith('transform')) &&
										(c.removeEventListener('transitionend', d), (c[Ir] = null), $t(c, s)));
							});
							c.addEventListener('transitionend', d);
						}),
						(i = []));
				}),
				() => {
					const s = se(e),
						a = $a(s);
					let l = s.tag || xe;
					if (((i = []), o))
						for (let c = 0; c < o.length; c++) {
							const u = o[c];
							u.el &&
								u.el instanceof Element &&
								(i.push(u), an(u, Wn(u, a, r, n)), Fa.set(u, { left: u.el.offsetLeft, top: u.el.offsetTop }));
						}
					o = t.default ? Xi(t.default()) : [];
					for (let c = 0; c < o.length; c++) {
						const u = o[c];
						u.key != null && an(u, Wn(u, a, r, n));
					}
					return Ae(l, null, o);
				}
			);
		},
	}),
	Ha = zc;
function Kc(e) {
	const t = e.el;
	(t[Ir] && t[Ir](), t[zo] && t[zo]());
}
function Yc(e) {
	Na.set(e, { left: e.el.offsetLeft, top: e.el.offsetTop });
}
function Gc(e) {
	const t = Fa.get(e),
		n = Na.get(e),
		r = t.left - n.left,
		i = t.top - n.top;
	if (r || i) {
		const o = e.el.style;
		return ((o.transform = o.webkitTransform = `translate(${r}px,${i}px)`), (o.transitionDuration = '0s'), e);
	}
}
function Xc(e, t, n) {
	const r = e.cloneNode(),
		i = e[xn];
	(i &&
		i.forEach(a => {
			a.split(/\s+/).forEach(l => l && r.classList.remove(l));
		}),
		n.split(/\s+/).forEach(a => a && r.classList.add(a)),
		(r.style.display = 'none'));
	const o = t.nodeType === 1 ? t : t.parentNode;
	o.appendChild(r);
	const { hasTransform: s } = Ra(r);
	return (o.removeChild(r), s);
}
const Lr = e => {
		const t = e.props['onUpdate:modelValue'] || !1;
		return Y(t) ? n => vr(t, n) : t;
	},
	yn = Symbol('_assign'),
	Qc = {
		deep: !0,
		created(e, t, n) {
			((e[yn] = Lr(n)),
				no(e, 'change', () => {
					const r = e._modelValue,
						i = ka(e),
						o = e.checked,
						s = e[yn];
					if (Y(r)) {
						const a = Os(r, i),
							l = a !== -1;
						if (o && !l) s(r.concat(i));
						else if (!o && l) {
							const c = [...r];
							(c.splice(a, 1), s(c));
						}
					} else if (Nr(r)) {
						const a = new Set(r);
						(o ? a.add(i) : a.delete(i), s(a));
					} else s(ja(e, o));
				}));
		},
		mounted: Ko,
		beforeUpdate(e, t, n) {
			((e[yn] = Lr(n)), Ko(e, t, n));
		},
	};
function Ko(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (Y(t)) i = Os(t, r.props.value) > -1;
	else if (Nr(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = wn(t, ja(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
const Jc = {
	created(e, { value: t }, n) {
		((e.checked = wn(t, n.props.value)),
			(e[yn] = Lr(n)),
			no(e, 'change', () => {
				e[yn](ka(e));
			}));
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		((e[yn] = Lr(r)), t !== n && (e.checked = wn(t, r.props.value)));
	},
};
function ka(e) {
	return '_value' in e ? e._value : e.value;
}
function ja(e, t) {
	const n = t ? '_trueValue' : '_falseValue';
	return n in e ? e[n] : t;
}
const Zc = Se({ patchProp: Vc }, Sc);
let Yo;
function ef() {
	return Yo || (Yo = oc(Zc));
}
const Ri = (...e) => {
	const t = ef().createApp(...e),
		{ mount: n } = t;
	return (
		(t.mount = r => {
			const i = nf(r);
			if (!i) return;
			const o = t._component;
			(!Z(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = ''));
			const s = n(i, !1, tf(i));
			return (i instanceof Element && (i.removeAttribute('v-cloak'), i.setAttribute('data-v-app', '')), s);
		}),
		t
	);
};
function tf(e) {
	if (e instanceof SVGElement) return 'svg';
	if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
}
function nf(e) {
	return Te(e) ? document.querySelector(e) : e;
}
function Ba(e, t) {
	return Ps() ? (Ll(e, t), !0) : !1;
}
function mi() {
	const e = new Set(),
		t = o => {
			e.delete(o);
		};
	return {
		on: o => {
			e.add(o);
			const s = () => t(o);
			return (Ba(s), { off: s });
		},
		off: t,
		trigger: (...o) => Promise.all(Array.from(e).map(s => s(...o))),
		clear: () => {
			e.clear();
		},
	};
}
function rf(e) {
	let t = !1,
		n;
	const r = Il(!0);
	return (...i) => (t || ((n = r.run(() => e(...i))), (t = !0)), n);
}
const qa = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const of = () => {};
function br(...e) {
	if (e.length !== 1) return au(...e);
	const t = e[0];
	return typeof t == 'function' ? sn(Ys(() => ({ get: t, set: of }))) : Re(t);
}
function sf(e, t) {
	function n(...r) {
		return new Promise((i, o) => {
			Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r }))
				.then(i)
				.catch(o);
		});
	}
	return n;
}
const Va = e => e();
function af(e = Va, t = {}) {
	const { initialState: n = 'active' } = t,
		r = br(n === 'active');
	function i() {
		r.value = !1;
	}
	function o() {
		r.value = !0;
	}
	const s = (...a) => {
		r.value && e(...a);
	};
	return { isActive: sn(r), pause: i, resume: o, eventFilter: s };
}
function Go(e, t = !1, n = 'Timeout') {
	return new Promise((r, i) => {
		setTimeout(t ? () => i(n) : r, e);
	});
}
function lf(e, ...t) {
	return t.some(n => n in e);
}
function uf(e, t, n = {}) {
	const { eventFilter: r = Va, ...i } = n;
	return Xe(e, sf(r, t), i);
}
function cf(e, t, n = {}) {
	const { eventFilter: r, initialState: i = 'active', ...o } = n,
		{ eventFilter: s, pause: a, resume: l, isActive: c } = af(r, { initialState: i });
	return { stop: uf(e, t, { ...o, eventFilter: s }), pause: a, resume: l, isActive: c };
}
function Fi(e, t = !1) {
	function n(d, { flush: g = 'sync', deep: v = !1, timeout: y, throwOnTimeout: b } = {}) {
		let C = null;
		const m = [
			new Promise(x => {
				C = Xe(
					e,
					R => {
						d(R) !== t && (C ? C() : Cr(() => C?.()), x(R));
					},
					{ flush: g, deep: v, immediate: !0 },
				);
			}),
		];
		return (
			y != null &&
				m.push(
					Go(y, b)
						.then(() => St(e))
						.finally(() => C?.()),
				),
			Promise.race(m)
		);
	}
	function r(d, g) {
		if (!pe(d)) return n(R => R === d, g);
		const { flush: v = 'sync', deep: y = !1, timeout: b, throwOnTimeout: C } = g ?? {};
		let m = null;
		const x = [
			new Promise(R => {
				m = Xe(
					[e, d],
					([f, D]) => {
						t !== (f === D) && (m ? m() : Cr(() => m?.()), R(f));
					},
					{ flush: v, deep: y, immediate: !0 },
				);
			}),
		];
		return (
			b != null &&
				x.push(
					Go(b, C)
						.then(() => St(e))
						.finally(() => (m?.(), St(e))),
				),
			Promise.race(x)
		);
	}
	function i(d) {
		return n(g => !!g, d);
	}
	function o(d) {
		return r(null, d);
	}
	function s(d) {
		return r(void 0, d);
	}
	function a(d) {
		return n(Number.isNaN, d);
	}
	function l(d, g) {
		return n(v => {
			const y = Array.from(v);
			return y.includes(d) || y.includes(St(d));
		}, g);
	}
	function c(d) {
		return u(1, d);
	}
	function u(d = 1, g) {
		let v = -1;
		return n(() => ((v += 1), v >= d), g);
	}
	return Array.isArray(St(e))
		? {
				toMatch: n,
				toContains: l,
				changed: c,
				changedTimes: u,
				get not() {
					return Fi(e, !t);
				},
			}
		: {
				toMatch: n,
				toBe: r,
				toBeTruthy: i,
				toBeNull: o,
				toBeNaN: a,
				toBeUndefined: s,
				changed: c,
				changedTimes: u,
				get not() {
					return Fi(e, !t);
				},
			};
}
function ff(e) {
	return Fi(e);
}
function df(e, t, n = {}) {
	const { immediate: r = !0, immediateCallback: i = !1 } = n,
		o = it(!1);
	let s;
	function a() {
		s && (clearTimeout(s), (s = void 0));
	}
	function l() {
		((o.value = !1), a());
	}
	function c(...u) {
		(i && e(),
			a(),
			(o.value = !0),
			(s = setTimeout(() => {
				((o.value = !1), (s = void 0), e(...u));
			}, St(t))));
	}
	return (r && ((o.value = !0), qa && c()), Ba(l), { isPending: eu(o), start: c, stop: l });
}
const gi = qa ? window : void 0,
	pf = { json: 'application/json', text: 'text/plain' };
function Xo(e) {
	return (
		e &&
		lf(
			e,
			'immediate',
			'refetch',
			'initialData',
			'timeout',
			'beforeFetch',
			'afterFetch',
			'onFetchError',
			'fetch',
			'updateDataOnError',
		)
	);
}
function yi(e) {
	return typeof Headers < 'u' && e instanceof Headers ? Object.fromEntries(e.entries()) : e;
}
function Qo(e, ...t) {
	var n, r;
	const i = typeof AbortController == 'function';
	let o = {},
		s = { immediate: !0, refetch: !1, timeout: 0, updateDataOnError: !1 };
	const a = { method: 'GET', type: 'text', payload: void 0 };
	(t.length > 0 && (Xo(t[0]) ? (s = { ...s, ...t[0] }) : (o = t[0])),
		t.length > 1 && Xo(t[1]) && (s = { ...s, ...t[1] }));
	const {
			fetch: l = (n = gi?.fetch) !== null && n !== void 0
				? n
				: (r = globalThis) === null || r === void 0
					? void 0
					: r.fetch,
			initialData: c,
			timeout: u,
		} = s,
		d = mi(),
		g = mi(),
		v = mi(),
		y = it(!1),
		b = it(!1),
		C = it(!1),
		m = it(null),
		x = it(null),
		R = it(null),
		f = it(c || null),
		D = jt(() => i && b.value);
	let O, T;
	const L = q => {
			i &&
				(O?.abort(q),
				(O = new AbortController()),
				(O.signal.onabort = () => (C.value = !0)),
				(o = { ...o, signal: O.signal }));
		},
		k = q => {
			((b.value = q), (y.value = !q));
		};
	u && (T = df(L, u, { immediate: !1 }));
	let B = 0;
	const K = async (q = !1) => {
			var W;
			(L(), k(!0), (R.value = null), (m.value = null), (C.value = !1), (B += 1));
			const be = B,
				ge = { method: a.method, headers: {} },
				we = St(a.payload);
			if (we) {
				var ye;
				const ae = yi(ge.headers),
					Pe = Object.getPrototypeOf(we);
				(!a.payloadType &&
					we &&
					(Pe === Object.prototype || Array.isArray(Pe)) &&
					!(we instanceof FormData) &&
					(a.payloadType = 'json'),
					a.payloadType &&
						(ae['Content-Type'] = (ye = pf[a.payloadType]) !== null && ye !== void 0 ? ye : a.payloadType),
					(ge.body = a.payloadType === 'json' ? JSON.stringify(we) : we));
			}
			let Ue = !1;
			const Ee = {
				url: St(e),
				options: { ...ge, ...o },
				cancel: () => {
					Ue = !0;
				},
			};
			if ((s.beforeFetch && Object.assign(Ee, await s.beforeFetch(Ee)), Ue || !l))
				return (k(!1), Promise.resolve(null));
			let _e = null;
			return (
				T && T.start(),
				l(Ee.url, {
					...ge,
					...Ee.options,
					headers: { ...yi(ge.headers), ...yi((W = Ee.options) === null || W === void 0 ? void 0 : W.headers) },
				})
					.then(async ae => {
						if (((x.value = ae), (m.value = ae.status), (_e = await ae.clone()[a.type]()), !ae.ok))
							throw ((f.value = c || null), new Error(ae.statusText));
						return (
							s.afterFetch && ({ data: _e } = await s.afterFetch({ data: _e, response: ae, context: Ee, execute: K })),
							(f.value = _e),
							d.trigger(ae),
							ae
						);
					})
					.catch(async ae => {
						let Pe = ae.message || ae.name;
						if (
							(s.onFetchError &&
								({ error: Pe, data: _e } = await s.onFetchError({
									data: _e,
									error: ae,
									response: x.value,
									context: Ee,
									execute: K,
								})),
							(R.value = Pe),
							s.updateDataOnError && (f.value = _e),
							g.trigger(ae),
							q)
						)
							throw ae;
						return null;
					})
					.finally(() => {
						(be === B && k(!1), T && T.stop(), v.trigger(null));
					})
			);
		},
		M = br(s.refetch);
	Xe([M, br(e)], ([q]) => q && K(), { deep: !0 });
	const Q = {
		isFinished: sn(y),
		isFetching: sn(b),
		statusCode: m,
		response: x,
		error: R,
		data: f,
		canAbort: D,
		aborted: C,
		abort: L,
		execute: K,
		onFetchResponse: d.on,
		onFetchError: g.on,
		onFetchFinally: v.on,
		get: te('GET'),
		put: te('PUT'),
		post: te('POST'),
		delete: te('DELETE'),
		patch: te('PATCH'),
		head: te('HEAD'),
		options: te('OPTIONS'),
		json: ee('json'),
		text: ee('text'),
		blob: ee('blob'),
		arrayBuffer: ee('arrayBuffer'),
		formData: ee('formData'),
	};
	function te(q) {
		return (W, be) => {
			if (!b.value)
				return (
					(a.method = q),
					(a.payload = W),
					(a.payloadType = be),
					pe(a.payload) && Xe([M, br(a.payload)], ([ge]) => ge && K(), { deep: !0 }),
					{
						...Q,
						then(ge, we) {
							return me().then(ge, we);
						},
					}
				);
		};
	}
	function me() {
		return new Promise((q, W) => {
			ff(y)
				.toBe(!0)
				.then(() => q(Q))
				.catch(W);
		});
	}
	function ee(q) {
		return () => {
			if (!b.value)
				return (
					(a.type = q),
					{
						...Q,
						then(W, be) {
							return me().then(W, be);
						},
					}
				);
		};
	}
	return (
		s.immediate && Promise.resolve().then(() => K()),
		{
			...Q,
			then(q, W) {
				return me().then(q, W);
			},
		}
	);
}
function nr(e) {
	return new Promise((t, n) => {
		((e.oncomplete = e.onsuccess = () => t(e.result)), (e.onabort = e.onerror = () => n(e.error)));
	});
}
function hf(e, t) {
	let n;
	const r = () => {
		if (n) return n;
		const i = indexedDB.open(e);
		return (
			(i.onupgradeneeded = () => i.result.createObjectStore(t)),
			(n = nr(i)),
			n.then(
				o => {
					o.onclose = () => (n = void 0);
				},
				() => {},
			),
			n
		);
	};
	return (i, o) => r().then(s => o(s.transaction(t, i).objectStore(t)));
}
let bi;
function Zr() {
	return (bi || (bi = hf('keyval-store', 'keyval')), bi);
}
function vf(e, t = Zr()) {
	return t('readonly', n => nr(n.get(e)));
}
function mf(e, t, n = Zr()) {
	return n('readwrite', r => (r.put(t, e), nr(r.transaction)));
}
function gf(e, t, n = Zr()) {
	return n(
		'readwrite',
		r =>
			new Promise((i, o) => {
				r.get(e).onsuccess = function () {
					try {
						(r.put(t(this.result), e), i(nr(r.transaction)));
					} catch (s) {
						o(s);
					}
				};
			}),
	);
}
function yf(e, t = Zr()) {
	return t('readwrite', n => (n.delete(e), nr(n.transaction)));
}
function bf(e, t, n = {}) {
	const {
			flush: r = 'pre',
			deep: i = !0,
			shallow: o = !1,
			onError: s = m => {
				console.error(m);
			},
			writeDefaults: a = !0,
			serializer: l = { read: m => m, write: m => m },
		} = n,
		c = it(!1),
		u = (o ? it : Re)(t),
		d = St(t);
	async function g() {
		try {
			const m = await vf(e);
			m === void 0 ? d != null && a && (await mf(e, l.write(d))) : (u.value = l.read(m));
		} catch (m) {
			s(m);
		}
		c.value = !0;
	}
	g();
	async function v() {
		try {
			if (u.value == null) await yf(e);
			else {
				const m = se(u.value),
					x = l.write(m);
				await gf(e, () => x);
			}
		} catch (m) {
			s(m);
		}
	}
	const { pause: y, resume: b } = cf(u, () => v(), { flush: r, deep: i });
	async function C(m) {
		(y(), (u.value = m), await v(), b());
	}
	return { set: C, isFinished: c, data: u };
}
const rr = rf(() => {
		const { data: e, isFinished: t } = bf('audit', {}),
			n = (s, a, l) => {
				e.value[s] || (e.value[s] = []);
				const c = e.value[s].find(u => u.name === a);
				c ? (c.val = l) : e.value[s].push({ name: a, val: l });
			},
			r = (s, a, l, c) => {
				if (!e.value[s]) return;
				const u = d => {
					for (const g of d) {
						if (g.name === a) {
							g.sub_questions || (g.sub_questions = []);
							const v = g.sub_questions.find(y => y.name === l);
							return (v ? (v.val = c) : g.sub_questions.push({ name: l, val: c }), !0);
						}
						if (g.sub_questions && u(g.sub_questions)) return !0;
					}
					return !1;
				};
				u(e.value[s]);
			},
			i = Re([]),
			o = Re({});
		return { audit: e, updateAuditQuestion: n, updateAuditSubQuestion: r, auditIsLoad: t, sections: i, meta: o };
	}),
	wf = { class: 'mappers-audit-quiz-info' },
	_f = { key: 0, class: 'mappers-audit-quiz-info-label mappers-label' },
	xf = { key: 1, class: 'mappers-audit-quiz-info-title mappers-h2' },
	Tf = ['innerHTML'],
	Cf = { class: 'mappers-audit-quiz-info-btns' },
	Of = ['href'],
	Sf = ['href'],
	Jo = ln({
		__name: 'QuizInfo',
		props: { type: {} },
		emits: ['start'],
		setup(e, { emit: t }) {
			const n = e,
				{ meta: r } = rr(),
				i = t;
			return (o, s) => (
				J(),
				re('div', wf, [
					de(r)?.strings[`${n.type}_label`]
						? (J(), re('div', _f, Ce(de(r).strings[`${n.type}_label`]), 1))
						: Oe('', !0),
					de(r)?.strings[`${n.type}_title`]
						? (J(), re('div', xf, Ce(de(r).strings[`${n.type}_title`]), 1))
						: Oe('', !0),
					de(r)?.strings[`${n.type}_desc`]
						? (J(),
							re(
								'div',
								{ key: 2, class: 'mappers-audit-quiz-info-desc', innerHTML: de(r).strings[`${n.type}_desc`] },
								null,
								8,
								Tf,
							))
						: Oe('', !0),
					G('div', Cf, [
						n.type === 'start'
							? (J(),
								re('button', { key: 0, onClick: s[0] || (s[0] = a => i('start')), class: 'mappers-btn' }, [
									G('span', null, Ce(de(r)?.strings?.start_btn), 1),
									s[1] ||
										(s[1] = G('svg', { class: 'mappers-icon' }, [G('use', { 'xlink:href': '#icon-arrow-right' })], -1)),
								]))
							: Oe('', !0),
						n.type === 'finish'
							? (J(),
								re(
									xe,
									{ key: 1 },
									[
										de(r)?.urls?.audits
											? (J(),
												re(
													'a',
													{ key: 0, href: de(r)?.urls?.audits, class: 'mappers-btn mappers-btn-border' },
													Ce(de(r)?.strings?.finish_btn_list),
													9,
													Of,
												))
											: Oe('', !0),
										de(r)?.urls?.audit
											? (J(),
												re(
													'a',
													{ key: 1, href: de(r)?.urls?.audit, class: 'mappers-btn' },
													[
														G('span', null, Ce(de(r)?.strings?.finish_btn_result), 1),
														s[2] ||
															(s[2] = G(
																'svg',
																{ class: 'mappers-icon' },
																[G('use', { 'xlink:href': '#icon-arrow-top-right' })],
																-1,
															)),
													],
													8,
													Sf,
												))
											: Oe('', !0),
									],
									64,
								))
							: Oe('', !0),
					]),
				])
			);
		},
	}),
	Ef = { class: 'mappers-audit-quiz-answer' },
	Af = { key: 0, class: 'mappers-audit-quiz-answer-radios' },
	Pf = ['name', 'value'],
	Df = { key: 1, class: 'mappers-audit-quiz-answer-checkbox' },
	Mf = { class: 'mappers-audit-quiz-checkbox mappers-checkbox' },
	If = ['name', 'true-value', 'false-value'],
	Zo = ln({
		__name: 'QuizAnswer',
		props: Lu({ question: {}, sectionId: {}, parentName: {} }, { modelValue: {}, modelModifiers: {} }),
		emits: ['update:modelValue'],
		setup(e) {
			const { audit: t, updateAuditQuestion: n, updateAuditSubQuestion: r } = rr(),
				i = e,
				o = zu(e, 'modelValue', {
					get() {
						return i.parentName
							? t.value[i.sectionId]
									?.find(s => s.name === i.parentName)
									?.sub_questions?.find(s => s.name === i.question.name)?.val
							: t.value[i.sectionId]?.find(s => s.name === i.question.name)?.val;
					},
					set(s) {
						i.parentName ? r(i.sectionId, i.parentName, i.question.name, s) : n(i.sectionId, i.question.name, s);
					},
				});
			return (s, a) => (
				J(),
				re('div', Ef, [
					e.question.input_type === 'radio'
						? (J(),
							re('div', Af, [
								(J(!0),
								re(
									xe,
									null,
									nn(
										e.question.answers,
										l => (
											J(),
											re('label', { key: l.val, class: 'mappers-audit-quiz-radio mappers-radio' }, [
												Ei(
													G(
														'input',
														{
															type: 'radio',
															name: e.question.name,
															value: l.val,
															'onUpdate:modelValue': a[0] || (a[0] = c => (o.value = c)),
														},
														null,
														8,
														Pf,
													),
													[[Jc, o.value]],
												),
												a[2] || (a[2] = G('i', null, null, -1)),
												G('span', null, Ce(l.answer), 1),
											])
										),
									),
									128,
								)),
							]))
						: Oe('', !0),
					e.question.input_type === 'checkbox'
						? (J(),
							re('div', Df, [
								G('label', Mf, [
									Ei(
										G(
											'input',
											{
												type: 'checkbox',
												name: e.question.name,
												'true-value': e.question.answers[0]?.answer,
												'false-value': e.question.answers[1]?.answer,
												'onUpdate:modelValue': a[1] || (a[1] = l => (o.value = l)),
											},
											null,
											8,
											If,
										),
										[[Qc, o.value]],
									),
									a[3] ||
										(a[3] = G(
											'i',
											null,
											[G('svg', { class: 'mappers-icon' }, [G('use', { 'xlink:href': '#icon-check' })])],
											-1,
										)),
									G('span', null, Ce(e.question.question), 1),
								]),
							]))
						: Oe('', !0),
				])
			);
		},
	}),
	Lf = { class: 'mappers-audit-quiz-question' },
	$f = { class: 'mappers-audit-quiz-question-head' },
	Rf = { class: 'mappers-audit-quiz-question-title mappers-h3' },
	Ff = ['aria-label'],
	Nf = { key: 0, class: 'mappers-audit-quiz-sub-questions' },
	Hf = { key: 0, class: 'mappers-audit-quiz-question-do' },
	kf = { key: 0, class: 'mappers-audit-quiz-do-title' },
	jf = ['innerHTML'],
	Bf = ['innerHTML'],
	qf = ln({
		__name: 'QuizQuestion',
		props: { question: {}, index: {}, sectionId: {} },
		setup(e) {
			const t = e,
				{ audit: n, meta: r, updateAuditQuestion: i, updateAuditSubQuestion: o } = rr(),
				s = jt(() =>
					t.question.answers.reduce(
						(l, c) => (c.sub_questions.length && (l[c.val] || (l[c.val] = []), (l[c.val] = c.sub_questions)), l),
						{},
					),
				),
				a = jt(() => n.value[t.sectionId]?.find(l => l.name === t.question.name)?.val);
			return (l, c) => {
				const u = Du('tippy');
				return (
					J(),
					re('div', Lf, [
						G('div', $f, [
							G('div', Rf, [G('span', null, Ce(e.index + 1) + '. ', 1), G('span', null, Ce(e.question.question), 1)]),
							e.question.desc
								? Ei(
										(J(),
										re(
											'button',
											{ key: 0, class: 'mappers-audit-quiz-question-desc', 'aria-label': de(r).strings.desc_info },
											[
												...(c[0] ||
													(c[0] = [
														G('svg', { class: 'mappers-icon' }, [G('use', { 'xlink:href': '#icon-question' })], -1),
														G('svg', { class: 'mappers-icon' }, [G('use', { 'xlink:href': '#icon-close' })], -1),
													])),
											],
											8,
											Ff,
										)),
										[
											[
												u,
												{
													content: e.question.desc,
													onShow(d) {
														d.reference.classList.add('mappers-active');
													},
													onHide(d) {
														d.reference.classList.remove('mappers-active');
													},
												},
											],
										],
									)
								: Oe('', !0),
						]),
						Ae(Zo, { question: e.question, 'section-id': t.sectionId }, null, 8, ['question', 'section-id']),
						Ae(
							Mr,
							{ name: 'mappers-tab-fade' },
							{
								default: tn(() => [
									a.value && s.value[a.value]
										? (J(),
											re('div', Nf, [
												(J(!0),
												re(
													xe,
													null,
													nn(
														s.value[a.value],
														d => (
															J(),
															Ht(
																Zo,
																{ key: d.name, question: d, 'section-id': t.sectionId, 'parent-name': e.question.name },
																null,
																8,
																['question', 'section-id', 'parent-name'],
															)
														),
													),
													128,
												)),
											]))
										: Oe('', !0),
								]),
								_: 1,
							},
						),
						e.question.do
							? (J(),
								re('div', Hf, [
									de(r)?.strings.do ? (J(), re('div', kf, Ce(de(r).strings.do), 1)) : Oe('', !0),
									G(
										'div',
										{ class: 'mappers-audit-quiz-question-do-desc mappers-content-text', innerHTML: e.question.do },
										null,
										8,
										jf,
									),
								]))
							: Oe('', !0),
						e.question.auditor_note
							? (J(),
								re(
									'div',
									{
										key: 1,
										class: 'mappers-audit-quiz-question-note mappers-content-text',
										innerHTML: e.question.auditor_note,
									},
									null,
									8,
									Bf,
								))
							: Oe('', !0),
					])
				);
			};
		},
	}),
	es = e =>
		isNaN(Number(e))
			? (e.startsWith("'") && e.endsWith("'")) || (e.startsWith('"') && e.endsWith('"'))
				? e.slice(1, -1)
				: e
			: Number(e),
	Ua = e => {
		e = e.trim();
		const t = e.match(/\s+(NOT IN|IN|=|!=|>=|<=|>|<)\s+/);
		if (!t) throw new Error('Error parse condition: operator not found');
		const n = t[1],
			[r, i] = e.split(n).map(l => l.trim());
		if (!r || !i) throw new Error('Error parse condition');
		const o = r,
			s = o.split('.');
		let a;
		if (n === 'IN' || n === 'NOT IN') {
			if (!i.startsWith('[') || !i.endsWith(']')) throw new Error('IN operator requires parentheses');
			a = i
				.slice(1, -1)
				.split(',')
				.map(c => c.trim())
				.map(es);
		} else a = es(i);
		return { field: o, fieldPath: s, operator: n, value: a };
	},
	Wa = (e, t) => t.reduce((n, r) => n?.[r], e),
	za = (e, t, n) => {
		switch (t) {
			case '=':
				return e == n;
			case '!=':
				return e != n;
			case '>':
				return Number(e) > Number(n);
			case '<':
				return Number(e) < Number(n);
			case '>=':
				return Number(e) >= Number(n);
			case '<=':
				return Number(e) <= Number(n);
			case 'IN':
				return Array.isArray(n) && n.includes(e);
			case 'NOT IN':
				return Array.isArray(n) && !n.includes(e);
			default:
				return !1;
		}
	},
	Vf = (e, t) => {
		if (!e.condition) return !0;
		const { operator: n, fieldPath: r, value: i } = Ua(e.condition),
			o = t.find(a => a.name === r[0]);
		if (!o) return !1;
		const s = Wa(o, r);
		return za(s, n, i);
	},
	Ka = (e, t) => {
		if (!e.condition) return !0;
		const { operator: n, fieldPath: r, value: i } = Ua(e.condition);
		r.length !== 2 && r.unshift(e.name);
		const o = t.find(a => a.name === r[0]);
		if (!o) return !1;
		const s = Wa(o, r);
		return za(s, n, i);
	},
	Uf = { class: 'mappers-audit-quiz-section' },
	Wf = { class: 'mappers-audit-quiz-section-nav' },
	zf = ['onClick'],
	Kf = { class: 'mappers-audit-quiz-section-body' },
	Yf = { key: 0, class: 'mappers-audit-quiz-section-intro' },
	Gf = { key: 0, class: 'mappers-audit-quiz-section-intro-label mappers-label' },
	Xf = { class: 'mappers-audit-quiz-section-intro-title mappers-h2' },
	Qf = ['innerHTML'],
	Jf = { class: 'mappers-audit-quiz-section-foot' },
	Zf = { key: 1, class: 'mappers-audit-quiz-section-foot-nav' },
	ed = { class: 'mappers-audit-quiz-pagination' },
	td = ['onClick'],
	nd = ln({
		__name: 'QuizSection',
		props: { section: {}, isDone: { type: Boolean } },
		emits: ['next'],
		setup(e, { emit: t }) {
			const n = e,
				{ meta: r, sections: i, audit: o } = rr(),
				s = jt(() => n.section.quiz.filter(C => Ka(C, i.value))),
				a = Re('intro'),
				l = Re(),
				c = jt(() => o.value[n.section.id]);
			un(() => {
				l.value = c.value?.[c.value.length - 1]?.name || s.value[0]?.name || '';
			});
			const u = ['intro', 'questions'],
				d = t,
				g = C => {
					l.value = C;
				},
				v = () => {
					const C = s.value.findIndex(m => m.name === l.value);
					if (C !== -1) {
						const m = s.value[C + 1];
						m && b(m.name) && g(m.name);
					}
				},
				y = C => {
					if (!c.value) return !1;
					const m = c.value.find(x => x.name === C);
					return m && m.val !== void 0;
				},
				b = C => {
					const m = s.value.findIndex(R => R.name === C);
					if (m === -1) return !1;
					const x = s.value[m - 1];
					return x ? y(x.name) : !1;
				};
			return (C, m) => (
				J(),
				re('div', Uf, [
					G('nav', Wf, [
						(J(),
						re(
							xe,
							null,
							nn(u, x =>
								G(
									'button',
									{
										key: x,
										class: bn(['mappers-audit-quiz-section-nav-btn', { 'mappers-active': a.value === x }]),
										onClick: R => (a.value = x),
									},
									Ce(de(r)?.strings[x]),
									11,
									zf,
								),
							),
							64,
						)),
					]),
					G('div', Kf, [
						Ae(
							Mr,
							{ name: 'mappers-tab-fade' },
							{
								default: tn(() => [
									a.value === 'intro'
										? (J(),
											re('div', Yf, [
												de(r)?.strings.intro_label
													? (J(), re('div', Gf, Ce(de(r).strings.intro_label), 1))
													: Oe('', !0),
												G('div', Xf, Ce(e.section.title), 1),
												e.section.introduction
													? (J(),
														re(
															'div',
															{
																key: 1,
																class: 'mappers-audit-quiz-section-intro-desc mappers-content-text',
																innerHTML: e.section.introduction,
															},
															null,
															8,
															Qf,
														))
													: Oe('', !0),
											]))
										: s.value
											? (J(),
												Ht(
													Ha,
													{
														key: 1,
														tag: 'div',
														name: 'mappers-tab-fade',
														class: 'mappers-audit-quiz-section-questions',
													},
													{
														default: tn(() => [
															(J(!0),
															re(
																xe,
																null,
																nn(
																	s.value,
																	(x, R) => (
																		J(),
																		re(
																			xe,
																			{ key: x.name },
																			[
																				l.value === x.name
																					? (J(),
																						Ht(
																							qf,
																							{ key: 0, question: x, index: R, 'section-id': e.section.id },
																							null,
																							8,
																							['question', 'index', 'section-id'],
																						))
																					: Oe('', !0),
																			],
																			64,
																		)
																	),
																),
																128,
															)),
														]),
														_: 1,
													},
												))
											: Oe('', !0),
								]),
								_: 1,
							},
						),
					]),
					G('div', Jf, [
						Ae(
							Mr,
							{ name: 'mappers-tab-fade' },
							{
								default: tn(() => [
									a.value === 'intro'
										? (J(),
											re(
												'button',
												{
													key: 0,
													onClick: m[0] || (m[0] = x => (a.value = 'questions')),
													class: 'mappers-audit-quiz-section-foot-btn mappers-btn',
												},
												[
													G('span', null, Ce(de(r)?.strings?.go_to_questions), 1),
													m[2] ||
														(m[2] = G(
															'svg',
															{ class: 'mappers-icon' },
															[G('use', { 'xlink:href': '#icon-arrow-right' })],
															-1,
														)),
												],
											))
										: (J(),
											re('nav', Zf, [
												G('div', ed, [
													(J(!0),
													re(
														xe,
														null,
														nn(
															s.value,
															(x, R) => (
																J(),
																re(
																	'button',
																	{
																		key: x.name,
																		class: bn([
																			'mappers-audit-quiz-pagination-btn',
																			{
																				'mappers-active': l.value === x.name,
																				'mappers-done': y(x.name),
																				'mappers-enabled': b(x.name),
																			},
																		]),
																		onClick: f => l.value !== x.name && (y(x.name) || b(x.name)) && g(x.name),
																	},
																	Ce(R + 1),
																	11,
																	td,
																)
															),
														),
														128,
													)),
												]),
												e.isDone
													? (J(),
														re(
															'button',
															{
																key: 0,
																onClick: m[1] || (m[1] = x => d('next')),
																class: 'mappers-audit-quiz-section-foot-btn mappers-btn',
															},
															[
																G('span', null, Ce(de(r)?.strings?.next_section), 1),
																m[3] ||
																	(m[3] = G(
																		'svg',
																		{ class: 'mappers-icon' },
																		[G('use', { 'xlink:href': '#icon-arrow-right' })],
																		-1,
																	)),
															],
														))
													: (J(),
														re(
															'button',
															{ key: 1, onClick: v, class: 'mappers-audit-quiz-section-foot-btn mappers-btn' },
															[
																G('span', null, Ce(de(r)?.strings?.next_question), 1),
																m[4] ||
																	(m[4] = G(
																		'svg',
																		{ class: 'mappers-icon' },
																		[G('use', { 'xlink:href': '#icon-arrow-right' })],
																		-1,
																	)),
															],
														)),
											])),
								]),
								_: 1,
							},
						),
					]),
				])
			);
		},
	}),
	rd = { class: 'mappers-audit-quiz-container mappers-container' },
	id = { key: 0, class: 'mappers-audit-quiz' },
	od = { class: 'mappers-audit-quiz-nav' },
	sd = { class: 'mappers-audit-quiz-menu' },
	ad = ['onClick'],
	ld = { class: 'mappers-audit-quiz-body' },
	ud = ln({
		__name: 'App',
		setup(e) {
			const { audit: t, auditIsLoad: n, sections: r, meta: i } = rr(),
				o = jt(() => r.value.filter(v => Vf(v, r.value))),
				s = Re();
			Xe(n, () => {
				Object.keys(t.value).length && (s.value = Number(Object.keys(t.value).pop()));
			});
			const a = jt(() => !1);
			un(async () => {
				const { data: v } = await Qo(
					'http://localhost/work/fl/mappersgeo/wp-json/mappers/v1/mappers-audit-quiz-meta/',
				).json();
				v.value && (i.value = v.value);
				const { data: y } = await Qo(
					'http://localhost/work/fl/mappersgeo/wp-json/mappers/v1/mappers-audit-quiz/',
				).json();
				y.value && (r.value = y.value);
			});
			const l = v => {
					s.value = v;
				},
				c = v => {
					const y = o.value[v]?.id;
					y && l(y);
				},
				u = () => {
					const v = o.value.findIndex(y => y.id === s.value);
					if (v !== -1) {
						const y = o.value[v + 1];
						y && l(y.id);
					}
				},
				d = v => {
					const y = t.value[v];
					if (!y) return !1;
					const b = o.value.find(C => C.id === v);
					if (!b) return !1;
					for (const C of b.quiz) {
						if (C.condition && !Ka(C, r.value)) continue;
						const m = y.find(x => x.name === C.name);
						if (!m || m.val === void 0) return !1;
					}
					return !0;
				},
				g = v => {
					const y = o.value.findIndex(b => b.id === v);
					if (y !== -1) {
						const b = o.value[y - 1];
						if (b) return d(b.id);
					}
					return !1;
				};
			return (v, y) => (
				J(),
				re('div', rd, [
					o.value.length && de(n)
						? (J(),
							re('div', id, [
								G('nav', od, [
									G('ul', sd, [
										(J(!0),
										re(
											xe,
											null,
											nn(
												o.value,
												(b, C) => (
													J(),
													re('li', { key: b.id }, [
														G(
															'button',
															{
																class: bn([
																	'mappers-audit-quiz-nav-btn mappers-h3',
																	{
																		'mappers-active': b.id === s.value,
																		'mappers-done': d(b.id),
																		'mappers-enabled': g(b.id),
																	},
																]),
																onClick: m => (d(b.id) || g(b.id)) && l(b.id),
															},
															[
																G('i', null, [
																	G('span', null, Ce(C + 1), 1),
																	y[1] ||
																		(y[1] = G(
																			'svg',
																			{ class: 'mappers-icon' },
																			[G('use', { 'xlink:href': '#icon-check' })],
																			-1,
																		)),
																]),
																G('span', null, Ce(b.title), 1),
															],
															10,
															ad,
														),
													])
												),
											),
											128,
										)),
									]),
								]),
								G('div', ld, [
									Ae(
										Mr,
										{ name: 'mappers-tab-fade' },
										{
											default: tn(() => [
												a.value
													? (J(), Ht(Jo, { key: 0, type: 'finish' }))
													: s.value === void 0
														? (J(), Ht(Jo, { key: 1, type: 'start', onStart: y[0] || (y[0] = b => c(0)) }))
														: (J(),
															Ht(
																Ha,
																{ key: 2, tag: 'div', name: 'mappers-tab-fade', class: 'mappers-audit-quiz-sections' },
																{
																	default: tn(() => [
																		(J(!0),
																		re(
																			xe,
																			null,
																			nn(
																				de(r),
																				(b, C) => (
																					J(),
																					re(
																						xe,
																						{ key: b.id },
																						[
																							s.value === b.id
																								? (J(),
																									Ht(
																										nd,
																										{ key: b.id, section: b, 'is-done': d(b.id), onNext: u },
																										null,
																										8,
																										['section', 'is-done'],
																									))
																								: Oe('', !0),
																						],
																						64,
																					)
																				),
																			),
																			128,
																		)),
																	]),
																	_: 1,
																},
															)),
											]),
											_: 1,
										},
									),
								]),
							]))
						: Oe('', !0),
				])
			);
		},
	});
var qe = 'top',
	nt = 'bottom',
	rt = 'right',
	Ve = 'left',
	ro = 'auto',
	ir = [qe, nt, rt, Ve],
	Tn = 'start',
	Gn = 'end',
	cd = 'clippingParents',
	Ya = 'viewport',
	Mn = 'popper',
	fd = 'reference',
	ts = ir.reduce(function (e, t) {
		return e.concat([t + '-' + Tn, t + '-' + Gn]);
	}, []),
	Ga = [].concat(ir, [ro]).reduce(function (e, t) {
		return e.concat([t, t + '-' + Tn, t + '-' + Gn]);
	}, []),
	dd = 'beforeRead',
	pd = 'read',
	hd = 'afterRead',
	vd = 'beforeMain',
	md = 'main',
	gd = 'afterMain',
	yd = 'beforeWrite',
	bd = 'write',
	wd = 'afterWrite',
	_d = [dd, pd, hd, vd, md, gd, yd, bd, wd];
function bt(e) {
	return e ? (e.nodeName || '').toLowerCase() : null;
}
function ct(e) {
	if (e == null) return window;
	if (e.toString() !== '[object Window]') {
		var t = e.ownerDocument;
		return (t && t.defaultView) || window;
	}
	return e;
}
function Cn(e) {
	var t = ct(e).Element;
	return e instanceof t || e instanceof Element;
}
function tt(e) {
	var t = ct(e).HTMLElement;
	return e instanceof t || e instanceof HTMLElement;
}
function Xa(e) {
	if (typeof ShadowRoot > 'u') return !1;
	var t = ct(e).ShadowRoot;
	return e instanceof t || e instanceof ShadowRoot;
}
function xd(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function (n) {
		var r = t.styles[n] || {},
			i = t.attributes[n] || {},
			o = t.elements[n];
		!tt(o) ||
			!bt(o) ||
			(Object.assign(o.style, r),
			Object.keys(i).forEach(function (s) {
				var a = i[s];
				a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? '' : a);
			}));
	});
}
function Td(e) {
	var t = e.state,
		n = {
			popper: { position: t.options.strategy, left: '0', top: '0', margin: '0' },
			arrow: { position: 'absolute' },
			reference: {},
		};
	return (
		Object.assign(t.elements.popper.style, n.popper),
		(t.styles = n),
		t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
		function () {
			Object.keys(t.elements).forEach(function (r) {
				var i = t.elements[r],
					o = t.attributes[r] || {},
					s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
					a = s.reduce(function (l, c) {
						return ((l[c] = ''), l);
					}, {});
				!tt(i) ||
					!bt(i) ||
					(Object.assign(i.style, a),
					Object.keys(o).forEach(function (l) {
						i.removeAttribute(l);
					}));
			});
		}
	);
}
var Qa = { name: 'applyStyles', enabled: !0, phase: 'write', fn: xd, effect: Td, requires: ['computeStyles'] };
function gt(e) {
	return e.split('-')[0];
}
var rn = Math.max,
	$r = Math.min,
	On = Math.round;
function Sn(e, t) {
	t === void 0 && (t = !1);
	var n = e.getBoundingClientRect(),
		r = 1,
		i = 1;
	if (tt(e) && t) {
		var o = e.offsetHeight,
			s = e.offsetWidth;
		(s > 0 && (r = On(n.width) / s || 1), o > 0 && (i = On(n.height) / o || 1));
	}
	return {
		width: n.width / r,
		height: n.height / i,
		top: n.top / i,
		right: n.right / r,
		bottom: n.bottom / i,
		left: n.left / r,
		x: n.left / r,
		y: n.top / i,
	};
}
function io(e) {
	var t = Sn(e),
		n = e.offsetWidth,
		r = e.offsetHeight;
	return (
		Math.abs(t.width - n) <= 1 && (n = t.width),
		Math.abs(t.height - r) <= 1 && (r = t.height),
		{ x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
	);
}
function Ja(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && Xa(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
function wt(e) {
	return ct(e).getComputedStyle(e);
}
function Cd(e) {
	return ['table', 'td', 'th'].indexOf(bt(e)) >= 0;
}
function qt(e) {
	return ((Cn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function ei(e) {
	return bt(e) === 'html' ? e : e.assignedSlot || e.parentNode || (Xa(e) ? e.host : null) || qt(e);
}
function ns(e) {
	return !tt(e) || wt(e).position === 'fixed' ? null : e.offsetParent;
}
function Od(e) {
	var t = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1,
		n = navigator.userAgent.indexOf('Trident') !== -1;
	if (n && tt(e)) {
		var r = wt(e);
		if (r.position === 'fixed') return null;
	}
	for (var i = ei(e); tt(i) && ['html', 'body'].indexOf(bt(i)) < 0; ) {
		var o = wt(i);
		if (
			o.transform !== 'none' ||
			o.perspective !== 'none' ||
			o.contain === 'paint' ||
			['transform', 'perspective'].indexOf(o.willChange) !== -1 ||
			(t && o.willChange === 'filter') ||
			(t && o.filter && o.filter !== 'none')
		)
			return i;
		i = i.parentNode;
	}
	return null;
}
function or(e) {
	for (var t = ct(e), n = ns(e); n && Cd(n) && wt(n).position === 'static'; ) n = ns(n);
	return n && (bt(n) === 'html' || (bt(n) === 'body' && wt(n).position === 'static')) ? t : n || Od(e) || t;
}
function oo(e) {
	return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function jn(e, t, n) {
	return rn(e, $r(t, n));
}
function Sd(e, t, n) {
	var r = jn(e, t, n);
	return r > n ? n : r;
}
function Za() {
	return { top: 0, right: 0, bottom: 0, left: 0 };
}
function el(e) {
	return Object.assign({}, Za(), e);
}
function tl(e, t) {
	return t.reduce(function (n, r) {
		return ((n[r] = e), n);
	}, {});
}
var Ed = function (t, n) {
	return (
		(t = typeof t == 'function' ? t(Object.assign({}, n.rects, { placement: n.placement })) : t),
		el(typeof t != 'number' ? t : tl(t, ir))
	);
};
function Ad(e) {
	var t,
		n = e.state,
		r = e.name,
		i = e.options,
		o = n.elements.arrow,
		s = n.modifiersData.popperOffsets,
		a = gt(n.placement),
		l = oo(a),
		c = [Ve, rt].indexOf(a) >= 0,
		u = c ? 'height' : 'width';
	if (!(!o || !s)) {
		var d = Ed(i.padding, n),
			g = io(o),
			v = l === 'y' ? qe : Ve,
			y = l === 'y' ? nt : rt,
			b = n.rects.reference[u] + n.rects.reference[l] - s[l] - n.rects.popper[u],
			C = s[l] - n.rects.reference[l],
			m = or(o),
			x = m ? (l === 'y' ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
			R = b / 2 - C / 2,
			f = d[v],
			D = x - g[u] - d[y],
			O = x / 2 - g[u] / 2 + R,
			T = jn(f, O, D),
			L = l;
		n.modifiersData[r] = ((t = {}), (t[L] = T), (t.centerOffset = T - O), t);
	}
}
function Pd(e) {
	var t = e.state,
		n = e.options,
		r = n.element,
		i = r === void 0 ? '[data-popper-arrow]' : r;
	i != null &&
		((typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i)) ||
			(Ja(t.elements.popper, i) && (t.elements.arrow = i)));
}
var Dd = {
	name: 'arrow',
	enabled: !0,
	phase: 'main',
	fn: Ad,
	effect: Pd,
	requires: ['popperOffsets'],
	requiresIfExists: ['preventOverflow'],
};
function En(e) {
	return e.split('-')[1];
}
var Md = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Id(e) {
	var t = e.x,
		n = e.y,
		r = window,
		i = r.devicePixelRatio || 1;
	return { x: On(t * i) / i || 0, y: On(n * i) / i || 0 };
}
function rs(e) {
	var t,
		n = e.popper,
		r = e.popperRect,
		i = e.placement,
		o = e.variation,
		s = e.offsets,
		a = e.position,
		l = e.gpuAcceleration,
		c = e.adaptive,
		u = e.roundOffsets,
		d = e.isFixed,
		g = u === !0 ? Id(s) : typeof u == 'function' ? u(s) : s,
		v = g.x,
		y = v === void 0 ? 0 : v,
		b = g.y,
		C = b === void 0 ? 0 : b,
		m = s.hasOwnProperty('x'),
		x = s.hasOwnProperty('y'),
		R = Ve,
		f = qe,
		D = window;
	if (c) {
		var O = or(n),
			T = 'clientHeight',
			L = 'clientWidth';
		if (
			(O === ct(n) &&
				((O = qt(n)), wt(O).position !== 'static' && a === 'absolute' && ((T = 'scrollHeight'), (L = 'scrollWidth'))),
			(O = O),
			i === qe || ((i === Ve || i === rt) && o === Gn))
		) {
			f = nt;
			var k = d && D.visualViewport ? D.visualViewport.height : O[T];
			((C -= k - r.height), (C *= l ? 1 : -1));
		}
		if (i === Ve || ((i === qe || i === nt) && o === Gn)) {
			R = rt;
			var B = d && D.visualViewport ? D.visualViewport.width : O[L];
			((y -= B - r.width), (y *= l ? 1 : -1));
		}
	}
	var K = Object.assign({ position: a }, c && Md);
	if (l) {
		var M;
		return Object.assign(
			{},
			K,
			((M = {}),
			(M[f] = x ? '0' : ''),
			(M[R] = m ? '0' : ''),
			(M.transform =
				(D.devicePixelRatio || 1) <= 1
					? 'translate(' + y + 'px, ' + C + 'px)'
					: 'translate3d(' + y + 'px, ' + C + 'px, 0)'),
			M),
		);
	}
	return Object.assign(
		{},
		K,
		((t = {}), (t[f] = x ? C + 'px' : ''), (t[R] = m ? y + 'px' : ''), (t.transform = ''), t),
	);
}
function Ld(e) {
	var t = e.state,
		n = e.options,
		r = n.gpuAcceleration,
		i = r === void 0 ? !0 : r,
		o = n.adaptive,
		s = o === void 0 ? !0 : o,
		a = n.roundOffsets,
		l = a === void 0 ? !0 : a,
		c = {
			placement: gt(t.placement),
			variation: En(t.placement),
			popper: t.elements.popper,
			popperRect: t.rects.popper,
			gpuAcceleration: i,
			isFixed: t.options.strategy === 'fixed',
		};
	(t.modifiersData.popperOffsets != null &&
		(t.styles.popper = Object.assign(
			{},
			t.styles.popper,
			rs(
				Object.assign({}, c, {
					offsets: t.modifiersData.popperOffsets,
					position: t.options.strategy,
					adaptive: s,
					roundOffsets: l,
				}),
			),
		)),
		t.modifiersData.arrow != null &&
			(t.styles.arrow = Object.assign(
				{},
				t.styles.arrow,
				rs(
					Object.assign({}, c, { offsets: t.modifiersData.arrow, position: 'absolute', adaptive: !1, roundOffsets: l }),
				),
			)),
		(t.attributes.popper = Object.assign({}, t.attributes.popper, { 'data-popper-placement': t.placement })));
}
var $d = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: Ld, data: {} },
	dr = { passive: !0 };
function Rd(e) {
	var t = e.state,
		n = e.instance,
		r = e.options,
		i = r.scroll,
		o = i === void 0 ? !0 : i,
		s = r.resize,
		a = s === void 0 ? !0 : s,
		l = ct(t.elements.popper),
		c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return (
		o &&
			c.forEach(function (u) {
				u.addEventListener('scroll', n.update, dr);
			}),
		a && l.addEventListener('resize', n.update, dr),
		function () {
			(o &&
				c.forEach(function (u) {
					u.removeEventListener('scroll', n.update, dr);
				}),
				a && l.removeEventListener('resize', n.update, dr));
		}
	);
}
var Fd = { name: 'eventListeners', enabled: !0, phase: 'write', fn: function () {}, effect: Rd, data: {} },
	Nd = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function wr(e) {
	return e.replace(/left|right|bottom|top/g, function (t) {
		return Nd[t];
	});
}
var Hd = { start: 'end', end: 'start' };
function is(e) {
	return e.replace(/start|end/g, function (t) {
		return Hd[t];
	});
}
function so(e) {
	var t = ct(e),
		n = t.pageXOffset,
		r = t.pageYOffset;
	return { scrollLeft: n, scrollTop: r };
}
function ao(e) {
	return Sn(qt(e)).left + so(e).scrollLeft;
}
function kd(e) {
	var t = ct(e),
		n = qt(e),
		r = t.visualViewport,
		i = n.clientWidth,
		o = n.clientHeight,
		s = 0,
		a = 0;
	return (
		r &&
			((i = r.width),
			(o = r.height),
			/^((?!chrome|android).)*safari/i.test(navigator.userAgent) || ((s = r.offsetLeft), (a = r.offsetTop))),
		{ width: i, height: o, x: s + ao(e), y: a }
	);
}
function jd(e) {
	var t,
		n = qt(e),
		r = so(e),
		i = (t = e.ownerDocument) == null ? void 0 : t.body,
		o = rn(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
		s = rn(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
		a = -r.scrollLeft + ao(e),
		l = -r.scrollTop;
	return (
		wt(i || n).direction === 'rtl' && (a += rn(n.clientWidth, i ? i.clientWidth : 0) - o),
		{ width: o, height: s, x: a, y: l }
	);
}
function lo(e) {
	var t = wt(e),
		n = t.overflow,
		r = t.overflowX,
		i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function nl(e) {
	return ['html', 'body', '#document'].indexOf(bt(e)) >= 0 ? e.ownerDocument.body : tt(e) && lo(e) ? e : nl(ei(e));
}
function Bn(e, t) {
	var n;
	t === void 0 && (t = []);
	var r = nl(e),
		i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
		o = ct(r),
		s = i ? [o].concat(o.visualViewport || [], lo(r) ? r : []) : r,
		a = t.concat(s);
	return i ? a : a.concat(Bn(ei(s)));
}
function Ni(e) {
	return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function Bd(e) {
	var t = Sn(e);
	return (
		(t.top = t.top + e.clientTop),
		(t.left = t.left + e.clientLeft),
		(t.bottom = t.top + e.clientHeight),
		(t.right = t.left + e.clientWidth),
		(t.width = e.clientWidth),
		(t.height = e.clientHeight),
		(t.x = t.left),
		(t.y = t.top),
		t
	);
}
function os(e, t) {
	return t === Ya ? Ni(kd(e)) : Cn(t) ? Bd(t) : Ni(jd(qt(e)));
}
function qd(e) {
	var t = Bn(ei(e)),
		n = ['absolute', 'fixed'].indexOf(wt(e).position) >= 0,
		r = n && tt(e) ? or(e) : e;
	return Cn(r)
		? t.filter(function (i) {
				return Cn(i) && Ja(i, r) && bt(i) !== 'body' && (n ? wt(i).position !== 'static' : !0);
			})
		: [];
}
function Vd(e, t, n) {
	var r = t === 'clippingParents' ? qd(e) : [].concat(t),
		i = [].concat(r, [n]),
		o = i[0],
		s = i.reduce(
			function (a, l) {
				var c = os(e, l);
				return (
					(a.top = rn(c.top, a.top)),
					(a.right = $r(c.right, a.right)),
					(a.bottom = $r(c.bottom, a.bottom)),
					(a.left = rn(c.left, a.left)),
					a
				);
			},
			os(e, o),
		);
	return ((s.width = s.right - s.left), (s.height = s.bottom - s.top), (s.x = s.left), (s.y = s.top), s);
}
function rl(e) {
	var t = e.reference,
		n = e.element,
		r = e.placement,
		i = r ? gt(r) : null,
		o = r ? En(r) : null,
		s = t.x + t.width / 2 - n.width / 2,
		a = t.y + t.height / 2 - n.height / 2,
		l;
	switch (i) {
		case qe:
			l = { x: s, y: t.y - n.height };
			break;
		case nt:
			l = { x: s, y: t.y + t.height };
			break;
		case rt:
			l = { x: t.x + t.width, y: a };
			break;
		case Ve:
			l = { x: t.x - n.width, y: a };
			break;
		default:
			l = { x: t.x, y: t.y };
	}
	var c = i ? oo(i) : null;
	if (c != null) {
		var u = c === 'y' ? 'height' : 'width';
		switch (o) {
			case Tn:
				l[c] = l[c] - (t[u] / 2 - n[u] / 2);
				break;
			case Gn:
				l[c] = l[c] + (t[u] / 2 - n[u] / 2);
				break;
		}
	}
	return l;
}
function Xn(e, t) {
	t === void 0 && (t = {});
	var n = t,
		r = n.placement,
		i = r === void 0 ? e.placement : r,
		o = n.boundary,
		s = o === void 0 ? cd : o,
		a = n.rootBoundary,
		l = a === void 0 ? Ya : a,
		c = n.elementContext,
		u = c === void 0 ? Mn : c,
		d = n.altBoundary,
		g = d === void 0 ? !1 : d,
		v = n.padding,
		y = v === void 0 ? 0 : v,
		b = el(typeof y != 'number' ? y : tl(y, ir)),
		C = u === Mn ? fd : Mn,
		m = e.rects.popper,
		x = e.elements[g ? C : u],
		R = Vd(Cn(x) ? x : x.contextElement || qt(e.elements.popper), s, l),
		f = Sn(e.elements.reference),
		D = rl({ reference: f, element: m, placement: i }),
		O = Ni(Object.assign({}, m, D)),
		T = u === Mn ? O : f,
		L = {
			top: R.top - T.top + b.top,
			bottom: T.bottom - R.bottom + b.bottom,
			left: R.left - T.left + b.left,
			right: T.right - R.right + b.right,
		},
		k = e.modifiersData.offset;
	if (u === Mn && k) {
		var B = k[i];
		Object.keys(L).forEach(function (K) {
			var M = [rt, nt].indexOf(K) >= 0 ? 1 : -1,
				Q = [qe, nt].indexOf(K) >= 0 ? 'y' : 'x';
			L[K] += B[Q] * M;
		});
	}
	return L;
}
function Ud(e, t) {
	t === void 0 && (t = {});
	var n = t,
		r = n.placement,
		i = n.boundary,
		o = n.rootBoundary,
		s = n.padding,
		a = n.flipVariations,
		l = n.allowedAutoPlacements,
		c = l === void 0 ? Ga : l,
		u = En(r),
		d = u
			? a
				? ts
				: ts.filter(function (y) {
						return En(y) === u;
					})
			: ir,
		g = d.filter(function (y) {
			return c.indexOf(y) >= 0;
		});
	g.length === 0 && (g = d);
	var v = g.reduce(function (y, b) {
		return ((y[b] = Xn(e, { placement: b, boundary: i, rootBoundary: o, padding: s })[gt(b)]), y);
	}, {});
	return Object.keys(v).sort(function (y, b) {
		return v[y] - v[b];
	});
}
function Wd(e) {
	if (gt(e) === ro) return [];
	var t = wr(e);
	return [is(e), t, is(t)];
}
function zd(e) {
	var t = e.state,
		n = e.options,
		r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (
			var i = n.mainAxis,
				o = i === void 0 ? !0 : i,
				s = n.altAxis,
				a = s === void 0 ? !0 : s,
				l = n.fallbackPlacements,
				c = n.padding,
				u = n.boundary,
				d = n.rootBoundary,
				g = n.altBoundary,
				v = n.flipVariations,
				y = v === void 0 ? !0 : v,
				b = n.allowedAutoPlacements,
				C = t.options.placement,
				m = gt(C),
				x = m === C,
				R = l || (x || !y ? [wr(C)] : Wd(C)),
				f = [C].concat(R).reduce(function (Ee, _e) {
					return Ee.concat(
						gt(_e) === ro
							? Ud(t, {
									placement: _e,
									boundary: u,
									rootBoundary: d,
									padding: c,
									flipVariations: y,
									allowedAutoPlacements: b,
								})
							: _e,
					);
				}, []),
				D = t.rects.reference,
				O = t.rects.popper,
				T = new Map(),
				L = !0,
				k = f[0],
				B = 0;
			B < f.length;
			B++
		) {
			var K = f[B],
				M = gt(K),
				Q = En(K) === Tn,
				te = [qe, nt].indexOf(M) >= 0,
				me = te ? 'width' : 'height',
				ee = Xn(t, { placement: K, boundary: u, rootBoundary: d, altBoundary: g, padding: c }),
				q = te ? (Q ? rt : Ve) : Q ? nt : qe;
			D[me] > O[me] && (q = wr(q));
			var W = wr(q),
				be = [];
			if (
				(o && be.push(ee[M] <= 0),
				a && be.push(ee[q] <= 0, ee[W] <= 0),
				be.every(function (Ee) {
					return Ee;
				}))
			) {
				((k = K), (L = !1));
				break;
			}
			T.set(K, be);
		}
		if (L)
			for (
				var ge = y ? 3 : 1,
					we = function (_e) {
						var ae = f.find(function (Pe) {
							var We = T.get(Pe);
							if (We)
								return We.slice(0, _e).every(function (_t) {
									return _t;
								});
						});
						if (ae) return ((k = ae), 'break');
					},
					ye = ge;
				ye > 0;
				ye--
			) {
				var Ue = we(ye);
				if (Ue === 'break') break;
			}
		t.placement !== k && ((t.modifiersData[r]._skip = !0), (t.placement = k), (t.reset = !0));
	}
}
var Kd = { name: 'flip', enabled: !0, phase: 'main', fn: zd, requiresIfExists: ['offset'], data: { _skip: !1 } };
function ss(e, t, n) {
	return (
		n === void 0 && (n = { x: 0, y: 0 }),
		{
			top: e.top - t.height - n.y,
			right: e.right - t.width + n.x,
			bottom: e.bottom - t.height + n.y,
			left: e.left - t.width - n.x,
		}
	);
}
function as(e) {
	return [qe, rt, nt, Ve].some(function (t) {
		return e[t] >= 0;
	});
}
function Yd(e) {
	var t = e.state,
		n = e.name,
		r = t.rects.reference,
		i = t.rects.popper,
		o = t.modifiersData.preventOverflow,
		s = Xn(t, { elementContext: 'reference' }),
		a = Xn(t, { altBoundary: !0 }),
		l = ss(s, r),
		c = ss(a, i, o),
		u = as(l),
		d = as(c);
	((t.modifiersData[n] = {
		referenceClippingOffsets: l,
		popperEscapeOffsets: c,
		isReferenceHidden: u,
		hasPopperEscaped: d,
	}),
		(t.attributes.popper = Object.assign({}, t.attributes.popper, {
			'data-popper-reference-hidden': u,
			'data-popper-escaped': d,
		})));
}
var Gd = { name: 'hide', enabled: !0, phase: 'main', requiresIfExists: ['preventOverflow'], fn: Yd };
function Xd(e, t, n) {
	var r = gt(e),
		i = [Ve, qe].indexOf(r) >= 0 ? -1 : 1,
		o = typeof n == 'function' ? n(Object.assign({}, t, { placement: e })) : n,
		s = o[0],
		a = o[1];
	return ((s = s || 0), (a = (a || 0) * i), [Ve, rt].indexOf(r) >= 0 ? { x: a, y: s } : { x: s, y: a });
}
function Qd(e) {
	var t = e.state,
		n = e.options,
		r = e.name,
		i = n.offset,
		o = i === void 0 ? [0, 0] : i,
		s = Ga.reduce(function (u, d) {
			return ((u[d] = Xd(d, t.rects, o)), u);
		}, {}),
		a = s[t.placement],
		l = a.x,
		c = a.y;
	(t.modifiersData.popperOffsets != null &&
		((t.modifiersData.popperOffsets.x += l), (t.modifiersData.popperOffsets.y += c)),
		(t.modifiersData[r] = s));
}
var Jd = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: Qd };
function Zd(e) {
	var t = e.state,
		n = e.name;
	t.modifiersData[n] = rl({ reference: t.rects.reference, element: t.rects.popper, placement: t.placement });
}
var ep = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: Zd, data: {} };
function tp(e) {
	return e === 'x' ? 'y' : 'x';
}
function np(e) {
	var t = e.state,
		n = e.options,
		r = e.name,
		i = n.mainAxis,
		o = i === void 0 ? !0 : i,
		s = n.altAxis,
		a = s === void 0 ? !1 : s,
		l = n.boundary,
		c = n.rootBoundary,
		u = n.altBoundary,
		d = n.padding,
		g = n.tether,
		v = g === void 0 ? !0 : g,
		y = n.tetherOffset,
		b = y === void 0 ? 0 : y,
		C = Xn(t, { boundary: l, rootBoundary: c, padding: d, altBoundary: u }),
		m = gt(t.placement),
		x = En(t.placement),
		R = !x,
		f = oo(m),
		D = tp(f),
		O = t.modifiersData.popperOffsets,
		T = t.rects.reference,
		L = t.rects.popper,
		k = typeof b == 'function' ? b(Object.assign({}, t.rects, { placement: t.placement })) : b,
		B = typeof k == 'number' ? { mainAxis: k, altAxis: k } : Object.assign({ mainAxis: 0, altAxis: 0 }, k),
		K = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
		M = { x: 0, y: 0 };
	if (O) {
		if (o) {
			var Q,
				te = f === 'y' ? qe : Ve,
				me = f === 'y' ? nt : rt,
				ee = f === 'y' ? 'height' : 'width',
				q = O[f],
				W = q + C[te],
				be = q - C[me],
				ge = v ? -L[ee] / 2 : 0,
				we = x === Tn ? T[ee] : L[ee],
				ye = x === Tn ? -L[ee] : -T[ee],
				Ue = t.elements.arrow,
				Ee = v && Ue ? io(Ue) : { width: 0, height: 0 },
				_e = t.modifiersData['arrow#persistent'] ? t.modifiersData['arrow#persistent'].padding : Za(),
				ae = _e[te],
				Pe = _e[me],
				We = jn(0, T[ee], Ee[ee]),
				_t = R ? T[ee] / 2 - ge - We - ae - B.mainAxis : we - We - ae - B.mainAxis,
				je = R ? -T[ee] / 2 + ge + We + Pe + B.mainAxis : ye + We + Pe + B.mainAxis,
				Vt = t.elements.arrow && or(t.elements.arrow),
				p = Vt ? (f === 'y' ? Vt.clientTop || 0 : Vt.clientLeft || 0) : 0,
				h = (Q = K?.[f]) != null ? Q : 0,
				w = q + _t - h - p,
				P = q + je - h,
				E = jn(v ? $r(W, w) : W, q, v ? rn(be, P) : be);
			((O[f] = E), (M[f] = E - q));
		}
		if (a) {
			var A,
				F = f === 'x' ? qe : Ve,
				$ = f === 'x' ? nt : rt,
				I = O[D],
				S = D === 'y' ? 'height' : 'width',
				z = I + C[F],
				N = I - C[$],
				j = [qe, Ve].indexOf(m) !== -1,
				X = (A = K?.[D]) != null ? A : 0,
				ne = j ? z : I - T[S] - L[S] - X + B.altAxis,
				ue = j ? I + T[S] + L[S] - X - B.altAxis : N,
				oe = v && j ? Sd(ne, I, ue) : jn(v ? ne : z, I, v ? ue : N);
			((O[D] = oe), (M[D] = oe - I));
		}
		t.modifiersData[r] = M;
	}
}
var rp = { name: 'preventOverflow', enabled: !0, phase: 'main', fn: np, requiresIfExists: ['offset'] };
function ip(e) {
	return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function op(e) {
	return e === ct(e) || !tt(e) ? so(e) : ip(e);
}
function sp(e) {
	var t = e.getBoundingClientRect(),
		n = On(t.width) / e.offsetWidth || 1,
		r = On(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function ap(e, t, n) {
	n === void 0 && (n = !1);
	var r = tt(t),
		i = tt(t) && sp(t),
		o = qt(t),
		s = Sn(e, i),
		a = { scrollLeft: 0, scrollTop: 0 },
		l = { x: 0, y: 0 };
	return (
		(r || (!r && !n)) &&
			((bt(t) !== 'body' || lo(o)) && (a = op(t)),
			tt(t) ? ((l = Sn(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop)) : o && (l.x = ao(o))),
		{ x: s.left + a.scrollLeft - l.x, y: s.top + a.scrollTop - l.y, width: s.width, height: s.height }
	);
}
function lp(e) {
	var t = new Map(),
		n = new Set(),
		r = [];
	e.forEach(function (o) {
		t.set(o.name, o);
	});
	function i(o) {
		n.add(o.name);
		var s = [].concat(o.requires || [], o.requiresIfExists || []);
		(s.forEach(function (a) {
			if (!n.has(a)) {
				var l = t.get(a);
				l && i(l);
			}
		}),
			r.push(o));
	}
	return (
		e.forEach(function (o) {
			n.has(o.name) || i(o);
		}),
		r
	);
}
function up(e) {
	var t = lp(e);
	return _d.reduce(function (n, r) {
		return n.concat(
			t.filter(function (i) {
				return i.phase === r;
			}),
		);
	}, []);
}
function cp(e) {
	var t;
	return function () {
		return (
			t ||
				(t = new Promise(function (n) {
					Promise.resolve().then(function () {
						((t = void 0), n(e()));
					});
				})),
			t
		);
	};
}
function fp(e) {
	var t = e.reduce(function (n, r) {
		var i = n[r.name];
		return (
			(n[r.name] = i
				? Object.assign({}, i, r, {
						options: Object.assign({}, i.options, r.options),
						data: Object.assign({}, i.data, r.data),
					})
				: r),
			n
		);
	}, {});
	return Object.keys(t).map(function (n) {
		return t[n];
	});
}
var ls = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function us() {
	for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	return !t.some(function (r) {
		return !(r && typeof r.getBoundingClientRect == 'function');
	});
}
function dp(e) {
	e === void 0 && (e = {});
	var t = e,
		n = t.defaultModifiers,
		r = n === void 0 ? [] : n,
		i = t.defaultOptions,
		o = i === void 0 ? ls : i;
	return function (a, l, c) {
		c === void 0 && (c = o);
		var u = {
				placement: 'bottom',
				orderedModifiers: [],
				options: Object.assign({}, ls, o),
				modifiersData: {},
				elements: { reference: a, popper: l },
				attributes: {},
				styles: {},
			},
			d = [],
			g = !1,
			v = {
				state: u,
				setOptions: function (m) {
					var x = typeof m == 'function' ? m(u.options) : m;
					(b(),
						(u.options = Object.assign({}, o, u.options, x)),
						(u.scrollParents = {
							reference: Cn(a) ? Bn(a) : a.contextElement ? Bn(a.contextElement) : [],
							popper: Bn(l),
						}));
					var R = up(fp([].concat(r, u.options.modifiers)));
					return (
						(u.orderedModifiers = R.filter(function (f) {
							return f.enabled;
						})),
						y(),
						v.update()
					);
				},
				forceUpdate: function () {
					if (!g) {
						var m = u.elements,
							x = m.reference,
							R = m.popper;
						if (us(x, R)) {
							((u.rects = { reference: ap(x, or(R), u.options.strategy === 'fixed'), popper: io(R) }),
								(u.reset = !1),
								(u.placement = u.options.placement),
								u.orderedModifiers.forEach(function (B) {
									return (u.modifiersData[B.name] = Object.assign({}, B.data));
								}));
							for (var f = 0; f < u.orderedModifiers.length; f++) {
								if (u.reset === !0) {
									((u.reset = !1), (f = -1));
									continue;
								}
								var D = u.orderedModifiers[f],
									O = D.fn,
									T = D.options,
									L = T === void 0 ? {} : T,
									k = D.name;
								typeof O == 'function' && (u = O({ state: u, options: L, name: k, instance: v }) || u);
							}
						}
					}
				},
				update: cp(function () {
					return new Promise(function (C) {
						(v.forceUpdate(), C(u));
					});
				}),
				destroy: function () {
					(b(), (g = !0));
				},
			};
		if (!us(a, l)) return v;
		v.setOptions(c).then(function (C) {
			!g && c.onFirstUpdate && c.onFirstUpdate(C);
		});
		function y() {
			u.orderedModifiers.forEach(function (C) {
				var m = C.name,
					x = C.options,
					R = x === void 0 ? {} : x,
					f = C.effect;
				if (typeof f == 'function') {
					var D = f({ state: u, name: m, instance: v, options: R }),
						O = function () {};
					d.push(D || O);
				}
			});
		}
		function b() {
			(d.forEach(function (C) {
				return C();
			}),
				(d = []));
		}
		return v;
	};
}
var pp = [Fd, ep, $d, Qa, Jd, Kd, rp, Dd, Gd],
	hp = dp({ defaultModifiers: pp }),
	vp = 'tippy-box',
	il = 'tippy-content',
	ol = 'tippy-backdrop',
	sl = 'tippy-arrow',
	al = 'tippy-svg-arrow',
	Xt = { passive: !0, capture: !0 },
	ll = function () {
		return document.body;
	};
function wi(e, t, n) {
	if (Array.isArray(e)) {
		var r = e[t];
		return r ?? (Array.isArray(n) ? n[t] : n);
	}
	return e;
}
function uo(e, t) {
	var n = {}.toString.call(e);
	return n.indexOf('[object') === 0 && n.indexOf(t + ']') > -1;
}
function ul(e, t) {
	return typeof e == 'function' ? e.apply(void 0, t) : e;
}
function cs(e, t) {
	if (t === 0) return e;
	var n;
	return function (r) {
		(clearTimeout(n),
			(n = setTimeout(function () {
				e(r);
			}, t)));
	};
}
function mp(e, t) {
	var n = Object.assign({}, e);
	return (
		t.forEach(function (r) {
			delete n[r];
		}),
		n
	);
}
function gp(e) {
	return e.split(/\s+/).filter(Boolean);
}
function Jt(e) {
	return [].concat(e);
}
function fs(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function yp(e) {
	return e.filter(function (t, n) {
		return e.indexOf(t) === n;
	});
}
function cl(e) {
	return e.split('-')[0];
}
function An(e) {
	return [].slice.call(e);
}
function ds(e) {
	return Object.keys(e).reduce(function (t, n) {
		return (e[n] !== void 0 && (t[n] = e[n]), t);
	}, {});
}
function on() {
	return document.createElement('div');
}
function ti(e) {
	return ['Element', 'Fragment'].some(function (t) {
		return uo(e, t);
	});
}
function bp(e) {
	return uo(e, 'NodeList');
}
function co(e) {
	return uo(e, 'MouseEvent');
}
function wp(e) {
	return !!(e && e._tippy && e._tippy.reference === e);
}
function _p(e) {
	return ti(e) ? [e] : bp(e) ? An(e) : Array.isArray(e) ? e : An(document.querySelectorAll(e));
}
function _i(e, t) {
	e.forEach(function (n) {
		n && (n.style.transitionDuration = t + 'ms');
	});
}
function Qn(e, t) {
	e.forEach(function (n) {
		n && n.setAttribute('data-state', t);
	});
}
function fl(e) {
	var t,
		n = Jt(e),
		r = n[0];
	return r != null && (t = r.ownerDocument) != null && t.body ? r.ownerDocument : document;
}
function xp(e, t) {
	var n = t.clientX,
		r = t.clientY;
	return e.every(function (i) {
		var o = i.popperRect,
			s = i.popperState,
			a = i.props,
			l = a.interactiveBorder,
			c = cl(s.placement),
			u = s.modifiersData.offset;
		if (!u) return !0;
		var d = c === 'bottom' ? u.top.y : 0,
			g = c === 'top' ? u.bottom.y : 0,
			v = c === 'right' ? u.left.x : 0,
			y = c === 'left' ? u.right.x : 0,
			b = o.top - r + d > l,
			C = r - o.bottom - g > l,
			m = o.left - n + v > l,
			x = n - o.right - y > l;
		return b || C || m || x;
	});
}
function xi(e, t, n) {
	var r = t + 'EventListener';
	['transitionend', 'webkitTransitionEnd'].forEach(function (i) {
		e[r](i, n);
	});
}
function ps(e, t) {
	for (var n = t; n; ) {
		var r;
		if (e.contains(n)) return !0;
		n = n.getRootNode == null || (r = n.getRootNode()) == null ? void 0 : r.host;
	}
	return !1;
}
var vt = { isTouch: !1 },
	hs = 0;
function Tp() {
	vt.isTouch || ((vt.isTouch = !0), window.performance && document.addEventListener('mousemove', dl));
}
function dl() {
	var e = performance.now();
	(e - hs < 20 && ((vt.isTouch = !1), document.removeEventListener('mousemove', dl)), (hs = e));
}
function Cp() {
	var e = document.activeElement;
	if (wp(e)) {
		var t = e._tippy;
		e.blur && !t.state.isVisible && e.blur();
	}
}
function Op() {
	(document.addEventListener('touchstart', Tp, Xt), window.addEventListener('blur', Cp));
}
var Sp = typeof window < 'u' && typeof document < 'u',
	Ep = Sp ? !!window.msCrypto : !1,
	Ap = { animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1 },
	Pp = {
		allowHTML: !1,
		animation: 'fade',
		arrow: !0,
		content: '',
		inertia: !1,
		maxWidth: 350,
		role: 'tooltip',
		theme: '',
		zIndex: 9999,
	},
	ot = Object.assign(
		{
			appendTo: ll,
			aria: { content: 'auto', expanded: 'auto' },
			delay: 0,
			duration: [300, 250],
			getReferenceClientRect: null,
			hideOnClick: !0,
			ignoreAttributes: !1,
			interactive: !1,
			interactiveBorder: 2,
			interactiveDebounce: 0,
			moveTransition: '',
			offset: [0, 10],
			onAfterUpdate: function () {},
			onBeforeUpdate: function () {},
			onCreate: function () {},
			onDestroy: function () {},
			onHidden: function () {},
			onHide: function () {},
			onMount: function () {},
			onShow: function () {},
			onShown: function () {},
			onTrigger: function () {},
			onUntrigger: function () {},
			onClickOutside: function () {},
			placement: 'top',
			plugins: [],
			popperOptions: {},
			render: null,
			showOnCreate: !1,
			touch: !0,
			trigger: 'mouseenter focus',
			triggerTarget: null,
		},
		Ap,
		Pp,
	),
	Dp = Object.keys(ot),
	Mp = function (t) {
		var n = Object.keys(t);
		n.forEach(function (r) {
			ot[r] = t[r];
		});
	};
function pl(e) {
	var t = e.plugins || [],
		n = t.reduce(function (r, i) {
			var o = i.name,
				s = i.defaultValue;
			if (o) {
				var a;
				r[o] = e[o] !== void 0 ? e[o] : (a = ot[o]) != null ? a : s;
			}
			return r;
		}, {});
	return Object.assign({}, e, n);
}
function Ip(e, t) {
	var n = t ? Object.keys(pl(Object.assign({}, ot, { plugins: t }))) : Dp,
		r = n.reduce(function (i, o) {
			var s = (e.getAttribute('data-tippy-' + o) || '').trim();
			if (!s) return i;
			if (o === 'content') i[o] = s;
			else
				try {
					i[o] = JSON.parse(s);
				} catch {
					i[o] = s;
				}
			return i;
		}, {});
	return r;
}
function vs(e, t) {
	var n = Object.assign({}, t, { content: ul(t.content, [e]) }, t.ignoreAttributes ? {} : Ip(e, t.plugins));
	return (
		(n.aria = Object.assign({}, ot.aria, n.aria)),
		(n.aria = {
			expanded: n.aria.expanded === 'auto' ? t.interactive : n.aria.expanded,
			content: n.aria.content === 'auto' ? (t.interactive ? null : 'describedby') : n.aria.content,
		}),
		n
	);
}
var Lp = function () {
	return 'innerHTML';
};
function Hi(e, t) {
	e[Lp()] = t;
}
function ms(e) {
	var t = on();
	return (e === !0 ? (t.className = sl) : ((t.className = al), ti(e) ? t.appendChild(e) : Hi(t, e)), t);
}
function gs(e, t) {
	ti(t.content)
		? (Hi(e, ''), e.appendChild(t.content))
		: typeof t.content != 'function' && (t.allowHTML ? Hi(e, t.content) : (e.textContent = t.content));
}
function Rr(e) {
	var t = e.firstElementChild,
		n = An(t.children);
	return {
		box: t,
		content: n.find(function (r) {
			return r.classList.contains(il);
		}),
		arrow: n.find(function (r) {
			return r.classList.contains(sl) || r.classList.contains(al);
		}),
		backdrop: n.find(function (r) {
			return r.classList.contains(ol);
		}),
	};
}
function hl(e) {
	var t = on(),
		n = on();
	((n.className = vp), n.setAttribute('data-state', 'hidden'), n.setAttribute('tabindex', '-1'));
	var r = on();
	((r.className = il),
		r.setAttribute('data-state', 'hidden'),
		gs(r, e.props),
		t.appendChild(n),
		n.appendChild(r),
		i(e.props, e.props));
	function i(o, s) {
		var a = Rr(t),
			l = a.box,
			c = a.content,
			u = a.arrow;
		(s.theme ? l.setAttribute('data-theme', s.theme) : l.removeAttribute('data-theme'),
			typeof s.animation == 'string'
				? l.setAttribute('data-animation', s.animation)
				: l.removeAttribute('data-animation'),
			s.inertia ? l.setAttribute('data-inertia', '') : l.removeAttribute('data-inertia'),
			(l.style.maxWidth = typeof s.maxWidth == 'number' ? s.maxWidth + 'px' : s.maxWidth),
			s.role ? l.setAttribute('role', s.role) : l.removeAttribute('role'),
			(o.content !== s.content || o.allowHTML !== s.allowHTML) && gs(c, e.props),
			s.arrow
				? u
					? o.arrow !== s.arrow && (l.removeChild(u), l.appendChild(ms(s.arrow)))
					: l.appendChild(ms(s.arrow))
				: u && l.removeChild(u));
	}
	return { popper: t, onUpdate: i };
}
hl.$$tippy = !0;
var $p = 1,
	pr = [],
	Ti = [];
function Rp(e, t) {
	var n = vs(e, Object.assign({}, ot, pl(ds(t)))),
		r,
		i,
		o,
		s = !1,
		a = !1,
		l = !1,
		c = !1,
		u,
		d,
		g,
		v = [],
		y = cs(w, n.interactiveDebounce),
		b,
		C = $p++,
		m = null,
		x = yp(n.plugins),
		R = { isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1 },
		f = {
			id: C,
			reference: e,
			popper: on(),
			popperInstance: m,
			props: n,
			state: R,
			plugins: x,
			clearDelayTimeouts: ne,
			setProps: ue,
			setContent: oe,
			show: De,
			hide: Me,
			hideWithInteractivity: Qe,
			enable: j,
			disable: X,
			unmount: Je,
			destroy: Ut,
		};
	if (!n.render) return f;
	var D = n.render(f),
		O = D.popper,
		T = D.onUpdate;
	(O.setAttribute('data-tippy-root', ''), (O.id = 'tippy-' + f.id), (f.popper = O), (e._tippy = f), (O._tippy = f));
	var L = x.map(function (_) {
			return _.fn(f);
		}),
		k = e.hasAttribute('aria-expanded');
	return (
		Vt(),
		ge(),
		q(),
		W('onCreate', [f]),
		n.showOnCreate && z(),
		O.addEventListener('mouseenter', function () {
			f.props.interactive && f.state.isVisible && f.clearDelayTimeouts();
		}),
		O.addEventListener('mouseleave', function () {
			f.props.interactive && f.props.trigger.indexOf('mouseenter') >= 0 && te().addEventListener('mousemove', y);
		}),
		f
	);
	function B() {
		var _ = f.props.touch;
		return Array.isArray(_) ? _ : [_, 0];
	}
	function K() {
		return B()[0] === 'hold';
	}
	function M() {
		var _;
		return !!((_ = f.props.render) != null && _.$$tippy);
	}
	function Q() {
		return b || e;
	}
	function te() {
		var _ = Q().parentNode;
		return _ ? fl(_) : document;
	}
	function me() {
		return Rr(O);
	}
	function ee(_) {
		return (f.state.isMounted && !f.state.isVisible) || vt.isTouch || (u && u.type === 'focus')
			? 0
			: wi(f.props.delay, _ ? 0 : 1, ot.delay);
	}
	function q(_) {
		(_ === void 0 && (_ = !1),
			(O.style.pointerEvents = f.props.interactive && !_ ? '' : 'none'),
			(O.style.zIndex = '' + f.props.zIndex));
	}
	function W(_, H, V) {
		if (
			(V === void 0 && (V = !0),
			L.forEach(function (ie) {
				ie[_] && ie[_].apply(ie, H);
			}),
			V)
		) {
			var le;
			(le = f.props)[_].apply(le, H);
		}
	}
	function be() {
		var _ = f.props.aria;
		if (_.content) {
			var H = 'aria-' + _.content,
				V = O.id,
				le = Jt(f.props.triggerTarget || e);
			le.forEach(function (ie) {
				var Fe = ie.getAttribute(H);
				if (f.state.isVisible) ie.setAttribute(H, Fe ? Fe + ' ' + V : V);
				else {
					var Ze = Fe && Fe.replace(V, '').trim();
					Ze ? ie.setAttribute(H, Ze) : ie.removeAttribute(H);
				}
			});
		}
	}
	function ge() {
		if (!(k || !f.props.aria.expanded)) {
			var _ = Jt(f.props.triggerTarget || e);
			_.forEach(function (H) {
				f.props.interactive
					? H.setAttribute('aria-expanded', f.state.isVisible && H === Q() ? 'true' : 'false')
					: H.removeAttribute('aria-expanded');
			});
		}
	}
	function we() {
		(te().removeEventListener('mousemove', y),
			(pr = pr.filter(function (_) {
				return _ !== y;
			})));
	}
	function ye(_) {
		if (!(vt.isTouch && (l || _.type === 'mousedown'))) {
			var H = (_.composedPath && _.composedPath()[0]) || _.target;
			if (!(f.props.interactive && ps(O, H))) {
				if (
					Jt(f.props.triggerTarget || e).some(function (V) {
						return ps(V, H);
					})
				) {
					if (vt.isTouch || (f.state.isVisible && f.props.trigger.indexOf('click') >= 0)) return;
				} else W('onClickOutside', [f, _]);
				f.props.hideOnClick === !0 &&
					(f.clearDelayTimeouts(),
					f.hide(),
					(a = !0),
					setTimeout(function () {
						a = !1;
					}),
					f.state.isMounted || ae());
			}
		}
	}
	function Ue() {
		l = !0;
	}
	function Ee() {
		l = !1;
	}
	function _e() {
		var _ = te();
		(_.addEventListener('mousedown', ye, !0),
			_.addEventListener('touchend', ye, Xt),
			_.addEventListener('touchstart', Ee, Xt),
			_.addEventListener('touchmove', Ue, Xt));
	}
	function ae() {
		var _ = te();
		(_.removeEventListener('mousedown', ye, !0),
			_.removeEventListener('touchend', ye, Xt),
			_.removeEventListener('touchstart', Ee, Xt),
			_.removeEventListener('touchmove', Ue, Xt));
	}
	function Pe(_, H) {
		_t(_, function () {
			!f.state.isVisible && O.parentNode && O.parentNode.contains(O) && H();
		});
	}
	function We(_, H) {
		_t(_, H);
	}
	function _t(_, H) {
		var V = me().box;
		function le(ie) {
			ie.target === V && (xi(V, 'remove', le), H());
		}
		if (_ === 0) return H();
		(xi(V, 'remove', d), xi(V, 'add', le), (d = le));
	}
	function je(_, H, V) {
		V === void 0 && (V = !1);
		var le = Jt(f.props.triggerTarget || e);
		le.forEach(function (ie) {
			(ie.addEventListener(_, H, V), v.push({ node: ie, eventType: _, handler: H, options: V }));
		});
	}
	function Vt() {
		(K() && (je('touchstart', h, { passive: !0 }), je('touchend', P, { passive: !0 })),
			gp(f.props.trigger).forEach(function (_) {
				if (_ !== 'manual')
					switch ((je(_, h), _)) {
						case 'mouseenter':
							je('mouseleave', P);
							break;
						case 'focus':
							je(Ep ? 'focusout' : 'blur', E);
							break;
						case 'focusin':
							je('focusout', E);
							break;
					}
			}));
	}
	function p() {
		(v.forEach(function (_) {
			var H = _.node,
				V = _.eventType,
				le = _.handler,
				ie = _.options;
			H.removeEventListener(V, le, ie);
		}),
			(v = []));
	}
	function h(_) {
		var H,
			V = !1;
		if (!(!f.state.isEnabled || A(_) || a)) {
			var le = ((H = u) == null ? void 0 : H.type) === 'focus';
			((u = _),
				(b = _.currentTarget),
				ge(),
				!f.state.isVisible &&
					co(_) &&
					pr.forEach(function (ie) {
						return ie(_);
					}),
				_.type === 'click' &&
				(f.props.trigger.indexOf('mouseenter') < 0 || s) &&
				f.props.hideOnClick !== !1 &&
				f.state.isVisible
					? (V = !0)
					: z(_),
				_.type === 'click' && (s = !V),
				V && !le && N(_));
		}
	}
	function w(_) {
		var H = _.target,
			V = Q().contains(H) || O.contains(H);
		if (!(_.type === 'mousemove' && V)) {
			var le = S()
				.concat(O)
				.map(function (ie) {
					var Fe,
						Ze = ie._tippy,
						cn = (Fe = Ze.popperInstance) == null ? void 0 : Fe.state;
					return cn ? { popperRect: ie.getBoundingClientRect(), popperState: cn, props: n } : null;
				})
				.filter(Boolean);
			xp(le, _) && (we(), N(_));
		}
	}
	function P(_) {
		var H = A(_) || (f.props.trigger.indexOf('click') >= 0 && s);
		if (!H) {
			if (f.props.interactive) {
				f.hideWithInteractivity(_);
				return;
			}
			N(_);
		}
	}
	function E(_) {
		(f.props.trigger.indexOf('focusin') < 0 && _.target !== Q()) ||
			(f.props.interactive && _.relatedTarget && O.contains(_.relatedTarget)) ||
			N(_);
	}
	function A(_) {
		return vt.isTouch ? K() !== _.type.indexOf('touch') >= 0 : !1;
	}
	function F() {
		$();
		var _ = f.props,
			H = _.popperOptions,
			V = _.placement,
			le = _.offset,
			ie = _.getReferenceClientRect,
			Fe = _.moveTransition,
			Ze = M() ? Rr(O).arrow : null,
			cn = ie ? { getBoundingClientRect: ie, contextElement: ie.contextElement || Q() } : e,
			fo = {
				name: '$$tippy',
				enabled: !0,
				phase: 'beforeWrite',
				requires: ['computeStyles'],
				fn: function (sr) {
					var fn = sr.state;
					if (M()) {
						var yl = me(),
							ri = yl.box;
						(['placement', 'reference-hidden', 'escaped'].forEach(function (ar) {
							ar === 'placement'
								? ri.setAttribute('data-placement', fn.placement)
								: fn.attributes.popper['data-popper-' + ar]
									? ri.setAttribute('data-' + ar, '')
									: ri.removeAttribute('data-' + ar);
						}),
							(fn.attributes.popper = {}));
					}
				},
			},
			Wt = [
				{ name: 'offset', options: { offset: le } },
				{ name: 'preventOverflow', options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } } },
				{ name: 'flip', options: { padding: 5 } },
				{ name: 'computeStyles', options: { adaptive: !Fe } },
				fo,
			];
		(M() && Ze && Wt.push({ name: 'arrow', options: { element: Ze, padding: 3 } }),
			Wt.push.apply(Wt, H?.modifiers || []),
			(f.popperInstance = hp(cn, O, Object.assign({}, H, { placement: V, onFirstUpdate: g, modifiers: Wt }))));
	}
	function $() {
		f.popperInstance && (f.popperInstance.destroy(), (f.popperInstance = null));
	}
	function I() {
		var _ = f.props.appendTo,
			H,
			V = Q();
		((f.props.interactive && _ === ll) || _ === 'parent' ? (H = V.parentNode) : (H = ul(_, [V])),
			H.contains(O) || H.appendChild(O),
			(f.state.isMounted = !0),
			F());
	}
	function S() {
		return An(O.querySelectorAll('[data-tippy-root]'));
	}
	function z(_) {
		(f.clearDelayTimeouts(), _ && W('onTrigger', [f, _]), _e());
		var H = ee(!0),
			V = B(),
			le = V[0],
			ie = V[1];
		(vt.isTouch && le === 'hold' && ie && (H = ie),
			H
				? (r = setTimeout(function () {
						f.show();
					}, H))
				: f.show());
	}
	function N(_) {
		if ((f.clearDelayTimeouts(), W('onUntrigger', [f, _]), !f.state.isVisible)) {
			ae();
			return;
		}
		if (
			!(
				f.props.trigger.indexOf('mouseenter') >= 0 &&
				f.props.trigger.indexOf('click') >= 0 &&
				['mouseleave', 'mousemove'].indexOf(_.type) >= 0 &&
				s
			)
		) {
			var H = ee(!1);
			H
				? (i = setTimeout(function () {
						f.state.isVisible && f.hide();
					}, H))
				: (o = requestAnimationFrame(function () {
						f.hide();
					}));
		}
	}
	function j() {
		f.state.isEnabled = !0;
	}
	function X() {
		(f.hide(), (f.state.isEnabled = !1));
	}
	function ne() {
		(clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o));
	}
	function ue(_) {
		if (!f.state.isDestroyed) {
			(W('onBeforeUpdate', [f, _]), p());
			var H = f.props,
				V = vs(e, Object.assign({}, H, ds(_), { ignoreAttributes: !0 }));
			((f.props = V),
				Vt(),
				H.interactiveDebounce !== V.interactiveDebounce && (we(), (y = cs(w, V.interactiveDebounce))),
				H.triggerTarget && !V.triggerTarget
					? Jt(H.triggerTarget).forEach(function (le) {
							le.removeAttribute('aria-expanded');
						})
					: V.triggerTarget && e.removeAttribute('aria-expanded'),
				ge(),
				q(),
				T && T(H, V),
				f.popperInstance &&
					(F(),
					S().forEach(function (le) {
						requestAnimationFrame(le._tippy.popperInstance.forceUpdate);
					})),
				W('onAfterUpdate', [f, _]));
		}
	}
	function oe(_) {
		f.setProps({ content: _ });
	}
	function De() {
		var _ = f.state.isVisible,
			H = f.state.isDestroyed,
			V = !f.state.isEnabled,
			le = vt.isTouch && !f.props.touch,
			ie = wi(f.props.duration, 0, ot.duration);
		if (!(_ || H || V || le) && !Q().hasAttribute('disabled') && (W('onShow', [f], !1), f.props.onShow(f) !== !1)) {
			if (
				((f.state.isVisible = !0),
				M() && (O.style.visibility = 'visible'),
				q(),
				_e(),
				f.state.isMounted || (O.style.transition = 'none'),
				M())
			) {
				var Fe = me(),
					Ze = Fe.box,
					cn = Fe.content;
				_i([Ze, cn], 0);
			}
			((g = function () {
				var Wt;
				if (!(!f.state.isVisible || c)) {
					if (((c = !0), O.offsetHeight, (O.style.transition = f.props.moveTransition), M() && f.props.animation)) {
						var ni = me(),
							sr = ni.box,
							fn = ni.content;
						(_i([sr, fn], ie), Qn([sr, fn], 'visible'));
					}
					(be(),
						ge(),
						fs(Ti, f),
						(Wt = f.popperInstance) == null || Wt.forceUpdate(),
						W('onMount', [f]),
						f.props.animation &&
							M() &&
							We(ie, function () {
								((f.state.isShown = !0), W('onShown', [f]));
							}));
				}
			}),
				I());
		}
	}
	function Me() {
		var _ = !f.state.isVisible,
			H = f.state.isDestroyed,
			V = !f.state.isEnabled,
			le = wi(f.props.duration, 1, ot.duration);
		if (!(_ || H || V) && (W('onHide', [f], !1), f.props.onHide(f) !== !1)) {
			if (
				((f.state.isVisible = !1),
				(f.state.isShown = !1),
				(c = !1),
				(s = !1),
				M() && (O.style.visibility = 'hidden'),
				we(),
				ae(),
				q(!0),
				M())
			) {
				var ie = me(),
					Fe = ie.box,
					Ze = ie.content;
				f.props.animation && (_i([Fe, Ze], le), Qn([Fe, Ze], 'hidden'));
			}
			(be(), ge(), f.props.animation ? M() && Pe(le, f.unmount) : f.unmount());
		}
	}
	function Qe(_) {
		(te().addEventListener('mousemove', y), fs(pr, y), y(_));
	}
	function Je() {
		(f.state.isVisible && f.hide(),
			f.state.isMounted &&
				($(),
				S().forEach(function (_) {
					_._tippy.unmount();
				}),
				O.parentNode && O.parentNode.removeChild(O),
				(Ti = Ti.filter(function (_) {
					return _ !== f;
				})),
				(f.state.isMounted = !1),
				W('onHidden', [f])));
	}
	function Ut() {
		f.state.isDestroyed ||
			(f.clearDelayTimeouts(), f.unmount(), p(), delete e._tippy, (f.state.isDestroyed = !0), W('onDestroy', [f]));
	}
}
function U(e, t) {
	t === void 0 && (t = {});
	var n = ot.plugins.concat(t.plugins || []);
	Op();
	var r = Object.assign({}, t, { plugins: n }),
		i = _p(e),
		o = i.reduce(function (s, a) {
			var l = a && Rp(a, r);
			return (l && s.push(l), s);
		}, []);
	return ti(e) ? o[0] : o;
}
U.defaultProps = ot;
U.setDefaultProps = Mp;
U.currentInput = vt;
var Fp = Object.assign({}, Qa, {
		effect: function (t) {
			var n = t.state,
				r = {
					popper: { position: n.options.strategy, left: '0', top: '0', margin: '0' },
					arrow: { position: 'absolute' },
					reference: {},
				};
			(Object.assign(n.elements.popper.style, r.popper),
				(n.styles = r),
				n.elements.arrow && Object.assign(n.elements.arrow.style, r.arrow));
		},
	}),
	Np = function (t, n) {
		var r;
		n === void 0 && (n = {});
		var i = t,
			o = [],
			s = [],
			a,
			l = n.overrides,
			c = [],
			u = !1;
		function d() {
			s = i
				.map(function (f) {
					return Jt(f.props.triggerTarget || f.reference);
				})
				.reduce(function (f, D) {
					return f.concat(D);
				}, []);
		}
		function g() {
			o = i.map(function (f) {
				return f.reference;
			});
		}
		function v(f) {
			i.forEach(function (D) {
				f ? D.enable() : D.disable();
			});
		}
		function y(f) {
			return i.map(function (D) {
				var O = D.setProps;
				return (
					(D.setProps = function (T) {
						(O(T), D.reference === a && f.setProps(T));
					}),
					function () {
						D.setProps = O;
					}
				);
			});
		}
		function b(f, D) {
			var O = s.indexOf(D);
			if (D !== a) {
				a = D;
				var T = (l || []).concat('content').reduce(function (L, k) {
					return ((L[k] = i[O].props[k]), L);
				}, {});
				f.setProps(
					Object.assign({}, T, {
						getReferenceClientRect:
							typeof T.getReferenceClientRect == 'function'
								? T.getReferenceClientRect
								: function () {
										var L;
										return (L = o[O]) == null ? void 0 : L.getBoundingClientRect();
									},
					}),
				);
			}
		}
		(v(!1), g(), d());
		var C = {
				fn: function () {
					return {
						onDestroy: function () {
							v(!0);
						},
						onHidden: function () {
							a = null;
						},
						onClickOutside: function (O) {
							O.props.showOnCreate && !u && ((u = !0), (a = null));
						},
						onShow: function (O) {
							O.props.showOnCreate && !u && ((u = !0), b(O, o[0]));
						},
						onTrigger: function (O, T) {
							b(O, T.currentTarget);
						},
					};
				},
			},
			m = U(
				on(),
				Object.assign({}, mp(n, ['overrides']), {
					plugins: [C].concat(n.plugins || []),
					triggerTarget: s,
					popperOptions: Object.assign({}, n.popperOptions, {
						modifiers: [].concat(((r = n.popperOptions) == null ? void 0 : r.modifiers) || [], [Fp]),
					}),
				}),
			),
			x = m.show;
		((m.show = function (f) {
			if ((x(), !a && f == null)) return b(m, o[0]);
			if (!(a && f == null)) {
				if (typeof f == 'number') return o[f] && b(m, o[f]);
				if (i.indexOf(f) >= 0) {
					var D = f.reference;
					return b(m, D);
				}
				if (o.indexOf(f) >= 0) return b(m, f);
			}
		}),
			(m.showNext = function () {
				var f = o[0];
				if (!a) return m.show(0);
				var D = o.indexOf(a);
				m.show(o[D + 1] || f);
			}),
			(m.showPrevious = function () {
				var f = o[o.length - 1];
				if (!a) return m.show(f);
				var D = o.indexOf(a),
					O = o[D - 1] || f;
				m.show(O);
			}));
		var R = m.setProps;
		return (
			(m.setProps = function (f) {
				((l = f.overrides || l), R(f));
			}),
			(m.setInstances = function (f) {
				(v(!0),
					c.forEach(function (D) {
						return D();
					}),
					(i = f),
					v(!1),
					g(),
					d(),
					(c = y(m)),
					m.setProps({ triggerTarget: s }));
			}),
			(c = y(m)),
			m
		);
	},
	Hp = {
		name: 'animateFill',
		defaultValue: !1,
		fn: function (t) {
			var n;
			if (!((n = t.props.render) != null && n.$$tippy)) return {};
			var r = Rr(t.popper),
				i = r.box,
				o = r.content,
				s = t.props.animateFill ? kp() : null;
			return {
				onCreate: function () {
					s &&
						(i.insertBefore(s, i.firstElementChild),
						i.setAttribute('data-animatefill', ''),
						(i.style.overflow = 'hidden'),
						t.setProps({ arrow: !1, animation: 'shift-away' }));
				},
				onMount: function () {
					if (s) {
						var l = i.style.transitionDuration,
							c = Number(l.replace('ms', ''));
						((o.style.transitionDelay = Math.round(c / 10) + 'ms'),
							(s.style.transitionDuration = l),
							Qn([s], 'visible'));
					}
				},
				onShow: function () {
					s && (s.style.transitionDuration = '0ms');
				},
				onHide: function () {
					s && Qn([s], 'hidden');
				},
			};
		},
	};
function kp() {
	var e = on();
	return ((e.className = ol), Qn([e], 'hidden'), e);
}
var ki = { clientX: 0, clientY: 0 },
	hr = [];
function vl(e) {
	var t = e.clientX,
		n = e.clientY;
	ki = { clientX: t, clientY: n };
}
function jp(e) {
	e.addEventListener('mousemove', vl);
}
function Bp(e) {
	e.removeEventListener('mousemove', vl);
}
var qp = {
	name: 'followCursor',
	defaultValue: !1,
	fn: function (t) {
		var n = t.reference,
			r = fl(t.props.triggerTarget || n),
			i = !1,
			o = !1,
			s = !0,
			a = t.props;
		function l() {
			return t.props.followCursor === 'initial' && t.state.isVisible;
		}
		function c() {
			r.addEventListener('mousemove', g);
		}
		function u() {
			r.removeEventListener('mousemove', g);
		}
		function d() {
			((i = !0), t.setProps({ getReferenceClientRect: null }), (i = !1));
		}
		function g(b) {
			var C = b.target ? n.contains(b.target) : !0,
				m = t.props.followCursor,
				x = b.clientX,
				R = b.clientY,
				f = n.getBoundingClientRect(),
				D = x - f.left,
				O = R - f.top;
			(C || !t.props.interactive) &&
				t.setProps({
					getReferenceClientRect: function () {
						var L = n.getBoundingClientRect(),
							k = x,
							B = R;
						m === 'initial' && ((k = L.left + D), (B = L.top + O));
						var K = m === 'horizontal' ? L.top : B,
							M = m === 'vertical' ? L.right : k,
							Q = m === 'horizontal' ? L.bottom : B,
							te = m === 'vertical' ? L.left : k;
						return { width: M - te, height: Q - K, top: K, right: M, bottom: Q, left: te };
					},
				});
		}
		function v() {
			t.props.followCursor && (hr.push({ instance: t, doc: r }), jp(r));
		}
		function y() {
			((hr = hr.filter(function (b) {
				return b.instance !== t;
			})),
				hr.filter(function (b) {
					return b.doc === r;
				}).length === 0 && Bp(r));
		}
		return {
			onCreate: v,
			onDestroy: y,
			onBeforeUpdate: function () {
				a = t.props;
			},
			onAfterUpdate: function (C, m) {
				var x = m.followCursor;
				i ||
					(x !== void 0 &&
						a.followCursor !== x &&
						(y(), x ? (v(), t.state.isMounted && !o && !l() && c()) : (u(), d())));
			},
			onMount: function () {
				t.props.followCursor && !o && (s && (g(ki), (s = !1)), l() || c());
			},
			onTrigger: function (C, m) {
				(co(m) && (ki = { clientX: m.clientX, clientY: m.clientY }), (o = m.type === 'focus'));
			},
			onHidden: function () {
				t.props.followCursor && (d(), u(), (s = !0));
			},
		};
	},
};
function Vp(e, t) {
	var n;
	return {
		popperOptions: Object.assign({}, e.popperOptions, {
			modifiers: [].concat(
				(((n = e.popperOptions) == null ? void 0 : n.modifiers) || []).filter(function (r) {
					var i = r.name;
					return i !== t.name;
				}),
				[t],
			),
		}),
	};
}
var Up = {
	name: 'inlinePositioning',
	defaultValue: !1,
	fn: function (t) {
		var n = t.reference;
		function r() {
			return !!t.props.inlinePositioning;
		}
		var i,
			o = -1,
			s = !1,
			a = [],
			l = {
				name: 'tippyInlinePositioning',
				enabled: !0,
				phase: 'afterWrite',
				fn: function (v) {
					var y = v.state;
					r() &&
						(a.indexOf(y.placement) !== -1 && (a = []),
						i !== y.placement &&
							a.indexOf(y.placement) === -1 &&
							(a.push(y.placement),
							t.setProps({
								getReferenceClientRect: function () {
									return c(y.placement);
								},
							})),
						(i = y.placement));
				},
			};
		function c(g) {
			return Wp(cl(g), n.getBoundingClientRect(), An(n.getClientRects()), o);
		}
		function u(g) {
			((s = !0), t.setProps(g), (s = !1));
		}
		function d() {
			s || u(Vp(t.props, l));
		}
		return {
			onCreate: d,
			onAfterUpdate: d,
			onTrigger: function (v, y) {
				if (co(y)) {
					var b = An(t.reference.getClientRects()),
						C = b.find(function (x) {
							return (
								x.left - 2 <= y.clientX &&
								x.right + 2 >= y.clientX &&
								x.top - 2 <= y.clientY &&
								x.bottom + 2 >= y.clientY
							);
						}),
						m = b.indexOf(C);
					o = m > -1 ? m : o;
				}
			},
			onHidden: function () {
				o = -1;
			},
		};
	},
};
function Wp(e, t, n, r) {
	if (n.length < 2 || e === null) return t;
	if (n.length === 2 && r >= 0 && n[0].left > n[1].right) return n[r] || t;
	switch (e) {
		case 'top':
		case 'bottom': {
			var i = n[0],
				o = n[n.length - 1],
				s = e === 'top',
				a = i.top,
				l = o.bottom,
				c = s ? i.left : o.left,
				u = s ? i.right : o.right,
				d = u - c,
				g = l - a;
			return { top: a, bottom: l, left: c, right: u, width: d, height: g };
		}
		case 'left':
		case 'right': {
			var v = Math.min.apply(
					Math,
					n.map(function (O) {
						return O.left;
					}),
				),
				y = Math.max.apply(
					Math,
					n.map(function (O) {
						return O.right;
					}),
				),
				b = n.filter(function (O) {
					return e === 'left' ? O.left === v : O.right === y;
				}),
				C = b[0].top,
				m = b[b.length - 1].bottom,
				x = v,
				R = y,
				f = R - x,
				D = m - C;
			return { top: C, bottom: m, left: x, right: R, width: f, height: D };
		}
		default:
			return t;
	}
}
var zp = {
	name: 'sticky',
	defaultValue: !1,
	fn: function (t) {
		var n = t.reference,
			r = t.popper;
		function i() {
			return t.popperInstance ? t.popperInstance.state.elements.reference : n;
		}
		function o(c) {
			return t.props.sticky === !0 || t.props.sticky === c;
		}
		var s = null,
			a = null;
		function l() {
			var c = o('reference') ? i().getBoundingClientRect() : null,
				u = o('popper') ? r.getBoundingClientRect() : null;
			(((c && ys(s, c)) || (u && ys(a, u))) && t.popperInstance && t.popperInstance.update(),
				(s = c),
				(a = u),
				t.state.isMounted && requestAnimationFrame(l));
		}
		return {
			onMount: function () {
				t.props.sticky && l();
			},
		};
	},
};
function ys(e, t) {
	return e && t ? e.top !== t.top || e.right !== t.right || e.bottom !== t.bottom || e.left !== t.left : !0;
}
U.setDefaultProps({ render: hl });
U.setDefaultProps({
	onShow: e => {
		if (!e.props.content) return !1;
	},
});
const Kp = e => e instanceof Object && '$' in e && '$el' in e;
function ml(e, t = {}, n = { mount: !0, appName: 'Tippy' }) {
	n = Object.assign({ mount: !0, appName: 'Tippy' }, n);
	const r = er(),
		i = Re(),
		o = Re({ isEnabled: !1, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1 }),
		s = it();
	let a = null;
	const l = () => a || ((a = document.createDocumentFragment()), a),
		c = T => {
			let L,
				k = pe(T) ? T.value : T;
			return (
				Kn(k)
					? (s.value ||
							((s.value = Ri({ name: n.appName, setup: () => () => (pe(T) ? T.value : T) })),
							r && Object.assign(s.value._context, r.appContext),
							s.value.mount(l())),
						(L = () => l()))
					: typeof k == 'object'
						? (s.value ||
								((s.value = Ri({ name: n.appName, setup: () => () => Zt(pe(T) ? T.value : T) })),
								r && Object.assign(s.value._context, r.appContext),
								s.value.mount(l())),
							(L = () => l()))
						: (L = k),
				L
			);
		},
		u = T => {
			let L = {};
			return (
				pe(T) ? (L = T.value || {}) : At(T) ? (L = { ...T }) : (L = { ...T }),
				L.content && (L.content = c(L.content)),
				L.triggerTarget && (L.triggerTarget = pe(L.triggerTarget) ? L.triggerTarget.value : L.triggerTarget),
				(!L.plugins || !Array.isArray(L.plugins)) && (L.plugins = []),
				(L.plugins = L.plugins.filter(k => k.name !== 'vueTippyReactiveState')),
				L.plugins.push({
					name: 'vueTippyReactiveState',
					fn: () => ({
						onCreate() {
							o.value.isEnabled = !0;
						},
						onMount() {
							o.value.isMounted = !0;
						},
						onShow() {
							((o.value.isMounted = !0), (o.value.isVisible = !0));
						},
						onShown() {
							o.value.isShown = !0;
						},
						onHide() {
							((o.value.isMounted = !1), (o.value.isVisible = !1));
						},
						onHidden() {
							o.value.isShown = !1;
						},
						onUnmounted() {
							o.value.isMounted = !1;
						},
						onDestroy() {
							o.value.isDestroyed = !0;
						},
					}),
				}),
				L
			);
		},
		d = () => {
			i.value && i.value.setProps(u(t));
		},
		g = () => {
			!i.value || !t.content || i.value.setContent(c(t.content));
		},
		v = T => {
			var L;
			(L = i.value) === null || L === void 0 || L.setContent(c(T));
		},
		y = T => {
			var L;
			(L = i.value) === null || L === void 0 || L.setProps(u(T));
		},
		b = () => {
			var T;
			(i.value && (i.value.destroy(), (i.value = void 0)),
				(a = null),
				(T = s.value) === null || T === void 0 || T.unmount(),
				(s.value = void 0));
		},
		C = () => {
			var T;
			(T = i.value) === null || T === void 0 || T.show();
		},
		m = () => {
			var T;
			(T = i.value) === null || T === void 0 || T.hide();
		},
		x = () => {
			var T;
			((T = i.value) === null || T === void 0 || T.disable(), (o.value.isEnabled = !1));
		},
		R = () => {
			var T;
			((T = i.value) === null || T === void 0 || T.enable(), (o.value.isEnabled = !0));
		},
		f = () => {
			var T;
			(T = i.value) === null || T === void 0 || T.unmount();
		},
		D = () => {
			if (!e) return;
			let T = pe(e) ? e.value : e;
			(typeof T == 'function' && (T = T()), Kp(T) && (T = T.$el), T && ((i.value = U(T, u(t))), (T.$tippy = O)));
		},
		O = {
			tippy: i,
			refresh: d,
			refreshContent: g,
			setContent: v,
			setProps: y,
			destroy: b,
			hide: m,
			show: C,
			disable: x,
			enable: R,
			unmount: f,
			mount: D,
			state: o,
		};
	return (
		n.mount && (r ? (r.isMounted ? D() : un(D)) : D()),
		r &&
			Qi(() => {
				b();
			}),
		pe(t) || At(t) ? Xe(t, d, { immediate: !1 }) : pe(t.content) && Xe(t.content, g, { immediate: !1 }),
		O
	);
}
function Yp(e, t) {
	const n = Re();
	return (
		un(() => {
			const i = (Array.isArray(e) ? e.map(o => o.value) : typeof e == 'function' ? e() : e.value)
				.map(o => (o instanceof Element ? o._tippy : o))
				.filter(Boolean);
			n.value = Np(i, t ? { allowHTML: !0, ...t } : { allowHTML: !0 });
		}),
		{ singleton: n }
	);
}
function Gp(e) {
	return typeof e == 'function' ? e() : de(e);
}
function Xp(e) {
	var t, n;
	const r = Gp(e);
	return (n = (t = r) === null || t === void 0 ? void 0 : t.$el) !== null && n !== void 0 ? n : r;
}
const Qp = ln({
		props: {
			to: { type: [String, Function] },
			tag: { type: [String, Object], default: 'span' },
			contentTag: { type: [String, Object], default: 'span' },
			contentClass: { type: String, default: null },
			appendTo: { default: () => U.defaultProps.appendTo },
			aria: { default: () => U.defaultProps.aria },
			delay: { default: () => U.defaultProps.delay },
			duration: { default: () => U.defaultProps.duration },
			getReferenceClientRect: { default: () => U.defaultProps.getReferenceClientRect },
			hideOnClick: { type: [Boolean, String], default: () => U.defaultProps.hideOnClick },
			ignoreAttributes: { type: Boolean, default: () => U.defaultProps.ignoreAttributes },
			interactive: { type: Boolean, default: () => U.defaultProps.interactive },
			interactiveBorder: { default: () => U.defaultProps.interactiveBorder },
			interactiveDebounce: { default: () => U.defaultProps.interactiveDebounce },
			moveTransition: { default: () => U.defaultProps.moveTransition },
			offset: { default: () => U.defaultProps.offset },
			onAfterUpdate: { default: () => U.defaultProps.onAfterUpdate },
			onBeforeUpdate: { default: () => U.defaultProps.onBeforeUpdate },
			onCreate: { default: () => U.defaultProps.onCreate },
			onDestroy: { default: () => U.defaultProps.onDestroy },
			onHidden: { default: () => U.defaultProps.onHidden },
			onHide: { default: () => U.defaultProps.onHide },
			onMount: { default: () => U.defaultProps.onMount },
			onShow: { default: () => U.defaultProps.onShow },
			onShown: { default: () => U.defaultProps.onShown },
			onTrigger: { default: () => U.defaultProps.onTrigger },
			onUntrigger: { default: () => U.defaultProps.onUntrigger },
			onClickOutside: { default: () => U.defaultProps.onClickOutside },
			placement: { default: () => U.defaultProps.placement },
			plugins: { default: () => U.defaultProps.plugins },
			popperOptions: { default: () => U.defaultProps.popperOptions },
			render: { default: () => U.defaultProps.render },
			showOnCreate: { type: Boolean, default: () => U.defaultProps.showOnCreate },
			touch: { type: [Boolean, String, Array], default: () => U.defaultProps.touch },
			trigger: { default: () => U.defaultProps.trigger },
			triggerTarget: { default: () => U.defaultProps.triggerTarget },
			animateFill: { type: Boolean, default: () => U.defaultProps.animateFill },
			followCursor: { type: [Boolean, String], default: () => U.defaultProps.followCursor },
			inlinePositioning: { type: Boolean, default: () => U.defaultProps.inlinePositioning },
			sticky: { type: [Boolean, String], default: () => U.defaultProps.sticky },
			allowHTML: { type: Boolean, default: () => U.defaultProps.allowHTML },
			animation: { default: () => U.defaultProps.animation },
			arrow: { default: () => U.defaultProps.arrow },
			content: { default: () => U.defaultProps.content },
			inertia: { default: () => U.defaultProps.inertia },
			maxWidth: { default: () => U.defaultProps.maxWidth },
			role: { default: () => U.defaultProps.role },
			theme: { default: () => U.defaultProps.theme },
			zIndex: { default: () => U.defaultProps.zIndex },
		},
		emits: ['state'],
		setup(e, { slots: t, emit: n, expose: r }) {
			const i = Re(),
				o = Re(),
				s = Re(),
				a = Re(!1),
				l = () => {
					let v = { ...e };
					for (const y of ['to', 'tag', 'contentTag', 'contentClass']) v.hasOwnProperty(y) && delete v[y];
					return v;
				};
			let c = () => Xp(i);
			e.to &&
				(typeof Element < 'u' && e.to instanceof Element
					? (c = () => e.to)
					: e.to === 'parent'
						? (c = () => {
								let v = i.value;
								return (v || (v = i.value = o.value.parentElement), v);
							})
						: (typeof e.to == 'string' || e.to instanceof String) && (c = () => document.querySelector(e.to)));
			const u = ml(c, l());
			let d = t.content;
			(!d && e.to === 'parent' && (d = t.default),
				un(() => {
					((a.value = !0),
						Cr(() => {
							d && u.setContent(() => s.value);
						}));
				}),
				Xe(
					u.state,
					() => {
						n('state', de(u.state));
					},
					{ immediate: !0, deep: !0 },
				),
				Xe(
					() => e,
					() => {
						(u.setProps(l()), d && u.setContent(() => s.value));
					},
					{ deep: !0 },
				));
			let g = Ur({ elem: i, contentElem: s, mounted: a, ...u });
			return (
				r(g),
				() => {
					const v = (typeof e.contentTag == 'string', e.contentTag),
						y = d
							? Zt(v, { ref: s, style: { display: a.value ? 'inherit' : 'none' }, class: e.contentClass }, d(g))
							: null;
					if (e.to === 'parent') {
						const m = [];
						if (!i.value) {
							const x = Zt('span', { ref: o, 'data-v-tippy': '', style: { display: 'none' } });
							m.push(x);
						}
						return (y && m.push(y), m);
					}
					const b = t.default ? t.default(g) : [];
					if (!e.tag) {
						const m = Zt(b[0], { ref: i, 'data-v-tippy': '' });
						return y ? [m, y] : m;
					}
					const C = (typeof e.tag == 'string', e.tag);
					return Zt(C, { ref: i, 'data-v-tippy': '' }, y ? [b, y] : b);
				}
			);
		},
	}),
	Jp = [
		'a11y',
		'allowHTML',
		'arrow',
		'flip',
		'flipOnUpdate',
		'hideOnClick',
		'ignoreAttributes',
		'inertia',
		'interactive',
		'lazy',
		'multiple',
		'showOnInit',
		'touch',
		'touchHold',
	];
let ji = {};
Object.keys(U.defaultProps).forEach(e => {
	Jp.includes(e)
		? (ji[e] = {
				type: Boolean,
				default: function () {
					return U.defaultProps[e];
				},
			})
		: (ji[e] = {
				default: function () {
					return U.defaultProps[e];
				},
			});
});
const Zp = ln({
		props: ji,
		setup(e) {
			const t = Re([]),
				{ singleton: n } = Yp(t, e);
			return { instances: t, singleton: n };
		},
		mounted() {
			var e;
			const n = this.$el.parentElement.querySelectorAll('[data-v-tippy]');
			((this.instances = Array.from(n)
				.map(r => r._tippy)
				.filter(Boolean)),
				(e = this.singleton) === null || e === void 0 || e.setInstances(this.instances));
		},
		render() {
			let e = this.$slots.default ? this.$slots.default() : [];
			return Zt(() => e);
		},
	}),
	eh = {
		mounted(e, t, n) {
			const r = typeof t.value == 'string' ? { content: t.value } : t.value || {},
				i = Object.keys(t.modifiers || {}),
				o = i.find(a => a !== 'arrow'),
				s = i.findIndex(a => a === 'arrow') !== -1;
			(o && (r.placement = r.placement || o),
				s && (r.arrow = r.arrow !== void 0 ? r.arrow : !0),
				n.props &&
					n.props.onTippyShow &&
					(r.onShow = function (...a) {
						var l;
						return (l = n.props) === null || l === void 0 ? void 0 : l.onTippyShow(...a);
					}),
				n.props &&
					n.props.onTippyShown &&
					(r.onShown = function (...a) {
						var l;
						return (l = n.props) === null || l === void 0 ? void 0 : l.onTippyShown(...a);
					}),
				n.props &&
					n.props.onTippyHidden &&
					(r.onHidden = function (...a) {
						var l;
						return (l = n.props) === null || l === void 0 ? void 0 : l.onTippyHidden(...a);
					}),
				n.props &&
					n.props.onTippyHide &&
					(r.onHide = function (...a) {
						var l;
						return (l = n.props) === null || l === void 0 ? void 0 : l.onTippyHide(...a);
					}),
				n.props &&
					n.props.onTippyMount &&
					(r.onMount = function (...a) {
						var l;
						return (l = n.props) === null || l === void 0 ? void 0 : l.onTippyMount(...a);
					}),
				e.getAttribute('title') && !r.content && ((r.content = e.getAttribute('title')), e.removeAttribute('title')),
				e.getAttribute('content') && !r.content && (r.content = e.getAttribute('content')),
				ml(e, r));
		},
		unmounted(e) {
			e.$tippy ? e.$tippy.destroy() : e._tippy && e._tippy.destroy();
		},
		updated(e, t) {
			const n = typeof t.value == 'string' ? { content: t.value } : t.value || {};
			(n.content || (n.content = null),
				e.getAttribute('title') && !n.content && ((n.content = e.getAttribute('title')), e.removeAttribute('title')),
				e.getAttribute('content') && !n.content && (n.content = e.getAttribute('content')),
				e.$tippy ? e.$tippy.setProps(n || {}) : e._tippy && e._tippy.setProps(n || {}));
		},
	},
	th = {
		install(e, t = {}) {
			(U.setDefaultProps(t.defaultProps || {}),
				e.directive(t.directive || 'tippy', eh),
				e.component(t.component || 'tippy', Qp),
				e.component(t.componentSingleton || 'tippy-singleton', Zp));
		},
	},
	nh = U.setDefaultProps;
nh({ ignoreAttributes: !0, plugins: [zp, Up, qp, Hp] });
const gl = Ri(ud);
gl.use(th, {
	defaultProps: {
		theme: 'white',
		maxWidth: 436,
		trigger: 'click',
		touch: ['click', 0],
		hideOnClick: !0,
		allowHTML: !0,
	},
});
gl.mount('#app');
