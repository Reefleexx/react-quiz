export function createControl(data, validation) {
    return{
        ...data,
        validation,
        value: '',
        touched: false,
        valid: !validation,
    }
}

export function isValid (value, validation) {
    let valid = true

    if (!validation) {
        return true
    }

    if(validation.required){
        valid = value.trim() !== '' && valid
    }

    return valid
}