#pragma strict
#pragma implicit
#pragma downcast


var lastShotTime : float = 0;

var BulletAddForcePoint : Vector3;

var SpellButton : KeyCode;

var CurrentSelfDirectedBoltClass = SelfDirectedBoltClass();

var GOsArchiv : GameObjectsArchiv;

function Awake() {

	
}

function Start () {

	GOsArchiv = GameObject.FindObjectOfType(GameObjectsArchiv);
}

function Update () {

	if(Time.time > (lastShotTime + CurrentSelfDirectedBoltClass.CurrentTimeToReUse) ) {

		if(Global.ActiveSpellButtonPressedAtThisMoment == SpellButton && Global.ActiveSpellButtonPressedAtThisMoment != KeyCode.None) {
				        
	        Network.Instantiate(GOsArchiv.SelfDirectedBoltGO, transform.FindChild("BulletSpawnPoint").transform.position, transform.rotation, 0);
		
			lastShotTime = Time.time;
			
			Global.ActiveSpellButtonPressedAtThisMoment = KeyCode.None;
		}
	}
	else {
	
	}
}

function LevelUp() {

	CurrentSelfDirectedBoltClass.LvlUp();
}
