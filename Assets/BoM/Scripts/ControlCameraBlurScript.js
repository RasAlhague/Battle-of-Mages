#pragma strict

var BlurActive : boolean = false;

var BlurActivityTime : float = 5;
var BlurDeactivationIn : float;
var BlurSpreadDownSpeed : float = 5;

private var _BlurEffectScriptBlurSpread : float;
private var _BlurEffectScriptIterations : int;

var BlurEffectScript : BlurEffect;

function Awake() {

	BlurDeactivationIn=0.0;
}

function Start () {

	if( networkView.isMine ) {
	
		BlurEffectScript = Camera.main.GetComponent(BlurEffect);
	}
}

function OnCollisionEnter(collision : Collision) {

	if( networkView.isMine && collision.gameObject.tag == "Bluring Skill" ) {
	
		print( "if( networkView.isMine && collision.gameObject.tag == 'Bluring Skill' ) {" );
		
		SetBlurDeactivationyTime();
		BlurEffectScript.blurSpread = 4;
		BlurEffectScript.iterations = 4;
		BlurActive = true;
	}
}

function Update() {

	if( networkView.isMine ) {
	
		if( BlurDeactivationIn > Time.time ) {
		
			BlurEffectScript.enabled = true;
			
			_BlurEffectScriptBlurSpread = BlurEffectScript.blurSpread - Time.deltaTime*BlurSpreadDownSpeed;
			_BlurEffectScriptIterations = BlurEffectScript.iterations - Time.deltaTime;
			if( _BlurEffectScriptBlurSpread >= 0 ) {
			
				BlurEffectScript.blurSpread = _BlurEffectScriptBlurSpread;
			}
			else {
			
				BlurEffectScript.enabled = false;
	//			BlurDeactivationIn = Time.time;
			}
			
			if( _BlurEffectScriptIterations >= 1 ) {
			
				BlurEffectScript.iterations = _BlurEffectScriptIterations;
			}
		}
		else {
		
			BlurEffectScript.enabled = false;
		}
	}
}

function  SetBlurDeactivationyTime() {

	BlurDeactivationIn = Time.time + BlurActivityTime;
}