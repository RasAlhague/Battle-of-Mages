#pragma strict

private var RotateStep : Quaternion;
var UpdateDelay : int = 2;
private var NextUpdateIn : int;
var speed : float = 1;


function Start () {

	RotateStep = Quaternion( Random.RandomRange(1, 4), Random.RandomRange(1, 4), Random.RandomRange(1, 4), Random.RandomRange(1, 4) );
	NextUpdateIn = Time.time + UpdateDelay;
}

function Update () {

	transform.rotation = Quaternion.Slerp( transform.rotation, RotateStep, Time.deltaTime * speed );
	if(NextUpdateIn <= Time.time) {
	
		Start();
	}
}