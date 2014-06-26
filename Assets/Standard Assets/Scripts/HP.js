var CurHealth : float = 100;
var MaxHealth : float = 100;

var Team : String;

function Start() {
	
	if(gameObject.tag == "Player") {
	
		Team = Global.PlayerTeam;
	}
	else if(gameObject.tag == "Barriers Team") {
	
		Team = "Barriers Team";
	}
	else {
	
		Team = "No Team";
	}
}

function Update () {
	if (CurHealth < 0) CurHealth=0;
	if (CurHealth > MaxHealth) CurHealth = MaxHealth ;
	
	if(CurHealth <= 0) {
		Destroy(this.gameObject);
	}
}
