exports.getUsers = function(req, res){
	var list = {
		users : [
			{ name: "Player1", score: "100"},
			{ name: "Player2",   score: "90"},
			{ name: "Player3",  score: "80"}
		]
	};
	res.send(list);
};