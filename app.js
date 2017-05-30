// var neurosky = require('node-neurosky');
//
// var client = neurosky.createClient({
// 	appName: 'Anything2',
// 	appKey: 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
// });
//
// client.on('data',function(data){
//
// 	console.log('hi');
//
// });
//
// client.connect(function() {
// 	console.log('worked');
//
// }, function() {
// 	console.log('oh no');
// }
// );

var Mindwave = require('mindwave');
var mw = new Mindwave();

mw.on('eeg', function(eeg){
    console.log('eeg', eeg);
});

mw.on('signal', function(signal){
    console.log('signal', signal);
});

mw.on('attention', function(attention){
    console.log('attention', attention);
});

mw.on('meditation', function(meditation){
    console.log('meditation', meditation);
});

mw.on('blink', function(blink){
    console.log('blink', blink);
});

// These are the raw EEG data
// They come in at about 512Hz
// mw.on('wave', function(wave){
// 	console.log('wave', wave);
// });

mw.connect('/dev/tty.MindWaveMobile-SerialPo');
