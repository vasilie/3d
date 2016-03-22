var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100000 );
var keys = [];
var bullets = [];
var enemies = [];
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

//Helicopter
var helicopter_material = new THREE.MeshPhongMaterial( {
   color: 0xFFD83B
 });
 var helicopter_material_dark = new THREE.MeshPhongMaterial( {
    color: 0x7B711B
  });
 var propeler_material = new THREE.MeshPhongMaterial( {
    color: 0x333333
  });
var h_cockpit_geometry = new THREE.BoxGeometry( 1, 1, 1 );
var h_cockpit_medium_geometry = new THREE.BoxGeometry( 0.9, 0.9, 1.4 );
var h_cockpit_small_geometry = new THREE.BoxGeometry( 0.7, 0.7, 1 );
var h_tail_head_geometry = new THREE.BoxGeometry( 0.3, 0.5, 0.2 );
var h_tail_arm_geometry = new THREE.BoxGeometry( 0.3, 0.3, 1.4 );
var h_tail_hand_geometry = new THREE.BoxGeometry( 0.3, 0.5, 0.4 );
var h_propeler_base_geometry = new THREE.BoxGeometry( 0.2, 0.1, 0.2 );
var h_propeler_pin_geometry = new THREE.BoxGeometry( 0.05, 0.1, 0.05 );
var h_propeler_geometry = new THREE.BoxGeometry( 4, 0.03,0.13 );
var h_propeler2_geometry = new THREE.BoxGeometry( 0.13, 0.03, 4 );

var h_tail_hand = new THREE.Mesh(h_tail_hand_geometry, propeler_material);
var h_propeler = new THREE.Mesh(h_propeler_geometry, propeler_material);
var h_propeler2 = new THREE.Mesh(h_propeler2_geometry, propeler_material);
var h_propeler_pin = new THREE.Mesh(h_propeler_pin_geometry, helicopter_material);
var h_propeler_base = new THREE.Mesh(h_propeler_base_geometry, helicopter_material);
var h_tail_arm = new THREE.Mesh(h_tail_arm_geometry, helicopter_material);
var h_tail_head = new THREE.Mesh(h_tail_head_geometry, helicopter_material);
var h_cockpit_small = new THREE.Mesh(h_cockpit_small_geometry, helicopter_material);
var h_cockpit_medium = new THREE.Mesh(h_cockpit_medium_geometry, helicopter_material);
var h_cockpit = new THREE.Mesh(h_cockpit_geometry, helicopter_material_dark);
var helicopter = new THREE.Mesh();


h_propeler.position.y = 0.7;
h_propeler_pin.position.y = 0.65;
h_propeler_base.position.y = 0.55;
h_tail_hand.position.z = -2.5;
h_tail_hand.position.y = 0.26;
h_tail_arm.position.z = -1.6;
h_tail_arm.position.y = 0.16;
h_tail_head.position.y = 0.06;
h_tail_head.position.z = -0.8;
h_cockpit_small.position.z = 0.4;

h_propeler.add(h_propeler2);
helicopter.add(h_cockpit, h_cockpit_medium, h_cockpit_small, h_tail_head, h_tail_arm,h_tail_hand,h_propeler_base, h_propeler_pin,h_propeler);
scene.add(helicopter);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( 0xFFE5FF);
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var floor_geometry = new THREE.BoxGeometry( 12, 0.1, 120 );
var material = new THREE.MeshPhongMaterial( {
   color: 0x423F41
 });
var floor = new THREE.Mesh( floor_geometry, material );
// scene.add( floor );
// floor.receiveShadow = true;
// floor.position.y = -0.112311;
var material = new THREE.MeshPhongMaterial( {
   color: 0x50f2ed
 });
 var top_wall_material = new THREE.MeshPhongMaterial( {
    color: 0x000
  });
