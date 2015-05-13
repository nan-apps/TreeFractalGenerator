/**
 * @author GRNan 
 * @date Aug 2013
 * @version 1.0  
 * @framework kinetic-v4.5.5.min.js
 * 
 * */


fb = function( text ){
    if ( console.debug )
        console.debug( text );
    else if( console.log )
        console.log( text );
}


$(document).ready(function(){
    
   kinect.init();
   
   
    var tree = new Tree( 20, 60, 1.5, 1.5 );
    tree.init( [200,240] );    
    
    var tree = new Tree( 20 ,60, 1.05, 1.5 );
    tree.init( [600,240] );
    
    /*
    var tree = new Tree( 20, 20, 1.05, 1.5 );
    tree.init( [420,200] );
    
    var tree = new Tree( 20, 80, 1.05, 1.5 );
    tree.init( [460,200] );
    
    var tree = new Tree( 20, 40, 1.05, 1.5 );
    tree.init( [499,200] );*/

});

kinect = {
    stage: null,
    layer: null,
    init: function(){
        
        this.stage = new Kinetic.Stage({
            container: 'container',
            width: 800,
            height: 240
        });        
        this.layer = new Kinetic.Layer();
        
    }
}

/**
 * @param m pendiente de crecimiento
 * @param long longitud de ramas
 * @param mDegradient factor de decrecimiento de m
 * @param lDegradient factor de decrecimiento de l
 * 
 * */
function Tree( m, long, mDegradient, lDegradient ){
    
    var global = this;
    
    this.m = m;        
    this.long = long;
    this.mDegradient = mDegradient;
    this.lDegradient = lDegradient;
    this.maxIterations = 60;
    this.iterations = 0;
    
    this.draw = function( ele ){        
        kinect.layer.add( ele );
        kinect.stage.add( kinect.layer );        
    }
    
    this.drawLine = function( points, color ){
        
        var ele = new Kinetic.Line({
            points: points,
            stroke: color,
            strokeWidth: 0.5,
            lineCap: 'round',
            lineJoin: 'round'
          });        
        
        this.draw( ele );        
    }
    
    this.init = function( initPoints ){
        
        if( this.iterations == this.maxIterations ) return false;
        fb(this.iterations);
        this.iterations++;
                
        var id = setTimeout( function(){
            
            var destinyPointsUp = global.getDestinyPoints( true, initPoints, global.long, global.m );   
            var destinyPointsDown = global.getDestinyPoints( false, initPoints, global.long, global.m );  
            
            if(destinyPointsUp === false || destinyPointsDown === false) 
                ret = true;
            
            global.drawLine( initPoints.concat( destinyPointsUp ), 'red' );
            global.drawLine( initPoints.concat( destinyPointsDown ), 'black' );
            
            global.init( destinyPointsUp );
            global.init( destinyPointsDown );
            
            global.m = global.mDegradient > 0 ?  global.m / global.mDegradient : global.m;
            global.long = global.lDegradient > 0 ? global.long / global.lDegradient : global.long;
            
        }, 1000);
        
        if(this.m < 0.01){
            clearTimeout(id);
        }
                                
    }
    
    this.getDestinyPoints = function( up, startPoint, long, m ){        
        
        var y = startPoint[1] - long;
        var x = up ? startPoint[0] - m : startPoint[0] + m ;
        
        return [ x , y ];         
    }
    
}


