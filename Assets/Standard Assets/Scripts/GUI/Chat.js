#pragma strict
#pragma implicit
#pragma downcast

var InputString : String;

var scrollPosition : Vector2 = Vector2.zero;
var clickedPosition : Vector2;
var mousePos : Vector2;

var windowRect : Rect;
var GUILayoutAreaRect : Rect;
var windowHandle : Rect;
var originalWindow : Rect;

var ChatArrayStrings = new Array();

var maxLengthChatArrayStrings : int = 100;

var minWindowWidth : float = 100;
var maxWindowWidth : float = 800;
var minWindowHeight : float = 100;
var maxWindowHeight : float = 600;

var handleClicked : boolean;
var CanDragWindow : boolean;

var CurrentEvent : Event;

function Start () {

	CanDragWindow = true;
	GUILayoutAreaRect = Rect(10, 10, windowRect.width-20, windowRect.height-50);
	windowRect = Rect(0, Screen.height-350, 250, 350);
}

function OnGUI () {
	
	windowRect = GUI.Window (1, windowRect, DoChat, Localization.Language["Chat"].ToString() );
	GUILayoutAreaRect = Rect(10, 10, windowRect.width-20, windowRect.height-50);
	
	//
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
	        
	        scrollPosition.y += 200;
	    }
	
	    // Finish resizing window
	    if (Input.GetMouseButtonUp(0)) {
	
	        handleClicked = false;
	        CanDragWindow = true;
	    }
	}
}

function DoChat(windowID : int) {
	
	GUI.SetNextControlName("Chat input field");
	InputString =  GUI.TextField(Rect(10, windowRect.height-30, windowRect.width-20, 20), InputString);
	
	CurrentEvent = Event.current;
	if (CurrentEvent.keyCode == KeyCode.Return ) {//&& userHasHitReturn == false && Time.time > (lastChatEnterReloadTime + ChatEnterReload)) {

		GUI.FocusControl("Chat input field");

		if(InputString.Length != 0) {
		
			networkView.RPC("AddStringToChat", RPCMode.All, Global.PlayerName, InputString);
			InputString = "";
		}
		else {
		
			Debug.Log("stringToEdit.Length = 0");
		}
	}
	

	GUILayout.BeginArea(GUILayoutAreaRect);
	
	scrollPosition = GUILayout.BeginScrollView (scrollPosition);//, GUILayout.Width (100), GUILayout.Height (100));
	
	GUILayout.BeginVertical();
	
	GUILayout.FlexibleSpace();
	for (var value : String in ChatArrayStrings) {
	
		GUILayout.Label(value);
    }
    
    GUILayout.EndVertical();
    
    GUILayout.EndScrollView ();
	
	
	GUILayout.EndArea();
	
	if(CanDragWindow) {
	
		GUI.DragWindow (Rect (0,0,10000,10000));
	}
}

@RPC
function AddStringToChat(plName : String, str : String) {

	ChatArrayStrings.Add(plName + ":\t" + str);
	if(ChatArrayStrings.length > maxLengthChatArrayStrings) {
	
		ChatArrayStrings.RemoveAt(0);
	}
	scrollPosition.y += 200;
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {

	enabled = false;
	ChatArrayStrings.Clear();
}

