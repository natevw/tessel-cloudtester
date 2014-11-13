var _ARG = process.argv[2].split(':'),
    HOST = _ARG[0],
    PORT = +_ARG[1];
console.log("connecting to %s:%s", HOST, PORT);
require('net').connect(PORT, HOST, function () {
    var s = this,
        start = Date.now(),
        bytes = 0,
        stats = null;//setInterval(logStats, 1e3);
    console.log("connected");
    s.on('data', function (d) {
        bytes += d.length;
        logStats();
    });
    s.on('end', function () {
        console.log("transfer ended");
        clearInterval(stats);
        logStats();
    });
    s.on('error', function (e) {
        console.log("error", e);
    });
    function logStats() {
        var elapsed = (Date.now() - start) / 1e3,
            bitrate = (bytes * 8) / elapsed / 1024 / 1024;
        console.log("%s Mbps — %s bytes in %s seconds", bitrate.toFixed(2), bytes, elapsed.toFixed(1));
    }
});