#pragma strict
#pragma implicit
#pragma downcast

var CurrentObject : GameObject;
var SkillRange : GameObject;
var SkillRangeClone : GameObject;
var SkillArrow : GameObject;
var SkillArrowClone : GameObject;

var Caller;

function Start() {

}

function InstantiateSkillRange(radius : Vector3, c) {
	
	if(Caller != c) {
	
		if(SkillRangeClone) {
	
			DestroySkillRange();
		}
		
		SkillRangeClone = Instantiate(SkillRange, transform.position, transform.rotation);
		SkillRangeClone.transform.parent = transform;
		SkillRangeClone.transform.localScale = radius;
		SkillRangeClone.transform.localScale = Vector3( SkillRangeClone.transform.localScale.x / transform.localScale.x, 
														SkillRangeClone.transform.localScale.y / transform.localScale.y, 
														SkillRangeClone.transform.localScale.z / transform.localScale.z ) ;
		
		Caller = c;
	}
}

function DestroySkillRange() {

	Destroy(SkillRangeClone);
	Caller = "";
}

function InstantiateSkillArrow(leght : Vector3) {

	var rotaty = transform.rotation.y + SkillArrow.transform.rotation.y;
	SkillArrowClone = Instantiate(SkillArrow, transform.position + SkillArrow.transform.position, transform.rotation * Quaternion(0,SkillArrow.transform.rotation.y,0,0) );
	SkillArrowClone.transform.localScale.z = leght.z;
	SkillArrowClone.transform.parent = transform;
}

function DestroySkillArrow() {

	Destroy(SkillArrowClone);
}


