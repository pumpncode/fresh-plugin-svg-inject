import config, { deno } from "@pumpn/eslint-config";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const maxLineLength = 100;
const tabWidth = 4;

export default [
	...config,
	deno,
	eslintPluginUnicorn.configs["flat/recommended"],
	{
		rules: {
			"import/no-extraneous-dependencies": "off",
			"import/no-unresolved": "off",
			"jsdoc/check-tag-names": [
				"error",
				{
					definedTags: ["category", "component"]
				}
			],
			"jsdoc/no-defaults": "off",
			"jsdoc/no-undefined-types": [
				"error",
				{
					definedTypes: ["Iterable"]
				}
			],
			"max-len": [
				"error",
				{
					code: maxLineLength,
					tabWidth,
					ignoreComments: true,
					ignoreTrailingComments: false,
					ignoreUrls: true,
					ignoreStrings: false,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true
				}
			],
			"max-statements": [
				"error",
				{
					max: 50
				}
			],
			"no-bitwise": "off",
			"no-magic-numbers": [
				"error",
				{
					ignore: [
						0,
						1,
						2
					]
				}
			],
			"no-return-await": "off",
			"no-undefined": "off",
			"react/jsx-sort-props": [
				"error",
				{
					callbacksLast: true,
					shorthandFirst: true
				}
			],
			"spaced-comment": "off",
			"unicorn/no-await-expression-member": "off",
			"unicorn/no-null": "off",
			"unicorn/prefer-ternary": ["error", "only-single-line"]
		},
		settings: {
			jsdoc: {
				mode: "typescript",
				tagNamePreference: {
					extends: "extends",
					augments: "extends",
					method: "method",
					function: "method"
				}
			}
		}
	}
];
