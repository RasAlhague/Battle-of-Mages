#pragma strict
#pragma implicit
#pragma downcast

var MenuTrigger : boolean = true;
var ShowMainMenu : boolean = true;
var ShowSetting : boolean = false;
var BackgroundTrigger : boolean;

var NetworkGO : GameObject;

var SpaceDistance : float = 15;

var selLocalizationGridInt : int = 0;
var selectedItemIndex : int = 0;
var guiDepth : int = 0;

private var comboBoxLocalizationList : GUIContent[];
private var comboBoxQualityLevelList : GUIContent[];
private var comboBoxControlQL : ComboBox = new ComboBox();
private var comboBoxControlL : ComboBox = new ComboBox();

var listStyle : GUIStyle = new GUIStyle();

function Awake() {

	Global.PlayerName = "Player - " + Random.Range(0, 100);
	Localization.InitLang(0);
	DontDestroyOnLoad(this);
}

function Start() {

	BackgroundTrigger = true;

	comboBoxQualityLevelList = new GUIContent[6];
	comboBoxQualityLevelList[0] = new GUIContent(Localization.Language["Fastest"].ToString());
	comboBoxQualityLevelList[1] = new GUIContent(Localization.Language["Fast"].ToString());
	comboBoxQualityLevelList[2] = new GUIContent(Localization.Language["Simple"].ToString());
	comboBoxQualityLevelList[3] = new GUIContent(Localization.Language["Good"].ToString());
	comboBoxQualityLevelList[4] = new GUIContent(Localization.Language["Beautiful"].ToString());
	comboBoxQualityLevelList[5] = new GUIContent(Localization.Language["Fantastic"].ToString());
	
	comboBoxLocalizationList = new GUIContent[3];
	comboBoxLocalizationList[0] = new GUIContent( "English" );
	comboBoxLocalizationList[1] = new GUIContent( "Русский" );
	comboBoxLocalizationList[2] = new GUIContent( "Українська" );
	
	listStyle.normal.textColor = Color.white; 
	listStyle.hover.background = new Texture2D(2, 2);
	listStyle.padding.bottom = 4;
	
	if(!NetworkGO) {
	
		NetworkGO = GameObject.FindGameObjectWithTag("NetworkGO").gameObject;
	}
}

function Update() {

	if(Input.GetKeyDown(KeyCode.Escape)) {
		
		MenuTrigger = !MenuTrigger;
	}
}
    
function OnGUI () {
	
	GUI.depth = guiDepth ;
	/*
		Main Menu
	*/
	if(MenuTrigger) {
	
		if(ShowMainMenu) {
		
			//separate for ShowMainMenu and ShowSetting
			GUILayout.BeginArea(Rect(Screen.width/2-100, Screen.height/2-100, 200, 500));
		
			GUILayout.BeginVertical();
			
			if(Network.peerType == NetworkPeerType.Disconnected) {
			
				GUILayout.BeginHorizontal();
				GUILayout.Label(Localization.Language["You Player Name: "].ToString());
				Global.PlayerName = GUILayout.TextField(Global.PlayerName);
				GUILayout.EndHorizontal();
			
				if (GUILayout.Button (Localization.Language["Connect as client"].ToString())) {
				
					NetworkGO.GetComponent(NetworkScript).enabled = true;
					NetworkGO.GetComponent(NetworkScript).IMClient();
					
					MenuTrigger = false;
				}
				
				if (GUILayout.Button ( Localization.Language["Start Server"].ToString() ) ) {
				
					NetworkGO.GetComponent(NetworkScript).enabled = true;
					NetworkGO.GetComponent(NetworkScript).IMServer();
					
					MenuTrigger = false;
				}
			}
			
			if(GUILayout.Button ( Localization.Language["Setting"].ToString() ) ) {
			
				ReversShowing();
			}
			
			if(GUILayout.Button(Localization.Language["Exit"].ToString() ))
			{
				Application.Quit();
			}
				
			GUILayout.EndVertical();
			
			GUILayout.EndArea();
		}
		
		/*
				Setting
		*/
		if(ShowSetting) {
		
			GUILayout.BeginArea(Rect(Screen.width/2-200, Screen.height/2-100, 400, 500));
			
			GUILayout.BeginHorizontal();
			
			GUILayout.BeginVertical();
			
				GUILayout.Label( Localization.Language["Language"].ToString() + ": " );
				GUILayout.Label( Localization.Language["Current QualityLevel: "].ToString() );
				//Background
				GUILayout.BeginHorizontal();
					GUILayout.Label(Localization.Language["Run in Background: "].ToString());
				GUILayout.EndHorizontal();
				//MM
				GUILayout.Space(SpaceDistance);
				if(GUILayout.Button( Localization.Language["Main Menu"].ToString() )) {
				
					ReversShowing();
				}
			
			GUILayout.EndVertical();
			GUILayout.BeginVertical();

				//localization
				selLocalizationGridInt = comboBoxControlL.List( GUILayoutUtility.GetRect( 100, 20 ), 
									comboBoxLocalizationList[selLocalizationGridInt].text, comboBoxLocalizationList, listStyle );
									
            	if(Localization.inGameLanguage != selLocalizationGridInt) {
            	
            		Localization.InitLang(selLocalizationGridInt);
            		SetComboBoxQualityLevelList();
            	}
            	
				//QualityLevel
				selectedItemIndex = comboBoxControlQL.List( GUILayoutUtility.GetRect( 100, 20 ), 
									comboBoxQualityLevelList[selectedItemIndex].text, comboBoxQualityLevelList, listStyle, 
									QualitySettings.currentLevel.value__);
				
//				QualitySettings.currentLevel = QualityLevel.Parse(QualityLevel, comboBoxQualityLevelList[selectedItemIndex].text);
				if( QualitySettings.GetQualityLevel() != selectedItemIndex ) {
				
					QualitySettings.SetQualityLevel(selectedItemIndex);
				}
				
				//Background
				Application.runInBackground = GUILayout.Toggle(Application.runInBackground, "" );
			
			GUILayout.EndVertical();
			GUILayout.EndHorizontal();
			
			GUILayout.EndArea();
		}
	}
}

function SetComboBoxQualityLevelList() {

	comboBoxQualityLevelList[0] = new GUIContent(Localization.Language["Fastest"].ToString());
	comboBoxQualityLevelList[1] = new GUIContent(Localization.Language["Fast"].ToString());
	comboBoxQualityLevelList[2] = new GUIContent(Localization.Language["Simple"].ToString());
	comboBoxQualityLevelList[3] = new GUIContent(Localization.Language["Good"].ToString());
	comboBoxQualityLevelList[4] = new GUIContent(Localization.Language["Beautiful"].ToString());
	comboBoxQualityLevelList[5] = new GUIContent(Localization.Language["Fantastic"].ToString());
}

function ReversShowing() {

	ShowSetting = !ShowSetting;
	ShowMainMenu = !ShowMainMenu;
}