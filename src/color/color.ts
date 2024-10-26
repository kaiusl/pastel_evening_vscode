/**
 * Simple and minimal color class.
 */

const hexRegEx = /^#(([0-9A-Fa-f]){3,4}|([0-9A-Fa-f]){6}|([0-9A-Fa-f]){8})$/g

class ColorParseError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ColorParseError"
    }
}

export class Color {
    readonly r: number
    readonly g: number
    readonly b: number
    readonly a: number

    /**
     * 
     * Throws `ColorParseError` if `r`, `g`, `b` or `a` is not between 0 and 1.
     */
    constructor(r: number, g: number, b: number, a: number) {
        if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1 || a < 0 || a > 1) {
            throw new ColorParseError(`r=${r}, g=${g}, b=${b}, a=${a} is not valid color. All values must be between 0 and 1.`)
        }

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /** Create color from hex string.
     * 
     * Input starts with '#', followed by 'rgb', 'rgba', 'rrggbb' or 'rrggbbaa' values.
     * 
     * Throws `ColorParseError` if input is invalid hex color string.
     */
    public static from_hex(hex: string): Color {
        if (!hex.match(hexRegEx)) {
            throw new ColorParseError(`${hex} is invalid hex color string`)
        }

        if (hex.startsWith("#")) {
            hex = hex.slice(1)
        } else if (hex.startsWith("0x") || hex.startsWith("0X")) {
            hex = hex.slice(2)
        }

        const len = hex.length
        if (len == 3 || len == 4) {
            const parseHexSlice = (i1: number, i2: number) => parseInt(hex.slice(i1, i2) + hex.slice(i1, i2), 16) / 255.0
            const r = parseHexSlice(0, 1)
            const g = parseHexSlice(1, 2)
            const b = parseHexSlice(2, 3)
            const a = hex.length == 4 ? parseHexSlice(3, 4) : 1.0

            return new Color(r, g, b, a)
        } else {
            const parseHexSlice = (i1: number, i2: number) => parseInt(hex.slice(i1, i2), 16) / 255.0
            const r = parseHexSlice(0, 2)
            const g = parseHexSlice(2, 4)
            const b = parseHexSlice(4, 6)
            const a = hex.length == 8 ? parseHexSlice(6, 8) : 1.0

            return new Color(r, g, b, a)
        }
    }

    public setAlpha(a: number): Color {
        return new Color(this.r, this.g, this.b, a)
    }

    public multiplyAlpha(a: number): Color {
        return new Color(this.r, this.g, this.b, this.a * a)
    }

    /** Overlays `this` color over `base` with `opacity` and returns a new **opaque** color. */
    public overlayOpacity(opacity: number, base: Color): Color {
        if (opacity < 0 || opacity > 1) {
            throw Error(`opacity=${opacity} is not valid`)
        }

        function overlay(top: number, bottom: number, opacity: number, gamma: number = 2.2): number {
            return (bottom ** gamma * (1 - opacity) + top ** gamma * opacity) ** (1 / gamma)
        }

        return new Color(
            overlay(this.r, base.r, opacity),
            overlay(this.g, base.g, opacity),
            overlay(this.b, base.b, opacity),
            1.0
        )
    }

    public lighten(amount: number): Color {
        return this.toHSL().lighten(amount).toRgb()
    }

    public darken(amount: number): Color {
        return this.toHSL().darken(amount).toRgb()
    }

    public hueShift(amount: number): Color {
        return this.toHSL().hueShift(amount).toRgb()
    }

    public saturate(amount: number): Color {
        return this.toHSL().saturate(amount).toRgb()
    }

    public desaturate(amount: number): Color {
        return this.toHSL().desaturate(amount).toRgb()
    }

    public addRed(amount: number): Color {
        return new Color(clamp(this.r + amount, 0, 1), this.g, this.b, this.a)
    }

    public addGreen(amount: number): Color {
        return new Color(this.r, clamp(this.g + amount, 0, 1), this.b, this.a)
    }

    public addBlue(amount: number): Color {
        return new Color(this.r, this.g, clamp(this.b + amount, 0, 1), this.a)
    }

    public toHex(fmt?: string): string {
        const toHex = (num: number) => {
            const hex = Math.round(num * 255).toString(16)
            return hex.length == 1 ? "0" + hex : hex
        }

        let out = "#" + toHex(this.r) + toHex(this.g) + toHex(this.b)
        if (fmt === "rgba") {
            out += toHex(this.a)
        }
        return out
    }

    public toHSL(): HSL {
        // from https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae
        const cmax = Math.max(this.r, this.g, this.b)
        const cmin = Math.min(this.r, this.g, this.b)
        const c = cmax - cmin
        let h = 0.0
        if (c === 0.0) {
            h = 0.0
        } else if (cmax === this.r) {
            h = 60 * ((this.g - this.b) / c % 6)
        } else if (cmax === this.g) {
            h = 60 * ((this.b - this.r) / c + 2)
        } else if (cmax === this.b) {
            h = 60 * ((this.r - this.g) / c + 4)
        }
        if (h < 0) {
            h += 360
        }

        const l = (cmin + cmax) / 2.0
        const s = c === 0 ? 0 : c / (1 - Math.abs(2 * l - 1))

        return new HSL(h, s, l, this.a)
    }

    public static readonly BLACK = new Color(0, 0, 0, 1)
    public static readonly WHITE = new Color(1, 1, 1, 1)
    public static readonly TRANSPARENT = new Color(0, 0, 0, 0)
}

class HSL {
    h: number
    s: number
    l: number
    a: number

    constructor(h: number, s: number, l: number, a: number) {
        this.h = h
        this.s = s
        this.l = l
        this.a = a
    }

    lighten(amount: number): HSL {
        this.l = clamp(this.l + amount, 0, 1)
        return this
    }

    darken(amount: number): HSL {
        this.l = clamp(this.l - amount, 0, 1)
        return this
    }

    hueShift(amount: number): HSL {
        this.h += amount
        if (this.h > 360) {
            this.h -= 360
        } else if (this.h < 0) {
            this.h += 360
        }
        return this
    }

    saturate(amount: number): HSL {
        this.s = clamp(this.s + amount, 0, 1)
        return this
    }

    desaturate(amount: number): HSL {
        this.s = clamp(this.s - amount, 0, 1)
        return this
    }

    toRgb(): Color {
        // from https://en.wikipedia.org/wiki/HSL_and_HSV#Color_conversion_formulae
        const c = (1 - Math.abs(2 * this.l - 1)) * this.s
        const x = c * (1 - Math.abs((this.h / 60.0) % 2 - 1))
        const m = this.l - c / 2.0

        let r = 0, g = 0, b = 0
        if (this.h < 60) {
            r = c
            g = x
        } else if (this.h < 120) {
            r = x
            g = c
        } else if (this.h < 180) {
            g = c
            b = x
        } else if (this.h < 240) {
            g = x
            b = c
        } else if (this.h < 300) {
            r = x
            b = c
        } else {
            r = c
            b = x
        }
        r += m
        g += m
        b += m


        return new Color(r, g, b, this.a)
    }
}

function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
}

