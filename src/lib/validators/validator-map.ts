import type { ValidationTypes } from "$lib/types"
import { between, max, min, required, email, lookup, mimetype, mime, not, pattern, required_if, same, url } from "./rules";

type ValidatorMap = { [key in ValidationTypes ]: (value: any, ...args: any) => Promise<boolean> };

export const VALIDATOR_MAP: ValidatorMap = {
    required,
    between,
    max,
    min,
    email,
    lookup,
    mime,
    mimetype,
    not,
    pattern,
    required_if,
    same,
    url
}