var box_geometry = new THREE.BoxGeometry( 0.81, 0.81, 0.81 );
var wall_geometry = new THREE.BoxGeometry( 0.2, 3, 1500 );
var top_wall_geometry = new THREE.BoxGeometry( 7,0.2, 1500 );
var wall1 = new THREE.Mesh(wall_geometry, material);
var wall2 = new THREE.Mesh(wall_geometry, material);
var wall3 = new THREE.Mesh(wall_geometry, top_wall_material);
var wall4 = new THREE.Mesh(wall_geometry, top_wall_material);
var wall5 = new THREE.Mesh( top_wall_geometry, top_wall_material);
wall1.castShadow = true;
wall1.receiveShadow = true;
wall2.castShadow = true;
wall2.receiveShadow = true;
wall3.castShadow = true;
wall3.receiveShadow = true;
wall4.castShadow = true;
wall4.receiveShadow = true;
wall5.castShadow = true;
wall5.receiveShadow = true;
wall1.position.x = -3 - 0.2;
wall2.position.x = 3 + 0.2;
wall1.position.y = 1;
wall2.position.y = 1;
wall1.position.z = -750;
wall2.position.z = -750;
wall3.position.x = -3 - 0.2;
wall4.position.x = 3 + 0.2;
wall3.position.y = 1;
wall4.position.y = 1;
wall3.position.z = -3000;
wall4.position.z = -3400;
wall5.position.z = -3400;
wall5.position.x =0;
wall5.position.y =2.6;
// //
controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 5, 0 );
				controls.update();
var ambient = new THREE.AmbientLight( 0xF8FFED);
ambient.intensity = 0.6;
scene.add(ambient);
helicopter.position.y = 5;
function createLight( color ) {
  var pointLight = new THREE.PointLight( color, 1, 10 );
  pointLight.castShadow = true;
  pointLight.shadow.camera.near = 1;
  pointLight.shadow.camera.far = 30;
  // pointLight.shadowCameraVisible = true;
  pointLight.shadow.bias = 0.01;
  var geometry = new THREE.SphereGeometry( 0.3, 12, 6 );
  var material = new THREE.MeshBasicMaterial( { color: color } );
  var sphere = new THREE.Mesh( geometry, material );
  pointLight.add( sphere );
  return pointLight
}
scene.add(wall1, wall2, wall3, wall4, wall5);
for ( var i = 0; i < box_geometry.faces.length; i += 2 ) {
					var hex = Math.random() * 0xffffff;
					box_geometry.faces[ i ].color.setHex( hex );
					box_geometry.faces[ i + 1 ].color.setHex( hex );
	}
var box_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5, shininess :100  } );
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

// var pointLight = createLight(0xf2ee52);
// box.add(pointLight);
// pointLight.position.y = 6;
var pole_material = new THREE.MeshLambertMaterial( { color: 0x3F51B5 } );
var pole_geometry = new THREE.BoxGeometry( 0.2, 3.81, 0.2 );
var pole2_geometry = new THREE.BoxGeometry( 6.2, 0.2, 0.2 );
for (i=1;i<700;i++){
  var cube = new THREE.Mesh(pole_geometry, pole_material);
  var cube2 = new THREE.Mesh(pole_geometry, pole_material);
  var cube3 = new THREE.Mesh(pole2_geometry, pole_material);
  scene.add(cube,cube2,cube3);
  cube.position.z = -10*i;
  cube2.position.z = -10*i;
  cube3.position.z = -10*i;
  cube.position.x = 3;
  cube2.position.x = -3;
  cube.position.y = 1.5;
  cube2.position.y = 1.5;
  cube3.position.y = -0.493;



}
var enemy_material = new THREE.MeshPhongMaterial( { color: 0xFF5722 } );
var enemy_geometry = new THREE.BoxGeometry( 2, 4, 0.1 );
for (i=1;i<140;i++){
  var enemy = new THREE.Mesh(enemy_geometry, enemy_material);
  scene.add(enemy)
  enemy.position.z = i * -50;
  enemy.position.x = 0.8 * Math.floor(Math.random()*(3-(-2)+1)+(-2));
  enemy.position.y = 1.6;
  enemies.push(enemy);
  // enemy.castShadow = true;
  // enemy.receiveShadow = true;
}



