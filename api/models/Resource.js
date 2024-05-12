class Resource {
	constructor(id, position, role, ttl, potions, terminated, turned) {
		this.id = id;
		this.position = position;
		this.role = role;
		this.ttl = ttl;
		this.potions = potions;
		this.terminated = terminated;
		this.turned = turned;
	}
}
  
export default Resource;