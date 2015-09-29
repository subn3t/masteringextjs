Ext.define('Packt.view.menu.Accordion', {
  extend: 'Ext.panel.Panel',
  xtype: 'mainmenu',
  width: 250,
  layout: {
    type: 'accordion',
    multi: true
  },
  collapsible: true,
  split: true,
  iconCls: 'fa fa-sitemap fa-lg',
  title: translations.menu
});