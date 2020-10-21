const myPoint = {
    init: function () {
        const canvas = document.getElementById("myCanvas");
        const context = canvas.getContext("2d");

        const ball = new Arc();
        ball.create( context, "blue" );
        ball.setMoveY(1); // скорость по Y
        ball.setMoveX(10); // скорость по X
        ball.setGravity(0.5);

        const ball1 = new Arc();
        ball1.create( context, "blue" );
        ball1.setMoveY(-5); // скорость по Y
        ball.setGravity(0.5);

        const gameLoop = () => {

            if( ball1.getYPosition() + ball1.getRadius() >= canvas.height ) {
                if(!ball1.getFall()) {
                    return;
                }

                ball1.setYPosition( canvas.height - ball1.getRadius() );

                ball1.setMoveY( ball1.getMoveY() / 1.2 * -1 );

                if( Math.abs( ball1.getMoveY() ) < ball1.getGravity() * 2 && ball1.getYPosition() + ball1.getRadius() >= canvas.height ) {
                    ball1.setFall();
                    ball1.setMoveY(0);
                }
            }

            if( ball.getXPosition() + ball.getRadius() >= canvas.width ) {
                ball.setMoveX(-5);
            }
            //else if( ball.getXPosition() - ball.getRadius() <= 0 ){
            //     ball.setMoveX(3);
            //     ball.setAccel(0.01);
            // }

            if( ball.getYPosition() + ball.getRadius() >= canvas.height ) {
                if(!ball.getFall()) {
                    return;
                }

                ball.setYPosition( canvas.height - ball.getRadius() );

                ball.setMoveY( ball.getMoveY() / 1.2 * -1 );
                ball.setMoveX( ball.getMoveX() / 1.2 );

                if( Math.abs( ball.getMoveY() ) < ball.getGravity() * 2 && ball.getYPosition() + ball.getRadius() >= canvas.height ) {
                    ball.setFall();
                    ball.setMoveY(0);
                }
            }

            //ball.setAccel(0.05);
            //ball.setGravity(0);
            // } else if( ball.getYPosition() - ball.getRadius() <= 0 ){
            //     ball.setMoveY(2);
            //     //ball.setAccel(0.01);
            //     ball.setGravity(0.5);
            // }

            ball.move();

            context.clearRect(0, 0, canvas.width, canvas.height); // очищаем холст
            ball.create( context, "red" ); // заново рисуем объект

            setTimeout(() => {
                requestAnimationFrame(gameLoop)
                gameLoop();

            }, 5000)
        }

    }
}

window.onload = function () {
    myPoint.init();
}
