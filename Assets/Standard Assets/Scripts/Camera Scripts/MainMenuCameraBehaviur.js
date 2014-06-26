#pragma strict

var MousePositionX : float;
var MousePositionY : float;
var normalizeMousePosY : float;
var speed = 2;

private var q : Quaternion;

var Target : Transform;

function Start () {

	if(!Target) {
	
		Target = GameObject.Find("Logo").transform;
	}
}

function Update () {

	normalizeMousePosY = Screen.height - Input.mousePosition.y;
	MousePositionX = Input.mousePosition.x;
	MousePositionY = Input.mousePosition.y;

	q = Quaternion(MousePositionX, MousePositionY,(MousePositionX+MousePositionY), 0 );
	Target.rotation = Quaternion.Slerp(Target.rotation, q, Time.deltaTime*speed);
//	Target.Rotate(MousePositionX*Time.deltaTime, MousePositionY*Time.deltaTime, (MousePositionX+MousePositionY)*Time.deltaTime);
}