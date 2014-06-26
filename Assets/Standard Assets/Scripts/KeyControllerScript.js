var i : int;

function Awake() {

	Global.SpellButtonsBinded.Add(KeyCode.None);
}

function Update () {

	for(i=0; i<Global.SpellButtonsBinded.length; i++) {
	
		if(Input.GetKey(Global.SpellButtonsBinded[i]) ) {
		
			Global.ActiveSpellButtonPressedAtThisMoment = Global.SpellButtonsBinded[i];
		}
	}
}