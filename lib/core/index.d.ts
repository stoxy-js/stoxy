export interface WriteResult {
    key: string;
    value: any;
}

/**
 * Get the state object data from Stoxy.
 * Returns a promise, which when resolved contains the state object data
 *
 * @param {string} key  Key of state object
 * @returns {Promise<any>}
 */
export function read(key: string): Promise<any>;

/**
 * Write the state object by key
 * Writes onto the state object given a key and a value
 *
 * Returns a promise, with the write result
 *
 * @param {string} key  Key of state object
 * @param {any} value  Value of the state object to write
 * @returns {Promise<WriteResult>}
 */
export function write(key: string, value: any): Promise<WriteResult>;

/**
 * Clear state object from state cache and IndexedDB (is persisted).
 *
 * Clears the state object with the given key.
 *
 * @param {string} key  Key of state object
 * @returns {Promise<void>}
 */
export function clear(key: string): Promise<void>;

/**
 * Subscribe to updates in state of wanted object.
 *
 * Allows you to programmatically react to state changes in wanted state objects
 *
 * @param {string} key  Key of state object
 * @param {Function} callback  Callback Function to call when state of given key is updated
 * @returns {void}
 */
export function sub(key: string, callback: Function): void;

/**
 * Add an element to the state object array by key.
 *
 * If no state atom for key is set, an empty array is initialized before adding object.
 *
 * Returns a promise, with the write result
 *
 * @param {string} key  Key of state object
 * @param {any} value  Value of the state object to add
 * @returns {Promise<WriteResult>}
 */
export function add(key: string, value: any): Promise<WriteResult>;

/**
 * Remove object(s) from a state object using a predicate.
 *
 * Allows for removing one of multiple objects from the state object without having to read the object data manually.
 *
 * @param {string} key  Key of state object
 * @param {Function} predicate  Predicate function by which the objects are removed
 * @returns {Promise<WriteResult>}
 */
export function remove(key: string, predicate: Function): Promise<WriteResult>;

/**
 * Declare a state object to be persisted through pageloads
 *
 * @param {...string[]} keyOrKeys One or more keys as string, separated by a comma (varargs)
 * @returns {void}
 */
export function persistKey(...keyOrKeys: string[]): void;

/**
 * Update state without having to manually read the state object
 *
 * @param {string} key  Key of state object
 * @param {Function} delegate  Delegate function to update the state by
 * @returns {Promise<WriteResult>}
 */
export function update(key: string, delegate: Function): Promise<WriteResult>;
