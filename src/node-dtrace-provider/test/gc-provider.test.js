var test = require('tap').test;
var format = require('util').format;
var dtest = require('./dtrace-test').dtraceTest;

test(
    'check provider object is not GC\'d while probe exists',
    dtest(
        function() {
        },
        [
            'dtrace', '-Zqn',
            'nodeapp$target:::gcprobe{ printf("%d\\n", arg0); }',
            '-c', format('node --expose_gc %s/gc-provider_fire.js', __dirname)
        ],
        function(t, exit_code, traces) {
            t.notOk(exit_code, 'dtrace exited cleanly');
            t.equal(traces[0], '5');
        }
    )
);

