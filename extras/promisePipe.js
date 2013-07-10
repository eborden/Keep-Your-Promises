function promisePipe () {
    var d = $.Deferred(),
        args = arguments;
    setTimeout(function () {
        d.resolve.apply(null, args);
    }, 0);
    return d.promise();
}


function inc (val) {
    return val + 1;
}
function log (val) {
   console.log(val);
}
promisePipe(7).then(inc).then(inc).then(log);
console.log(20)
