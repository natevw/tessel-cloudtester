require('net').createServer(function (s) {
  var remote = [s.remoteAddress, s.remotePort].join(':');
  console.log("open:", remote);
  require('fs').createReadStream("/dev/random").pipe(s);
  s.on('close', function () {
    console.log("close:", remote);
  });
  s.on('error', function (e) {
     console.log("error:", remote, e);
  });
}).listen(+process.env.PORT, function () {
    console.log("listening @ %s:%s", this.address().address, this.address().port);
});