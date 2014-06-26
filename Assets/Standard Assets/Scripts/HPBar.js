var CurHealth : float;
var MaxHealth : float = 100;
var HealthBarLengch : float;

function OnGUI () {
	if(networkView.isMine) {
		CurHealth = gameObject.GetComponent("HP").CurHealth;
	
		GUI.Box(new Rect (Screen.width/2-HealthBarLengch/2 , 0, HealthBarLengch, 20),
		 CurHealth + "/" + MaxHealth);
		 
		HealthBarLengch = (Screen.width / 2) * (CurHealth / MaxHealth);	
	}
}
