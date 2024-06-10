import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';
import { CSS3DRenderer, CSS3DObject } from 'https://orvillechomer.github.io/miscJsFiles/THREEJS/r120/jsm/renderers/CSS3DRenderer.js';

let model;

function init() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // var gui = new dat.GUI();

    var loader = new OBJLoader();
    loader.load('chair2.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ color: 'black' });
            }
        });
        // save object to global variable
        model = object;
    });
    // setTimeout(function() {
    //     var chairTest = Chair2(model,{ position: [0, 1, 2], scale: 0.2 });
    //     chairTest.name = 'chairTest';
    //     scene.add(chairTest);
    
    //     var chairTest2 = Chair2(model,{ position: [0, 1, 4], scale: 0.2 });
    //     chairTest2.name = 'chairTest2';
    //     scene.add(chairTest2);
    // }, 15000);

    var room = Room();
    room.name = 'room';
    scene.add(room);

    var screen = CinemaScreen({ position: [-0.05, 1, 3.9], videoUrl: 'video.mp4', muted: true });
    screen.name = 'screen';
    scene.add(screen);

    var ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.5);
    scene.add(ambientLight);


    // const alphabetic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const alphabetic = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
    var chairs = [[...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)]].map( (row, index) => {
        var temp = 0;
            return row.map( (seat, i) => {
                let seatPostion = 13 - i;
                if (i === 5 || i === 6 || i === 18 || i === 19) {
                    temp ++;
                    return {
                        id: 'stairBlock',
                        position: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.5 * (-index + 11) ) * 0.2, index * 1.5  * 0.3)
                    }
                }
                else {
                    return {
                        id: `${index} - ${i - temp}`, 
                        position: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.5 * (-index + 11) ) * 0.2, index * 1.5  * 0.3), 
                        target:   new THREE.Vector3(-1 * (-1 + seatPostion)  * 0.2, (0.6 )  * 0.2, (-0.355) * 0.3),
                        seat: `${alphabetic[index]}${i+1-temp}`
                    }
                }
            }
        )
    
    }).flat(Infinity)
    

    setTimeout(function() {
        console.log('model is loaded');
        chairs.forEach(chair => {
            if (chair.id === 'stairBlock') {
                var stairBlock = StairBlock({ position: chair.position.toArray() });
                stairBlock.name = chair.id;
                scene.add(stairBlock);
            }
            else {
                // var chairMesh = Chair({ position: chair.position.toArray(), scale: 0.2 });
                var chairMesh = Chair2(model,{ position: chair.position.toArray(), scale: 0.3 });
                chairMesh.name = chair.id;
                scene.add(chairMesh);
            }
        });
    }, 1500);

    var settings = {
        row: -1,
        col: 11
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
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(255, 255, 255)');
    document.getElementById('webgl').appendChild(renderer.domElement);
    
    var controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 1.998, -0.99);

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
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.35 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
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
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.35 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
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
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.35 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
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
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0-chair.position.x) * 0.01, chair.position.y + 0.35 + (1-chair.position.y) * 0.01, chair.position.z+(7-chair.position.z) * 0.01);
                }
            });
        }
        console.log(target);
    });


    update(renderer, scene, camera, controls);

    return scene;
}

function Wall({ position, rotation, color, isTexture =false, transparent = false, opacity = 1, args }) {
    var wall = new THREE.Group();

    var plane = getPlane(args[0], args[1], color, isTexture);
    plane.position.set(position[0], position[1], position[2]);
    plane.rotation.set(rotation[0], rotation[1], rotation[2]);
    plane.name = 'wall';
    wall.add(plane);

    return wall;
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

function Chair2(model,{ position, onClick, scale, isSeatSelected }) {
    // console.log(model);
    // const rotationY = Math.PI; // Rotate 180 degrees to face the screen
    if (model === undefined) {
        var loader = new OBJLoader();
        var chair = new THREE.Group();
        loader.load('chair2.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 'black' });
                }
            });
        // save object to global variable
        model = object;
        chair.add(model);
        chair.position.set(position[0], position[1], position[2]);
        chair.scale.set(scale, scale, scale);
        // chair.rotation.set(0, rotationY, 0);
        chair.onClick = onClick;
        chair.isSeatSelected = isSeatSelected;
        });
    }
    else {
        var chair = model.clone();
        chair.position.set(position[0], position[1], position[2]);
        chair.scale.set(scale, scale, scale);
        // chair.rotation.set(0, rotationY, 0);
        chair.onClick = onClick;
        chair.isSeatSelected = isSeatSelected;

        // Load the texture
        var loader = new THREE.TextureLoader();
        loader.load('chair.jpg', function(texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);

            // Apply the texture to each mesh in the chair model
            chair.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    // Apply the texture to the material of the mesh
                    child.material = new THREE.MeshStandardMaterial({ map: texture , color: 0x666666});
                }
            });
        });
    }

    return chair;
}

