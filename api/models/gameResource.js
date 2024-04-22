// gameResource.js

let gameResources = [];

const setGameResources = (resources) => {
	gameResources = resources;
};

const getGameResources = () => {
	return gameResources;
};

export { setGameResources, getGameResources };
