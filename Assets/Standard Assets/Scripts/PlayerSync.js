
var PreLastPosSync : Vector3;
var LastPosSync : Vector3;

var smooth = 5.0;

function Awake() {

//	PreLastPosSync = transform.position;
}

function Update () {

	if(networkView.isMine) {
	
		networkView.RPC("SyncPos", RPCMode.Others, transform.position, transform.rotation);
	}
}

@RPC
function SyncPos(trsPos:Vector3, trsRot:Quaternion) {

	PreLastPosSync = LastPosSync;
	LastPosSync = trsPos;
	
	transform.position = Vector3.Lerp(PreLastPosSync, LastPosSync, Time.deltaTime * smooth);
	transform.rotation = trsRot;
}