#pragma strict
#pragma implicit
#pragma downcast

var GOsArchiv : GameObjectsArchiv;
var SpellButton : KeyCode;

static var CurrentSpellClass : TeleportClass = new TeleportClass();

function Start () {

	GOsArchiv = GameObject.FindObjectOfType(GameObjectsArchiv);
}

function Update () {

	if(Time.time > (CurrentSpellClass.SpellLastUseTime + CurrentSpellClass.SpellCooldown)) {

		if(Global.ActiveSpellButtonPressedAtThisMoment == SpellButton && Global.ActiveSpellButtonPressedAtThisMoment != KeyCode.None) {
			
			//подсветка траектории/radius
			GetComponent(SkillRangeAndTrajectoryScript).InstantiateSkillRange(CurrentSpellClass.SpellRange, this.GetInstanceID());
			
			if(Input.GetKey(KeyCode.Mouse0) && IsInRange()) {
			
				var _Out = Network.Instantiate(GOsArchiv.TelepotPrefab_Out, transform.position, transform.rotation, 0);
				_Out.particleEmitter.Emit();
				
				var f = GetComponent(MovementAndRotation).GetRaycastPoint();
				f.y = 1;
				gameObject.transform.position = f;
				
				var _In = Network.Instantiate(GOsArchiv.TelepotPrefab_In, transform.position, transform.rotation, 0);
				_In.particleEmitter.Emit();
			
				LastUseTime = Time.time;
				
				Global.ActiveSpellButtonPressedAtThisMoment = KeyCode.None;
				GetComponent(SkillRangeAndTrajectoryScript).DestroySkillRange();
			}
		}
	}
	else {
	
		Camera.mainCamera.GetComponent(AudioSource).PlayOneShot(GameObjectsArchiv.AudioClip_CriticalError, 1.0);
	}
}

function IsInRange() {

	dir = GetComponent(MovementAndRotation).GetRaycastPointDir();
	
	res =  Mathf.Sqrt( Mathf.Pow(dir.x, 2) + Mathf.Pow(dir.z, 2) ) ;
	if(  res <= CurrentSpellClass.MaxTeleportDistance ) return true;
	else return false;
}