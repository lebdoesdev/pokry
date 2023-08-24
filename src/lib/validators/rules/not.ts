import type { ValidationTypes } from "$lib/types"
import { VALIDATOR_MAP } from "../validator-map";

export async function not(value: any, ...args: any): Promise<boolean> {
    const validationTarget: ValidationTypes = args[0];

    args.shift();

    return await VALIDATOR_MAP[validationTarget](value, args) === false;
}