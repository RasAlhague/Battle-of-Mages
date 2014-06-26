var Damage : float = 5;

function OnCollisionEnter(collision : Collision) {

	if( collision.gameObject.GetComponent(HP).Team != Global.PlayerTeam ) {
	
		collision.gameObject.GetComponent("HP").CurHealth -= Damage;
	}
}