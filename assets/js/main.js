var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100000 );
var keys = [];
// Add keys to array

window.addEventListener("keydown", function(e){
  keys[e.keyCode] = true;
  if (e.keyCode == 32){
    // box.velocity+=0.26;
  }
}, false);

// Remove keys from array

window.addEventListener("keyup", function(e){

  delete keys[e.keyCode];
}, false);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( 0xf0f0f0 );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

var floor_geometry = new THREE.BoxGeometry( 12, 0.1, 120 );
var material = new THREE.MeshLambertMaterial( {
   color: 0x11aacc
 });
var floor = new THREE.Mesh( floor_geometry, material );
scene.add( floor );
floor.receiveShadow = true;
floor.position.y = -0.1;
var box_geometry = new THREE.BoxGeometry( 1, 0.1, 1 );
for ( var i = 0; i < box_geometry.faces.length; i += 2 ) {
					var hex = Math.random() * 0xffffff;
					box_geometry.faces[ i ].color.setHex( hex );
					box_geometry.faces[ i + 1 ].color.setHex( hex );
	}
var box_material = new THREE.MeshLambertMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5  } );
var box2_material = new THREE.MeshLambertMaterial( { color: 0x4FFBA4 } );
var box = new THREE.Mesh( box_geometry, box_material );
var box2 = new THREE.Mesh( box_geometry, box2_material );
scene.add( box );
// scene.add( box2 );
box.position.y = 0.1;
box.direction = 1;
box.castShadow = true;
box2.direction = 1;
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
directionalLight.position.set( 10, 10, -20 );
directionalLight.castShadow = true;
directionalLight.shadowCameraVisible = true
// var d = 0.1;
// directionalLight.shadowCamera  = d;                                                                               Left = -d
// directionalLight.shadowCameraRight = d
// directionalLight.shadowCameraTop = d
// directionalLight.shadowCameraBottom = -d
// scene.add( directionalLight );

var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
				geometry.rotateX( - Math.PI / 2 );
				var material = new THREE.MeshLambertMaterial( { color: 0xF0F0F0, overdraw: 0.5 } );
				plane = new THREE.Mesh( geometry, material );
				scene.add( plane );
        plane.receiveShadow = true;

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.9 );
hemiLight.color.setHSL( 1, 1, 1 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );


box.position.x = -5.5
box.position.y = 1.5
box2.position.x = 0
box2.position.y = 1
box2.position.z = 0
box.velocity = -5;
camera.position.z = 13;
camera.position.y = 2;
box.add(box2);
camera.lookAt(scene.position);
function render() {
	requestAnimationFrame( render );
  if (box2.position.z > 5.5 || box2.position.z < -5.5){
    box2.direction = -box2.direction;
  }
  // console.log(box2.position.z);
  if(keys[65]){box.position.x-=1;} // Left
  if(keys[68]){box.position.x+=1;} // Right
  if(keys[87] ){box.position.z-=1; } // Up
  if(keys[83] ){box.position.z+=1; } // down
  camera.position.x = box.position.x;
  camera.position.y = box.position.y+0.5;
  camera.position.z = box.position.z+5;

  if(keys[38] || keys[32] ){box2.rotation.y+=1.25, box.velocity +=0.012; }
  // if(keys[40] || keys[17] ){box.position.y-=0.05; }
  if(keys[39]){box.rotation.y+=0.25;}
  if(keys[37]){box.rotation.y-=0.25;}
  // scene.rotation.y += 0.01;
  box.velocity -=0.01;
  box.position.y += box.velocity;
  if (box.position.y <= 1.25){
    box.velocity = 0;
    box.position.y =1.25;
  }
  camera.lookAt(box.position);
  // box2.position.x = box.position.x;
  // box2.position.y = box.position.y - 1;
  // box2.position.z = box.position.z;
	renderer.render( scene, camera );
}
render();
