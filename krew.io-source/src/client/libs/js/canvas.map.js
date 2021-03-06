(function () {
    window.CanvasMap = function (f, g, h, k) {
        var a = {};
        a.element = f;
        a.contextMode = k || "2d";
        a.context = a.element.getContext(a.contextMode);
        a.useRadians = !1;
        a.zoom = 1;
        a.world = {
            width: g,
            height: h,
            rotation: 0
        };
        a.scale = {
            width: 0,
            height: 0
        };
        a.elements = {};
        a.randomId = function () {
            var b = (0 | 9E6 * Math.random()).toString(36);
            void 0 !== a.elements[b] && (b = a.randomId());
            return b
        };
        a.add = function (b) {
            b && (b.id = b.id || a.randomId(), void 0 === a.elements[b.id] && (a.elements[b.id] = b));
            return a
        };
        a.remove = function (b) {
            b && b.id && a.elements[b.id] &&
                delete a.elements[b.id];
            return a
        };
        a.draw = function () {
            var b, c = a.context.canvas.width * a.zoom,
                d = a.context.canvas.height * a.zoom;
            a.scale.width = 1 / a.world.width * a.context.canvas.width;
            a.scale.height = 1 / a.world.height * a.context.canvas.height;
            a.context.resetTransform();
            a.context.clearRect(0, 0, a.context.canvas.width, a.context.canvas.height);
            a.world.rotation && (a.context.translate(a.context.canvas.width / 2, a.context.canvas.height / 2), a.context.rotate(a.useRadians ? a.world.rotation : Math.PI / 180 * a.world.rotation), a.context.translate(-a.context.canvas.width /
                2, -a.context.canvas.height / 2));
            a.context.translate(-((c - a.context.canvas.width) / 2), -((d - a.context.canvas.height) / 2));
            a.context.scale(a.zoom, a.zoom);
            for (b in a.elements) a.elements[b].draw && a.elements[b].draw();
            return a
        };
        a.toWorld = function (b) {
            var c = Object.assign({}, b);
            b.x && 0 !== b.x && (c.x = b.x * a.scale.width);
            b.y && 0 !== b.y && (c.y = b.y * a.scale.height);
            b.r && 0 !== b.r && (c.r = b.r * a.scale.width);
            b.width && 0 !== b.width && (c.width = b.width * a.scale.width);
            b.height && 0 !== b.height && (c.height = b.height * a.scale.height);
            b.size &&
                0 !== b.size && (c.size = b.size * a.scale.width);
            b.rotation && 0 !== b.rotation && (c.rotation = a.useRadians ? b.rotation : Math.PI / 180 * b.rotation);
            delete c.draw;
            delete c.id;
            delete c.toWorld;
            return c
        };
        a.point = function (b) {
            var c = Object.assign({
                id: void 0,
                x: 0,
                y: 0,
                r: 1,
                fill: void 0,
                stroke: b.stroke ? {
                    color: b.stroke.color || "black",
                    width: b.stroke.width || 1
                } : void 0
            }, b);
            c.toWorld = function () {
                return a.toWorld(c)
            };
            c.draw = function () {
                var d = c.toWorld();
                c.fill && (a.context.fillStyle = c.fill, a.context.beginPath(), a.context.arc(d.x, d.y, d.r,
                    0, 2 * Math.PI, !0), a.context.fill());
                c.stroke && (a.context.strokeStyle = c.stroke.color, a.context.lineWidth = c.stroke.width * a.scale.width, a.context.beginPath(), a.context.arc(d.x, d.y, d.r, 0, 2 * Math.PI, !0), a.context.stroke())
            };
            return c
        };
        a.rect = function (b) {
            var c = Object.assign({
                id: void 0,
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                fill: void 0,
                stroke: b.stroke ? {
                    color: b.stroke.color || "black",
                    width: b.stroke.width || 1
                } : void 0
            }, b);
            c.toWorld = function () {
                return a.toWorld(c)
            };
            c.draw = function () {
                var d = c.toWorld();
                c.fill && (a.context.fillStyle =
                    c.fill, a.context.fillRect(d.x, d.y, d.width, d.height));
                c.stroke && (a.context.strokeStyle = c.stroke.color, a.context.lineWidth = c.stroke.width * a.scale.width, a.context.strokeRect(d.x, d.y, d.width, d.height))
            };
            return c
        };
        a.triangle = function (b) {
            var c = Object.assign({
                id: void 0,
                x: 0,
                y: 0,
                size: 1,
                rotation: 0,
                fill: void 0,
                stroke: b.stroke ? {
                    color: b.stroke.color || "black",
                    width: b.stroke.width || 1
                } : void 0
            }, b);
            c.toWorld = function () {
                return a.toWorld(c)
            };
            c.draw = function () {
                var d = c.toWorld(),
                    e = d.size / 2;
                a.context.save();
                a.context.translate(d.x,
                    d.y);
                a.context.rotate(d.rotation);
                a.context.translate(-d.x, -d.y);
                c.fill && (a.context.fillStyle = c.fill, a.context.beginPath(), a.context.moveTo(d.x - e, d.y + e), a.context.lineTo(d.x, d.y - e), a.context.lineTo(d.x + e, d.y + e), a.context.lineTo(d.x - e, d.y + e), a.context.fill());
                c.stroke && (a.context.strokeStyle = c.stroke.color, a.context.lineWidth = c.stroke.width * a.scale.width, a.context.beginPath(), a.context.moveTo(d.x - e, d.y + e), a.context.lineTo(d.x, d.y - d.size), a.context.lineTo(d.x + e, d.y + e), a.context.lineTo(d.x - e, d.y + e),
                    a.context.stroke());
                a.context.restore()
            };
            return c
        };
        a.text = function (b) {
            var c = Object.assign({
                id: void 0,
                x: 0,
                y: 0,
                text: "",
                width: void 0,
                font: "serif",
                size: 48,
                align: "center",
                baseline: "alphabetic",
                fill: void 0,
                stroke: b.stroke ? {
                    color: b.stroke.color || "black",
                    width: b.stroke.width || 1
                } : void 0
            }, b);
            c.toWorld = function () {
                return a.toWorld(c)
            };
            c.draw = function () {
                var d = c.toWorld();
                a.context.textAlign = c.align;
                a.context.textBaseline = c.baseline;
                a.context.font = d.size + "px " + c.font;
                c.fill && (a.context.fillStyle = c.fill, a.context.fillText(c.text,
                    d.x, d.y, d.width));
                c.stroke && (a.context.strokeStyle = c.stroke.color, a.context.lineWidth = c.stroke.width * a.scale.width, a.context.strokeText(c.text, d.x, d.y, d.width))
            };
            return c
        };
        return a
    }
})(window);