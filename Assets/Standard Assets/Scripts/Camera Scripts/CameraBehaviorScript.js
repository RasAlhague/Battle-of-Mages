#pragma strict
#pragma implicit
#pragma downcast


var FinalPositionX : float;
var FinalPositionZ : float;
private var posFix : float = 3;
var DefaultCameraHeight : float = 50;
var maxCameraHeight : float = 70;
var PlayerToMouseDevDistans : float = 20;

var CameraMoveSpeed : float = 10;
var CameraMouseRushSpeed : float = 5;

var MaxCameraMouseRushDist : float = 400;

private var MousePositionX : float;
private var MousePositionY : float;
private var normalizeMousePosY : float;

var AlfaZX : float;
var AlfaX : float;
var BasisLenghtZ : float;
var BasisLenghtX : float;

var traPosX : int;
var traPosZ : int;

var RotateAroundTransform : Transform;


function Awake() {

//	MaxCameraMouseRushDist = 100;
}

function Start() {

	if(Global.PlayerGO) {
	
		RotateAroundTransform = Global.PlayerGO.transform;
	}
}

function Update () {

	if(!RotateAroundTransform) {
	
		Start();
	}
	
	if(Input.GetKeyUp(KeyCode.RightArrow)) {
	
		transform.parent.transform.RotateAround( Vector3(RotateAroundTransform.position.x, RotateAroundTransform.position.y, 
							 RotateAroundTransform.position.z), Vector3.up, 90 );
	}
//	print(transform.localPosition +"   \t"+ transform.position + "\n" + transform.localRotation + "   \t"+ transform.rotation );

	if(transform.position.y != DefaultCameraHeight) {
	
		if(transform.position.y < DefaultCameraHeight) {
		
			transform.position.y = transform.position.y + CameraMoveSpeed*Time.deltaTime;
		}
		if(transform.position.y > DefaultCameraHeight) {
		
			transform.position.y = transform.position.y - CameraMoveSpeed*Time.deltaTime;
		}
	}
	if(transform.position.y == maxCameraHeight) {
	
		transform.position.y = maxCameraHeight;
	}
	
	//вычисление расстояния от плеера до середины обзора камеры при разных углах её наклона
	AlfaZX = transform.eulerAngles.x;
	AlfaX = 90 - (90 - transform.eulerAngles.y);
	BasisLenghtZ = transform.position.y / Mathf.Tan( AlfaZX * Mathf.Deg2Rad );
	BasisLenghtX = BasisLenghtZ * Mathf.Tan(AlfaX * Mathf.Deg2Rad);
//	print( BasisLenghtZ + "    " + BasisLenghtX + "    " + (Mathf.Tan( AlfaZX * Mathf.Deg2Rad )) + "    " + System.Convert.ToUInt32(AlfaZX) );
	if(BasisLenghtZ < 0)BasisLenghtZ = BasisLenghtZ*(-1);
	if(BasisLenghtX < 0)BasisLenghtX = BasisLenghtX*(-1);
	
	normalizeMousePosY = Screen.height - Input.mousePosition.y;
	MousePositionX = Input.mousePosition.x;
	MousePositionY = Input.mousePosition.y;

	if(MousePositionX - Screen.width/2 > MaxCameraMouseRushDist) {
	
		MousePositionX = MaxCameraMouseRushDist + Screen.width/2;
	}	
	else if(MousePositionX - Screen.width/2 < MaxCameraMouseRushDist*(-1)) {
	
		MousePositionX = MaxCameraMouseRushDist*(-1) + Screen.width/2;
	}
	if(MousePositionY - Screen.height/2 > MaxCameraMouseRushDist) {
	
		MousePositionY = MaxCameraMouseRushDist + Screen.height/2;
	}	
	else if(MousePositionY - Screen.height/2 < MaxCameraMouseRushDist*(-1)) {
	
		MousePositionY = MaxCameraMouseRushDist*(-1) + Screen.height/2;
	}
	
//	FinalPositionX = Mathf.Clamp( ( Global.PlayerGO.transform.position.x) + ( MousePositionX - Screen.width/2 ) / PlayerToMouseDevDistans ,
//								MaxCameraMouseRushDist*(-1), MaxCameraMouseRushDist  ) ;
	
	
	if(Global.PlayerGO) {	//для совместимости с включением сцены без меню
	
		FinalPositionX = ( Global.PlayerGO.transform.position.x ) + ( MousePositionX - Screen.width/2 ) / PlayerToMouseDevDistans ;
		
		if(transform.parent.transform.rotation.eulerAngles.y == 0) {
		
			FinalPositionZ = ( Global.PlayerGO.transform.position.z - BasisLenghtZ ) + ( MousePositionY - Screen.height/2 ) / PlayerToMouseDevDistans ;
			transform.localPosition = Vector3.Slerp( transform.localPosition, Vector3( FinalPositionX, DefaultCameraHeight, FinalPositionZ ),
										 Time.deltaTime*CameraMouseRushSpeed );
		}

		if(transform.parent.transform.rotation.eulerAngles.y >= 180) {
		
			var q = transform.position.y / Mathf.Tan( 30 * Mathf.Deg2Rad );
			FinalPositionZ = ( Global.PlayerGO.transform.position.z + ( q-BasisLenghtZ ) ) + ( MousePositionY - Screen.height/2 ) / PlayerToMouseDevDistans ;			
			transform.localPosition = Vector3.Slerp( transform.localPosition, Vector3( FinalPositionX, DefaultCameraHeight, FinalPositionZ ),
										 Time.deltaTime*CameraMouseRushSpeed );
		}
		
//		transform.localPosition = Vector3.Slerp( transform.localPosition, Vector3( FinalPositionX, DefaultCameraHeight, FinalPositionZ ),
//										 Time.deltaTime*CameraMouseRushSpeed );
	}
	
}