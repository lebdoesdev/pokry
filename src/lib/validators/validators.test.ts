import { describe, it, expect, vi, beforeEach } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { between, email, lookup, max, mime, mimetype, min, not, pattern, required, required_if, same, url } from './rules';
import { extractValidatorFromValidationString, extractValuesFromValidationString, parseValidationString } from './validation-helpers';
import { DEFAULT_FORM } from '$lib/consts/default-form';

const fetchMocker = createFetchMock(vi);

fetchMocker.enableMocks();

// ----- BETWEEN VALIDATOR TESTS

describe('between test', () => {
    it('resolves true if the number is between 2 specified numbers', async () => {
        expect(await between(5, 1, 10)).toBe(true);
    });

    it('resolves false if the number is outside of the 2 specified numbers', async () => {
        expect(await between(1, 5, 10)).toBe(false);
    });
});

// ----- EMAIL VALIDATOR TESTS

describe('email test', () => {
    it('resolves true if the string is a valid email address', async () => {
        expect(await email('support@pokry.lib')).toBe(true);
    });

    it('resolves false if the string is an invalid email address', async () => {
        expect(await email('invalid')).toBe(false);
    });

    it('resolves false if another type other than string is passed in', async () => {
        expect(await email(1)).toBe(false);
    });
})

describe('lookup test', () => {
    beforeEach(() => {
        fetchMocker.doMock(req => {
            return {
                status: 404
            }
        });
    })

    it('resolves true if the status code returned is what is specified', async () => {
        expect(await lookup('example', '/emails', 'GET', 404, 'email')).toBe(true);
    });

    it('resolves false if the status code returned is different to what is specified', async () => {
        expect(await lookup('example', '/emails', 'GET', 200, 'email')).toBe(false);
    });
})

// ----- MAX VALIDATOR TESTS

describe('max test', () => {
    it('resolves true if a string length is less than the specified maximum', async () => {
        expect(await max('Pokry', 10)).toBe(true);
    });

    it('resolves false if a string length is greater than the specified maximum', async () => {
        expect(await max('Pokry', 1)).toBe(false);
    });

    it('resolves true if a array length is less than the specified maximum', async () => {
        expect(await max([1, 2, 3], 10)).toBe(true);
    });

    it('resolves false if a array length is greater than the specified maximum', async () => {
        expect(await max([1, 2], 1)).toBe(false);
    });

    it('resolves true if a number is less than the specified maximum', async () => {
        expect(await max(3, 10)).toBe(true);
    });
    
    it('resolves false if a number is greater than the specified maximum', async () => {
        expect(await max(10, 1)).toBe(false);
    });

    it('resolves true if a file size is less than the specified maximum', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'size', { value: 100 });

        expect(await max(file, 1000)).toBe(true);
    });

    it('resolves false if a file size is greater than the specified maximum', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'size', { value: 100 });

        expect(await max(file, 1)).toBe(false);
    });
});

// ----- MIME VALIDATOR TESTS

describe('mime tests', () => {
    it('returns false if the value is not a file', async () => {
        expect(await mime('string', 'png', 'jpg')).toBe(false);
    });

    it('returns true if the file extension matches a given mime', async () => {
        const file = new File([''], 'example.jpg');

        expect(await mime(file, 'jpg')).toBe(true);
    });

    it('returns false if the file extension does not match a given mime', async () => {
        const file = new File([''], 'example.txt');

        expect(await mime(file, 'jpg')).toBe(false);
    });
})

// ----- MIME TYPE VALIDATOR TESTS

describe('mimetype tests', () => {
    it('returns false if the value is not a file', async () => {
        expect(await mimetype('string', 'image/png')).toBe(false);
    });

    it('returns true if the file is of a matching mime type', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'type', { value: 'image/png' });

        expect(await mimetype(file, 'image/png')).toBe(true);
    });

    it('returns false if the file is not of a matching mime type', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'type', { value: 'application/json' });

        expect(await mimetype(file, 'image/png')).toBe(false);
    });
});

// ----- MIN VALIDATOR TESTS

