/* eslint-disable @typescript-eslint/no-unsafe-call */
import assert from "assert"
import { Color } from "./color"

test("HEX to RGB roundtrip", () => {
    const colors = ["#f28585", "#6dbaf2", "#69edab", "#000000", "#fFFffFff", "#aaBBcCDD"]

    for (const c of colors) {
        const orig = Color.from_hex(c)
        const converted = orig.toHex(c.length == 9 ? "rgba" : "rgb")

        assert(c.toLowerCase() === converted, `${c.toLowerCase()} != ${converted}`)
    }
})

test("RGB to HSL roundtrip", () => {
    const colors = ["#f28585", "#6dbaf2", "#69edab", "#000000", "#ffffffff", "#1234", "#aaBBcCDD"]

    for (const c of colors) {
        const orig = Color.from_hex(c)
        const converted = orig.toHSL().toRgb()

        assert(Math.abs(orig.r - converted.r) < 0.00001, `${orig.r} != ${converted.r}`)
        assert(Math.abs(orig.g - converted.g) < 0.00001, `${orig.g} != ${converted.g}`)
        assert(Math.abs(orig.b - converted.b) < 0.00001, `${orig.b} != ${converted.b}`)
        assert(Math.abs(orig.a - converted.a) < 0.00001, `${orig.a} != ${converted.a}`)
    }
})