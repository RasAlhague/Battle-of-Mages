var ShakingTime : float = 0.5;
private var ShakingEndTime : float;
var ShakeRadius : float = 0.5;

function Update () {
	
	if(ShakingEndTime >  Time.time) {	
		
		Shake();
	}
}

function SetInitTime () {

	ShakingEndTime = Time.time + ShakingTime;
}

function Shake () {

	transform.position = transform.position + Random.insideUnitSphere * (ShakeRadius);
}