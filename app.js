
var Mindwave = require('mindwave');
var mw = new Mindwave();

var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var host = "192.168.0.2",
    username = "5s27H-tZVGzQ8IwisyTCo6dOq9cEgoPhuhdpkqMC",
    api = new HueApi(host, username),
    state;


function printToCsv(eegData) {
  var fs = require('fs');
  var json2csv = require('json2csv');
  var newLine= "\r\n";

  var toCsv = {
      data: eegData,
      hasCSVColumnTitle: false
  };

  var csv = json2csv(toCsv) + newLine;
  console.log('csv', csv);

  fs.appendFile('unsteady.csv', csv, function (err) {
    if (err) throw err;
    //console.log('Appended: ', csv);
  });
}

function attnColorChange(attn) {
  rVal = (attn * 255) / 100
  bVal = ((100 - attn) * 255) / 100
  state = lightState.create().on().brightness(attn)
                    .rgb(rVal,0,bVal).transitionSlow();
  api.setLightState(2, state)
  api.setLightState(3, state)
}

function medColorChange(med) {
  bVal = (med * 255) / 100
  rVal = ((100 - med) * 255) / 100
  state = lightState.create().on().brightness(bVal).saturation(bVal)
                    .rgb(0,0,bVal).transitionSlow();
  api.setLightState(4, state)
  // api.setLightState(3, state)
}

// mw.on('eeg', function(eeg){
//     console.log('eeg', eeg);
// });

// mw.on('signal', function(signal){
//     console.log('poor signal', signal);
// });

mw.on('attention', function(attention){
    console.log('attention', attention);
    attnColorChange(attention)
});

mw.on('meditation', function(meditation){
    console.log('meditation', meditation);
    medColorChange(meditation);
});

// mw.on('blink', function(blink){
//     console.log('blink', blink);
// });

// These are the raw EEG data
// They come in at about 512Hz
// mw.on('wave', function(wave){
// 	console.log('wave', wave);
// });

mw.connect('/dev/tty.MindWaveMobile-SerialPo');
