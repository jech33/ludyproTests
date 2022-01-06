const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default: "ROL_USUARIO"
    },
    status: {
        type: Boolean,
        default: true
    }
});


UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    return {
        "uid": _id, 
        ...user
    };
}

module.exports = model( 'User', UserSchema );