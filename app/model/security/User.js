Ext.define('Packt.model.security.User', {
  extend: 'Packt.model.security.Base',
  fields: [
    { name: 'name' },
    { name: 'userName' },
    { name: 'email' },
    { name: 'picture' },
    { name: 'groups_id', type: 'int' }
  ]
});