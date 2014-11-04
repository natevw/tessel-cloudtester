var tessel = require('tessel');

var num = +require('fs').readFileSync("./the_number").toString(),
    led = tessel.led[num % 2].output(0);

function wait_on(ms, cb) {
  console.log('on', ms);
  led.write(1);
  setTimeout(cb, ms);
}

function wait_off(ms, cb) {
  console.log('off', ms);
  led.write(0);
  setTimeout(cb, ms);
}

function blinkOnce(ms, cb) {
  wait_on(ms, function () {
    wait_off(ms, cb);
  });
}

var blinksLeft;    
function nextAction() {
  if (blinksLeft) {
    blinksLeft -= 1;
    blinkOnce(100, nextAction);
  } else {
    blinksLeft = num;
    wait_off(1e3, nextAction);
  }
}
nextAction();
