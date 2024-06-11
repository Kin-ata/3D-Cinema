import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';

let model;

var reserved = ['K1','K21','A1','A21',  'J12', 'J13', 'J14', 'J15', 'I9', 'I10', 'I11', 'I15', 'H9', 'H13', 'H14', 'H15', 'G9', 'G10', 'G11', 'G12', 'G15', 'F9', 'F15', 'E9', 'E13', 'E14', 'E15', 'D7', 'D8', 'D9', 'D12', 'D13', 'D14', 'D15', 'C6', 'C7', 'C8', 'C9', 'C12', 'C13', 'C14', 'C15', 'B6', 'B7', 'B8', 'B9', 'B13', 'B14', 'A7', 'A8'];
var selectedSeats = [];

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

        model = object;
    });

    var room = Room();
    room.name = 'room';
    scene.add(room);

    var screen = CinemaScreen({ position: [-0.05, 1, 3.9], videoUrl: 'video.mp4', muted: true });
    // unmuting the video
    screen.name = 'screen';
    scene.add(screen);

    var ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 1);
    scene.add(ambientLight);


    const alphabetic = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
    var chairs = [[...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)], [...Array(25)]].map((row, index) => {
        var temp = 0;
        return row.map((seat, i) => {
            let seatPostion = 13 - i;
            if (i === 5 || i === 6 || i === 18 || i === 19) {
                temp++;
                return {
                    id: 'stairBlock',
                    position: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.5 * (-index + 11)) * 0.2, index * 1.5 * 0.3)
                }
            }
            else {
                return {
                    id: `${index} - ${i - temp}`,
                    position: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.5 * (-index + 11)) * 0.2, index * 1.5 * 0.3),
                    target: new THREE.Vector3(-1 * (-1 + seatPostion) * 0.2, (0.6) * 0.2, (-0.355) * 0.3),
                    seat: `${alphabetic[index]}${i + 1 - temp}`
                }
            }
        }
        )

    }).flat(Infinity)


    setTimeout(function () {
        console.log('model is loaded');
        chairs.forEach(chair => {
            if (chair.id === 'stairBlock') {
                var stairBlock = StairBlock({ position: chair.position.toArray() });
                stairBlock.name = chair.id;
                scene.add(stairBlock);
            } else {
                if (reserved.includes(chair.seat)) {
                    var chairMesh = Chair2(model, { position: chair.position.toArray(), scale: 0.3, isSeatReserved: true });
                    chairMesh.name = chair.id;
                    scene.add(chairMesh);
                } else {
                    var chairMesh = Chair2(model, { position: chair.position.toArray(), scale: 0.3, isSeatReserved: false });
                    chairMesh.name = chair.id;
                    scene.add(chairMesh);
                }
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

    document.addEventListener('DOMContentLoaded', function () {
        const seatLayout = document.getElementById('seatLayout');
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
        const totalSeats = 21;
        const layoutPattern = [5, 'empty', 11, 'empty', 5];

        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '4px 8px';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '4px';
        tooltip.style.visibility = 'hidden';
        tooltip.style.fontSize = '12px';
        tooltip.style.zIndex = '1000';
        tooltip.style.background = 'green';
        tooltip.classList.add('tooltip');
        document.body.appendChild(tooltip);
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seat-row');
            let seatCounter = totalSeats;
            layoutPattern.forEach(part => {
                if (part === 'empty') {
                    const emptySpace = document.createElement('div');
                    emptySpace.classList.add('seat-empty');
                    rowDiv.appendChild(emptySpace);
                } else {
                    for (let i = 0; i < part; i++) {
                        const seatButton = document.createElement('div');
                        seatButton.id = `${row}${seatCounter}`;
                        if (reserved.includes(seatButton.id)) {
                            seatButton.classList.add('reserved');
                        }
                        seatButton.classList.add('seat');
                        seatButton.addEventListener('mouseenter', function () {
                            if (!reserved.includes(seatButton.id)) {
                                tooltip.textContent = `${this.id}`;
                                tooltip.style.visibility = 'visible';
                                const seatRect = this.getBoundingClientRect();
                                tooltip.style.left = `${seatRect.left + (seatRect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                                tooltip.style.top = `${seatRect.top - tooltip.offsetHeight - 5}px`;
                            }
                        });
                        seatButton.addEventListener('mouseleave', function () {
                            tooltip.style.visibility = 'hidden';
                        });
                        seatButton.addEventListener('click', function () {
                            if (!reserved.includes(seatButton.id)) {
                                if (this.classList.contains('selected')) {
                                    this.classList.remove('selected');
                                    selectedSeats = selectedSeats.filter(seat => seat !== seatButton.id);
                                } else {
                                    this.classList.add('selected');
                                    settings.row = 10 - rows.indexOf(row);
                                    settings.col = seatButton.id.slice(1);
                                    target = seatButton.id;
                                    selectedSeats.push(target);
                                    chairs.forEach(chair => {
                                        if (chair.seat == target) {
                                            camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                                            controls.target.set(chair.position.x + (0 - chair.position.x) * 0.01, chair.position.y + 0.35 + (1 - chair.position.y) * 0.01, chair.position.z + (7 - chair.position.z) * 0.01);
                                        }
                                    });
                                    var seatMapModal = document.getElementById('seatMapModal');
                                }
                                console.log(selectedSeats);
                            }
                        });
                        rowDiv.appendChild(seatButton);
                        seatCounter--;
                    }
                }
            });
            seatLayout.appendChild(rowDiv);
        });

        const soundDiv = document.getElementById('sound');
        let isSoundOn = false;
        soundDiv.addEventListener('click', () => {
            console.log("clicked")
            if (isSoundOn) {
                screen.children[0].material.map.image.muted = true
                soundDiv.textContent = 'Sound Off';
            } else {
                screen.children[0].material.map.image.muted = false
                soundDiv.textContent = 'Sound On';
            }
            isSoundOn = !isSoundOn;
        });

        const buyButton = document.getElementById('buyButton');
        buyButton.addEventListener('click', () => {
            if (selectedSeats.length > 0) {
                reserved = reserved.concat(selectedSeats);
                // turn selected seats to reserved
                selectedSeats.forEach(seat => {
                    document.getElementById(seat).classList.remove('selected');
                    document.getElementById(seat).classList.add('reserved');
                    });
                    selectedSeats.sort((a, b) => {
                        return a.localeCompare(b);
                    });
                alert(`You have selected ${selectedSeats.join(', ')}`);
                selectedSeats = [];
            } else {
                alert('Please select a seat');
            }
        });
    });

    window.addEventListener('resize', function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    window.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 37 || keyCode == 65) {
            // Left arrow key
            var temp = settings.col;
            settings.col = +settings.col + 1;
            target = `${alphabetic[settings.row]}${settings.col}`;
            while (reserved.includes(target)) {
                settings.col = +settings.col + 1;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            if (settings.col > 21) {
                settings.col = temp;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0 - chair.position.x) * 0.01, chair.position.y + 0.35 + (1 - chair.position.y) * 0.01, chair.position.z + (7 - chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 39 || keyCode == 68) {
            // Right arrow key
            var temp = settings.col;
            settings.col = settings.col - 1;
            target = `${alphabetic[settings.row]}${settings.col}`;
            while (reserved.includes(target)) {
                settings.col = settings.col - 1;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            if (settings.col < 1) {
                settings.col = temp;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0 - chair.position.x) * 0.01, chair.position.y + 0.35 + (1 - chair.position.y) * 0.01, chair.position.z + (7 - chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 38 || keyCode == 87) {
            // Up arrow key
            var temp = settings.row;
            settings.row = settings.row + 1;
            target = `${alphabetic[settings.row]}${settings.col}`;
            while (reserved.includes(target)) {
                settings.row = settings.row + 1;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            if (settings.row > 10) {
                settings.row = temp;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0 - chair.position.x) * 0.01, chair.position.y + 0.35 + (1 - chair.position.y) * 0.01, chair.position.z + (7 - chair.position.z) * 0.01);
                }
            });
        } else if (keyCode == 40 || keyCode == 83) {
            // Down arrow key
            var temp = settings.row;
            settings.row = settings.row - 1;
            target = `${alphabetic[settings.row]}${settings.col}`;
            while (reserved.includes(target)) {
                settings.row = settings.row - 1;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            if (settings.row < 0) {
                settings.row = temp;
                target = `${alphabetic[settings.row]}${settings.col}`;
            }
            chairs.forEach(chair => {
                if (chair.seat == target) {
                    camera.position.set(chair.position.x, chair.position.y + 0.35, chair.position.z);
                    controls.target.set(chair.position.x + (0 - chair.position.x) * 0.01, chair.position.y + 0.35 + (1 - chair.position.y) * 0.01, chair.position.z + (7 - chair.position.z) * 0.01);
                }
            });
        }
        var tooltip = document.querySelector('.tooltip');
        tooltip.textContent = target;
        tooltip.style.visibility = 'visible';
        const seatRect = document.getElementById(target).getBoundingClientRect();
        tooltip.style.left = `${seatRect.left + (seatRect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        tooltip.style.top = `${seatRect.top - tooltip.offsetHeight - 5}px`;
    });


    update(renderer, scene, camera, controls);

    return scene;
}

function Wall({ position, rotation, color, isTexture = false, transparent = false, opacity = 1, args }) {
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

    const radius = 2.5;
    const arc = - Math.PI * 0.6;

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

function Chair2(model, { position, onClick, scale, isSeatReserved }) {
    if (model === undefined) {
        var loader = new OBJLoader();
        var chair = new THREE.Group();
        loader.load('chair2.obj', function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 'black' });
                }
            });
            model = object;
            chair.add(model);
            chair.position.set(position[0], position[1], position[2]);
            chair.scale.set(scale, scale, scale);
            chair.onClick = onClick;
            chair.isSeatReserved = isSeatReserved;
        });
    }
    else {
        var chair = model.clone();
        chair.position.set(position[0], position[1], position[2]);
        chair.scale.set(scale, scale, scale);
        chair.onClick = onClick;
        chair.isSeatReserved = isSeatReserved;

        var loader = new THREE.TextureLoader();
        loader.load('chair.jpg', function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);

            chair.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    child.material = isSeatReserved ? new THREE.MeshStandardMaterial({ map: texture, color: 0x000000 }) : new THREE.MeshStandardMaterial({ map: texture, color: 0x555555 });
                }
            });
        });
    }

    return chair;
}

function StairBlock({ position }) {
    var stairBlock = getBox(0.2, 0.05, 0.225, 'dimgrey');
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

    var lightFrontLeft = getSpotLight(10, 'rgb(255, 255, 255)');
    lightFrontLeft.position.set(-2, 2, 5);
    lightFrontLeft.name = 'lightFrontLeft';
    room.add(lightFrontLeft);

    var lightFrontRight = getSpotLight(10, 'rgb(255, 255, 255)');
    lightFrontRight.position.set(2, 2, 5);
    lightFrontRight.name = 'lightFrontRight';
    room.add(lightFrontRight);

    var lightBackLeft = getSpotLight(10, 'rgb(255, 255, 255)');
    lightBackLeft.position.set(-2, 3, 6);
    lightBackLeft.name = 'lightBackLeft';
    room.add(lightBackLeft);

    var lightBackRight = getSpotLight(10, 'rgb(255, 255, 255)');
    lightBackRight.position.set(2, 3, 6);
    lightBackRight.name = 'lightBackRight';
    room.add(lightBackRight);

    // var centerLight = getPointLight(10, 'rgb(255, 255, 255)');
    // centerLight.position.set(0, 2, 5);
    // centerLight.name = 'centerLight';
    // room.add(centerLight);




    var backStage = getBox(5, 1.1, 1.45, 'grey');
    backStage.position.set(0, 0.55, -0.830);
    backStage.name = 'backStage';
    backStage.receiveShadow = true;
    room.add(backStage);



    for (let i = 1; i <= 11; i++) {
        var subStage = getBox(5, 1.2 - (i * 0.1), i * 0.45, 'grey');
        subStage.position.set(0, 0.6 - (i * 0.05), i * 0.225 - 0.125);
        // subStage.name = `subStage${i}`;
        subStage.receiveShadow = true;
        room.add(subStage);
    }

    var backWall = Wall({ position: [0, 1.5, -1.5], rotation: [Math.PI, Math.PI, 0], color: 'dimgrey', args: [5, 3] });
    backWall.name = 'backWall';
    var frontWall = Wall({ position: [0, 1.5, 6.5], rotation: [Math.PI, 0, 0], color: 'dimgrey', args: [5, 3] });
    frontWall.name = 'frontWall';
    var leftWall = Wall({ position: [-2.5, 1.5, 2.5], rotation: [0, Math.PI / 2, 0], color: 'dimgrey', args: [8, 3] });
    leftWall.name = 'leftWall';
    var rightWall = Wall({ position: [2.5, 1.5, 2.5], rotation: [0, -Math.PI / 2, 0], color: 'dimgrey', args: [8, 3] });
    rightWall.name = 'rightWall';

    var loader = new THREE.TextureLoader();
    loader.load('sidewall.jpg', function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        backWall.children[0].material.map = texture;
        backWall.children[0].material.needsUpdate = true;
        frontWall.children[0].material.map = texture;
        frontWall.children[0].material.needsUpdate = true;
        leftWall.children[0].material.map = texture;
        leftWall.children[0].material.needsUpdate = true;
        rightWall.children[0].material.map = texture;
        rightWall.children[0].material.needsUpdate = true;
    }
    );
    room.add(backWall);
    room.add(frontWall);
    room.add(leftWall);
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
    loader.load('wall.jpg', function (texture) {
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
        loader.load('wall.jpg', function (texture) {
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

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    controls.update();
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

var scene = init();
