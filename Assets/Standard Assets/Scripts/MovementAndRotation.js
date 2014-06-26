var plane : Plane;

var backlight : GameObject;

var ray : Ray;

var dir : Vector3;
var rot : Vector3;
var StartMovPosition : Vector3;
var targetRot;
var CurrentRaycastPoint : Vector3;
var CurrentRaycastDirection;

var dist : float;
var rotSpeed : float;
var turnSpeed : float = 350;
var maxMovSpeed : float = 10;
var speed = 0.1;
var smooth = 5.0;

var CanMove : boolean;

function Awake() {

	CurrentRaycastPoint = transform.position;
}

function Start () {

}

function Update () {

	if (Input.GetMouseButtonDown(1)  && networkView.isMine) { 
    	
    	CurrentRaycastPoint = GetRaycastPoint();
    	CurrentRaycastDirection = CurrentRaycastPoint - transform.position;
    	transform.LookAt(CurrentRaycastPoint);
    	IlluminationAtClickPoint(CurrentRaycastPoint);
    	CanMove = true;
    	
    	StartMovPosition = transform.position;
//    	networkView.RPC("RPCF_SetPos", RPCMode.Others, CurrentRaycastPoint); 
	}
	
	Mov();
	
	if(networkView.isMine) {
	
		if(CanMove) {
		
			RotateTowards(CurrentRaycastDirection);
		}
		else {
		
			RotateTowards(GetRaycastPointDir());
//			networkView.RPC("SetRotate", RPCMode.Others, GetRaycastPointDir()); 
		}
	}
}

function Mov() {
	
	if (Vector3.Distance(transform.position, CurrentRaycastPoint ) > 1f && CanMove) {
		
		transform.eulerAngles = new Vector3(rot.x, transform.eulerAngles.y, rot.z);
		transform.Translate(Vector3.forward * Time.deltaTime * maxMovSpeed);
//		transform.position = Vector3.Lerp(transform.position, CurrentRaycastPoint,  Time.deltaTime * smooth);
		animation.Blend("Walk");
	}
	else {
	
		CanMove = false;
		animation.PlayQueued("Idle");
	}
	
}

function GetRaycastPointDir() {

	plane=Plane(Vector3.up ,transform.position);
	
    ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
    if(plane.Raycast (ray,dist)){
    
    	dir = ray.GetPoint(dist) - transform.position;
//    	print(dir);
		Debug.DrawLine (transform.position, ray.GetPoint(dist), Color.blue);
		return dir;
    }
}

function GetRaycastPoint() {

	plane=Plane(Vector3.up ,transform.position);
		
    ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
    if(plane.Raycast (ray,dist)){
    
		return ray.GetPoint(dist);
    }
}

function RotateTowards(to) {

	if(to != Vector3.zero) {
	
		targetRot = Quaternion.LookRotation(to);
		rotSpeed = turnSpeed * Time.deltaTime;
    	transform.rotation = Quaternion.RotateTowards( transform.rotation, targetRot, rotSpeed );
	}
	
}

function F1 () {

	plane=Plane(Vector3.up ,transform.position);
		
    ray = Camera.main.ScreenPointToRay (Input.mousePosition); 
    if(plane.Raycast (ray,dist))
    {
    	dir = ray.GetPoint(dist)-transform.position;
		Debug.DrawLine (transform.position,dir+transform.position, Color.red);
		
		targetRot = Quaternion.LookRotation(dir);
		rotSpeed = turnSpeed * Time.deltaTime;
		
	    transform.rotation = Quaternion.RotateTowards( transform.rotation, targetRot, rotSpeed );
//		transform.rotation = Quaternion.Slerp (transform.rotation, targetRot, Time.time * speed);
    }
}

function IlluminationAtClickPoint(point:Vector3) {

	var backlight_clone : GameObject ;
	backlight_clone = Instantiate(backlight, point, transform.rotation);
	Destroy(backlight_clone, 1);
}

@RPC
function RPCF_SetPos(pos : Vector3) {

	CurrentRaycastPoint = pos;
	transform.LookAt(CurrentRaycastPoint);
	CanMove = true;
}

@RPC
function SetRotate(rotate : Vector3) {

	RotateTowards(rotate);
}