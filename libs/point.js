'use strict';

function Point () {}

Point.PI = Math.PI; // PI constant

Point.randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand);
};

Point.roundToHundredths = value => Math.ceil((value)*100)/100;

Point.roundToDecimal = value => Math.ceil((value)*10)/10;

Point.prototype.getAngleRad = function( angleGrad ) {
    return angleGrad * ( Point.PI / 180 );
}

Point.prototype.getAngleGrad = function( angleRad ) {
    return angleRad * ( 180 / Point.PI );
}

Point.prototype.getDistance = function( x1, x2, y1, y2 ) {
    return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 -y1, 2) );
}

Point.prototype.countPow = function(x,y) {
    return Math.sqrt( Math.pow(x,2)+Math.pow(y,2) );
}

Point.prototype.getSin = {
    withSidesTriangle: (y, c) => {
        return y / c;
    },
    withRadAngle: (angle) => {
        return Math.sin(angle)
    }
};

Point.prototype.getCos = {
    withSidesTriangle: (x, c) => {
        return x / c;
    },
    withRadAngle: (angle) => {
        return Math.cos(angle)
    }
}

Point.prototype.getTan = {
    withSidesTriangle: (y, x) => {
        return y / x;
    },
    withRadAngle: (angle) => {
        return Math.tan(angle)
    }
}

Point.prototype.getArcSin = (number) => {
    return Math.asin(number)
}

Point.prototype.getArcCos = (number) => {
    return Math.acos(number)
}

Point.prototype.getArcTan = (number) => {
    return Math.atan(number)
}

Point.prototype.getArcTan2 = (y, x) => {
    return Math.atan2(y, x)
}

Point.prototype.getProjectionX = (c, angleRad) => {
    return c * Math.cos(angleRad)
}

Point.prototype.getProjectionY = (c, angleRad) => {
    return c * Math.sin(angleRad)
}

Point.prototype.circleToCircleDetection = function( circleA, circleB ) {
    const distance = this.getDistance(circleA.getXPosition(), circleB.getXPosition(), circleA.getYPosition(), circleB.getYPosition());

    if( distance < circleA.getRadius() + circleB.getRadius()) {
        return true;
    }
    return false;
}

Point.prototype._getPositionIntersectionCirclePlane = function( circleMoveX, circleMoveY, circleX, circleY, plane ) {
    let circleM = circleMoveY / circleMoveX;
    if( circleMoveX === 0 && circleMoveY > 0 ) {
        circleM = 1000000
    } else if( circleMoveX === 0 && circleMoveY < 0 ) {
        circleM = -1000000;
    }

    const planeYLength = plane.getLineToPosition().y2 - plane.getMoveToPosition().y1;
    const planeXLength = plane.getLineToPosition().x2 - plane.getMoveToPosition().x1;

    let planeM = planeYLength / planeXLength;

    if( planeXLength === 0 && planeYLength > 0 ) {
        planeM = 1000000
    } else if( planeXLength === 0 && planeYLength < 0 ) {
        planeM = -1000000;
    }

    const circleB = circleY - circleM * circleX;
    const planeB = plane.getMoveToPosition().y1 - planeM * plane.getMoveToPosition().x1;
    const x = (circleB - planeB) / ( planeM - circleM);
    const y = planeM * x + planeB;

    return { x, y }
}

