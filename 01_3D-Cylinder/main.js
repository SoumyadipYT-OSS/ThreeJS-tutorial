import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



// Cylinder 3D
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
const material = new THREE.MeshBasicMaterial( {color: 'rgb(45,38,29)'} ); 
const object = new THREE.Mesh( geometry, material ); 
scene.add( object );

// make the cylinder edges smooth
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 'rgb(35,40,20)' } ) );
object.add( line );

// make the cylinder transparent
object.material.transparent = true;
object.material.opacity = 0.5;


// add a background to the scene
const background = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshBasicMaterial({ color: 'rgb(10,2,19)' })
);
background.position.z = -100;
scene.add(background);



// 3D graph paper
const graphPaper = new THREE.GridHelper( 100, 100, 'blue', 'brown' );
scene.add( graphPaper );
// linearly interpolate the graph paper to make it more visible
graphPaper.material.transparent = true;
graphPaper.material.opacity = 0.8;
// add linear-gradient color to the graph paper
graphPaper.material.color = new THREE.Color('rgb(100, 8, 250)');
// make the graph paper more visible
graphPaper.material.transparent = true;
graphPaper.material.opacity = 0.95;

// show z-axis in the graph paper
const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 10, 'blue');
scene.add(zAxis);


// make the cylinder more realistic by adding a shadow
object.castShadow = true;
object.receiveShadow = true;
graphPaper.castShadow = true;

// make the cylinder more realistic as real-world solid objects
object.material = new THREE.MeshStandardMaterial( { color: 'gold' } );

// make the cylinder metallic
object.material.metalness = 5;

// make the cylinder shiny that reflects the light
object.material.roughness = 0.5;





// add 3d graph in the background to make the cylinder more visible
const axesHelper = new THREE.AxesHelper( 20 );
scene.add( axesHelper );
// make the axesHelper more visible
axesHelper.material.transparent = true;
axesHelper.material.opacity = 0.95;
// add light to the scene
const light = new THREE.DirectionalLight( 'white', 2 );
light.position.set( 8, 8, 8 );
scene.add( light );

// add ambient light to the scene
const ambientLight = new THREE.AmbientLight( 'white', 0.1 );
scene.add( ambientLight );


camera.position.x = 30;
camera.position.y = -20;
camera.position.z = 10;

camera.rotation.x = 0.2;
camera.rotation.y = 0.5;
camera.rotation.z = 0.6;




camera.position.z = 80;

function animate() {
	requestAnimationFrame( animate );

	object.rotation.x += 0.01;
	object.rotation.y += 0.01;

    graphPaper.rotation.x += 0.01;
    graphPaper.rotation.y += 0.01;



	renderer.render( scene, camera );
}

animate();
