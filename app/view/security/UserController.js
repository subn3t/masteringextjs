Ext.define('Packt.view.security.UserController', {

  extend: 'Ext.app.ViewController',

  alias: 'controller.user',

  requires: [
    'Packt.util.Util'
  ],

  onAdd: function (button, e, options) {
    this.createDialog(null);
  },
  
  onEdit: function (button, e, options) {
    var records = this.getRecordsSelected();

    if (records[0]) {
      this.createDialog(records[0]);
    }
  },
  
  createDialog: function (record) {
    var view = this.getView();

    this.dialog = view.add({
      xtype: 'user-form',
      viewModel: {
        data: {
          title: record ? 'Edit: ' + record.get('name') : 'Add User'
        },
        links: {
          currentUser: record || {
            type: 'User',
            create: true
          }
        }
      }
    });

    this.dialog.show();
  },
  
  getRecordsSelected: function () {
    var grid = this.lookupReference('usersGrid');
    return grid.getSelection();
  },
  
  onDelete: function (button, e, options) {
    var view = this.getView(),
        records = this.getRecordsSelected(),
        store = this.getStore('users');

    if (store.getCount() >= 2 && records.length) {
      Ext.Msg.show({
        title: 'Delete?',
        msg: 'Are you sure you want to delete?',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function (buttonId) {
          store.remove(records);
          store.sync();
        }
      });
    } else if (store.getCount() === 1) {
      Ext.Msg.show({
        title: 'Warning',
        msg: 'You cannot delete all the users from the application.',
        buttons: Ext.Msg.OK,
        icon: Ext.Msg.WARNING
      });
    }
  },
  
  onSave: function (button, e, options) {
    var form = this.lookupReference('form');

    if (form && form.isValid()) {
      form.submit({
        clientValidation: true,
        url: 'php/user/save.php',
        scope: this,
        success: 'onSaveSuccess',
        failure: 'onSaveFailure'
      })
    }
  },
  
  onSaveSuccess: function (form, action) {
    this.onCancel();
    this.refresh();
    Packt.util.Util.showToast('Success! User saved.');
  },
  
  onSaveFailure: function (form, action) {
    Packt.util.Util.handleFormFailure(action);
  },
  
  onCancel: function (button, e, options) {
    this.dialog = Ext.destroy(this.dialog);
  },
  
  refresh: function (button, e, options) {
    var store = this.getStore('users');
    store.load();
  },
  
  onFileFieldChange: function (fileField, value, options) {
    var file = fileField.fileInputEl.dom.files[0],
        picture = this.lookupReference('userPicture');

    if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        picture.setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (!(/image/i).test(file.type)) {
      Ext.Msg.alert('Warning', 'You can only upload image files!');
      fileField.reset();
    }
  }

});