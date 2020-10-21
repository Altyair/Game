'use strict';

class Plane {
    constructor(options) {
        this._x1 = options.x1 || 0;
        this._y1 = options.y1 || 0;
        this._x2 = options.x2 || 300;
        this._y2 = options.y2 || 300;

        this._lineWidth = options.lineWidth || 1;
        this._strokeStyle = options.strokeStyle || 'red';
    }

    setMoveToPosition( x1, y1 ) {
        this._x1 = x1;
        this._y1 = y1;
    }

    getMoveToPosition() {
        return {
            x1: this._x1,
            y1: this._y1
        };
    }

    setLineToPosition( x2, y2 ) {
        this._x2 = x2;
        this._y2 = y2;
    }

    getLineToPosition() {
        return {
            x2: this._x2,
            y2: this._y2
        };
    }

    setLineWidth( lineWidth ) {
        this._lineWidth = lineWidth;
    }

    getLineWidth() {
        return this._lineWidth || 1;
    }

    setStrokeStyle( strokeStyle ) {
        this._strokeStyle = strokeStyle;
    }

    getStrokeStyle() {
        return this._strokeStyle || 'red';
    }

    create( context ) {
        context.beginPath();
        context.moveTo(this._x1, this._y1);
        context.lineTo(this._x2, this._y2);
        context.lineWidth = this.getLineWidth();
        context.strokeStyle = this.getStrokeStyle();
        context.closePath();
        context.stroke();
    }

    setPositionBySlopeParams( context, x1, x2, m, b ) {
        const y1 = m * x1 + b;
        const y2 = m * x2 + b;

        this.setMoveToPosition( x1, y1 );
        this.setLineToPosition( x2, y2 );
    }
}

