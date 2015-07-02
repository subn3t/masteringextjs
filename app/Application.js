/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Pact.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Pact',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
    	var me = this;
    	var task = new Ext.util.DelayedTask(function() {
    		me.splashscreen.fadeOut({
    			duration: 1000,
    			remove: true
    		});

    		me.splashscreen.next().fadeOut({
    			duration: 1000,
    			remove: true,
    			listeners: {
    				afteranimate: function(el, startTime, eOpts) {
    					console.log('launch');
    				}
    			}
    		})
    	});

    	task.delay(2000);
    },

    init: function() {
    	var me = this;
    	me.splashscreen = Ext.getBody().mask(
    		'Loading application', 'splashscreen'
    	);

    	Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
    		cls: 'x-splash-icon'
    	});
    }

});
