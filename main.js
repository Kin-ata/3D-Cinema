import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

function init() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // var gui = new dat.GUI();

    var room = Room();
    room.name = 'room';
    scene.add(room);

    var screen = CinemaScreen({ position: [-0.05, 1, 3.9], videoUrl: 'video.mp4', muted: true });
    screen.name = 'screen';
    scene.add(screen);

    // const alphabetic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const alphabetic = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
    var chairs = [[...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)]].map( (row, index) => {
            
            return row.map( (seat, i) => {
                let seatPostion = 13 - i;
                return {
                    id: `${index} - ${i}`, 
                    position: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.5 * (-index + 11) ) * 0.2, index * 1.5  * 0.2), 
                    target:   new THREE.Vector3(-1 * (-1 + seatPostion)  * 0.2, (0.6 )  * 0.2, (-0.355) * 0.2),
                    seat: `${alphabetic[index]}${i+1}`
                }
            })
    
        }).flat(Infinity)

    chairs.forEach(chair => {
        var chairMesh = Chair({ position: chair.position.toArray(), scale: 0.2 });
        chairMesh.name = chair.id;
        scene.add(chairMesh);
    });

    var settings = {
        row: 0,
        col: 13
    };
    var target = `${alphabetic[settings.row]}${settings.col}`;
    
    var camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    );

    camera.position.set(0, 2, -1);
    camera.lookAt(new THREE.Vector3(0, 1, 7));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255, 255, 255)');
    document.getElementById('webgl').appendChild(renderer.domElement);
    
    var controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 1.998, -0.99);

    // // dat.GUI
    // var cameraFolder = gui.addFolder('Camera');
    // cameraFolder.add(camera.position, 'x', -10, 10);
    // cameraFolder.add(camera.position, 'y', -10, 10);
    // cameraFolder.add(camera.position, 'z', -10, 10);
    // // cameraFolder.open();
    // var targetFolder = gui.addFolder('Target');
    // targetFolder.add(settings, 'row', 0, 10).step(1).onChange(function(val) {
    //     settings.row = val;
    //     target = `${alphabetic[val]}${settings.col}`;
    //     chairs.forEach(chair => {
    //         if (chair.seat == target) {
    //             camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
    //             // controls.target.set(0, 1, 7);
    //             // controls.target.set(chair.target.x, chair.target.y, chair.target.z);
    //             controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
    //         }
    //     });

    // });
    // targetFolder.add(settings, 'col', 0, 24).step(1).onChange(function(val) {
    //     settings.col = val;
    //     target = `${alphabetic[settings.row]}${val}`;
    //     chairs.forEach(chair => {
    //         if (chair.seat == target) {
    //             camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
    //             // controls.target.set(0, 1, 7);
    //             // controls.target.set(chair.target.x, chair.target.y, chair.target.z);
    //             controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
    //         }
    //     }
    //     );

    // });
    // targetFolder.open();
    // // add 1 value for isCameraMovementEnabled is boolean value

    window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    window.addEventListener('keydown', function(event) {
        var keyCode = event.keyCode;
        if (keyCode == 37) {
            // Left arrow key
            settings.col = settings.col + 1;
            if (settings.col > 25) {
                settings.col = 25;
            }
            target = `${alphabetic[settings.row]}${settings.col}`;
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 39) {
            // Right arrow key
            settings.col = settings.col - 1;
            if (settings.col < 1) {
                settings.col = 1;
            }
            target = `${alphabetic[settings.row]}${settings.col}`;
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 38) {
            // Up arrow key
            settings.row = settings.row + 1;
            if (settings.row > 10) {
                settings.row = 10;
            }
            target = `${alphabetic[settings.row]}${settings.col}`;
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 40) {
            // Down arrow key
            settings.row = settings.row - 1;
            if (settings.row < 0) {
                settings.row = 0;
            }
            target = `${alphabetic[settings.row]}${settings.col}`;
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.2, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.2 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
                }
            });
        }
        console.log(target);
    });


    update(renderer, scene, camera, controls);

    return scene;
}

function Wall({ position, rotation, color, transparent = false, opacity = 1, args }) {
    var wall = new THREE.Group();

    var plane = getPlane(args[0], args[1], color);
    plane.position.set(position[0], position[1], position[2]);
    plane.rotation.set(rotation[0], rotation[1], rotation[2]);
    plane.name = 'wall';
    wall.add(plane);

    return wall;
}

