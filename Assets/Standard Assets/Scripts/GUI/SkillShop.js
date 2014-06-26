private var ShowShop : boolean;
private var ShowKeyBindMenu : boolean;
private var ShowToolTip : boolean;
private var CanDoMyShopWindow: boolean;
private var CanDoKeyBindWindow : boolean;
private var handleClicked : boolean;
private var CanDragWindow : boolean;

private var OpenShopButtonW : int = 90;
private var OpenShopButtonH : int = 25;
private var DivisionResult : int =0;
//var RowsAmount : int = 0;
private var Modulo : int = 0;
private var i : int;
private var j : int;
var MyShopWindowID : int = 3;
var KeyBindWindowID : int = 4;
var SkillArrayslength : int = 2;

private var str1 : String;
private var wtf;

private var PlayerGO : GameObject;
private var CurrentSpell : System.Type;
var CoinTexture : Texture;

private var LastRect : Rect;
private var SkillPanelArea : Rect;
private var windowHandle : Rect;
private var originalWindow : Rect;

private var MousePosition : Vector2;
private var FixedMousePosition : Vector2;
private var clickedPosition : Vector2;

private var TipLabelWidth : int = 200;
private var TipLabelHeight : int = 200;
private var ButtonWidth : int = 50;
private var ButtonHeight : int = 50;
private var MyShopWindowWidth : int = 350;
private var MyShopWindowHeight : int = 350;
private var MyShopWindowRect : Rect;//see Awake()// = Rect (Screen.width/2-MyShopWindowWidth/2, Screen.height/2-MyShopWindowHeight/2, MyShopWindowWidth, MyShopWindowHeight);
private var KeyBindWindowWidth : int = 300;
private var KeyBindWindowHeight : int = 85;
private var KeyBindWindowRect : Rect;//see Awake()// = Rect (Screen.width/2-KeyBindWindowWidth/2, Screen.height/2-KeyBindWindowHeight/2,KeyBindWindowWidth,KeyBindWindowHeight);
private var minWindowWidth : float = 300;
private var maxWindowWidth : float = 1200;
private var minWindowHeight : float = 300;
private var maxWindowHeight : float = 800;

/*			KeyBind			*/

private var HotKeysStr : String[] = ["Q","W","E","R","A","S","D","F"];
//private var HotKeysBool : boolean[];
private var HotKeysBool = new ArrayList();
private var HotKeysKeyCode : KeyCode[] = [KeyCode.Q, KeyCode.W, KeyCode.E, KeyCode.R, KeyCode.A, KeyCode.S, KeyCode.D, KeyCode.F];


/////////// SkillPage1 /////////////

var SkillPage1_Names : ArrayList = new ArrayList();
var SkillPage1_Tips : ArrayList = new ArrayList();
var SkillPage1_Values : ArrayList = new ArrayList();
var SkillPage1_Images : Texture2D[];

/////////////// SkillPage2 /////////////////////

var SkillPage2_Names : ArrayList = new ArrayList();
var SkillPage2_Tips : ArrayList = new ArrayList();
var SkillPage2_Values : ArrayList = new ArrayList();
var SkillPage2_Images : Texture2D[];

////////////////////////////

var MainToolbarSelected : int = -1;
var MainToolbarStrings = new Array();
var SkillsToolbarSelected : int = -1;
var SkillsToolbarStrings = new Array();

var ItemsToolbarSelected : int = -1;
var ItemsToolbarStrings : String[];


function Awake () {

	SkillPanelArea = Rect(10,20,100,20);
//	HotKeysBool = new boolean[HotKeysStr.Length];
	KeyBindWindowRect = Rect (Screen.width/2-KeyBindWindowWidth/2, Screen.height/2-KeyBindWindowHeight/2,KeyBindWindowWidth,KeyBindWindowHeight);
	MyShopWindowRect = Rect (Screen.width/2-MyShopWindowWidth/2, Screen.height/2-MyShopWindowHeight/2, MyShopWindowWidth, MyShopWindowHeight);
}

