//let nn, child;

let popi
let score;
let score0 = 0
let best;
let best_score = 0;

function setup() {
	//	frameRate( 1 );
	stroke( 255 );
	createCanvas( 600, 600 );
	popi = new popilation( 100 );
	select( "canvas" )
		.position( ( windowWidth - width ) / 2, ( windowHeight - height ) / 2 );
	score = select( "#score" );
	best = select( "#best_score" );
}

function draw() {
	background( 51 );
	popi.update();
	popi.think();
}

function keyPressed() {
	for ( h of popi.birds ) {
		h.up()
	}
	//	popi.think();
}

function copyarr( c ) {
	let r = []
	for ( var i = 0; i < c.length; i++ ) {
		r[ i ] = c[ i ];
	}
	return r;
}

function minimize( x ) {
	let h = 0
	for ( var i = 0; i < x.length; i++ ) {
		h += x[ i ].fitness;
	}
	//console.log("///////////////"+h);
	for ( var i = 0; i < x.length; i++ ) {
		x[ i ].fitness /= h;
	}
}