function StairBlock({ position}) {
    var stairBlock = getBox(0.2, 0.05, 0.225, 'grey');
    stairBlock.position.set(position[0], position[1] - 0.075, position[2] + 0.43);
    stairBlock.name = 'stairBlock';
    stairBlock.receiveShadow = true;
    return stairBlock;
}

function Room() {
    var room = new THREE.Group();

    var floor = Wall({ position: [0, 0, 2.5], rotation: [-Math.PI / 2, 0, 0], color: 'grey', isTexture: true, args: [5, 8] });
    floor.name = 'floor';
    room.add(floor);

    var ceiling = Wall({ position: [0, 3, 2.5], rotation: [Math.PI / 2, 0, 0], color: 'grey', isTexture: true, args: [5, 8] });
    ceiling.name = 'ceiling';
    ceiling.receiveShadow = true;
    room.add(ceiling);

    var stage = getBox(5, 0.1, 1.69, 'dimgrey');
    stage.position.set(0, 0.05, 5.6705);
    stage.name = 'stage';
    stage.receiveShadow = true;
    room.add(stage);

    // var lightFrontLeft = getPointLight(2, 'rgb(255, 255, 255)');
    // lightFrontLeft.position.set(-1, 2, 2);
    // lightFrontLeft.name = 'lightFrontLeft';
    // room.add(lightFrontLeft);

    // var lightFrontRight = getPointLight(2, 'rgb(255, 255, 255)');
    // lightFrontRight.position.set(1, 2, 2);
    // lightFrontRight.name = 'lightFrontRight';
    // room.add(lightFrontRight);

    // var lightBackLeft = getPointLight(1, 'rgb(255, 255, 255)');
    // lightBackLeft.position.set(-2, 3, 6);
    // lightBackLeft.name = 'lightBackLeft';
    // room.add(lightBackLeft);

    // var lightBackRight = getPointLight(1, 'rgb(255, 255, 255)');
    // lightBackRight.position.set(2, 3, 6);
    // lightBackRight.name = 'lightBackRight';
    // room.add(lightBackRight);

    var centerLight = getPointLight(10, 'rgb(255, 255, 255)');
    centerLight.position.set(0, 2, 5);
    centerLight.name = 'centerLight';
    room.add(centerLight);


    var backWall = Wall({ position: [0, 1.5, -1.5], rotation: [Math.PI, Math.PI, 0], color: 'dimgrey', args: [5, 3] });
    backWall.name = 'backWall';
    room.add(backWall);

    var backStage = getBox(5, 1.1, 1.45, 'grey');
    backStage.position.set(0, 0.55, -0.830);
    backStage.name = 'backStage';
    backStage.receiveShadow = true;
    room.add(backStage);



    for (let i = 1; i <= 11; i++) {
        var subStage = getBox(5, 1.2 - (i * 0.1), i * 0.45, 'grey');
        subStage.position.set(0, 0.6 - (i * 0.05), i*0.225 - 0.125);
        // subStage.name = `subStage${i}`;
        subStage.receiveShadow = true;
        room.add(subStage);
    }

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
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    var loader = new THREE.TextureLoader();
    loader.load('wall.jpg', function(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
    }
    );
    
    return mesh;
}

function getPlane(w, h, color = 0xffffff, isTexture = false) {
    var geometry = new THREE.PlaneGeometry(w, h);
    var material = getMaterial('standard', color);
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    if (isTexture) {
        var loader = new THREE.TextureLoader();
        loader.load('wall.jpg', function(texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);
            mesh.material.map = texture;
            mesh.material.needsUpdate = true;
        }
        );
    }

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
