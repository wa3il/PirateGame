class Resource {
	constructor(id, position, role, ttl,taken, potions, terminated, turned,) {
		this.id = id;
		this.position = position;
		this.role = role;
		//in case of fiole
		this.ttl = ttl;
		this.taken = taken;
		//in case of pirate or villager
		this.potions = potions;
		this.terminated = terminated;
		this.turned = turned;
	}
}
  
export default Resource;