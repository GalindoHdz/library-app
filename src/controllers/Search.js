export const validWordsSearch = (word) => {
    if (!word) {
        return {
            status: false,
            message: 'Ingrese una palabra de 3 letras o mas',
            typeMessage: 'warning',
        };
    }

    if (word.length < 3) {
        return {
            status: false,
            message: 'Ingrese una palabra de 3 letras o mas',
            typeMessage: 'warning',
        };
    }

    return { status: true, message: '', typeMessage: '' };
};