function Stage({ position }) {
    var stage = new THREE.Group();

    var mainStage = getBox(5, 0.5, 2, 'gray'); // Assuming mainStage remains gray
    mainStage.position.set(position[0], position[1], position[2]);
    mainStage.name = 'mainStage';
    stage.add(mainStage);

    var stairColor = 'brown'; // Example color for stairs

    var stair1 = getBox(0.4, 0.1, 0.2, stairColor);
    stair1.position.set(position[0] - 1.4, position[1] - 0.1, position[2] + 1);
    stair1.name = 'stair1';
    stage.add(stair1);

    var stair2 = getBox(0.4, 0.1, 0.2, stairColor);
    stair2.position.set(position[0] - 1.4, position[1], position[2] + 1.2);
    stair2.name = 'stair2';
    stage.add(stair2);

    var stair3 = getBox(0.4, 0.1, 0.2, stairColor);
    stair3.position.set(position[0] - 1.4, position[1] - 0.1, position[2] + 1.3);
    stair3.name = 'stair3';
    stage.add(stair3);

    var stair4 = getBox(0.4, 0.1, 0.2, stairColor);
    stair4.position.set(position[0] - 1.4, position[1] - 0.2, position[2] + 1.3);
    stair4.name = 'stair4';
    stage.add(stair4);

    var stair5 = getBox(0.4, 0.1, 0.2, stairColor);
    stair5.position.set(position[0] - 1.4, position[1] - 0.3, position[2] + 1.4);
    stair5.name = 'stair5';
    stage.add(stair5);

    return stage;
}

function CinemaScreen({ position, videoUrl, muted }) {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.playsInline = true;
    video.muted = muted;
    video.play().catch(error => console.error("Video play failed:", error));

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    const radius = 2.5; // Radius of the cylinder to create enough curvature
    const arc = - Math.PI * 0.6; // Arc of the cylinder to show as the screen

    var screen = new THREE.Group();

    var cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, 1.75, 32, 1, true, 0, arc),
        new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide })
    );

    cylinder.position.set(position[0], position[1], position[2]);
    cylinder.rotation.set(0, Math.PI / 3.3, 0);
    cylinder.name = 'screen';
    screen.add(cylinder);

    return screen;
}

function Chair({ position, onClick, scale, isSeatSelected }) {
    const rotationY = Math.PI; // Rotate 180 degrees to face the screen

    // Define dimensions based on scale
    const seatSize = [0.5 * scale, 0.1 * scale, 0.5 * scale];
    const legHeight = 0.5 * scale;
    const legThickness = 0.05 * scale;
    const backHeight = 0.4 * scale;
    const backThickness = 0.1 * scale;

    var chair = new THREE.Group();

    var seat = getBox(seatSize[0], seatSize[1], seatSize[2]);
    seat.position.set(position[0], position[1] + legHeight, position[2]); // Adjusted Y position
    seat.rotation.set(0, rotationY, 0);
    seat.name = 'seat';
    seat.castShadow = true;
    chair.add(seat);

    var leg1 = getBox(legThickness, legHeight, legThickness);
    leg1.position.set(position[0] + 0.2 * scale, position[1] - 0.25 * scale + legHeight, position[2] + 0.2 * scale); // Adjusted Y position
    leg1.name = 'leg1';
    leg1.castShadow = true;
    chair.add(leg1);

    var leg2 = getBox(legThickness, legHeight, legThickness);
    leg2.position.set(position[0] - 0.2 * scale, position[1] - 0.25 * scale + legHeight, position[2] + 0.2 * scale); // Adjusted Y position
    leg2.name = 'leg2';
    leg2.castShadow = true;
    chair.add(leg2);

    var leg3 = getBox(legThickness, legHeight, legThickness);
    leg3.position.set(position[0] + 0.2 * scale, position[1] - 0.25 * scale + legHeight, position[2] - 0.2 * scale); // Adjusted Y position
    leg3.name = 'leg3';
    leg3.castShadow = true;
    chair.add(leg3);

    var leg4 = getBox(legThickness, legHeight, legThickness);
    leg4.position.set(position[0] - 0.2 * scale, position[1] - 0.25 * scale + legHeight, position[2] - 0.2 * scale); // Adjusted Y position
    leg4.name = 'leg4';
    leg4.castShadow = true;
    chair.add(leg4);

    var back = getBox(0.5 * scale, backHeight, backThickness);
    back.position.set(position[0], position[1] + 0.2 * scale + legHeight, position[2] - 0.25 * scale); // Adjusted Y position
    back.name = 'back';
    back.castShadow = true;
    chair.add(back);

    var ground = getBox(scale, 1.2, 1.5 * scale, 'grey');
    ground.position.set(position[0], position[1] - 0.6, position[2]); // Adjusted Y position
    ground.name = 'ground';
    ground.receiveShadow = true;

    chair.add(ground);


    return chair;
}

