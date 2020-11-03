export const validDataSettings = (data) => {
    if (!(!!data.name || !!data.last_name || !!data.new_password) && true) {
        return {
            status: false,
            message: 'Ingrese una valor a cambiar',
            typeMessage: 'warning',
        };
    }

    if (data.password === null || data.password === '') {
        return {
            status: false,
            message: 'Ingrese una contraseña valida para actualizar los datos',
            typeMessage: 'warning',
        };
    }

    return { status: true, message: '', typeMessage: '' };
};
