window.addEventListener('load', initScene)

const meteors = [
    { x: 0, y: 0, z: -30 },
    { x: 0, y: 0, z: 30 },
    { x: 30, y: 0, z: 0 },
    { x: -30, y: 0, z: 0 },
    { x: 20, y: 0, z: 20 },
    { x: 20, y: 0, z: -20 },
    { x: -20, y: 0, z: -20 },
    { x: -20, y: 0, z: 20 }
]

let meteor, score = 0

function initScene() {

    let orbits = document.querySelectorAll('.orbit')

    orbits.forEach(orbit => {

        meteors.forEach(pos => {

            meteor = document.createElement('a-entity')
            meteor.setAttribute('geometry', { primitive: 'sphere', radius: 2 })
            meteor.setAttribute('material', { shader: 'flat', src: '#meteor' })
            meteor.setAttribute('class', 'teleporter')
            meteor.object3D.position.set(pos.x, pos.y, pos.z)

            meteor.setAttribute('teleporter', '')

            orbit.appendChild(meteor)
        })
    })
}

AFRAME.registerComponent('shootable', {
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.parentNode.removeChild(this.el)
            document.querySelector('[text]').setAttribute('value', `Cantidad de lunas visitadas: ${++score} `)
        })
    }
})
function objectToPos(obj){
    return obj.x +" "+ obj.y + " "+ obj.z;
}

AFRAME.registerComponent('teleporter', {
    init: function () {
        this.el.addEventListener('click', () => {
            let cameraRig = document.getElementById("camera")
            let camPos = objectToPos(cameraRig.getAttribute("position"))
            
            let pos = objectToPos(this.el.getAttribute("position"));
            
            
            cameraRig.setAttribute('position',pos)
            cameraRig.setAttribute('rotation','100 90 0')
            this.el.parentNode.removeChild(this.el)
            console.log(cameraRig)
            document.querySelector('[text]').setAttribute('value', `Cantidad de lunas visitadas: ${++score} `)
            
            
        })
    }
})

AFRAME.registerComponent('scenery', {
    init: function () {
        this.el.addEventListener('click', () => {
            console.log(this.el)
            document.getElementById("scene1").setAttribute("visible", "false")
            document.getElementById("scene2").setAttribute("visible", "true")
            
        })
    }
})