describe('min test', () => {
    it('resolves true if a string length is greater than the specified minimum', async () => {
        expect(await min('Pokry', 1)).toBe(true);
    });

    it('resolves false if a string length is less than the specified minimum', async () => {
        expect(await min('a', 2)).toBe(false);
    });

    it('resolves true if a array length is greater than the specified minimum', async () => {
        expect(await min([1, 2, 3], 1)).toBe(true);
    });

    it('resolves false if a array length is less than the specified minimum', async () => {
        expect(await min([1, 2], 5)).toBe(false);
    });

    it('resolves true if a number is greater than the specified minimum', async () => {
        expect(await min(4, 1)).toBe(true);
    });
    
    it('resolves false if a number is less than the specified minimum', async () => {
        expect(await min(1, 10)).toBe(false);
    });

    it('resolves true if a file size is greater than the specified minimum', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'size', { value: 100 });

        expect(await min(file, 50)).toBe(true);
    });

    it('resolves false if a file size is less than the specified minimum', async () => {
        const file = new File([''], 'example.txt');
        Object.defineProperty(file, 'size', { value: 100 });

        expect(await min(file, 500)).toBe(false);
    });
});

// ----- NOT VALIDATOR TESTS

describe('not tests', () => {
    it('inverts the result from a validator and returns false as true', async () => {
        expect(await not(null, 'required')).toBe(true);
    });

    it('inverts the result from a validator and returns true as false', async () => {
        expect(await not('defined', 'required')).toBe(false);
    });
})

// ----- PATTERN VALIDATOR TESTS

describe('pattern tests', () => {
    it('resolves true if the pattern is a match', async () => {
        expect(await pattern('abcde', 'abc')).toBe(true);
    });

    it('resolves false if the pattern is not a match', async () => {
        expect(await pattern('abcde', 'abcdefghi')).toBe(false);
    });
});

// ----- REQUIRED IF VALIDATOR TESTS

describe('required if tests', () => {
    it('resolves true if a value is defined when the target is populated', async () => {
        expect(await required_if('example', 'example', 'example')).toBe(true);
    });

    it('resolves true if both properties are not defined', async () => {
        expect(await required_if(undefined, undefined, undefined)).toBe(true);
    });

    it('resolves false if the value is not defined when the criteria matches', async () => {
        expect(await required_if(null, 'example', 'example')).toBe(false);
    });
})

// ----- REQUIRED VALIDATOR TESTS

describe('required tests', () => {
    it('resolves false if the value is undefined', async () => {
        expect(await required(undefined)).toBe(false);
    })

    it('resolves false if the value is null', async () => {
        expect(await required(null)).toBe(false);
    })

    it('resolves false if the value is an empty string', async () => {
        expect(await required('')).toBe(false);
    })

    it('resolves false if the value is an string of null', async () => {
        expect(await required('null')).toBe(false);
    })

    it('resolves false if the value is an string of undefined', async () => {
        expect(await required('undefined')).toBe(false);
    })

    it('resolves false if an array is defined but empty', async () => {
        expect(await required([])).toBe(false);
    })

    it('resolves true even if a number is 0', async () => {
        expect(await required(0)).toBe(true);
    })

    it('resolves true when a string is defined', async () => {
        expect(await required('this is defined')).toBe(true);
    })

    it('resolves true when an array is defined', async () => {
        expect(await required([1, 2])).toBe(true);
    })
});

// ----- SAME VALIDATOR TESTS

describe('same tests', () => {
    it('resolves true when both the values are the same', async () => {
        expect(await same('Pokry', 'Pokry')).toBe(true);
    });

    it('resolves false when both the values are different', async () => {
        expect(await same('Pokry', '1.0.0')).toBe(false);
    });
})

// ----- URL VALIDATOR TESTS

describe('url tests', () => {
    it('resolves true when the value is a valid url', async () => {
        expect(await url('https://google.com')).toBe(true);
    });

    it('resolves false when the value is an invalid url', async () => {
        expect(await url('Pokry')).toBe(false);
    });
})

// ----- VALUE EXTRACTOR TESTS

describe('value extractor tests', () => {
    it('returns the correct result when a string is passed in', () => {
        const result = extractValuesFromValidationString('required_if:name,Pokry');

        expect(result[0]).toBe('name');
        expect(result[1]).toBe('Pokry');
    });
});

// ----- VALIDATION EXTRACTOR TESTS

describe('validator extractor tests', () => {
    it('returns the correct validator when a string is passed in', () => {
        const result = extractValidatorFromValidationString('required_if:name,Pokry');

        expect(result).toBe('required_if');
    });
});

// ----- VALIDATION PARSING EXTRACTOR TESTS

describe('validator parsing tests', () => {
    it('returns a correct object when a string is passed in', () => {
        const result = parseValidationString('required_if:name,Pokry', {
            ...DEFAULT_FORM,
            fields: [ { name: 'name', type: 'text', value: 'This is an example' }]
        });

        expect(result.validator).toBe('required_if');
        expect(result.args.length).toBe(2);
        expect(result.args[0]).toBe('This is an example');
        expect(result.args[1]).toBe('Pokry');
    })
})