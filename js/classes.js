class Fighter {
	constructor(name) {
		this.className = 'Fighter';
		this.name = name;
		this.HP = 20;
		this.speed = 4;
		this.damage = 5;
		this.range = 1;
		this.moveUsed = false;
		this.attackUsed = false;
	}
}

class Wizard {
	constructor(name) {
		this.className = 'Wizard';
		this.name = name;
		this.HP = 15;
		this.speed = 3;
		this.damage = 4;
		this.range = 4;
		this.moveUsed = false;
		this.attackUsed = false;
	}
}

class Rogue {
	constructor(name) {
		this.className = 'Rogue';
		this.name = name;
		this.HP = 12;
		this.speed = 6;
		this.damage = 4;
		this.range = 1;
		this.moveUsed = false;
		this.attackUsed = false;
	}
}