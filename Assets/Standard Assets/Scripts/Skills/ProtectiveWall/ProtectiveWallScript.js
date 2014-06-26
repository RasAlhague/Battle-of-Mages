#pragma strict
#pragma implicit
#pragma downcast

var GOsArchiv : GameObjectsArchiv;
var SpellButton : KeyCode;

static var CurrentSpellClass : ProtectiveWallClass = new ProtectiveWallClass();

function Start () {

	GOsArchiv = GameObject.FindObjectOfType(GameObjectsArchiv);
}

function Update () {

	if(Time.time > (CurrentSpellClass.SpellLastUseTime + CurrentSpellClass.SpellCooldown)) {

		if(Global.ActiveSpellButtonPressedAtThisMoment == SpellButton && Global.ActiveSpellButtonPressedAtThisMoment != KeyCode.None) {
			
			GetComponent(SkillRangeAndTrajectoryScript).InstantiateSkillRange(CurrentSpellClass.SpellRange, this.GetInstanceID());
			
			if(Input.GetKey(KeyCode.Mouse0)) {
			
		        animation.Play("SetFandsForward");
		        
		        transform.LookAt(GetComponent(MovementAndRotation).GetRaycastPoint());
		        
		        var bull_cloneq = GOsArchiv.ProtectiveWallGO;
		        bull_cloneq.GetComponent(HP).MaxHealth = CurrentSpellClass.WallHP;
				Network.Instantiate(bull_cloneq, transform.FindChild("BulletSpawnPoint").transform.position, transform.rotation, 0);
			
				CurrentSpellClass.SpellLastUseTime = Time.time;
				Global.ActiveSpellButtonPressedAtThisMoment = KeyCode.None;
				GetComponent(SkillRangeAndTrajectoryScript).DestroySkillRange();
			}
		}
	}
	else {
	
//		print("tro");
		Camera.mainCamera.GetComponent(AudioSource).PlayOneShot(GameObjectsArchiv.AudioClip_CriticalError, 1.0);
	}
}