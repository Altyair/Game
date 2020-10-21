const myPoint = {
    init: function () {
        const canvas = document.getElementById("myCanvas");
        const context = canvas.getContext("2d");

        const point = new Point();

        // const plane = new Plane( 700, 500, 1200, 700, 1 );
        // plane.create( context );
        //
        // const plane1 = new Plane( 750, 800, 750, 300, 1 );
        // plane1.create( context );

        const plane2 = new Plane( {x1:100, y1:500, x2:700, y2:800, lineWidth:1} );
        plane2.create( context );

        const ball = new Arc({x:200, y:50, radius:20, xmov:2, ymov:0.5, lineWidth:1, strokeStyle:'red', fillStyle:'red'});
        ball.create( context );

        // const ball1 = new Arc( 500, canvas.height - 50, 20, 2, -15 );
        // ball1.setGravity(0.2);
        // ball1.create( context );

        const gameLoop = () => {
            ball.setGravity( ball.getGravity() + 0.0005 );

            // point.circleToPlaneDetection( ball, plane );

            point.circleToPlaneDetection( ball, plane2 );

            // point.circleToPlaneDetection( ball1, plane2 );

            //point.circleToWallsDetection(  );

            if( ball.getYPosition() + ball.getRadius() >= canvas.height ) {
                if(ball.getFall()) {
                    ball.setYPosition(canvas.height - ball.getRadius());

                    ball.setMoveY(ball.getMoveY() / 1.3 * -1);
                    ball.setMoveX(ball.getMoveX() / 1.3);

                    if (Math.abs(ball.getMoveY()) < ball.getGravity() * 2 && ball.getYPosition() + ball.getRadius() >= canvas.height) {
                        ball.setFall();
                        ball.setMoveY(0);
                    }
                }
            }

            if( ball.getXPosition() + ball.getRadius() >= canvas.width ) {
                ball.setMoveX( ball.getMoveX() * -1 );
            }

            if( ball.getXPosition() - ball.getRadius() <= 0 ){
                ball.setMoveX( Math.abs( ball.getMoveX() ) );
            }


            ///////////// ball1 ///////////////
            // if( ball1.getYPosition() + ball1.getRadius() >= canvas.height ) {
            //     if(ball1.getFall()) {
            //         ball1.setYPosition(canvas.height - ball1.getRadius());
            //
            //         ball1.setMoveY(ball1.getMoveY() / 1.2 * -1);
            //         ball1.setMoveX(ball1.getMoveX() / 1.1);
            //
            //         if (Math.abs(ball1.getMoveY()) < ball1.getGravity() * 2 && ball1.getYPosition() + ball1.getRadius() >= canvas.height) {
            //             ball1.setFall();
            //             ball1.setMoveY(0);
            //         }
            //     }
            // }
            //
            // if( ball1.getXPosition() + ball1.getRadius() >= canvas.width ) {
            //     ball1.setMoveX( ball1.getMoveX() * -1 );
            // }
            //
            // if( ball1.getXPosition() - ball1.getRadius() <= 0 ){
            //     ball1.setMoveX( Math.abs( ball1.getMoveX() ) );
            // }
            //
            if(ball.getFall()) {
                ball.move();
            }
            //
            // if(ball1.getFall()) {
            //     ball1.move();
            // }

            context.clearRect(0, 0, canvas.width, canvas.height);

            // plane.create( context );
            // plane1.create( context );
            plane2.create( context );
            ball.create( context );
            // ball1.create( context );

            requestAnimationFrame(gameLoop)
        }

        setTimeout(() => {
            gameLoop();
        }, 500)

    }
}

window.onload = function () {
    myPoint.init();
}
