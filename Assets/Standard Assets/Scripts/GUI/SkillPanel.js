var iconq : Texture2D;
var iconw : Texture2D;
var icone : Texture2D;
var iconr : Texture2D;

var ShowSkillPanel:boolean;

var SkillPanelAreaRect : Rect;
var GUILayoutWidthForButton : float = 50;
var GUILayoutHeightForButton : float = 50;

var SkillPanelScale : float = 1;



function Awake () {

	ReadOptions();
	SkillPanelAreaRect = Rect(Screen.width/3, Screen.height-GUILayoutHeightForButton-5, Screen.width-(Screen.width/3)*2, GUILayoutHeightForButton+5);
}

function Start() {

}

function OnGUI () {

	GUILayout.BeginArea(SkillPanelAreaRect);
	
	GUILayout.BeginHorizontal(GUILayout.Height(GUILayoutHeightForButton));
	
	GUILayout.BeginVertical(GUILayout.Width(10));
	GUILayout.FlexibleSpace();
	if(GUILayout.Button( "^", GUILayout.Width(10), GUILayout.Height(10))) {
	
		if(ShowSkillPanel) {
		
			ShowSkillPanel = false;
		}
		else {
		
			ShowSkillPanel = true;
		}
	}
	GUILayout.EndVertical();
	
	if(ShowSkillPanel) {
	
		if(GUILayout.Button( iconq, GUILayout.Width(GUILayoutWidthForButton), GUILayout.Height(GUILayoutHeightForButton))) Event.KeyboardEvent("Q");
		GUILayout.Button( iconw, GUILayout.Width(GUILayoutWidthForButton), GUILayout.Height(GUILayoutHeightForButton));
		GUILayout.Button( icone, GUILayout.Width(GUILayoutWidthForButton), GUILayout.Height(GUILayoutHeightForButton));
		GUILayout.Button( iconr, GUILayout.Width(GUILayoutWidthForButton), GUILayout.Height(GUILayoutHeightForButton));
	}
	
	GUILayout.EndHorizontal();
	
	GUILayout.EndArea();
	
}

function ReadOptions() {

	GUILayoutWidthForButton = GUILayoutWidthForButton * SkillPanelScale;
	GUILayoutHeightForButton = GUILayoutHeightForButton * SkillPanelScale;
}