#pragma strict

private var _Agent : NavMeshAgent; 
public var Target : GameObject;

function Start () {

	_Agent = this.GetComponent(NavMeshAgent); 
//	FindObjectsOfType(NavMeshAgent) as NavMeshAgent[];
//	Target = GameObject.FindGameObjectWithTag("Player");
}

function UdateAgentTargets(targetPosition : Vector3) {

//	for(var agent : NavMeshAgent in agents) {
//	
//		_Agent.destination = targetPosition;
//	}

	_Agent.destination = targetPosition;
//	_Agent.SetDestination(targetPosition);
}

function Update () {
	
//	UdateAgentTargets( Global.PlayerGO.transform.position );
//	_Agent.SetDestination(Target.transform.position);
	
	if(Input.GetMouseButtonDown(0)) {
	
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
			
			
//			UdateAgentTargets(targetPosition);
		}
	}
	
//	UdateAgentTargets(Target.transform.position);

//	var button : int = 0;
//	if(Input.GetMouseButtonDown(button)) {
//	
//		var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
//		var hitInfo : RaycastHit;
//		if (Physics.Raycast(ray.origin, ray.direction, hitInfo)) {
//		  var targetPosition : Vector3 = hitInfo.point;
//		  UdateAgentTargets(targetPosition);
//				marker.position = targetPosition + Vector3(0,1,0);
//		}
//	}
}

@RPC
function RPCSetTargetPosition(targetPosition : Vector3) {

	this.GetComponent(NavMeshAgent).destination = targetPosition;
}