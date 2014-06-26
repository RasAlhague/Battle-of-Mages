#pragma strict

var TimeScale : String;

var DebugAreaRect : Rect;
var DebugAreaRectLeft : float;
var DebugAreaRectTop : float;
var DebugAreaRectWidth : float;
var DebugAreaRectHeight : float;


function Awake () {

	DebugAreaRectLeft = Screen.width-200;
	DebugAreaRectTop = 400;
	DebugAreaRectWidth = 200;
	DebugAreaRectHeight = 400;
	
	DebugAreaRect = Rect(DebugAreaRectLeft, DebugAreaRectTop, DebugAreaRectWidth, DebugAreaRectHeight);
}

function Start() {

 	TimeScale = "1.0";
 	print(TimeScale);
}

function OnGUI() {

	GUILayout.BeginArea( Rect(DebugAreaRect) );
	
	GUILayout.BeginHorizontal();
	
	
	TimeScale = ( GUILayout.TextField(TimeScale) ); //System.Convert.ToDouble
	Time.timeScale = float.Parse(TimeScale);
	
	
	GUILayout.EndHorizontal();
	
	GUILayout.EndArea();
}

