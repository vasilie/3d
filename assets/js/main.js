var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100000 );
var keys = [];
var bullets = [];
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
renderer.setClearColor( 0xFFE5FF);
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

var floor_geometry = new THREE.BoxGeometry( 12, 0.1, 120 );
var material = new THREE.MeshPhongMaterial( {
   color: 0x423F41
 });
var floor = new THREE.Mesh( floor_geometry, material );
// scene.add( floor );
floor.receiveShadow = true;
floor.position.y = -0.1;
var box_geometry = new THREE.BoxGeometry( 0.81, 0.81, 0.81 );
var wall_geometry = new THREE.BoxGeometry( 0.2, 3, 10250 );
var wall1 = new THREE.Mesh(wall_geometry, material);
var wall2 = new THREE.Mesh(wall_geometry, material);
wall1.position.x = -3 - 0.2;
wall2.position.x = 3 + 0.2;
wall1.position.y = 1;
wall2.position.y = 1;
scene.add(wall1, wall2);
for ( var i = 0; i < box_geometry.faces.length; i += 2 ) {
					var hex = Math.random() * 0xffffff;
					box_geometry.faces[ i ].color.setHex( hex );
					box_geometry.faces[ i + 1 ].color.setHex( hex );
	}
var box_material = new THREE.MeshLambertMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5  } );
var propeler_material = new THREE.MeshLambertMaterial( { color: 0x4FFBA4 } );
var box = new THREE.Mesh( box_geometry, box_material );
var propeler_geometry = new THREE.BoxGeometry( 1.4, 0.1, 0.1 );
var propeler_geometry2 = new THREE.BoxGeometry( 0.1, 0.1, 1.4 );
var gun_geometry = new THREE.BoxGeometry( 0.2, 0.2, 1.4 );
var gun_material = new THREE.MeshLambertMaterial( { color: 0x333 } );
var gun1 = new THREE.Mesh( gun_geometry, gun_material );
var gun2 = new THREE.Mesh( gun_geometry, gun_material );
gun1.position.x = -0.5;
gun2.position.x = 0.5;
gun1.position.y = -0.25;
gun2.position.y = -0.25;
box.add(gun1, gun2);
var propeler = new THREE.Mesh( propeler_geometry, propeler_material );
var propeler2 = new THREE.Mesh( propeler_geometry2, propeler_material );

var bullet_geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);



var cube = new THREE.Mesh(box_geometry, box_material);
var cube2 = new THREE.Mesh(box_geometry, box_material);
var cube3 = new THREE.Mesh(box_geometry, box_material);
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
var pole_material = new THREE.MeshLambertMaterial( { color: 0x3F51B5 } );
var pole_geometry = new THREE.BoxGeometry( 0.2, 3.81, 0.2 );
var pole2_geometry = new THREE.BoxGeometry( 6.2, 0.2, 0.2 );
for (i=1;i<500;i++){
  var cube = new THREE.Mesh(pole_geometry, pole_material);
  var cube2 = new THREE.Mesh(pole_geometry, pole_material);
  var cube3 = new THREE.Mesh(pole2_geometry, pole_material);
  scene.add(cube,cube2,cube3);
  cube.position.z = -7*i;
  cube2.position.z = -7*i;
  cube3.position.z = -7*i;
  cube.position.x = 3;
  cube2.position.x = -3;
  cube.position.y = 1.5;
  cube2.position.y = 1.5;
  cube3.position.y = -0.493;
}
var enemy_material = new THREE.MeshLambertMaterial( { color: 0xFF5722 } );
var enemy_geometry = new THREE.BoxGeometry( 2, 5, 0.1 );
for (i=1;i<100;i++){
  var enemy = new THREE.Mesh(enemy_geometry, enemy_material);
  scene.add(enemy)
  enemy.position.z = i * -50;
  enemy.position.x = 0.8 * Math.floor(Math.random()*(3-(-2)+1)+(-2));

}



// scene.add( new THREE.AmbientLight( 0x00020 ) );
point_light = new THREE.PointLight( 0xFF32aa, 1, 7 );
scene.add( point_light );
var PI2 = Math.PI * 2;
var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0040} ) );
point_light.add( sprite );
box.add(point_light);
point_light.position.y = 0;
point_light.position.z = -4;

