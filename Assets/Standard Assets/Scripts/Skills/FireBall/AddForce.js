var BulletImpulse : float;
var BulletAddForcePoint : Vector3;

function Awake () {	
	
	if(networkView.isMine) {
	
		networkView.RPC("RPCFAddForce", RPCMode.All, BulletAddForcePoint, BulletImpulse);
	}
}

@RPC
function RPCFAddForce (BulletAddForcePoint : Vector3, BulletImpulse : float) {

	gameObject.rigidbody.AddForce(BulletAddForcePoint*BulletImpulse, ForceMode.Impulse);
}