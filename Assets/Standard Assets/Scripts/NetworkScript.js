#pragma strict
#pragma implicit
#pragma downcast

var loadOp : AsyncOperation;

var connectToIP : String = "127.0.0.1";
private var str : String;
private var strTeam : String;

private var mousePos : Vector2;
private var clickedPosition : Vector2;

var Server : boolean;
var Client : boolean;
var handleClicked : boolean;
var CanDragWindow : boolean;
var ShowStatsWindow : boolean;
var ShowCanStartGameButton : boolean;
var ShowInfoText : boolean = true;

private var counter : int = 0; 
var connectPort : int = 1230;
private var PingToServer : int;
var selectionGridTeamIndex : int = -1;
private var _PreSelectionGridTeamIndex : int = -1;
var PingRefreshRate : float = 2;
private var LastRefreshPing : float;
var minWindowWidth : float = 350;
var maxWindowWidth : float = 800;
var minWindowHeight : float = 200;
var maxWindowHeight : float = 800;

var windowRect : Rect = Rect(150, 150, 600, 300);
private var windowHandle : Rect;
private var originalWindow : Rect;
private var GUILayoutAreaRect : Rect;
private var GUILayoutAreaRectInfoText : Rect;
private var ClientAreaRect : Rect;

var Teams : String[];// = [ "Team 1", "Team 2" ];
var ConnectedPlayersIPToTeam = new Hashtable();
var ServerInfo = new Hashtable();
var ConnectedPlayers = new Array();
var ConnectedPlayersIPToPName = new Hashtable();
var ConnectedPlayersIPToPing = new Hashtable();

var PlayersIsInConnectedReadyToPlay = new Array();

private var CurrentEvent : Event;


function Awake() {

	CanDragWindow = true;
	GUILayoutAreaRect = Rect(10, 20, windowRect.width-20, windowRect.height-50);
	GUILayoutAreaRectInfoText = Rect(0, 0, 200,Screen.height);
	ClientAreaRect = Rect(0, 0, 200,Screen.height);
	strTeam = "";
}

function Start() {

	Teams = [ "Team 1", "Team 2", "No Team" ];
	selectionGridTeamIndex = -1;
	_PreSelectionGridTeamIndex = selectionGridTeamIndex;
}

function Update() {

}

