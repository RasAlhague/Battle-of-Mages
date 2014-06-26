#pragma strict

function Start () {

//	yield WaitForSeconds(2);
//	transform.rotation = Quaternion.AngleAxis(30, Vector3.up);
}

function Update () {

	transform.RotateAround ( Vector3(GameObject.Find("Logo").transform.position.x,
			 GameObject.Find("Logo").transform.position.y, 
			 GameObject.Find("Logo").transform.position.z), Vector3.up, 20 * Time.deltaTime);
}