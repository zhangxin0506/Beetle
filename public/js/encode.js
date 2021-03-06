function endcode() {
	var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var b = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
			52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
			19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29,
			30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
			47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var d = function(l) {
		l = escape(l.toString()).replace(/\+/g, "%2B");
		var j = l.match(/(%([0-9A-F]{2}))/gi);
		if (j) {
			for ( var k = 0; k < j.length; k++) {
				var i = j[k].substring(1, 3);
				if (parseInt(i, 16) >= 128) {
					l = l.replace(j[k], "%u00" + i)
				}
			}
		}
		l = l.replace("%25", "%u0025").replace(/%/g, "\\");
		return l
	};
	var g = function(m) {
		m = m.replace(/\\/g, "%").replace("%u0025", "%25");
		m = unescape(m.toString().replace(/%2B/g, "+"));
		var k = m.match(/(%u00([0-9A-F]{2}))/gi);
		if (k) {
			for ( var l = 0; l < k.length; l++) {
				var j = k[l].substring(1, 3);
				var i = Number("0x" + j);
				if (i >= 128) {
					m = m.replace(k[l], j)
				}
			}
		}
		m = unescape(m.toString().replace(/%2B/g, "+"));
		return m
	};
	var f = function(m) {
		var k, l, j, n;
		k = "";
		j = m.length;
		for (l = 0; l < j; l++) {
			n = m.charCodeAt(l);
			if ((n >= 1) && (n <= 127)) {
				k += m.charAt(l)
			} else {
				if (n > 2047) {
					k += String.fromCharCode(224 | ((n >> 12) & 15));
					k += String.fromCharCode(128 | ((n >> 6) & 63));
					k += String.fromCharCode(128 | ((n >> 0) & 63))
				} else {
					k += String.fromCharCode(192 | ((n >> 6) & 31));
					k += String.fromCharCode(128 | ((n >> 0) & 63))
				}
			}
		}
		return k
	};
	var h = function(o) {
		var k, m, j, p;
		var n, l;
		k = "";
		j = o.length;
		m = 0;
		while (m < j) {
			p = o.charCodeAt(m++);
			switch (p >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				k += o.charAt(m - 1);
				break;
			case 12:
			case 13:
				n = o.charCodeAt(m++);
				k += String.fromCharCode(((p & 31) << 6) | (n & 63));
				break;
			case 14:
				n = o.charCodeAt(m++);
				l = o.charCodeAt(m++);
				k += String.fromCharCode(((p & 15) << 12) | ((n & 63) << 6)
						| ((l & 63) << 0));
				break
			}
		}
		return k
	};
	var c = function(p) {
		var l, n, j;
		var o, m, k;
		j = p.length;
		n = 0;
		l = "";
		while (n < j) {
			o = p.charCodeAt(n++) & 255;
			if (n == j) {
				l += a.charAt(o >> 2);
				l += a.charAt((o & 3) << 4);
				l += "==";
				break
			}
			m = p.charCodeAt(n++);
			if (n == j) {
				l += a.charAt(o >> 2);
				l += a.charAt(((o & 3) << 4) | ((m & 240) >> 4));
				l += a.charAt((m & 15) << 2);
				l += "=";
				break
			}
			k = p.charCodeAt(n++);
			l += a.charAt(o >> 2);
			l += a.charAt(((o & 3) << 4) | ((m & 240) >> 4));
			l += a.charAt(((m & 15) << 2) | ((k & 192) >> 6));
			l += a.charAt(k & 63)
		}
		return l
	};
	var e = function(q) {
		var p, o, m, k;
		var n, j, l;
		j = q.length;
		n = 0;
		l = "";
		while (n < j) {
			do {
				p = b[q.charCodeAt(n++) & 255]
			} while (n < j && p == -1);
			if (p == -1) {
				break
			}
			do {
				o = b[q.charCodeAt(n++) & 255]
			} while (n < j && o == -1);
			if (o == -1) {
				break
			}
			l += String.fromCharCode((p << 2) | ((o & 48) >> 4));
			do {
				m = q.charCodeAt(n++) & 255;
				if (m == 61) {
					return l
				}
				m = b[m]
			} while (n < j && m == -1);
			if (m == -1) {
				break
			}
			l += String.fromCharCode(((o & 15) << 4) | ((m & 60) >> 2));
			do {
				k = q.charCodeAt(n++) & 255;
				if (k == 61) {
					return l
				}
				k = b[k]
			} while (n < j && k == -1);
			if (k == -1) {
				break
			}
			l += String.fromCharCode(((m & 3) << 6) | k)
		}
		return l
	};
	return {
		uniEncode : d,
		uniDecode : g,
		base64Encode : c,
		base64Decode : e,
		utf8Encode : f,
		utf8Decode : h
	}

}