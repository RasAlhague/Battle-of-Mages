#pragma strict

private var _Agent : NavMeshAgent; 
public var Target : GameObject;

function Start () {

	_Agent = this.GetComponent(NavMeshAgent); 
}

function UdateAgentTargets(targetPosition : Vector3) {

	_Agent.destination = targetPosition;
}

function Update () {
	
	if(Input.GetMouseButtonDown(1)) {
	
		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitInfo : RaycastHit;
		
		if (Physics.Raycast(ray.origin, ray.direction, hitInfo)) {
			var targetPosition : Vector3 = hitInfo.point;
			
			if(Network.peerType != NetworkPeerType.Disconnected) {
			
				networkView.RPC("RPCSetTargetPosition", RPCMode.All, targetPosition);
			}
			else {
			
				RPCSetTargetPosition(targetPosition);
			}
			
		}
	}
}

@RPC
function RPCSetTargetPosition(targetPosition : Vector3) {

	this.GetComponent(NavMeshAgent).destination = targetPosition;
}