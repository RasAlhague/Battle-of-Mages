//прилеплен на FireBall

var destroy_time : float;
var OnExplosion : boolean;
var OnDetonator : boolean;
private var b : boolean;
var CanExplos : boolean;

var CameraShake : CameraShakeScript;
var GOsArchiv : GameObjectsArchiv;

function Awake () {

	Init ();
}

function Start () {

	CameraShake = Camera.mainCamera.GetComponent(CameraShakeScript);
	GOsArchiv = GameObject.FindObjectOfType(GameObjectsArchiv);
}

function Init () {

	CanExplos = true;
	yield WaitForSeconds(destroy_time);
	if(CanExplos) {
	
		if(OnExplosion) ExplosExplosion();
		if(OnDetonator) ExplosDetonator();
	}
}

function OnCollisionEnter(collision : Collision) {

	if(OnExplosion) ExplosExplosion();
	if(OnDetonator) ExplosDetonator();
}

function ExplosExplosion() { //для explosion
	
		CameraShake.SetInitTime ();
		CanExplos = false;
		
		var explosion_clone : GameObject; 
		explosion_clone = Instantiate(GOsArchiv.ExplosionGO, this.gameObject.transform.position, this.gameObject.transform.rotation);
		explosion_clone.particleEmitter.Emit();
		DestroyRigRenCol ();
		Destroy(explosion_clone, explosion_clone.particleEmitter.maxEnergy);
		yield WaitForSeconds(1);
		Destroy(this.gameObject);
}

function ExplosDetonator() { //для Detonator

		CameraShake.SetInitTime ();
		CanExplos = false;
		
		var detonator_clone : GameObject; 
		detonator_clone = Instantiate(GOsArchiv.DetonatorGO, this.gameObject.transform.position, this.gameObject.transform.rotation);
		
		DestroyRigRenCol ();
		yield WaitForSeconds(1);
		Destroy(this.gameObject);	
}

function DestroyRigRenCol () {

	Destroy(gameObject.rigidbody);
	Destroy(gameObject.renderer);
	Destroy(gameObject.collider);
}