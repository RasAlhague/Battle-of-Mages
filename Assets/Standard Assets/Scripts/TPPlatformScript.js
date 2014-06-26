#pragma strict

var Partner : GameObject;

var AudioClips : AudioClip[];
var AudioClipTeleport : AudioClip;

var ReUseDelay : int = 1;
var LastUse : int;

function Start () {

	LastUse = Time.time;
}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	
	if(LastUse + ReUseDelay <= Time.time) {
	
		collision.transform.position = Vector3( Partner.transform.position.x, Partner.transform.position.y+1, Partner.transform.position.z );
		audio.PlayOneShot(AudioClipTeleport);
		LastUse = Time.time;
		Partner.GetComponent(TPPlatformScript).LastUse = Time.time;
	}
}