function OnGUI() {
	
	GUILayout.BeginArea(GUILayoutAreaRectInfoText);
	
	if(ShowInfoText && ( Server || Client )) {
	
		if(GUILayout.Button("^",  GUILayout.Height(10))) {
		
			ShowInfoText = !ShowInfoText;
		}
	}
	else if( Server || Client ){
	
		if(GUILayout.Button("v",  GUILayout.Height(10))) {
		
			ShowInfoText = !ShowInfoText;
		}
	}
	
	/*
			SERVER
	*/
	
	if(Server && ShowInfoText) {
	
		GUILayout.Label(Localization.Language["Connection status: Server!"].ToString());
		
		GUILayout.BeginHorizontal();
			GUILayout.Label(Localization.Language["Server IP: "].ToString());
			GUILayout.TextField(ServerInfo["IP"]);
		GUILayout.EndHorizontal();
		
		GUILayout.Label(Localization.Language["Connections: "].ToString()+Network.connections.length);
		
		PingToServer = Network.GetAveragePing(Network.player);
		
		ViewStatsWindow();
		
		if(ShowCanStartGameButton) {
		
			if(GUILayout.Button(Localization.Language["Start Game"].ToString())) {
			
				networkView.RPC("StartGame", RPCMode.All);
			}
		}
		
		//TEAM
		
	}
	GUILayout.EndArea();
	
	/*
			CLIENT
	*/
	if(Client && ShowInfoText) {
	
		GUILayout.BeginArea(ClientAreaRect);
	
		if (Network.peerType == NetworkPeerType.Connecting){
		
			GUILayout.Label(Localization.Language["Connection status: Connecting"].ToString());
			
		} else if (Network.peerType == NetworkPeerType.Client){
			
			PingToServer = Network.GetAveragePing(  Network.connections[0] );
			
			if(LastRefreshPing + PingRefreshRate < Time.time) {
			
				networkView.RPC("RefreshPing", RPCMode.All, Network.player, PingToServer.ToString() );
				LastRefreshPing = Time.time;
			}
			
			GUILayout.Label(Localization.Language["Connection status: Client!"].ToString());
			GUILayout.Label(Localization.Language["Ping to server: "].ToString() + PingToServer );
			GUILayout.Label(Localization.Language["You Player Name: "].ToString() + Global.PlayerName);
			
			ViewStatsWindow();
			
			//Inst Chat
			if(GetComponent(Chat).enabled == false) {
			
				GetComponent(Chat).enabled = true;
			}
		}
		else {
		
			GUILayout.BeginHorizontal();
			
				GUILayout.Label( Localization.Language["Server IP: "].ToString() );
				connectToIP = GUILayout.TextField(connectToIP);
				
			GUILayout.EndHorizontal();
//			connectPort = parseInt(GUILayout.TextField(connectPort.ToString()));
//			Global.PlayerName = GUILayout.TextField(Global.PlayerName);
			
			if(GUILayout.Button(Localization.Language["Connect"].ToString())) {
		
				Network.Connect(connectToIP, connectPort);
				ClientAreaRect = Rect(0, 10, 200, Screen.height);
			}
			if(GUILayout.Button(Localization.Language["Main Menu"].ToString())) {
		
				Application.LoadLevel("MainMenu");
			}
		}
		GUILayout.EndArea();
	}
	
	
	
	/*
			RESIZE WINDOW BLOCK
	*/
	
	mousePos = Input.mousePosition;
	mousePos.y = Screen.height - mousePos.y;    // Convert to GUI coords
	windowHandle = Rect(windowRect.x+windowRect.width-25, windowRect.y+windowRect.height-25, 25, 25);
	
	// If clicked on window resize widget
	if (Input.GetMouseButtonDown(0) && windowHandle.Contains(mousePos)) {
	
	    handleClicked = true;
	    CanDragWindow = false;
	    clickedPosition = mousePos;
	    originalWindow = windowRect;
	}
	
	if (handleClicked) {
	
	    // Resize window by dragging
	    if (Input.GetMouseButton(0)) {
	
	        windowRect.width = Mathf.Clamp(originalWindow.width + (mousePos.x - clickedPosition.x), minWindowWidth, maxWindowWidth);
	        windowRect.height = Mathf.Clamp(originalWindow.height + (mousePos.y - clickedPosition.y), minWindowHeight, maxWindowHeight);
	    }
	
	    // Finish resizing window
	    if (Input.GetMouseButtonUp(0)) {
	
	        handleClicked = false;
	        CanDragWindow = true;
	    }
	}
	
}

/*Only Client functions call and exec on Server
вызывается при ивенте OnConnectedToServer()
отвечает за добавления статистики и осылки ее клиентам*/
@RPC
function SendClientNetworkPlayer(nwPlayer : NetworkPlayer, name : String) {

	try {
	
		if (Network.peerType == NetworkPeerType.Server){
			
			if( !ConnectedPlayersIPToPName.ContainsKey(nwPlayer.ipAddress) ) {
			
				ConnectedPlayers.Add(nwPlayer.ipAddress);
				ConnectedPlayersIPToPName.Add(nwPlayer.ipAddress, name);
				
				networkView.RPC("SendServerInfo", nwPlayer, ServerInfo["Name"], ServerInfo["IP"], ServerInfo["Team"]);
			
				for(count=0; count< ConnectedPlayers.length-1; count++) { //а новому - отсылаю всех, кто в коннекте, исключая 
																			//последнего (-1), тоесть подключившегося
						networkView.RPC("SendPlayersIsInConnected", nwPlayer, ConnectedPlayers[count], ConnectedPlayersIPToPName[ConnectedPlayers[count]]);
						networkView.RPC("UpdateConnectedPlayersIPToTeam", nwPlayer, ConnectedPlayers[count], ConnectedPlayersIPToTeam[ConnectedPlayers[count]]);
				}
				
				networkView.RPC("SendPlayersIsInConnected", RPCMode.All, nwPlayer.ipAddress, name); //добавляю нового тем, кто уже в коннекте, включая нового
			}
			else {
			
				networkView.RPC("ForceSelfDisconnect", nwPlayer, "lol");
//				Network.CloseConnection(nwPlayer, true);
			}
			
		}
	} catch (e) {
	
		Exception(e.ToString());
	}
}

//Server func call, exe on all Clients
@RPC
function SendPlayersIsInConnected(ip : String, name : String) {

	if (Network.peerType == NetworkPeerType.Client){
		
		ConnectedPlayersIPToPName.Add(ip, name);
		ConnectedPlayers.Add(ip);
	}
}