function Start() {

	MainToolbarStrings = new String[2];
	MainToolbarStrings[0] = (Localization.Language["Skills"]);
	MainToolbarStrings[1] = (Localization.Language["Items"]);
	 
	SkillsToolbarStrings  = new String[3];
	SkillsToolbarStrings[0] = (Localization.Language["Skills Page"] + " 1");
	SkillsToolbarStrings[1] = (Localization.Language["Skills Page"] + " 2");
	SkillsToolbarStrings[2] = (Localization.Language["Skills Page"] + " 3");
	
		/////////// SkillPage1 /////////////
	
	SkillPage1_Names.Add(Localization.Language["FireBall"]);
	SkillPage1_Tips.Add(Localization.Language["Fire Ball \n Standart skill"]);
	SkillPage1_Values.Add(FireBallScript);
	
	/////////////// SkillPage2 /////////////////////
	
	SkillPage2_Names.Add(Localization.Language["Teleport"]);
	SkillPage2_Tips.Add(Localization.Language["Teleport \n Moves you through time and space"]);
	SkillPage2_Values.Add(TeleportScript);

	SkillPage2_Names.Add(Localization.Language["Protective Wall"]);
	SkillPage2_Tips.Add(Localization.Language["Protective Wall"]);
	SkillPage2_Values.Add(ProtectiveWallScript);
}

function OnGUI () {
	
//	print(SkillPage1_Values[0].CurrentSpellClass.SpellCurrentLevel);
	//Open Shop ?
	if (Network.peerType != NetworkPeerType.Disconnected) {
		if(GUI.Button(Rect(Screen.width-OpenShopButtonW, Screen.height-OpenShopButtonH, OpenShopButtonW, OpenShopButtonH), 
						Localization.Language["Shop"].ToString() )) {
			
			CanDoMyShopWindow = !CanDoMyShopWindow;
		}
	}
	
	if(CanDoMyShopWindow) {
	
		MyShopWindowRect = GUI.Window (MyShopWindowID, MyShopWindowRect, DoMyShopWindow, Localization.Language["Shop"].ToString());
	}
	
	if(CanDoKeyBindWindow) {
	
		KeyBindWindowRect = GUI.Window (KeyBindWindowID, KeyBindWindowRect, DoKeyBindWindow, Localization.Language["Chose Hot Key Button"].ToString());
	}
	
	/*
			RESIZE WINDOW BLOCK
	*/
	
	MousePosition = Input.mousePosition;
	MousePosition.y = Screen.height - MousePosition.y;    // Convert to GUI coords
	windowHandle = Rect(MyShopWindowRect.x+MyShopWindowRect.width-25, MyShopWindowRect.y+MyShopWindowRect.height-25, 25, 25);
	
	// If clicked on window resize widget
	if (Input.GetMouseButtonDown(0) && windowHandle.Contains(MousePosition)) {
	
	    handleClicked = true;
	    CanDragWindow = false;
	    clickedPosition = MousePosition;
	    originalWindow = MyShopWindowRect;
	}
	
	if (handleClicked) {
	
	    // Resize window by dragging
	    if (Input.GetMouseButton(0)) {
	
	        MyShopWindowRect.width = Mathf.Clamp(originalWindow.width + (MousePosition.x - clickedPosition.x), minWindowWidth, maxWindowWidth);
	        MyShopWindowRect.height = Mathf.Clamp(originalWindow.height + (MousePosition.y - clickedPosition.y), minWindowHeight, maxWindowHeight);
	    }
	
	    // Finish resizing window
	    if (Input.GetMouseButtonUp(0)) {
	
	        handleClicked = false;
	        CanDragWindow = true;
	    }
	}

}

function DoMyShopWindow (windowID : int) {

	GUILayout.BeginArea(Rect (10,20,MyShopWindowRect.width-20, MyShopWindowRect.height-40));
    
    GUILayout.BeginHorizontal();
	    GUILayout.Label(CoinTexture, GUILayout.MaxWidth(40));
	    GUILayout.Label(Global.MoneyCount.ToString());
    GUILayout.EndHorizontal();

    GUILayout.BeginHorizontal(); //main toolbar 
	    MainToolbarSelected = GUILayout.Toolbar (MainToolbarSelected, MainToolbarStrings.ToBuiltin(String));
    GUILayout.EndHorizontal();
    
    SwitchMainToolbarSelected(MainToolbarSelected);
        
    GUILayout.EndArea();
    
	if(CanDragWindow) {
	
		GUI.DragWindow (Rect (0,0,10000,10000));
	}
}