// scene.add( new THREE.AmbientLight( 0x00020 ) );

// // scene.add( point_light );
// var PI2 = Math.PI * 2;
// var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0040} ) );
// // point_light.add( sprite );
// box.add(point_light);
// point_light.position.y = 0;
// point_light.position.z = -4;

cube.position.set(10,1,10);
cube2.position.set(10,1,15);
cube3.position.set(5,1,10);
// box.add(camera);
scene.add( box );

// scene.add( propeler );
box.velocityZ = 0;
box.position.y = 0.1;
box.position.z = -2.1;
box.direction = 1;
box.castShadow = true;
propeler.direction = 1;
var directionalLight = new THREE.DirectionalLight( 0xFFE6A9, 0.5 );
directionalLight.position.set( 0,1000,-6000 );
directionalLight.target = box;
directionalLight.castShadow = true;
directionalLight.shadowCameraVisible = true
directionalLight.shadow.camera.near = 10;
directionalLight.shadow.camera.far = 6000;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 20;
directionalLight.shadow.camera.bottom = -20;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.mapSize.width = 4096;
// directionalLight.shadowCameraVisible = true;
directionalLight.shadow.bias = 0.01;
scene.add( directionalLight );
scene.add( new THREE.CameraHelper( directionalLight.shadow.camera ) );

var geometry = new THREE.PlaneBufferGeometry( 200, 10200 );
				geometry.rotateX( - Math.PI / 2 );
				var material = new THREE.MeshPhongMaterial( { color: 0xfff2ff, overdraw: 0.5, shininess:100 } );
				plane = new THREE.Mesh( geometry, material );
				scene.add( plane );
        plane.receiveShadow = true;

// hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );
// hemiLight.color.setHSL( 1, 1, 1 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.35 );
// hemiLight.position.set( 0, 500, 0 );
// scene.add( hemiLight );

var text2 = document.createElement('div');
text2.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text2.style.width = 100;
text2.style.height = 100;
text2.style.backgroundColor = "white";
text2.innerHTML = "hi there!";
text2.style.top = 200 + 'px';
text2.style.left = 200 + 'px';
document.body.appendChild(text2);



camera.position.z = 4;
box.position.x = 0;
plane.position.y = -0.4;

box.position.y = 1.5
propeler.position.x = 0
propeler.position.y = 2
propeler.position.z = 0
box.velocity = -5;
camera.position.z = 3;
camera.position.y = 3;
camera.position.x = 3;

// camera.position.y = 2;
box.add(propeler);
propeler.add(propeler2);
camera.lookAt(helicopter.position);
// camera.lookAt(scene.position);
function render() {
	requestAnimationFrame( render );
  if (propeler.position.z > 5.5 || propeler.position.z < -5.5){
    propeler.direction = -propeler.direction;
  }
  // console.log(propeler.position.z);
  box.rotation.y = 0;
  if(keys[65]){box.position.x-=box.velocityZ/6; box.rotation.y += 0.004; h_propeler.rotation.y += 0.4;} // Left
  if(keys[68]){box.position.x+=box.velocityZ/6;box.rotation.y  -= 0.004;} // Right
  if(keys[87] ){box.velocityZ+=0.04; }// Up
  if(keys[83] ){box.velocityZ-=0.04; } // down
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
    box.velocityZ -= 0.01;
  } else {
    box.velocityZ = 0;
  }
  if (box.velocityZ >= 2.7){
    box.velocityZ  = 2.7;
  }

  box.position.y += box.velocity;
  if (box.position.y <= 0){
    box.velocity = 0;
    box.position.y =0;
  }
  if (box.position.z<-7000){
    box.position.z = 0;
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
  // text2.innerHTML = "VELOCITYZ:"+box.velocityZ;
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
