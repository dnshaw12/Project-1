class Player {
	constructor(name, playerType) {
		this.name = name;

		if(playerType === 'fighter') {
			this.HP = 20;
			this.speed = 4;
			this.damage = 5;
			this.range = 1;
			this.icon = 'images/fighter-icon.png'
		}
		if(playerType === 'wizard'){
			this.HP = 15;
			this.speed = 3;
			this.damage = 4;
			this.range = 4;
			this.icon = 'images/wiz-icon.png'
		}
		if(playerType === 'rogue'){
			this.HP = 12;
			this.speed = 6;
			this.damage = 4;
			this.range = 1;
			this.icon = 'images/rogue-icon.png'
		}

		this.moveUsed = false;
		this.attackUsed = false;
	}
}