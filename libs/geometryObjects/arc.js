'use strict';

class Arc {
    constructor(options) {
        this._x = options.x || 50;
        this._y = options.y || 50;
        this._radius = options.radius || 20;

        this._xmov = options.xmov || 0;
        this._ymov = options.ymov || 0;
        this._lineWidth = options.lineWidth || 1;
        this._strokeStyle = options.strokeStyle || 'red';
        this._fillStyle = options.fillStyle || 'red';

        this._startAngle = options.startAngle || 0;
        this._endAngle = options.endAngle || Math.PI * 2;
        this._anticlockwise = options.anticlockwise || false;
    }

    setRadius( radius ) {
        this._radius = radius;
    }

    getRadius() {
        return this._radius;
    }

    setXPosition( x ) {
        this._x = x;
    }

    setYPosition( y ) {
        this._y = y;
    }

    getXPosition() {
        return this._x;
    }

    getYPosition() {
        return this._y;
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        }
    }

    setAccel(accel) {
        this._accel = accel;
    }

    getAccel() {
        return this._accel || 0;
    }

    setGravity(gravity) {
        this._gravity = gravity;
    }

    getGravity() {
        return this._gravity || 0;
    }

    setDecay(decay) {
        this._decay = decay;
    }

    getDecay() {
        return this._decay || 1;
    }

    setFall() {
        this._fall = !this.getFall();
    }

    getFall() {
        return this._fall || true;
    }

    setMoveX( xmov ) {
        this._xmov = xmov;
    }

    setMoveY( ymov ) {
        this._ymov = ymov;
    }

    getMoveX() {
        return this._xmov || 0;
    }

    getMoveY() {
        return this._ymov || 0;
    }

    _getNextXMov() {
        let _xmov = this._xmov;
        if(_xmov < 0) {
            _xmov -= this.getAccel();
        } else if(_xmov > 0) {
            _xmov += this.getAccel();
        }
        _xmov *= this.getDecay();
        return _xmov;
    }

    _getNextYMov() {
        let _ymov = this._ymov;
        if(_ymov < 0) {
            _ymov -= this.getAccel();
            _ymov += this.getGravity();
        } else if(_ymov > 0) {
            _ymov += this.getAccel();
            _ymov += this.getGravity();
        }
        return _ymov;
    }

    moveX() {
        this._xmov = this._getNextXMov();
        this._x += this.getMoveX();
    }

    moveY() {
        this._ymov = this._getNextYMov();
        this._y += this.getMoveY();
    }

    setPrevMovPosition(prevmovx, prevmovy) {
        this._prevmovx = prevmovx;
        this._prevmovy = prevmovy;
    }

    getPrevMovPosition() {
        return {
            prevmovx: this._prevmovx,
            prevmovy: this._prevmovy
        }
    }

    getNextPosition() {
        return {
            xmov: this._getNextXMov(),
            ymov: this._getNextYMov(),
            x: this._x + this._getNextXMov(),
            y: this._y + this._getNextYMov(),
        }
    }

    move() {
        this.moveX();
        this.moveY();
    }

    stopMove() {
        this.setMoveX(0);
        this.setMoveY(0);
        this.setFall();
    }

    setStrokeStyle( strokeStyle ) {
        this._strokeStyle = strokeStyle;
    }

    getStrokeStyle() {
        return this._strokeStyle || 'red';
    }

    setLineWidth( lineWidth ) {
        this._lineWidth = lineWidth;
    }

    getLineWidth() {
        return this._lineWidth || 1;
    }

    create( context ) {
        context.strokeStyle = this.getStrokeStyle();
        context.fillStyle = this._fillStyle;
        context.beginPath();
        context.arc(this._x, this._y, this._radius, this._startAngle, this._endAngle, this._anticlockwise);
        context.lineWidth = this.getLineWidth();
        context.fill();
        context.closePath();
        context.stroke();
    }
}

