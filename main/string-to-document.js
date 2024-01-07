import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts";

/**
 * @typedef {import("https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts").DOMParserMimeType} DOMParserMimeType
 */

/**
 * @private
 */
const parser = new DOMParser();

/**
 * Converts an html string to a document object.
 *
 * @param {string} string - The html string to convert.
 *
 * @param {DOMParserMimeType} [type] - The mime type of the string.
 * @returns {Document} - The document object.
 */
const stringToDocument = (string, type = "text/html") => {
	const result = parser.parseFromString(string, type);

	if (result) {
		return result;
	}

	throw new Error("Failed to convert string to document.");
};

export default stringToDocument;
