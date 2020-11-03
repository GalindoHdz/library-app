export const validDataLogin = (data) => {
    const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regExp.test(data.email)) {
        return {
            status: false,
            message: 'Ingrese un email valido',
            typeMessage: 'warning',
        };
    }

    if (data.password === null || data.password === '') {
        return {
            status: false,
            message: 'Ingrese una contraseña valida',
            typeMessage: 'warning',
        };
    }

    return { status: true, message: '', typeMessage: '' };
};
