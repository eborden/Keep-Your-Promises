function promiseWorker (script, message) {
    var d = $.Deferred(),
        w;
    if (typeof script == 'function') {
        script = window.URL.createObjectURL(new Blob(['onmessage = ' + script.toString()]));
    }
    w = new Worker(script);
    w.onmessage = function (e) {
        d.resolve(e.data);
    };
    w.onerror = function (e) {
        d.reject(e);
    };
    d.always(function () {
        if (script.substring && script.substring(0, 5) === 'blob:') {
            window.URL.revokeObjectURL(script);
        }
        w.terminate();
    });
    w.postMessage(message);
    return d.promise();
}


//script worker
promiseWorker('foo.js', ['data', 'set', 'for', 'worker']);


//inline worker
promiseWorker(function (e) {
    postMessage(e.data.map(function (d) {
        return d.toUpperCase();
    }));
}, ['inline', 'worker', 'data']).then(function (data) {
    console.log(data)
});
