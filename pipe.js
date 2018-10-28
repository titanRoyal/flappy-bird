class pipe {
	constructor() {
		this.spacing = 100;
		this.speed = 4
		this.colo = [ 255, 255, 255 ];
		this.x = width;
		this.up = {
			pos: createVector( this.x, 0 ),
			tall: random( height - this.spacing )
		}
		this.down = {
			pos: createVector( this.x, width ),
			tall: height - ( this.up.tall + this.spacing )
		};
	}
	show() {
		fill( this.colo );
		rect( this.x, this.up.pos.y, 20, this.up.tall )
		rect( this.x, this.down.pos.y, 20, -this.down.tall )
	}
	update() {
		this.x -= this.speed;
	}
}