@RPC
function SendServerInfo(name : String, ip : String, team: String) {

	if(name != "" && !ServerInfo.ContainsKey("Name"))	ServerInfo.Add("Name", name);
	if(ip != "" && !ServerInfo.ContainsKey("IP"))	ServerInfo.Add("IP", ip);
	if(ip != "" && !ServerInfo.ContainsKey("Team") )	ServerInfo.Add("Team", team);
	if(ServerInfo.ContainsKey("Team"))	ServerInfo["Team"] = team;
	print("IN function SendServerInfo ServerInfo = " + ServerInfo["Team"]);
	
	ShowStatsWindow = true;
}

@RPC
function RefreshPing(nwPlayer : NetworkPlayer, ping : String) {

	if(ConnectedPlayersIPToPing.ContainsKey(nwPlayer.ipAddress)) {
	
		ConnectedPlayersIPToPing[nwPlayer.ipAddress] =  ping;
	}
	else {
	
		ConnectedPlayersIPToPing.Add(nwPlayer.ipAddress, ping);
	}
}

//Server func call, exe on all Clients
@RPC
function StartGame() {

	ShowStatsWindow = false;
	ShowCanStartGameButton = false;
	ShowInfoText = false;
	DontDestroyOnLoad (this);
		
	GetComponent(Chat).windowRect = Rect(0, Screen.height-200, 200, 200);
	
	Application.LoadLevel("BoMMainScenne");
	
	if(Application.isLoadingLevel) {
	
		if(Network.peerType == NetworkPeerType.Client) {
		
			Global.PlayerTeam = ConnectedPlayersIPToTeam[Network.player.ipAddress];
			NullTimeScale();
			networkView.RPC("IMReady", RPCMode.Server, Network.player);
		}
		else if(Network.peerType == NetworkPeerType.Server) {
		
			Global.PlayerTeam = ServerInfo["Team"];
			SetTimeScale();
		}
	}
}

@RPC
function IMReady(nwPlayer : NetworkPlayer) {

	PlayersIsInConnectedReadyToPlay.Add(nwPlayer);
	if(PlayersIsInConnectedReadyToPlay.length == ConnectedPlayers.length) {
	
		networkView.RPC("SetTimeScale", RPCMode.All);
	}
}

@RPC
function NullTimeScale() {

	Time.timeScale = 0;
}

@RPC
function SetTimeScale() {

	Time.timeScale = 1;
}

function IMClient() {

	Client = true;
	ClientAreaRect = Rect(Screen.width/2-100, Screen.height/2-100,200,Screen.height);
}

function IMServer() {

	ShowStatsWindow = true;
	ShowCanStartGameButton = true;
	
//	var useNat = !Network.HavePublicAddress();
    Network.InitializeServer(32, connectPort);
	
	if(Network.peerType == NetworkPeerType.Server) {
	
		ServerInfo.Add("Name", Global.PlayerName);
		ServerInfo.Add("IP", Network.player.ipAddress);
		ServerInfo.Add( "Team", "No Team" );
		
		Server = true;
	}
	
	//Inst Chat
	if(GetComponent(Chat).enabled == false) {
			
		GetComponent(Chat).enabled = true;
	}
}

/* GUI STATISTIC WINDOW */	
function ViewStatsWindow() {

	if(Input.GetKey(KeyCode.RightShift) || ShowStatsWindow == true) {
		
		windowRect = GUI.Window (0, windowRect, ViewStats, "Stats");
	}
}

