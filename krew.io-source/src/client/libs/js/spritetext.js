var textAlign = {
        center: new THREE.Vector2(0, 0),
        left: new THREE.Vector2(1, 0),
        topLeft: new THREE.Vector2(1, -1),
        topRight: new THREE.Vector2(-1, -1),
        right: new THREE.Vector2(-1, 0),
        bottomLeft: new THREE.Vector2(1, 1),
        bottomRight: new THREE.Vector2(-1, 1)
    },
    fontHeightCache = {};

function getFontHeight(b) {
    var a = fontHeightCache[b];
    if (!a) {
        var d = document.getElementsByTagName("body")[0],
            c = document.createElement("div");
        a = document.createTextNode("M\u00c9q");
        c.appendChild(a);
        c.setAttribute("style", "font:" + b + ";position:absolute;top:0;left:0");
        d.appendChild(c);
        a = c.offsetHeight;
        fontHeightCache[b] = a;
        d.removeChild(c)
    }
    return a
}

function CanvasText() {
    this.textHeight = this.textWidth = null;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    return this
}
CanvasText.prototype.width = function () {
    return this.canvas.width
};
CanvasText.prototype.height = function () {
    return this.canvas.height
};
CanvasText.prototype.drawText = function (b, a) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = a.font;
    this.textWidth = Math.max(1, Math.ceil(this.ctx.measureText(b).width));
    this.textHeight = getFontHeight(this.ctx.font);
    this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth);
    this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight);
    this.ctx.font = a.font;
    this.ctx.fillStyle = a.fillStyle;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.strokeStyle = a.outlineStyle;
    this.ctx.miterLimit = 2;
    this.ctx.lineJoin = "circle";
    0 < a.outlineSize && (this.ctx.lineWidth = a.outlineSize, this.ctx.strokeText(b, .5 * this.canvas.width, .5 * this.canvas.height));
    this.ctx.lineWidth = 1;
    this.ctx.fillText(b, .5 * this.canvas.width, .5 * this.canvas.height);
    return this.canvas
};
SpriteText2D.prototype = new THREE.Object3D;
SpriteText2D.prototype.constructor = SpriteText2D;

function SpriteText2D(b, a) {
    THREE.Object3D.call(this);
    this._font = a.font || "30px Arial";
    this._fillStyle = a.fillStyle || "#FFFFFF";
    this._outlineSize = a.outlineSize || 0;
    this._outlineStyle = a.outlineStyle || "black";
    this.canvas = new CanvasText;
    this.align = a.align || textAlign.center;
    this.antialias = typeof ("undefined" === a.antialias) ? !0 : a.antialias;
    this.setText(b)
}
SpriteText2D.prototype.width = function () {
    return this.canvas.textWidth
};
SpriteText2D.prototype.height = function () {
    return this.canvas.textHeight
};
SpriteText2D.prototype.getText = function () {
    return this._text
};
SpriteText2D.prototype.setText = function (b) {
    this._text !== b && (this._text = b, this.updateText())
};
SpriteText2D.prototype.getFont = function () {
    return this._font
};
SpriteText2D.prototype.setFont = function (b) {
    this._font !== b && (this._font = b, this.updateText())
};
SpriteText2D.prototype.getFillStyle = function () {
    return this._fillStyle
};
SpriteText2D.prototype.setFillStyle = function (b) {
    this._fillStyle !== b && (this._fillStyle = b, this.updateText())
};
SpriteText2D.prototype.updateText = function () {
    this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle,
        outlineStyle: this._outlineStyle,
        outlineSize: this._outlineSize
    });
    this.cleanUp();
    this.texture = new THREE.Texture(this.canvas.canvas);
    this.texture.needsUpdate = !0;
    this.applyAntiAlias();
    this.material ? this.material.map = this.texture : this.material = new THREE.SpriteMaterial({
        map: this.texture
    });
    this.sprite || (this.sprite = new THREE.Sprite(this.material), this.add(this.sprite));
    this.sprite.scale.set(this.canvas.width(),
        this.canvas.height(), 1)
};
SpriteText2D.prototype.cleanUp = function () {
    this.texture && this.texture.dispose()
};
SpriteText2D.prototype.finalCleanUp = function () {
    this.cleanUp();
    this.material && this.material.dispose();
    this.sprite && (this.remove(this.sprite), this.sprite = void 0)
};
SpriteText2D.prototype.applyAntiAlias = function () {
    !1 === this.antialias && (this.texture.magFilter = THREE.NearestFilter, this.texture.minFilter = THREE.LinearMipMapLinearFilter)
};