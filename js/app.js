window.addEventListener("load", initScene);

const meteors = [
  { x: -20, y: 0, z: -30 },
  { x: -20, y: 0, z: -60 },
  { x: -20, y: 0, z: -90 },
  { x: -20, y: 0, z: -110 },
];

function initScene() {}

AFRAME.registerComponent("shootable", {
  init: function () {
    this.el.addEventListener("click", () => {
      this.el.parentNode.removeChild(this.el);
      document
        .querySelector("[text]")
        .setAttribute("value", `Cantidad de lunas visitadas: ${++score} `);
    });
  },
});
function objectToPos(obj) {
  return obj.x + " " + obj.y + " " + obj.z;
}

AFRAME.registerComponent("teleporter", {
  init: function () {
    this.el.addEventListener("click", () => {
      let cameraRig = document.getElementById("camera");
      let camPos = objectToPos(cameraRig.getAttribute("position"));

      let pos = objectToPos(this.el.getAttribute("position"));
      let a = objectToPos(this.el.getAttribute("rotation"));
      console.log(a);

      cameraRig.setAttribute("position", pos);
      cameraRig.setAttribute("rotation", a);

      let animation =
        "property: position; from:" + camPos + "; to: " + pos + "; dur: 1000";

      cameraRig.setAttribute("animation", animation);

      console.log(cameraRig);
      document
        .getElementById("scores")
        .setAttribute("value", `Cantidad de lunas visitadas: ${++score} `);
    });
  },
});

AFRAME.registerComponent("scenery", {
  init: function () {
    this.el.addEventListener("click", () => {
      console.log(this.el);
      document.getElementById("scene1").setAttribute("visible", "false");
      document.getElementById("scene2").setAttribute("visible", "true");
    });
  },
});

let score = 0;
let hit = false;
let resetId = 0;
const resetBall = () => {
  clearTimeout(resetId);
  $("#ball").body.position.set(0, 0.6, -4);
  $("#ball").body.velocity.set(0, 5, 0);
  $("#ball").body.angularVelocity.set(0, 0, 0);
  hit = false;
  resetId = setTimeout(resetBall, 6000);
};

on($("#weapon"), "collide", (e) => {
  console.log("GOLPEÓ");
  const ball = $("#ball");
  if (e.detail.body.id === ball.body.id && !hit) {
    hit = true;
    score = score + 1;
    $("#score").setAttribute("text", "value", "Score:" + score);
    clearTimeout(resetId);
    resetId = setTimeout(resetBall, 10000);
  }
});

setTimeout(resetBall, 10000);
