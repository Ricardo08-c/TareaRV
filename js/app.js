window.addEventListener('load', initScene)

const meteors = [
    { x: -20, y: 0, z: -30 },
    { x: -20, y: 0, z: -60 },
    { x: -20, y: 0, z: -90 },
    { x: -20, y: 0, z:-110 },
    
]

let meteor, score = 0

function initScene() {

  
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
            let a = objectToPos(this.el.getAttribute('rotation'));
            console.log(a)
            
            
            cameraRig.setAttribute('position',pos)
            cameraRig.setAttribute('rotation',a)

           
           
            let animation='property: position; from:'+camPos+'; to: '+pos+'; dur: 1000'; 
            
            
            cameraRig.setAttribute('animation',animation)
            
            console.log(cameraRig)
            document.getElementById('scores').setAttribute('value', `Cantidad de lunas visitadas: ${++score} `)
            
            
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