function DoKeyBindWindow (windowID : int) {

	var e : Event = Event.current;
	
	GUI.FocusWindow(windowID);
	GUI.BringWindowToFront(windowID);
	
	GUILayout.BeginArea(Rect (10,20,KeyBindWindowRect.width-20, KeyBindWindowRect.height-30));
    GUILayout.BeginVertical();
    
    GUILayout.BeginHorizontal(); 
	    for(i=0; i< HotKeysStr.length/2; i++) {
	    
	    	if(HotKeysBool.Contains(HotKeysKeyCode[i])) GUI.enabled = false;
	    	else GUI.enabled = true;
	    	
	    	if( GUILayout.Button(HotKeysStr[i]) ) {
	    	
	    		SetSpellButton(HotKeysKeyCode[i]);
	    		HotKeysBool.Add(HotKeysKeyCode[i]);
	    	}
	    	if( (e.type == EventType.KeyUp &&  e.isKey) && 
	    		(e.keyCode == KeyCode.Q || e.keyCode == KeyCode.W || e.keyCode == KeyCode.E || e.keyCode == KeyCode.R || 
	    		e.keyCode == KeyCode.A || e.keyCode == KeyCode.S || e.keyCode == KeyCode.D || e.keyCode == KeyCode.F) ) {
	    
				SetSpellButton(e.keyCode);
				HotKeysBool.Add(e.keyCode);
			}
	    }
    GUILayout.EndHorizontal();
    
    GUILayout.BeginHorizontal(); 
	    for(i=HotKeysStr.length/2; i< HotKeysStr.length; i++) {
	    
	    	if(HotKeysBool.Contains(HotKeysKeyCode[i])) GUI.enabled = false;
	    	else GUI.enabled = true;
	    	
	    	if( GUILayout.Button(HotKeysStr[i]) ) {
	    	
	    		SetSpellButton(HotKeysKeyCode[i]);
	    		HotKeysBool.Add(HotKeysKeyCode[i]);
	    	}
	    	if( (e.type == EventType.KeyUp &&  e.isKey) && 
	    		(e.keyCode == KeyCode.Q || e.keyCode == KeyCode.W || e.keyCode == KeyCode.E || e.keyCode == KeyCode.R || 
	    		e.keyCode == KeyCode.A || e.keyCode == KeyCode.S || e.keyCode == KeyCode.D || e.keyCode == KeyCode.F) ) {
	    
				SetSpellButton(e.keyCode);
				HotKeysBool.Add(e.keyCode);
			}
	    }
    GUILayout.EndHorizontal();
    
    GUILayout.EndVertical();
    GUILayout.EndArea();
}

