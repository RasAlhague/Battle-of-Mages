#pragma strict
#pragma implicit
#pragma downcast

var Cube : Transform;
var WallOfCubes : Transform;
var CubeCount : int = 5;
var WallOfCubeCount : int = 1;
var CubeDelay : float = 0;

var GOsArchiv : GameObjectsArchiv;

function Start () {

	GOsArchiv = GameObject.FindObjectOfType(GameObjectsArchiv);
	
	if(Network.peerType != NetworkPeerType.Disconnected) {
	
		Spawnplayer();
	}
}

function OnGUI() {

	if(Network.peerType == NetworkPeerType.Server) {
	
		if(GUI.Button(Rect(0, Screen.height/2-20, 150, 20), "I NEED MORE CUBES")) {
			SpawnCube(CubeCount);
		}
		if(GUI.Button(Rect(0, Screen.height/2, 150, 20), "I NEED Wall of Cubes")) {
			SpawnWallOfCubes(WallOfCubeCount);
		}
		CubeCount = parseInt(GUI.TextField(Rect(150, Screen.height/2-20, 30, 20), CubeCount.ToString()));
		WallOfCubeCount = parseInt(GUI.TextField(Rect(150, Screen.height/2, 30, 20), WallOfCubeCount.ToString()));
		
		CubeDelay = parseFloat(GUI.TextField(Rect(180, Screen.height/2-20, 30, 20), CubeDelay.ToString()));
	}
}

function Spawnplayer(){	

	if( Global.PlayerTeam == "Team 1" ) {
	
		transform.position = Vector3( Random.Range(100, 58), 2.5, Random.Range(2, 98) );
	}
	else if( Global.PlayerTeam == "Team 2" ) {
	
		transform.position = Vector3( Random.Range(37, 2), 2.5, Random.Range(2, 98) );
	}
	
	var myNewGO : GameObject = Network.Instantiate(GOsArchiv.PlayerPrefab, transform.position, Quaternion(270, 180,0,0), 0);
	myNewGO.name = Global.PlayerName;
	Global.PlayerGO = myNewGO;
}

function SpawnWallOfCubes(WallOfCubeCount : int ) {

	var i : int = 0;
	while(i < WallOfCubeCount && Network.peerType != NetworkPeerType.Disconnected)
	{
		transform.position = Vector3(Random.Range(10, 90), 3, Random.Range(10, 90));
		var CubeTrans : Transform = Network.Instantiate( WallOfCubes, transform.position, transform.rotation, 0);
		yield WaitForSeconds(CubeDelay);
		i++;
	}
}

function SpawnCube(CubeCount : int ) {
	var i : int = 0;
	while(i < CubeCount && Network.peerType != NetworkPeerType.Disconnected)
	{
		transform.position = Vector3(Random.Range(10, 90), 3, Random.Range(10, 90));
		var CubeTrans : Transform = Network.Instantiate(Cube, transform.position, transform.rotation, 0);
		yield WaitForSeconds(CubeDelay);
		i++;
	}
}

function SetTeamTag() {

	if(Network.peerType == NetworkPeerType.Server) {
	
		Global.PlayerGO.tag = GameObject.FindGameObjectWithTag("NetworkGO").GetComponent(NetworkScript).
									ServerInfo["Team"];
									
		print(GameObject.FindGameObjectWithTag("NetworkGO").GetComponent(NetworkScript).ServerInfo["Team"]);
	}
	else {
	
		Global.PlayerGO.tag = GameObject.FindGameObjectWithTag("NetworkGO").GetComponent(NetworkScript).
									ConnectedPlayersIPToTeam[Network.player.ipAddress];
									
		print(GameObject.FindGameObjectWithTag("NetworkGO").GetComponent(NetworkScript).ConnectedPlayersIPToTeam[Network.player.ipAddress]);
	}

}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Clean up after player " + player);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {
	Debug.Log("Clean up a bit after server quit");
	Network.RemoveRPCs(Network.player);
	Network.DestroyPlayerObjects(Network.player);
	
	Application.LoadLevel(0);
}