Point.prototype._getCatetusForCircleToPlaneDetection = function( circleMoveX, circleMoveY, circleX, circleY, plane ) {
    const {x, y} = this._getPositionIntersectionCirclePlane( circleMoveX, circleMoveY, circleX, circleY, plane );

    if( x < Math.min(plane.getMoveToPosition().x1, plane.getLineToPosition().x2) - 1 ||
        x > Math.max(plane.getMoveToPosition().x1, plane.getLineToPosition().x2) + 1 ||
        y < Math.min(plane.getMoveToPosition().y1, plane.getLineToPosition().y2) - 1 ||
        y > Math.max(plane.getMoveToPosition().y1, plane.getLineToPosition().y2) + 1)
        // circleX < Math.min(plane.getMoveToPosition().x1, plane.getLineToPosition().x2) ||
        // circleX > Math.max(plane.getMoveToPosition().x1, plane.getLineToPosition().x2) ||
        // circleY < Math.min(plane.getMoveToPosition().y1, plane.getLineToPosition().y2) ||
        // circleY > Math.max(plane.getMoveToPosition().y1, plane.getLineToPosition().y2))
    {
        return 10000;
    }

    const planeYLength = plane.getLineToPosition().y2 - plane.getMoveToPosition().y1;
    const planeXLength = plane.getLineToPosition().x2 - plane.getMoveToPosition().x1;

    const theta = Math.atan2( circleMoveY, circleMoveX );
    const angle = Math.atan2( planeYLength, planeXLength );
    const gamma = theta - angle;
    const sinGamma = Math.sin( gamma );
    const r = this.getDistance( x, circleX, y, circleY );
    const catetus = sinGamma * r;

    return Math.abs(catetus);
}

Point.prototype._getYmovNearPlane = function ( circleMoveX, circleMoveY, circleX, circleY, circleRadius, plane ) {
    const {x, y} = this._getPositionIntersectionCirclePlane( circleMoveX, circleMoveY, circleX, circleY, plane );

    const planeYLength = plane.getLineToPosition().y2 - plane.getMoveToPosition().y1;
    const planeXLength = plane.getLineToPosition().x2 - plane.getMoveToPosition().x1;

    const theta = Math.atan2( circleMoveY, circleMoveX );
    const angle = Math.atan2( planeYLength, planeXLength );
    const gamma = theta - angle;

    const r = Math.abs((circleRadius) / Math.sin(gamma));

    const xc = x - r * Math.cos(theta);
    const yc = y - r * Math.sin(theta);

    return {
        xmov: xc - circleX,
        ymov: yc - circleY
    };
}

Point.prototype.circleToPlaneDetection = function( circle, plane ) {
    // if (Math.abs(circle.getMoveY()) < circle.getGravity() * 2.5 && circle.getYPosition() + circle.getRadius() >= Math.max(plane.getMoveToPosition().y1, plane.getLineToPosition().y2)) {
    //     console.log(1)
    //
    //     circle.setFall();
    //     circle.setMoveY(0);
    //     circle.setMoveX(0);
    // }

    const catetus = this._getCatetusForCircleToPlaneDetection(circle.getMoveX(), circle.getMoveY(), circle.getXPosition(), circle.getYPosition(), plane );

    if( catetus <= circle.getRadius() + 1 ) {
        const angle = this.getArcTan2( plane.getLineToPosition().y2 - plane.getMoveToPosition().y1, plane.getLineToPosition().x2 - plane.getMoveToPosition().x1 );

        const newVelocity = this._reflex( Math.sin( angle ),  Math.cos( angle ), circle.getPrevMovPosition().prevmovx, circle.getPrevMovPosition().prevmovy );

        circle.setMoveX( newVelocity.xmov );
        circle.setMoveY( newVelocity.ymov );
    }

    const nextCatetus = this._getCatetusForCircleToPlaneDetection(circle.getNextPosition().xmov, circle.getNextPosition().ymov, circle.getNextPosition().x, circle.getNextPosition().y, plane );

    if(nextCatetus <= circle.getRadius()) {
        circle.setPrevMovPosition( circle.getMoveX(), circle.getMoveY() );

        const newVel = this._getYmovNearPlane( circle.getNextPosition().xmov, circle.getNextPosition().ymov, circle.getXPosition(), circle.getYPosition(), circle.getRadius(), plane );

        circle.setMoveY( newVel.ymov  );
        circle.setMoveX( newVel.xmov );
    }
}

Point.prototype._reflex = function ( rsin, rcos, ymov, xmov ) {
    const g = this.countPow( xmov, ymov );

    const sin= xmov / g;
    const cos= ymov / g;

    const tsin = rsin * cos - rcos * sin;
    const tcos = rcos * cos + rsin * sin;

    const nsin = tsin * rcos + tcos * rsin;
    const ncos = tcos * rcos - tsin * rsin;

    const pow = g * 0.9;

    return {
        ymov: nsin * pow,
        xmov: ncos * pow
    }
}
