class popilation {
	constructor( x = 10 ) {
		this.num = x;
		this.end = false;
		this.pipes = [];
		this.birds = [];
		this.matingpool = [];
		this.savebirds = []
		for ( var i = 0; i < this.num; i++ ) {
			this.birds.push( new bird() );
		}
		this.pipes.push( new pipe() )
	}
	update() {
		for ( var i = 0; i < this.birds.length; i++ ) {
			for ( var j = 0; j < this.pipes.length; j++ ) {
				line( this.birds[ i ].pos.x, this.birds[ i ].pos.y, this.pipes[ j ].x, this.pipes[ j ].up.tall )
				line( this.birds[ i ].pos.x, this.birds[ i ].pos.y, this.pipes[ j ].x, this.pipes[ j ].up.tall + this.pipes[ j ].spacing )
			}
		}

		if ( frameCount % 40 == 0 ) {
			this.pipes.push( new pipe() )
		}
		for ( var i = 0; i < this.pipes.length; i++ ) {
			this.pipes[ i ].show();
			this.pipes[ i ].update();
			if ( this.pipes[ i ].x < -20 ) {
				this.pipes.splice( i, 1 );
			}
			for ( var j = this.birds.length - 1; j >= 0; j-- ) {
				if ( this.birds[ j ].pos.x == this.pipes[ 0 ].x && ( this.birds[ j ].pos.y < this.pipes[ 0 ].up.tall || this.birds[ j ].pos.y > ( height - this.pipes[ 0 ].down.tall ) ) ) {
					this.pipes[ 0 ].colo = [ 255, 0, 0 ];
					this.savebirds.push( this.birds.splice( j, 1 )[ 0 ] );
				}
			}
		}
		for ( var i = 0; i < this.birds.length; i++ ) {
			this.birds[ i ].show();
			this.birds[ i ].update();
		}
		score.html( score0 )
		best.html( best_score );
		if ( this.birds.length === 0 ) {
			this.newgen();
			if ( best_score < score0 ) {
				best_score = score0;
			}
		} else {
			score0 = this.birds[ 0 ].score;
		}
	}
	evaluat( x ) {
		let hh = 0

		for ( var i = 0; i < x.length; i++ ) {
			hh += x[ i ].score;
		}
		for ( var i = 0; i < x.length; i++ ) {
			x[ i ].fitness = x[ i ].score / hh;
		}
		let h = x[ 0 ].fitness;
		for ( var i = 1; i < x.length; i++ ) {
			if ( h < x[ i ].fitness ) {
				h = x[ i ].fitness;
			}
		}
		for ( var i = 0; i < x.length; i++ ) {
			x[ i ].fitness /= h;
		}
		minimize( x );
		this.matingpool = [];
		for ( var i = 0; i < x.length; i++ ) {
			for ( var j = 0; j < x[ i ].fitness * 100; j++ ) {
				this.matingpool.push( x[ i ] );
			}
		}
	}
	selection( x ) {
		for ( var i = 0; i < x.length; i++ ) {
			let g = [];
			let partA = random( this.matingpool )
				.brain.weight;
			let partB = random( this.matingpool )
				.brain.weight;
			for ( var j = 0; j < partA.length; j++ ) {
				g[ j ] = matrix.crossover( partA[ j ], partB[ j ] );
			}
			// TODO:overcharge the neural constructor with the weight argument only
			this.birds.push( new bird( g ) );

		}
	}
	think() {
		for ( var i = 0; i < this.birds.length; i++ ) {

			let input = [ this.birds[ i ].pos.y, this.birds[ i ].pos.x, this.pipes[ 0 ].x, this.pipes[ 0 ].up.tall + this.pipes[ 0 ].spacing, this.pipes[ 0 ].up.tall ]
			let g = this.birds[ i ].brain.feedforward( input )
			if ( g < 0.5 ) {
				this.birds[ i ].up();
			}
		}

	}
	newgen() {
		this.evaluat( this.savebirds )
		this.selection( this.savebirds );
		this.pipes.splice( 0, this.pipes.length - 1 )
		this.savebirds = [];
	}

}