function ViewStats(windowID : int) {

	GUILayout.BeginArea(GUILayoutAreaRect);
	GUILayout.BeginVertical();
	
	
	GUILayout.Box(Localization.Language["Server"].ToString());
	GUILayout.BeginHorizontal();
		
		//Server Name
		GUILayout.Label(ServerInfo["Name"].ToString());
		GUILayout.FlexibleSpace();
		//Server IP
		GUILayout.Label(ServerInfo["IP"].ToString());
		GUILayout.FlexibleSpace();
		//Ping
		GUILayout.Label(Network.GetAveragePing(Network.player).ToString());
		//Team
		GUILayout.FlexibleSpace();
		if(Network.peerType == NetworkPeerType.Server) {
		
			selectionGridTeamIndex = GUILayout.SelectionGrid(selectionGridTeamIndex, Teams, Teams.length);
			if( _PreSelectionGridTeamIndex != selectionGridTeamIndex ) {
				
				_PreSelectionGridTeamIndex = selectionGridTeamIndex;
				print("RPC('SendServerInfo'," + Teams[selectionGridTeamIndex]);
				networkView.RPC("SendServerInfo", RPCMode.All, "", "", Teams[selectionGridTeamIndex] );
			}
		}
		else {
		
			GUILayout.Label( ServerInfo["Team"].ToString() );
		}
		
	GUILayout.EndHorizontal();
	GUILayout.Box(Localization.Language["Clients"].ToString());
	
	for(count=0; count< ConnectedPlayers.length; count++) {
	
		GUILayout.BeginHorizontal();
			
			//Name
			GUILayout.Label(ConnectedPlayersIPToPName[ConnectedPlayers[count]].ToString());
			GUILayout.FlexibleSpace();
			//IP
			GUILayout.Label(ConnectedPlayers[count].ToString());
			GUILayout.FlexibleSpace();
			//Ping to server
			if(ConnectedPlayersIPToPing.ContainsKey(ConnectedPlayers[count])) {
			
				GUILayout.Label( ConnectedPlayersIPToPing[ ConnectedPlayers[count] ].ToString() );
			}
			//Team
			GUILayout.FlexibleSpace();
			if(Network.player.ipAddress == ConnectedPlayers[count]) {
			
				selectionGridTeamIndex = GUILayout.SelectionGrid(selectionGridTeamIndex, Teams, Teams.length);
				if( _PreSelectionGridTeamIndex != selectionGridTeamIndex ) {
				
					_PreSelectionGridTeamIndex = selectionGridTeamIndex;
					networkView.RPC("UpdateConnectedPlayersIPToTeam", RPCMode.All, Network.player.ipAddress, Teams[selectionGridTeamIndex]);
				}
			}else {
				
				GUILayout.Label( ConnectedPlayersIPToTeam[ ConnectedPlayers[count] ].ToString() );
			}
		
		GUILayout.EndHorizontal();
	}
	
	GUILayout.EndVertical();
	GUILayout.EndArea();
	
	if(CanDragWindow) {
	
		GUI.DragWindow (Rect (0, 0, 10000, 10000));
	}
}

function OnConnectedToServer() {
	
	Debug.Log("This CLIENT has connected to a server");	
	
	networkView.RPC("SendClientNetworkPlayer", RPCMode.Server, Network.player, Global.PlayerName);
	networkView.RPC("UpdateConnectedPlayersIPToTeam", RPCMode.All, Network.player.ipAddress, "None" );
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {

	Debug.Log("This SERVER OR CLIENT has disconnected from a server");
	
	Clear();
	Client = false;
	Application.LoadLevel("MainMenu");
}

function OnFailedToConnect(error: NetworkConnectionError){
	Debug.Log("Could not connect to server: "+ error);
}


//Only Server functions call
function OnServerInitialized() {

	Debug.Log("Server initialized and ready");
}

function OnPlayerConnected(player: NetworkPlayer) {

	Debug.Log("Player connected from: " + player.ipAddress +":" + player.port);
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	
	networkView.RPC("RemoveDisconnectedPlayer", RPCMode.All, player.ipAddress);

	Debug.Log("Player disconnected from: " + player.ipAddress+":" + player.port);
}

@RPC
function ForceSelfDisconnect(reason : String) {

	Network.Disconnect();
}

@RPC
function RemoveDisconnectedPlayer(ip : String) {

	ConnectedPlayersIPToPName.Remove(ip);
	Debug.Log("RemoveDisconnectedPlayer: " + ip);
	
	for(var i=0; i<ConnectedPlayers.length; i++) {
	
		if(ConnectedPlayers[i] == ip) {
		
			ConnectedPlayers.RemoveAt(i);
			i = ConnectedPlayers.length;
		}
	}
}

function Clear() {

	ServerInfo.Clear();
	ConnectedPlayers.Clear();
	ConnectedPlayersIPToPName.Clear();
	ConnectedPlayersIPToPing.Clear();
	PlayersIsInConnectedReadyToPlay.Clear();
}

@RPC
function UpdateConnectedPlayersIPToTeam(playerIP: String, _team : String) {

	if( ConnectedPlayersIPToTeam.ContainsKey(playerIP) ) {
	
		ConnectedPlayersIPToTeam[playerIP] = _team;
	}	
	else {
	
		ConnectedPlayersIPToTeam.Add( playerIP, _team );
	}
}

function Exception(exc : String) {

	Debug.LogError(exc);
}