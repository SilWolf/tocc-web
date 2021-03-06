!(function (e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = t())
		: 'function' == typeof define && define.amd
		? define(t)
		: ((e = 'undefined' != typeof globalThis ? globalThis : e || self).ripplet =
				t())
})(this, function () {
	'use strict'
	var m,
		h = {
			className: '',
			color: 'currentcolor',
			opacity: 0.1,
			spreadingDuration: '.4s',
			spreadingDelay: '0s',
			spreadingTimingFunction: 'linear',
			clearing: !0,
			clearingDuration: '1s',
			clearingDelay: '0s',
			clearingTimingFunction: 'ease-in-out',
			centered: !1,
			appendTo: 'auto',
		},
		y = new Map()
	function o(e, n) {
		var t = e.currentTarget,
			r = e.clientX,
			i = e.clientY
		if (t instanceof Element) {
			var o = n
				? Object.keys(h).reduce(function (e, t) {
						return (e[t] = (n.hasOwnProperty(t) ? n : h)[t]), e
				  }, {})
				: h
			m ||
				(((g = document.createElement('div')).innerHTML =
					'<div style="float:left;position:relative;isolation:isolate;pointer-events:none"><div style="position:absolute;overflow:hidden;transform-origin:0 0"><div style="border-radius:50%;transform:scale(0)"></div></div></div>'),
				(m = g.firstChild))
			var a = t.getBoundingClientRect()
			if (o.centered && 'false' !== o.centered)
				(r = a.left + 0.5 * a.width), (i = a.top + 0.5 * a.height)
			else {
				if ('number' != typeof r || 'number' != typeof i) return
				var l = 1 / (+getComputedStyle(document.body).zoom || 1)
				;(r *= l), (i *= l)
			}
			var c = getComputedStyle(t),
				s = function (e) {
					var t = e && /^var\((--.+)\)$/.exec(e)
					return t ? c.getPropertyValue(t[1]) : e
				},
				d = (function (e, t) {
					if (t && 'auto' !== t)
						return 'target' === t
							? e
							: 'parent' === t
							? e.parentElement
							: document.querySelector(t)
					for (
						;
						e &&
						(e instanceof SVGElement ||
							e instanceof HTMLInputElement ||
							e instanceof HTMLSelectElement ||
							e instanceof HTMLTextAreaElement ||
							e instanceof HTMLImageElement ||
							e instanceof HTMLHRElement);

					)
						e = e.parentElement
					return e
				})(t, o.appendTo),
				p = d.appendChild(m.cloneNode(!0))
			p.style.zIndex = (+c.zIndex || 0) + 1
			var u = p.firstChild,
				f = u.getBoundingClientRect(),
				e = u.style
			;(e.top = a.top - f.top + 'px'),
				(e.left = a.left - f.left + 'px'),
				(e.width = a.width + 'px'),
				(e.height = a.height + 'px'),
				(e.opacity = s(o.opacity)),
				(e.borderTopLeftRadius = c.borderTopLeftRadius),
				(e.borderTopRightRadius = c.borderTopRightRadius),
				(e.borderBottomLeftRadius = c.borderBottomLeftRadius),
				(e.borderBottomRightRadius = c.borderBottomRightRadius),
				(e.clipPath = c.clipPath)
			var f = u.getBoundingClientRect(),
				g = a.width / f.width,
				l = a.height / f.height
			e.transform =
				'scale(' +
				g +
				',' +
				l +
				') translate(' +
				(a.left - f.left) +
				'px,' +
				(a.top - f.top) +
				'px)'
			;(g = Math.max(r - a.left, a.right - r)),
				(l = Math.max(i - a.top, a.bottom - i)),
				(f = Math.sqrt(g * g + l * l)),
				(g = u.firstChild),
				(l = g.style),
				(u = s(o.color))
			return (
				(l.backgroundColor = /^currentcolor$/i.test(u) ? c.color : u),
				(g.className = o.className),
				(l.width = l.height = f + f + 'px'),
				'rtl' === getComputedStyle(d).direction
					? (l.marginRight = a.right - r - f + 'px')
					: (l.marginLeft = r - a.left - f + 'px'),
				(l.marginTop = i - a.top - f + 'px'),
				(l.transition =
					'transform ' +
					s(o.spreadingDuration) +
					' ' +
					s(o.spreadingTimingFunction) +
					' ' +
					s(o.spreadingDelay) +
					',opacity ' +
					s(o.clearingDuration) +
					' ' +
					s(o.clearingTimingFunction) +
					' ' +
					s(o.clearingDelay)),
				g.addEventListener('transitionend', function (e) {
					'opacity' === e.propertyName &&
						p.parentElement &&
						p.parentElement.removeChild(p)
				}),
				o.clearing && 'false' !== o.clearing
					? (l.opacity = '0')
					: ((o = y.get(t)) || y.set(t, (o = new Map())), o.set(p, g)),
				g.offsetWidth,
				(l.transform = ''),
				p
			)
		}
	}
	;(o.clear = function (e, t) {
		var n, r
		e
			? (n = y.get(e)) &&
			  (t
					? ((r = n.get(t)) && (r.style.opacity = '0'),
					  n.delete(t),
					  0 === n.size && y.delete(e))
					: (n.forEach(function (e) {
							return (e.style.opacity = '0')
					  }),
					  y.delete(e)))
			: (y.forEach(function (e) {
					return e.forEach(function (e) {
						return (e.style.opacity = '0')
					})
			  }),
			  y.clear())
	}),
		(o.defaultOptions = h),
		(o._ripplets = y)
	addEventListener(
		'pointerdown',
		function (e) {
			var t, n, r, i
			0 !== e.button ||
				((t = (function (e) {
					for (; e && !e.hasAttribute('data-ripplet'); ) e = e.parentElement
					return e
				})(e.target)) &&
					('false' !==
						(n = (function (e) {
							var t = {}
							if (e)
								for (var n = 0, r = e.split(';'); n < r.length; n++) {
									var i = r[n],
										o = i.indexOf(':')
									t[
										i
											.slice(0, o)
											.trim()
											.replace(/[a-zA-Z0-9_]-[a-z]/g, function (e) {
												return e[0] + e[2].toUpperCase()
											})
									] = i.slice(o + 1).trim()
								}
							return t
						})(t.getAttribute('data-ripplet'))).clearing &&
						((n.clearing = 'false'),
						(r = function () {
							o.clear(t, i),
								t.removeEventListener('pointerup', r),
								t.removeEventListener('pointerleave', r)
						}),
						t.addEventListener('pointerup', r),
						t.addEventListener('pointerleave', r)),
					(i = o(
						{ currentTarget: t, clientX: e.clientX, clientY: e.clientY },
						n
					))))
		},
		!0
	)
	var t = Object.freeze({ __proto__: null, default: o, defaultOptions: h })
	return (
		Object.keys(t).forEach(function (e) {
			o[e] = t[e]
		}),
		o
	)
})
