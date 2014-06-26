//#pragma strict

class SpellClass {

	var IsMaxSpellLevel : boolean;
	
	var SpellCost : int;
	var SpellName : String;
	var SpellCurrentLevel : int = 0;
	var SpellMaxLevel : int;
	var SpellCooldown : float;
	var SpellDamage : float;
	var SpellLastUseTime : float;
	var SpellRange : Vector3;
	var SpellInformation : String;
	var SpellDescription : String;
	
	final var  RadiusFixConstant = 4.7;
	final var  ArrowFixConstant = 9.1;
	
	function SpellLevelUp(  ) {
	
		SpellCurrentLevel++;
		BuildSpellInformation();
		
		if( SpellCurrentLevel == SpellMaxLevel) {
		
			IsMaxSpellLevel = true;
			return "SpellMaxLevel";
		}
	}
	
	function BuildSpellInformation() {
	
		SpellInformation = "";

		if(SpellCurrentLevel == 1) SpellInformation += Localization.Language["Spell Initial Price"] + ":\t" + SpellCost;
		AddEnter();
		if(SpellCurrentLevel != 1) SpellInformation += Localization.Language["Spell Next Level Price"] + ":\t" + SpellCost;
		AddEnter();
		if(SpellName && SpellName!="") SpellInformation += SpellName;
		AddEnter();
		if(SpellDescription && SpellDescription!="") SpellInformation += SpellDescription;
		AddEnter();
		if(SpellDamage && SpellDamage!=-1) SpellInformation += Localization.Language["Spell Damage"] + ":\t" + SpellDamage;
		AddEnter();
		if(SpellCooldown && SpellCooldown!=-1) SpellInformation += Localization.Language["Spell Cooldown"] + ":\t" + SpellCooldown;				
	}
	function AddEnter() {
	
		if(SpellCurrentLevel == "" || SpellCurrentLevel == null) {
		
		}
		else SpellInformation += "\n";
	}
}

///////////	FireBAll	///////

class FireBallClass extends SpellClass {
	
	var BulletMass : float = 1.0;
	var BulletLifeTime : float = 0.7;
	var BulletImpulsePower : float = 15;
		
	function FireBallClass(  ) {
	
		SpellName = Localization.Language["Fire Ball"];
		SpellDescription = Localization.Language["FireBall description"];
		SpellMaxLevel = 5;
		SpellCooldown = 5;
		SpellDamage = 1;
		SpellCost = 1;
		SpellInitialPrice = 1;
		SpellCooldown = 3;
		SpellNextLevelPrice = SpellInitialPrice;
		
		SpellLevelUp();
	}
	
	function SpellLevelUp() {
		
		BulletMass += BulletMass * 0.2 ;
		BulletLifeTime += BulletLifeTime * 0.2 ;
		BulletImpulsePower += BulletImpulsePower * 0.2;
		SpellDamage += SpellDamage * 0.2;
		SpellCooldown -= 0.3;
		SpellRange = Vector3( (BulletLifeTime * (BulletImpulsePower/BulletMass)) / (RadiusFixConstant),
							 1, 
							 (BulletLifeTime * (BulletImpulsePower/BulletMass)) / (RadiusFixConstant) );
		
		SpellCost++;
		
		if( super.SpellLevelUp() == "SpellMaxLevel" ) return "SpellMaxLevel";
	}
}

/*----------------------------------------
			Teleport
------------------------------------------*/

public class TeleportClass extends SpellClass {

	var MaxTeleportDistance : float = 6;
	
	function TeleportClass(  ) {
	
		SpellName = Localization.Language["Teleport"];
		SpellDescription = Localization.Language["Teleport description"];
		SpellMaxLevel = 5;
		SpellCooldown = 5;
		SpellCost = 2;
		
		SpellLevelUp();
	}
	
	function SpellLevelUp() {
		
		MaxTeleportDistance += MaxTeleportDistance * 0.2 ;
		SpellCooldown -= 0.5;
		
		SpellRange = Vector3( MaxTeleportDistance  / (RadiusFixConstant),
							 1, 
							 MaxTeleportDistance / (RadiusFixConstant) );
		
		SpellCost++;
		
		if( super.SpellLevelUp() == "SpellMaxLevel" ) return "SpellMaxLevel";
	}
}

/*----------------------------------------
			ProtectiveWall
------------------------------------------*/

public class ProtectiveWallClass extends SpellClass {

	var WallHP : int = 0;
	
	function ProtectiveWallClass() {
	
		SpellName = "ProtectiveWall";
		SpellMaxLevel = 5;
		SpellCooldown = 10;
		SpellCost = 5;
		SpellRange = Vector3( 1, 0, 1 );
		
		SpellLevelUp();
	}
	
	function SpellLevelUp() {
		
		WallHP ++;
		SpellCooldown -= 0.5;
		SpellCost++;
		
		SpellRange.x++;
		SpellRange.z++;
		
		if( super.SpellLevelUp() == "SpellMaxLevel" ) return "SpellMaxLevel";
	}
}

/*----------------------------------------
			Self - Directed Bolt
------------------------------------------*/

public class SelfDirectedBoltClass {

	var SpellLevel;
	var MaxLevel = 5;
	var CurrentTimeToReUse : float;
	var CurrentMass : float;
	var CurrentDamage : float;
	var CurrentLifeTime : float;
	public var SpellNextLevelCost : int;
	var SpellNextLevelCostAtLevel = Array();
	
	final var InitTimeToReUse = 13;
	var TimeToReUseAtLevel = new Array();
	
	final var InitMass = 5;
	var MassAtLevel = new Array();
	
	final var InitDamage = 1;
	var DamageAtLevel = new Array();
	
	final var InitLifeTime = 4;
	var LifeTimeAtLevel = new Array();
	
	function SelfDirectedBoltClass() {
	
		SpellLevel = 0;
		
		for(var i=0; i<MaxLevel; i++) {
		
			if(i==0) {
			
				TimeToReUseAtLevel.Add(InitTimeToReUse);
				MassAtLevel.Add(InitMass);
				DamageAtLevel.Add(InitDamage);
				LifeTimeAtLevel.Add(InitLifeTime);
			}
			else {
			
				TimeToReUseAtLevel.Add( TimeToReUseAtLevel[i-1] - ( TimeToReUseAtLevel[i-1] * 0.25 ) );
				MassAtLevel.Add( MassAtLevel[i-1] + ( MassAtLevel[i-1] * 0.40 ) );
				DamageAtLevel.Add( DamageAtLevel[i-1] + ( DamageAtLevel[i-1] * 0.15 ) );
				LifeTimeAtLevel.Add( LifeTimeAtLevel[i-1] + ( LifeTimeAtLevel[i-1] * 0.35 ) );
			}
			
			SpellNextLevelCostAtLevel.Add(i+2);
		}
		
		LvlUp();
	}
	
	function LvlUp() {
	
		if(SpellLevel <= MaxLevel) {
		
			SpellLevel++;
			var lvl = SpellLevel-1;
			
			CurrentTimeToReUse = TimeToReUseAtLevel[lvl];
			CurrentMass = MassAtLevel[lvl];
			CurrentDamage = DamageAtLevel[lvl];
			CurrentLifeTime = LifeTimeAtLevel[lvl];
			SpellNextLevelCost = SpellNextLevelCostAtLevel[lvl];
		}
	}
}