function Room() {
    var room = new THREE.Group();

    var floor = Wall({ position: [0, 0, 2.5], rotation: [-Math.PI / 2, 0, 0], color: 'grey', args: [5, 8] });
    floor.name = 'floor';
    room.add(floor);

    var ceiling = Wall({ position: [0, 3, 2.5], rotation: [Math.PI / 2, 0, 0], color: 'grey', args: [5, 8] });
    ceiling.name = 'ceiling';
    room.add(ceiling);

    var lightFrontLeft = getSpotLight(10, 'rgb(255, 255, 255)');
    lightFrontLeft.position.set(-2, 3, 2);
    lightFrontLeft.name = 'lightFrontLeft';
    room.add(lightFrontLeft);

    var lightFrontRight = getSpotLight(10, 'rgb(255, 255, 255)');
    lightFrontRight.position.set(2, 3, 2);
    lightFrontRight.name = 'lightFrontRight';
    room.add(lightFrontRight);

    var lightBackLeft = getPointLight(1, 'rgb(255, 255, 255)');
    lightBackLeft.position.set(-2, 3, 6);
    lightBackLeft.name = 'lightBackLeft';
    room.add(lightBackLeft);

    var lightBackRight = getPointLight(1, 'rgb(255, 255, 255)');
    lightBackRight.position.set(2, 3, 6);
    lightBackRight.name = 'lightBackRight';
    room.add(lightBackRight);

    var backWall = Wall({ position: [0, 1.5, -1.5], rotation: [Math.PI, Math.PI, 0], color: 'dimgrey', args: [5, 3] });
    backWall.name = 'backWall';
    room.add(backWall);

    var backStage = getBox(5, 1.1, 1.4, 'grey');
    backStage.position.set(0, 0.55, -0.8);
    backStage.name = 'backStage';
    room.add(backStage);

    var frontWall = Wall({ position: [0, 1.5, 6.5], rotation: [Math.PI, 0, 0], color: 'dimgrey', args: [5, 3] });
    frontWall.name = 'frontWall';
    room.add(frontWall);

    var leftWall = Wall({ position: [-2.5, 1.5, 2.5], rotation: [0, Math.PI / 2, 0], color: 'dimgrey', args: [8, 3] });
    leftWall.name = 'leftWall';
    room.add(leftWall);

    var rightWall = Wall({ position: [2.5, 1.5, 2.5], rotation: [0, -Math.PI / 2, 0], color: 'dimgrey', args: [8, 3] });
    rightWall.name = 'rightWall';
    room.add(rightWall);

    return room;
}


function getBox(w, h, d, color = 0x8b0000) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = getMaterial('standard', color);
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
}

function getPlane(w, h, color = 0xffffff) {
    var geometry = new THREE.PlaneGeometry(w, h);
    var material = getMaterial('standard', color);
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

function getSpotLight(intensity, color) {
    color = color === undefined ? 'rgb(255, 255, 255)' : color;
    var light = new THREE.SpotLight(color, intensity);
    light.castShadow = true;
    light.penumbra = 0.5;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
}

function getPointLight(intensity, color) {
    color = color === undefined ? 'rgb(255, 255, 255)' : color;
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
}

function getMaterial(type, color) {
    var selectedMaterial;
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color
    };

    switch (type) {
        case 'basic':
            selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
            break;
        case 'lambert':
            selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
            break;
        case 'phong':
            selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
            break;
        case 'standard':
            selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
            break;
        default:
            selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
            break;
    }

    return selectedMaterial;
}

// let lookAtTarget = new THREE.Vector3(0, 0, 0);
// let cameraVRP = new THREE.Vector3(1, 2, 5);

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene, 
        camera
    );

    controls.update();
    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
        });
}

var scene = init();
