import * as THREE from 'three';
import "./style.css"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls" //OrbitControls allows the Camera to orbit around a target

//Scene 
const GesamtScene = new THREE.Scene();
const scene2 = new THREE.Scene();
const scene3 = new THREE.Scene();
const scene4 = new THREE.Scene();
const scene5 = new THREE.Scene();
const scene6 = new THREE.Scene();
const scene7 = new THREE.Scene();
const scene8 = new THREE.Scene();
const scene9 = new THREE.Scene();
let currentScene = GesamtScene;

//Creating the 3D models
const loaderGesamtK1 = new GLTFLoader();
loaderGesamtK1.load(
    '/models/GesamtKUltra.glb',
    (gltf) => {
        GesamtScene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderCK1 = new GLTFLoader();
loaderCK1.load(
    '/models/CK1.glb',
    (gltf) => {
        scene2.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderSK1 = new GLTFLoader();
loaderSK1.load(
    '/models/SK1.glb',
    (gltf) => {
        scene3.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderTK1 = new GLTFLoader();
loaderTK1.load(
    '/models/TK1.glb',
    (gltf) => {
        scene4.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderLK1 = new GLTFLoader();
loaderLK1.load(
    '/models/LK1.glb',
    (gltf) => {
        scene5.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderKK1 = new GLTFLoader();
loaderKK1.load(
    '/models/KK1.glb',
    (gltf) => {
        scene6.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);


const loaderVK1 = new GLTFLoader();
loaderVK1.load(
    '/models/VK1.glb',
    (gltf) => {
        scene7.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);


const loaderZK1 = new GLTFLoader();
loaderZK1.load(
    '/models/ZK1.glb',
    (gltf) => {
        scene8.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const loaderMK1 = new GLTFLoader();
loaderMK1.load(
    '/models/MK1.glb',
    (gltf) => {
        scene9.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);


//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Light
function addLightsToScene(scene){
    if(scene.getObjectByName('pointlight') && scene.getObjectByName('pointlight2')){
        return;
    }    
//PointLight
const pointlight = new THREE.PointLight(0xffffff, 1, 100)
pointlight.position.set(0, 10, 10)
pointlight.intensity = 1
pointlight.name = 'pointlight';
scene.add(pointlight)
//PointLight2
const pointlight2 = new THREE.PointLight(0xffffff, 1, 100)
pointlight2.position.set(0, 10, 60)
pointlight2.intensity = 1
pointlight2.name = 'pointlight2';
scene.add(pointlight2)
}
addLightsToScene(currentScene);

//Camera Einzelmodelle Ausrichtung links
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 22
scene2.add(camera);

//Camera Gesamtmodell Ausrichtung Mitte
const gesamtcamera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
gesamtcamera.position.z = 50
GesamtScene.add(gesamtcamera);

let currentCamera = gesamtcamera;

//Renderer Einzelmodelle Ausrichtung links
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setClearColor(0xffffff, 1); // Weiß/1=undurchsichtig
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(currentScene, camera)

//Renderer Gesamtmodell Ausrichtung Mitte
const gesamtcanvas = document.querySelector('.webgl2');
const gesamtrenderer = new THREE.WebGLRenderer({canvas: gesamtcanvas})
gesamtrenderer.setClearColor(0xffffff, 1); // Weiß/1=undurchsichtig
gesamtrenderer.setSize(sizes.width,sizes.height)
gesamtrenderer.setPixelRatio(2)
gesamtrenderer.render(GesamtScene, gesamtcamera)

let currentRenderer = gesamtrenderer;

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = false  //The rotation with the mouse feels better
controls.enablePan = false

//Controls Gesamtansicht
const Gesamtcontrols = new OrbitControls(gesamtcamera, gesamtcanvas)
Gesamtcontrols.enableDamping = false  //The rotation with the mouse feels better
Gesamtcontrols.enablePan = false

let currentControls = Gesamtcontrols;

//Resize (Code triggers, everytime the window is resized)
window.addEventListener('resize', () => {
//Update Sizes
sizes.width = window.innerWidth
sizes.height = window.innerHeight
//Update Camera and Renderer
currentCamera.aspect = sizes.width / sizes.height
currentCamera.updateProjectionMatrix()
currentRenderer.setSize(sizes.width, sizes.height)
})

document.getElementById('Gebäudeauswahl').addEventListener('change', (event) => {
    if(event.target.value === 'm1'){
        currentScene = GesamtScene;
        currentRenderer = gesamtrenderer;
        currentCamera = gesamtcamera;
        currentControls = Gesamtcontrols;
        canvas.classList.add('canvas-hidden');
        gesamtcanvas.classList.remove('canvas-hidden');
    } else {
        currentScene = getSceneForModel(event.target.value);
        currentRenderer = renderer;
        currentCamera = camera;
        currentControls = controls;
        gesamtcanvas.classList.add('canvas-hidden');
        canvas.classList.remove('canvas-hidden');
    }
    
    addLightsToScene(currentScene);
    currentControls.update();
    currentRenderer.render(currentScene, currentCamera);
    window.requestAnimationFrame(() => {
        currentControls.update();
        currentRenderer.render(currentScene, currentCamera);
    });
    updateInfoboxForModel(event.target.value);
});

function updateInfoboxForModel(modelValue) {
    const infobox = document.getElementById('infobox');
    const title = document.getElementById('infobox-title');
    const contentContainer = document.getElementById('infobox-content');

    let modelInfo;
    switch(modelValue) {
        case 'm1':
            modelInfo = null;
            break;
        case 'm2':
            modelInfo = {
                title: 'Haus C',
                content: [
                    { type: 'text', value: 'Selbstlernräume' },
                    { type: 'text', value: 'Psychologische Beratungsstelle' }
                    
                ]
            };
            break;
        case 'm3':
            modelInfo = {
                title: 'Haus S',
                content: [
                    { type: 'image', value: '/Fotos/S1.jpg' },
                    { type: 'text', value: 'Bibliothek' },
                    { type: 'image', value: '/Fotos/S2.jpg' }
                ]
            };
            break;
        case 'm4':
            modelInfo = {
                title: 'Haus T',
                content: [
                    { type: 'image', value: '/Fotos/T1.jpg' },
                    { type: 'text', value: 'Vorlesungsräume' },
                    { type: 'image', value: '/Fotos/T2.jpg' }
                ]
            };
            break;
        case 'm5':
            modelInfo = {
                title: 'Haus L',
                content: [
                    { type: 'image', value: '/Fotos/L1.jpg' },
                    { type: 'text', value: 'Labore' }
                ]
            };
            break;
        case 'm6':
            modelInfo = {
                title: 'Haus K',
                content: [
                    //{ type: 'text', value: 'Haus K' },
                    //{ type: 'text', value: 'Zweite Beschreibung nach dem ersten Bild.' },
                    { type: 'image', value: '/Fotos/K1.jpg' },
                    { type: 'text', value: 'Studienberatung' },
                    { type: 'image', value: '/Fotos/K2.jpg' },
                    { type: 'text', value: 'StuCa' },
                    { type: 'image', value: '/Fotos/K3.jpg' }
                ]
            };
            break;
        case 'm7':
            modelInfo = {
                title: 'Haus V',
                content: [
                    { type: 'image', value: '/Fotos/V1.jpg' },
                    { type: 'text', value: 'Rektorat' },
                    { type: 'image', value: '/Fotos/V2.jpg' }
                ]
            };
            break;
        case 'm8':
            modelInfo = {
                title: 'Haus Z',
                content: [
                    { type: 'image', value: '/Fotos/Z1.jpg' },
                    { type: 'text', value: 'Selbstlernräume' }
                ]
            };
            break;
        case 'm9':
            modelInfo = {
                title: 'Haus M',
                content: [
                    { type: 'image', value: '/Fotos/M1.jpg' },
                    { type: 'text', value: 'IuP-Amt' },
                    { type: 'image', value: '/Fotos/M2.jpg' },
                    { type: 'text', value: 'Mensa' },
                    { type: 'image', value: '/Fotos/M3.jpg' }
                ]
            };
            break;
            
        default:
            modelInfo = null;    
    }  
        
        if (modelInfo) {
            infobox.classList.remove('infobox-hidden');
            title.textContent = modelInfo.title;
            contentContainer.innerHTML = '';
            modelInfo.content.forEach(item => {
                if (item.type === 'text') {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = item.value;
                    contentContainer.appendChild(paragraph);
                } else if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.value;
                    img.alt = 'Model image';
                    contentContainer.appendChild(img);
                }
            });    
        } else {
            infobox.classList.add('infobox-hidden');
        }    
}      

function getSceneForModel(modelValue) {
    switch(modelValue) {
        case 'm2':
            return scene2;
        case 'm3':
            return scene3;
        case 'm4':
            return scene4;
        case 'm5':
            return scene5;
        case 'm6':
            return scene6;
        case 'm7':
            return scene7;
        case 'm8':
            return scene8;
        case 'm9':
            return scene9;
        default:
            return GesamtScene;
    }
}
function animate() {
    // Update controls
    currentControls.update();

    // Render the scene
    currentRenderer.render(currentScene, currentCamera);

    // Call animate again on the next frame
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