function FillButtons (arr:ArrayList, tips:ArrayList, values:ArrayList, images:Texture2D[]) {
    
    GUILayout.Space(30);
    
    //узнаю сколько кнопок вместиться в строку при текущей ширене окна
    var AmountItemsInRow : int = (MyShopWindowRect.width - 20 - 3) / (ButtonHeight + 3);
    
    DivisionResult = values.Count / AmountItemsInRow;
    Modulo =  values.Count % AmountItemsInRow;
    var RowsAmount : int = 0;
    var ModuloB : boolean;
    if(Modulo == 0) {
    
    	RowsAmount = DivisionResult;
    }
    else if (Modulo > 0) {
    
    	RowsAmount = DivisionResult + 1;
    	ModuloB = true;
    }
    
    var count : int = 0;
    for (i = 0; i < RowsAmount; i++) {
    
    	GUILayout.BeginHorizontal();
    
    	if(i == RowsAmount-1) {
    	
    		AmountItemsInRow = Modulo;
    	}
    	
    	for(j = 0; j < AmountItemsInRow; j++) {
	        
	        if( Global.PlayerGO.GetComponent(values[count]) ) {
	        
	        	 if( Global.PlayerGO.GetComponent(values[count]).CurrentSpellClass.IsMaxSpellLevel )	GUI.enabled = false;
	        	 else GUI.enabled = true;
			}
			else GUI.enabled = true;
	        
	        PlayerGO = GameObject.Find(Global.PlayerName);
	        if( GUILayout.Button( GUIContent(images[count], values[count].CurrentSpellClass.SpellInformation), GUILayout.Width(ButtonWidth), GUILayout.Height(ButtonHeight)) ) {
	        
        		if( PlayerGO.GetComponent(values[count]) ) {
	        		
	        		if( PlayerGO.GetComponent(values[count]).CurrentSpellClass.SpellCost <= Global.MoneyCount ) {
	        		
	        			PlayerGO.GetComponent(values[count]).CurrentSpellClass.SpellLevelUp();
	        			Global.MoneyCount -= PlayerGO.GetComponent(values[count]).CurrentSpellClass.SpellCost;
	        		}
	        		else {
	        		
	        			print("Need money");
	        		}
	        	}
	        	else {
	        		
	        		if( values[count].CurrentSpellClass.SpellCost <= Global.MoneyCount ) {
	        		
	        			if(PlayerGO.AddComponent(values[count])) {
		        		
		        			CanDoKeyBindWindow = true;
		        		}
	        			Global.MoneyCount -= values[count].CurrentSpellClass.SpellCost;
	        		}
	        		else {
	        		
	        			print("Need money");
	        		}
	        	}
	        				
	        	CurrentSpell = values[count];
	        }
	        
	        count++;
	        GUI.Label(Rect (FixedMousePosition.x-MyShopWindowRect.left,FixedMousePosition.y-MyShopWindowRect.top,TipLabelWidth,TipLabelHeight),GUI.tooltip);
			
			if(i == (RowsAmount-1) && ModuloB) {
			
				AmountItemsInRow = Modulo;
				ModuloB = false;
			}
		}
		
		GUILayout.EndHorizontal();
    }
}

function SwitchMainToolbarSelected (id:int) {

	switch (id) {
    
    	case 0:
    		GUILayout.BeginHorizontal();
    		
    		SkillsToolbarSelected = GUILayout.Toolbar(SkillsToolbarSelected, SkillsToolbarStrings.ToBuiltin(String));
    		
    		GUILayout.EndHorizontal();
    		
    		SwitchSkillsToolbarSelected (SkillsToolbarSelected);
    		
    		break;
    		
    	case 1:
    		GUILayout.BeginHorizontal();
    		
    		ItemsToolbarSelected = GUILayout.Toolbar (ItemsToolbarSelected, ItemsToolbarStrings);
    		
    		GUILayout.EndHorizontal();
    		
    		SwitchSkillsToolbarSelected (SkillsToolbarSelected);
    		
    		break;
    }
}

function SwitchSkillsToolbarSelected (id:int) {

	switch (id) {
    
    	case 0:
    		FillButtons (SkillPage1_Names, SkillPage1_Tips, SkillPage1_Values, SkillPage1_Images);
    		break;
    	case 1:
    		FillButtons (SkillPage2_Names, SkillPage2_Tips, SkillPage2_Values, SkillPage2_Images);
    		break;
    	case 2:
    		
    		break;
    }
}

function SwitchItemsToolbarSelected (id:int) {

	switch (id) {
	
		case 0:
			
			break;
		case 1:
    		
    		break;
    	case 2:
    		
    		break;
	}
}

function SetSpellButton(KC:KeyCode) {

	PlayerGO.GetComponent(CurrentSpell).SpellButton = KC;
	Global.SpellButtonsBinded.Add(KC);
	
	CanDoKeyBindWindow = false;
}

function Update () {

	FixedMousePosition = Input.mousePosition;
	FixedMousePosition.y = Screen.height - FixedMousePosition.y;
	
	if(MainToolbarStrings[0] != Localization.Language["Skills"]) {
	
		Start();
	}
}