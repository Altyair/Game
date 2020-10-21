'use strict';

class Rect {
    constructor(x = 50, y = 50, width = 50, height = 50) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    setXPosition( x ) {
        this._x = x;
    }

    setYPosition( y ) {
        this._y = y;
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        }
    }

    moveX( xmov ) {
        this._x += xmov;
    }

    moveY( ymov ) {
        this._y += ymov;
    }

    create( context, strokeStyle ) {
        context.beginPath();
        context.rect(this._x, this._y, this._width, this._height);
        context.closePath();
        context.strokeStyle = strokeStyle;
        context.stroke();
    }
}

