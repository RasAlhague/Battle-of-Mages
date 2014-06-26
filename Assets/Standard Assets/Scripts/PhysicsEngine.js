
var CurrentDirect : Vector3;
var Attraction : Vector3;

var Acceleration : float = 0;
var AccelerationStep : float = 0.5;
var maxAcceleration : float = 5;

var defaultSlowdown : float = 3;
var Slowdown : float = defaultSlowdown;
var SlowdownStep : float = 1;
var maxSlowdown : float = 0;

var can : boolean;

var DeltaTime = Time.deltaTime;

function Update () {

//	transform.Translate(0, 0, Time.deltaTime);
	if(can) {
	
		transform.Translate(Attraction * Time.deltaTime * F_Slowdown (), Space.Self);
	}
	else {
	
		if(Slowdown != defaultSlowdown) {
		
			Slowdown = defaultSlowdown;
		}
	}
}

function OnCollisionEnter (collision : Collision) {

	for (var contact : ContactPoint in collision.contacts)
        Debug.DrawRay(contact.point, contact.normal, Color.white);
        
//    var v : Vector3;
//    v = collision.gameObject.rigidbody.position - rigidbody.position;
//    Attraction = v;
    
    can = true;
}

function F_Acceleration () {

	if(Acceleration < maxAcceleration) {
	
		Acceleration += AccelerationStep*Time.deltaTime;
	}
	else {
	
		Acceleration = 0;
	}
	return Acceleration;
}

function F_Slowdown () {

	if(Slowdown > maxSlowdown) {
	
		Slowdown -= SlowdownStep * Time.deltaTime;
	}
	else {
	
		can =false;
	
		if(Slowdown < maxSlowdown) {
		
			Slowdown += SlowdownStep * Time.deltaTime;
		}
		else {
		
			Slowdown = 0;
		}
	}
	return Slowdown;
}