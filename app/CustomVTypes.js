Ext.apply(Ext.form.field.VTypes, {
	customPass: function(val, field) {
		return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(val);
	},
	customPassText: 'Not a valid password. \
		Password must contain one number, one lowercase letter, \
		one uppercase letter, and one special symbol @#$%.'
})