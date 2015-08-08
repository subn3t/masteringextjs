Ext.define('Packt.view.main.Panel', {
	extend: 'Ext.tab.Panel',
	xtype: 'mainpanel',
	
	activeTab: 0,

	items: [{
		xtype: 'panel',
		closable: false,
		iconClas: 'fa fa-home fa-lg tabIcon',
		title: 'Home'
	}]

});