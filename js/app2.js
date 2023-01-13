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
