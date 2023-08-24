export type ValidationTypes = 
    'between' | 'email' | 'lookup' | 'max' | 'min' | 'mime' | 'mimetype' | 'min' | 'not' | 'pattern' | 'required' | 'required_if' | 'same' | 'url';

export type ValidationRules = 
    `between:${number},${number}` |
    'email' |
    `lookup:${string}` | 
    `max:${number}` |
    `mime:${string}` |
    `mimetype:${string}` |
    `min:${number}` |
    `not:${string}` |
    `pattern:${string}` |
    `required` |
    `required_if:${string},${string}` |
    `same:${string}` |
    'url';