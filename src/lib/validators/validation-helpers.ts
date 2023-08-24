export function extractValuesFromValidationString(validationString: string) {
    return validationString.split(':')[1].split(',');
}

export function extractValidatorFromValidationString(validationString: string) {
    return validationString.split(':')[0];
}

export function parseValidationString(validationString: string) {
    return {
        validator: extractValidatorFromValidationString(validationString),
        args: extractValuesFromValidationString(validationString)
    }
}