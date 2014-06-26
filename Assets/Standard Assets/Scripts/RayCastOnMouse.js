var col : Collider;
var pos : Vector3;
var hit : RaycastHit;

function Update () {
var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
         if (col.Raycast (ray, hit, 100.0f))
         {
            Debug.DrawLine (ray.origin, hit.point);
            pos = hit.point;
         }
}