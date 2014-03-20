if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}



var isDev = location.href.indexOf('?dev') > 0;
// Set configuration
seajs.config({
    base: '../../sea-modules/',
    // base: isDev ? '../../sea-modules/' : '../../dist/',
    alias: {
    	'$': 'jquery/jquery/1.10.1/jquery',
    	'$-debug': 'jquery/jquery/1.10.1/jquery',
    	'jquery': 'jquery/jquery/1.10.1/jquery',
    	'underscore': 'gallery/underscore/1.5.2/underscore',
    	'backbone': 'gallery/backbone/1.1.0/backbone',
        'bootstrap': 'gallery/bootstrap/3.0.0/bootstrap'
    },
    map: [
    	['\/sea-modules\/dist', '/dist']
    // [/\/dist\/(gallery|jquery)/, '/sea-modules/$1']
    // [/\.js$/, '-debug.js']
    ]
});