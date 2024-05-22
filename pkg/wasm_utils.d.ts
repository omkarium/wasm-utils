/* tslint:disable */
/* eslint-disable */
/**
* @param {number} year
* @param {number} month
* @param {number} day
* @param {number} hour
* @param {number} min
* @param {number} sec
* @param {number} lat
* @param {number} long
* @param {number} timezone
* @returns {(string)[]}
*/
export function get_local_sun_info(year: number, month: number, day: number, hour: number, min: number, sec: number, lat: number, long: number, timezone: number): (string)[];
/**
* @param {number} year
* @param {number} month
* @param {number} day
* @param {number} hour
* @param {number} min
* @param {number} sec
* @param {string} lat
* @param {string} long
* @param {string} dec
* @param {string} ra
* @param {number} tz
* @returns {(string)[]}
*/
export function get_local_star_infos(year: number, month: number, day: number, hour: number, min: number, sec: number, lat: string, long: string, dec: string, ra: string, tz: number): (string)[];
/**
* @param {number} year
* @param {number} month
* @param {number} day
* @param {number} hour
* @param {number} min
* @param {number} sec
* @param {string} long
* @param {number} tz
* @returns {(string)[]}
*/
export function get_time_related(year: number, month: number, day: number, hour: number, min: number, sec: number, long: string, tz: number): (string)[];

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_local_sun_info: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly get_local_star_infos: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => void;
  readonly get_time_related: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_1: (a: number, b: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
