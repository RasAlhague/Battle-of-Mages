public var mPosX;
public var mPosY ;
var scrollArea = 5;
private var myTransform : Transform ;
myTransform = Camera.main.gameObject.transform;
var scrollSpeed = 50;

function Update() {
	mPosX = Input.mousePosition.x;
	mPosY = Input.mousePosition.y;                              
}
function LateUpdate() {
		// Do camera movement by mouse position
	if (mPosX < scrollArea) {myTransform.Translate(Vector3.right * -scrollSpeed * Time.deltaTime);}
	if (mPosX >= Screen.width-scrollArea) {myTransform.Translate(Vector3.right * scrollSpeed * Time.deltaTime);}
	if (mPosY < scrollArea) {myTransform.Translate(Vector3.up * -scrollSpeed * Time.deltaTime);}
	if (mPosY >= Screen.height-scrollArea) {myTransform.Translate(Vector3.up * scrollSpeed * Time.deltaTime);}
	
//	// Do camera movement by keyboard
//	myTransform.Translate(Vector3(Input.GetAxis("EditorHorizontal") * scrollSpeed * Time.deltaTime,
//	                              Input.GetAxis("EditorVertical") * scrollSpeed * Time.deltaTime, 0) );
}

// Do camera movement by holding down option                 or middle mouse button and then moving mouse
//if ( (Input.GetKey("left alt") || Input.GetKey("right alt")) || Input.GetMouseButton(2) ) {
//    myTransform.Translate(-Vector3(Input.GetAxis("Mouse X")*dragSpeed, Input.GetAxis("Mouse Y")*dragSpeed, 0) );
//}