function Awake() {

	DontDestroyOnLoad(this);
}

class Global {

	static var PlayerName : String;
	static var PlayerGO : GameObject;
	static var PlayerTeam : String;
	static var LastButtonPressed : KeyCode;
	static var SpellButtonsBinded = new Array();
	static var ActiveSpellButtonPressedAtThisMoment : KeyCode;
	static var SkillRangeAndTrajectoryActiveFrom : String;
	static var MoneyCount : int = 100;
	
}