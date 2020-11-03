export const validDataRecover = (data) => {
    const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regExp.test(data.email)) {
        return {
            status: false,
            message: 'Ingrese un email valido',
            typeMessage: 'warning',
        };
    }

    return { status: true, message: '', typeMessage: '' };
};
