
// Validation Interface
export interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

export function validate(validObj: Validatable): boolean {
    let isValid = true
    if (validObj.required)
        isValid = isValid && validObj.value.toString().trim().length !== 0;
    if (typeof validObj.value == 'string') {
        if (validObj.minLength != null)
            isValid = isValid && validObj.value.trim().length >= validObj.minLength;
        if (validObj.maxLength != null)
            isValid = isValid && validObj.value.trim().length <= validObj.maxLength;
    } else if (typeof validObj.value == 'number') {
        if (validObj.min != null)
            isValid = isValid && (+validObj.value) >= validObj.min;
        if (validObj.max != null)
            isValid = isValid && (+validObj.value) <= validObj.max;
    }
    return isValid;
}
