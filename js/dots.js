(function() {

    let canvas    = document.getElementById( 'animated-bg' ),
        canvasCtx = canvas.getContext( '2d' ),
        dots      = [],
        w,
        h,
        step,
        hovered = false;

    let options = {

        dotsAmount:       100,

        genLimit:         75,

        minRad:           2,

        maxRad:           4,

        minSpeed:         .5,

        incSpeed:         1,

        connectingRadius: 150

    };

    function rand(  min, max ) {

        var rand = min + Math.random() * ( max + 1 - min );
        rand = Math.floor( rand );
        return rand;

    };

    window.onresize = function() {
        canvasResize();
    };

    function canvasResize() {

        w = canvas.parentNode.getBoundingClientRect().width;
        h = canvas.parentNode.getBoundingClientRect().height;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w;
        canvas.height = h;

    };


    Dot = function( x, y ) {

        this.radius         = rand( options.minRad, options.maxRad );

        this.x              = x || rand( this.radius, w - this.radius );

        this.y              = y || rand( this.radius, h - this.radius );

        this.directionAngle = rand( 0, 361 );

        this.speed          = Math.random() * options.minSpeed - options.incSpeed;

        this.xInc           = Math.cos(this.directionAngle*Math.PI/180) * this.speed;

        this.yInc           = Math.sin(this.directionAngle*Math.PI/180) * this.speed;

        this.checkPos       = function() {

                                if( this.y >= h - this.radius || this.y <= this.radius ) {
                                    this.yInc *= -1;
                                    if ( this.y > h - this.radius ) this.y = h - this.radius;
                                    if ( this.y < this.radius ) this.y = this.radius;
                                } else if ( this.x >= w - this.radius || this.x <= this.radius ) {
                                    this.xInc *= -1;
                                    if ( this.x > w - this.radius ) this.x = w - this.radius;
                                    if (this.x < this.radius) this.x = this.radius;
                                };

                              };

        this.draw           = function() {

                                this.x += this.xInc;
                                this.y += this.yInc;

                                canvasCtx.beginPath();
                                canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
                                canvasCtx.stroke();
                                canvasCtx.closePath();
                        
                                canvasCtx.beginPath();
                                canvasCtx.arc(this.x, this.y, 1, 0, Math.PI*2);
                                canvasCtx.fill();
                                canvasCtx.closePath();

                              };

        this.draw();

    };

    function repaint() {

        canvasCtx.clearRect( 0, 0, w, h );
        canvasCtx.fillStyle = canvasCtx.strokeStyle = 'rgb(20,200,200)';
        canvasCtx.lineWidth = 1;

        for( let i = 0; i < dots.length - hovered; i++ ) {
            dots[i].checkPos();
            dots[i].draw();
        };

        if( hovered ) { 
            dots[dots.length - 1].draw();
        };

        for( let i = 0; i < dots.length; i++ ) { connectDots( dots[i], dots ); };
        
        window.requestAnimationFrame(repaint);

    };

    function connectDots( center, targets ) {

        for( let i = 0; i < targets.length; i++ ) {

            let distance = Math.sqrt( Math.pow( targets[i].x - center.x, 2 ) + Math.pow( targets[i].y - center.y, 2 ) );

            if( distance <= options.connectingRadius ) {

                let opacity = 1 - distance/options.connectingRadius;

                canvasCtx.lineWidth = .5;
                canvasCtx.beginPath();
                canvasCtx.moveTo( center.x, center.y );
                canvasCtx.lineTo( targets[i].x, targets[i].y );
                canvasCtx.closePath();
                canvasCtx.strokeStyle = 'rgba( 2, 200, 200, ' + opacity + ' )';
                canvasCtx.stroke();

            };

        };

    };

    canvas.onclick =  e => {

        for(let i = 0; i < 3; i++ ) {
            dots.unshift( new Dot( e.clientX, e.clientY ) );
        };

        if( dots.length > options.dotsAmount + options.genLimit + 1 ) {
            dots.splice( dots.length - 4, dots.length - 1, new Dot(), new Dot(), new Dot() );
        }

    };

    canvas.onmouseenter = e => {

        hovered=true;
        dots.push( new Dot( e.clientX, e.clientY ) );
        dots[dots.length - 1].xInc = dots[dots.length - 1].yInc = 0;
        
        canvas.onmousemove = e => {

            dots[dots.length - 1].x = e.clientX;
            dots[dots.length - 1].y = e.clientY;

        };

        canvas.onmouseleave = function() {
            dots.pop();
            hovered = false;
        };

    };

    (function init() {

        canvasResize();

        for(  let i = 0; i < options.dotsAmount; i++ ) {
            dots.push( new Dot() );
        };

        window.requestAnimationFrame(repaint);

    })();

})();
