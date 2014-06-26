#pragma strict

var RotateAroundTransform : Transform;

function Start () {
	
	if(Global.PlayerGO) {
	
		RotateAroundTransform = Global.PlayerGO.transform;
	}
}

function Update () {

	transform.RotateAround( Vector3(RotateAroundTransform.position.x, RotateAroundTransform.position.y, 
							 RotateAroundTransform.position.z), Vector3.up, 10 * Time.deltaTime );

}