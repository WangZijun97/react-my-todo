/*
Contains everything in an Item
*/

export class Item {
	constructor(name, addeddate, targetdate) {
		this.name = name
		this.addeddate = addeddate
		this.targetdate = targetdate
	}
	
	toString() {
		return this.name + "|" + this.addeddate + "|" + this.targetdate
	}
}

export default Item