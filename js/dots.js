(function() {

    let canvas    = document.getElementById( 'animated-bg' ),
        canvasCtx = canvas.getContext( '2d' ),
        dots      = [],
        w,
        h,
        step,
        hovered = false;

    let options = {

        dotsAmount:       200,

        genLimit:         75,

        minRad:           2,

        maxRad:           4,

        minSpeed:         .5,

        incSpeed:         1,

        connectingRadius: 200

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkb3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgY2FudmFzICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhbmltYXRlZC1iZycgKSxcclxuICAgICAgICBjYW52YXNDdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApLFxyXG4gICAgICAgIGRvdHMgICAgICA9IFtdLFxyXG4gICAgICAgIHcsXHJcbiAgICAgICAgaCxcclxuICAgICAgICBzdGVwLFxyXG4gICAgICAgIGhvdmVyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuXHJcbiAgICAgICAgZG90c0Ftb3VudDogICAgICAgMTAwLFxyXG5cclxuICAgICAgICBnZW5MaW1pdDogICAgICAgICA3NSxcclxuXHJcbiAgICAgICAgbWluUmFkOiAgICAgICAgICAgMixcclxuXHJcbiAgICAgICAgbWF4UmFkOiAgICAgICAgICAgNCxcclxuXHJcbiAgICAgICAgbWluU3BlZWQ6ICAgICAgICAgLjUsXHJcblxyXG4gICAgICAgIGluY1NwZWVkOiAgICAgICAgIDEsXHJcblxyXG4gICAgICAgIGNvbm5lY3RpbmdSYWRpdXM6IDE3NVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcmFuZCggIG1pbiwgbWF4ICkge1xyXG5cclxuICAgICAgICB2YXIgcmFuZCA9IG1pbiArIE1hdGgucmFuZG9tKCkgKiAoIG1heCArIDEgLSBtaW4gKTtcclxuICAgICAgICByYW5kID0gTWF0aC5mbG9vciggcmFuZCApO1xyXG4gICAgICAgIHJldHVybiByYW5kO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2FudmFzUmVzaXplKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbnZhc1Jlc2l6ZSgpIHtcclxuXHJcbiAgICAgICAgdyA9IGNhbnZhcy5wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIGggPSBjYW52YXMucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gdyArICdweCc7XHJcbiAgICAgICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGggKyAncHgnO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHc7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGg7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgRG90ID0gZnVuY3Rpb24oIHgsIHkgKSB7XHJcblxyXG4gICAgICAgIHRoaXMucmFkaXVzICAgICAgICAgPSByYW5kKCBvcHRpb25zLm1pblJhZCwgb3B0aW9ucy5tYXhSYWQgKTtcclxuXHJcbiAgICAgICAgdGhpcy54ICAgICAgICAgICAgICA9IHggfHwgcmFuZCggdGhpcy5yYWRpdXMsIHcgLSB0aGlzLnJhZGl1cyApO1xyXG5cclxuICAgICAgICB0aGlzLnkgICAgICAgICAgICAgID0geSB8fCByYW5kKCB0aGlzLnJhZGl1cywgaCAtIHRoaXMucmFkaXVzICk7XHJcblxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uQW5nbGUgPSByYW5kKCAwLCAzNjEgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZCAgICAgICAgICA9IE1hdGgucmFuZG9tKCkgKiBvcHRpb25zLm1pblNwZWVkIC0gb3B0aW9ucy5pbmNTcGVlZDtcclxuXHJcbiAgICAgICAgdGhpcy54SW5jICAgICAgICAgICA9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uQW5nbGUqTWF0aC5QSS8xODApICogdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgdGhpcy55SW5jICAgICAgICAgICA9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uQW5nbGUqTWF0aC5QSS8xODApICogdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgdGhpcy5jaGVja1BvcyAgICAgICA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy55ID49IGggLSB0aGlzLnJhZGl1cyB8fCB0aGlzLnkgPD0gdGhpcy5yYWRpdXMgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueUluYyAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnkgPiBoIC0gdGhpcy5yYWRpdXMgKSB0aGlzLnkgPSBoIC0gdGhpcy5yYWRpdXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy55IDwgdGhpcy5yYWRpdXMgKSB0aGlzLnkgPSB0aGlzLnJhZGl1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLnggPj0gdyAtIHRoaXMucmFkaXVzIHx8IHRoaXMueCA8PSB0aGlzLnJhZGl1cyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54SW5jICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMueCA+IHcgLSB0aGlzLnJhZGl1cyApIHRoaXMueCA9IHcgLSB0aGlzLnJhZGl1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueCA8IHRoaXMucmFkaXVzKSB0aGlzLnggPSB0aGlzLnJhZGl1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3ICAgICAgICAgICA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy54SW5jO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnlJbmM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNDdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSoyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNDdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzQ3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNDdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzQ3R4LmFyYyh0aGlzLngsIHRoaXMueSwgMSwgMCwgTWF0aC5QSSoyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNDdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZHJhdygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwYWludCgpIHtcclxuXHJcbiAgICAgICAgY2FudmFzQ3R4LmNsZWFyUmVjdCggMCwgMCwgdywgaCApO1xyXG4gICAgICAgIGNhbnZhc0N0eC5maWxsU3R5bGUgPSBjYW52YXNDdHguc3Ryb2tlU3R5bGUgPSAncmdiKDIwLDIwMCwyMDApJztcclxuICAgICAgICBjYW52YXNDdHgubGluZVdpZHRoID0gMTtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBkb3RzLmxlbmd0aCAtIGhvdmVyZWQ7IGkrKyApIHtcclxuICAgICAgICAgICAgZG90c1tpXS5jaGVja1BvcygpO1xyXG4gICAgICAgICAgICBkb3RzW2ldLmRyYXcoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiggaG92ZXJlZCApIHsgXHJcbiAgICAgICAgICAgIGRvdHNbZG90cy5sZW5ndGggLSAxXS5kcmF3KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBkb3RzLmxlbmd0aDsgaSsrICkgeyBjb25uZWN0RG90cyggZG90c1tpXSwgZG90cyApOyB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVwYWludCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25uZWN0RG90cyggY2VudGVyLCB0YXJnZXRzICkge1xyXG5cclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoIE1hdGgucG93KCB0YXJnZXRzW2ldLnggLSBjZW50ZXIueCwgMiApICsgTWF0aC5wb3coIHRhcmdldHNbaV0ueSAtIGNlbnRlci55LCAyICkgKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCBkaXN0YW5jZSA8PSBvcHRpb25zLmNvbm5lY3RpbmdSYWRpdXMgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wYWNpdHkgPSAxIC0gZGlzdGFuY2Uvb3B0aW9ucy5jb25uZWN0aW5nUmFkaXVzO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5saW5lV2lkdGggPSAuNTtcclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5tb3ZlVG8oIGNlbnRlci54LCBjZW50ZXIueSApO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzQ3R4LmxpbmVUbyggdGFyZ2V0c1tpXS54LCB0YXJnZXRzW2ldLnkgKTtcclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGNhbnZhc0N0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKCAyLCAyMDAsIDIwMCwgJyArIG9wYWNpdHkgKyAnICknO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzQ3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5vbmNsaWNrID0gIGUgPT4ge1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMzsgaSsrICkge1xyXG4gICAgICAgICAgICBkb3RzLnVuc2hpZnQoIG5ldyBEb3QoIGUuY2xpZW50WCwgZS5jbGllbnRZICkgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiggZG90cy5sZW5ndGggPiBvcHRpb25zLmRvdHNBbW91bnQgKyBvcHRpb25zLmdlbkxpbWl0ICsgMSApIHtcclxuICAgICAgICAgICAgZG90cy5zcGxpY2UoIGRvdHMubGVuZ3RoIC0gNCwgZG90cy5sZW5ndGggLSAxLCBuZXcgRG90KCksIG5ldyBEb3QoKSwgbmV3IERvdCgpICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLm9ubW91c2VlbnRlciA9IGUgPT4ge1xyXG5cclxuICAgICAgICBob3ZlcmVkPXRydWU7XHJcbiAgICAgICAgZG90cy5wdXNoKCBuZXcgRG90KCBlLmNsaWVudFgsIGUuY2xpZW50WSApICk7XHJcbiAgICAgICAgZG90c1tkb3RzLmxlbmd0aCAtIDFdLnhJbmMgPSBkb3RzW2RvdHMubGVuZ3RoIC0gMV0ueUluYyA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FudmFzLm9ubW91c2Vtb3ZlID0gZSA9PiB7XHJcblxyXG4gICAgICAgICAgICBkb3RzW2RvdHMubGVuZ3RoIC0gMV0ueCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgZG90c1tkb3RzLmxlbmd0aCAtIDFdLnkgPSBlLmNsaWVudFk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhbnZhcy5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZG90cy5wb3AoKTtcclxuICAgICAgICAgICAgaG92ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcbiAgICAgICAgY2FudmFzUmVzaXplKCk7XHJcblxyXG4gICAgICAgIGZvciggIGxldCBpID0gMDsgaSA8IG9wdGlvbnMuZG90c0Ftb3VudDsgaSsrICkge1xyXG4gICAgICAgICAgICBkb3RzLnB1c2goIG5ldyBEb3QoKSApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVwYWludCk7XHJcblxyXG4gICAgfSkoKTtcclxuXHJcbn0pKCk7Il0sImZpbGUiOiJkb3RzLmpzIn0=
