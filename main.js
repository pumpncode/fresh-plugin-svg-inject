import { join } from "https://deno.land/std@0.211.0/path/mod.ts";

import { stringToDocument } from "./main/_exports.js";

/**
 * @typedef {import("https://deno.land/x/fresh@1.6.1/server.ts").Plugin} Plugin
 */

const {
	cwd,
	readTextFile
} = Deno;

/**
 * The SVG inject plugin.
 *
 * @param {object} [options] - The options object.
 * @param {string} [options.staticFolder] - The static folder path.
 *
 * @returns {Plugin} - The plugin.
 */
const plugin = ({ staticFolder = "./static" } = {}) => ({
	name: "svg-inject",
	renderAsync: async (context) => {
		const staticFolderPath = join(cwd(), staticFolder);
		const result = await context.renderAsync();

		const document = stringToDocument(result.htmlText);

		if (document) {
			const imgSvgElements = [...document.querySelectorAll("img[src*=\".svg\"]")];

			for (const [index, imgSvgElement] of imgSvgElements.entries()) {
				if (imgSvgElement.hasAttribute("src")) {
					const imgSource = imgSvgElement.getAttribute("src");

					const oldAttributes = [...imgSvgElement.attributes];

					if (imgSource !== null) {
						let svg;

						try {
							const svgUrl = new URL(imgSource);

							svg = await (await fetch(svgUrl)).text();
						}
						catch {
							const imgSourceFilePath = join(staticFolderPath, imgSource);

							const { pathname: imgSourceFilePathCleaned } = new URL(imgSourceFilePath, "http://localhost:8000");

							svg = await readTextFile(imgSourceFilePathCleaned);
						}

						const svgDocument = stringToDocument(svg);

						const elementsWithId = [...svgDocument.querySelectorAll("[id]")];

						const idsMap = new Map();

						for (const elementWithId of elementsWithId) {
							const id = elementWithId.getAttribute("id");

							if (id !== null) {
								const newId = `${id}-inject${index + 1}`;

								idsMap.set(id, newId);

								elementWithId.setAttribute("id", newId);
							}
						}

						for (const oldAttribute of oldAttributes) {
							if (oldAttribute.name !== "src") {
								const svgDocumentSvgElement = svgDocument.querySelector("svg");

								if (svgDocumentSvgElement) {
									svgDocumentSvgElement
										.setAttribute(oldAttribute.name, oldAttribute.value);
								}
							}
						}

						let newSvgText = svgDocument.documentElement.outerHTML
							.trim()
							.replace(/^<html><head><\/head><body>(?<svg>(?:.|\n)*?)<\/body><\/html>$/u, "$<svg>");

						for (const [id, newId] of idsMap) {
							newSvgText = newSvgText.replaceAll(`#${id}`, `#${newId}`);
						}

						imgSvgElement.outerHTML = newSvgText;
					}
				}
			}

			return {
				htmlText: document.documentElement.outerHTML
			};
		}

		return {};
	}
});

export default plugin;