cube.position.set(10,1,10);
cube2.position.set(10,1,15);
cube3.position.set(5,1,10);
box.add(camera);
scene.add( box );
// scene.add( propeler );
box.velocityZ = 0;
box.position.y = 0.1;
box.direction = 1;
box.castShadow = true;
propeler.direction = 1;
var directionalLight = new THREE.DirectionalLight( 0xFFE6A9, 1 );
directionalLight.position.set( 0, 10, -20 );
directionalLight.castShadow = true;
directionalLight.shadowCameraVisible = true
var d = 0.1;
directionalLight.shadowCamera  = d;                                                                               Left = -d
directionalLight.shadowCameraRight = d
directionalLight.shadowCameraTop = d
directionalLight.shadowCameraBottom = -d
scene.add( directionalLight );

var geometry = new THREE.PlaneBufferGeometry( 200, 10200 );
				geometry.rotateX( - Math.PI / 2 );
				var material = new THREE.MeshPhongMaterial( { color: 0x28827F, overdraw: 0.5 } );
				plane = new THREE.Mesh( geometry, material );
				scene.add( plane );
        plane.receiveShadow = true;

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );
hemiLight.color.setHSL( 1, 1, 1 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.35 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

camera.position.z = 4;
box.position.x = 0;
plane.position.y = -0.4;

box.position.y = 1.5
propeler.position.x = 0
propeler.position.y = 2
propeler.position.z = 0
box.velocity = -5;
camera.position.z = 8;
camera.position.y = 1;
// camera.lookAt(box.position);
// camera.position.y = 2;
box.add(propeler);
propeler.add(propeler2);
// camera.lookAt(scene.position);
function render() {
	requestAnimationFrame( render );
  if (propeler.position.z > 5.5 || propeler.position.z < -5.5){
    propeler.direction = -propeler.direction;
  }
  // console.log(propeler.position.z);
  box.rotation.y = 0;
  if(keys[65]){box.position.x-=box.velocityZ/6; box.rotation.y += 0.004;} // Left
  if(keys[68]){box.position.x+=box.velocityZ/6;box.rotation.y  -= 0.004;} // Right
  if(keys[87] ){box.velocityZ+=0.06; }// Up
  if(keys[83] ){box.velocityZ-=0.06; } // down
  if(keys[16] ){shoot();} // down
  // camera.position.x = box.position.x;
  // camera.position.y = box.position.y+0.5;
  // camera.position.z = box.position.z+5;
  // camera.lookAt(box.position);


  if(keys[38] || keys[32] ){propeler.rotation.y+=1.25, box.velocity +=0.012; }
  // if(keys[40] || keys[17] ){box.position.y-=0.05; }
  if(keys[39]){box.rotation.y+=0.05;}
  if(keys[37]){box.rotation.y-=0.05;}
  if (box.rotation.y >= 0.04){box.rotation.y = 0.04}
  if (box.rotation.y <= - 0.04){box.rotation.y = -0.04}
  // scene.rotation.y += 0.01;
  box.velocity -=0.01;
  if (box.velocityZ >0){
    box.velocityZ -= 0.04;
  } else {
     box.velocityZ = 0;
  }
  if (box.velocityZ >= 3){
    box.velocityZ  = 3;
  }
  box.position.y += box.velocity;
  if (box.position.y <= 0){
    box.velocity = 0;
    box.position.y =0;
  }
  box.position.z -= box.velocityZ;
  if (box.position.x <= -2.5){
        box.position.x = -2.5;
  } else if (box.position.x >= 2.5){
        box.position.x = 2.5;
  }
  if (box.rotation.z > 0.005){
    box.rotation.z -= 0.01;
  } else if (box.rotation.z < 0){
    box.rotation.z += 0.005;
  } else {
    box.rotation.z = 0;
  }
  for (i in bullets){
    bullets[i].position.z-= 5.30;
    if (bullets[i].position.z < -20000){
      scene.remove(bullets[i]);
      bullets.splice(i,1);
    }
  }
  // camera.lookAt(box.position);
  // propeler.position.x = box.position.x;
  // propeler.position.y = box.position.y - 1;
  // propeler.position.z = box.position.z;
	renderer.render( scene, camera );
}


render();
function shoot(){
  var bullet = new THREE.Mesh(bullet_geometry, gun_material);
  var bullet2 = new THREE.Mesh(bullet_geometry, gun_material);
  bullet.position.x = box.position.x - 0.25;
  bullet.position.y = box.position.y - 0.25;
  bullet.position.z = box.position.z - 0.45;
  bullet2.position.x = box.position.x + 0.25;
  bullet2.position.y = box.position.y - 0.25;
  bullet2.position.z = box.position.z - 0.45;
  scene.add(bullet);
  scene.add(bullet2);
  bullets.push(bullet);
  bullets.push(bullet2);
}
