module.exports = {
	"extends": "eslint:recommended",
	"plugins": [],
	
	"env": {
		"es6": true,
		"browser": true
	},

	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module"
	},

	"rules": {
		"semi": ["error", "always", { "omitLastInOneLineBlock": true }],
		"semi-style": ["error", "last"],
		"no-unused-vars": "warn",
		"no-duplicate-imports": "error",
		"object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }],
		"prefer-rest-params": "warn",
		"prefer-spread": "warn",
		"prefer-template": "warn",
		"prefer-numeric-literals": "warn"
	},

	"overrides": [
		{
			"files": ["**/*.ts"],
			"plugins": ["@typescript-eslint"],
	
			"env": {
				"es6": true,
				"node": true
			},

			"parser": "@typescript-eslint/parser",
			"parserOptions": {
				"ecmaVersion": 6,
				"sourceType": "module",
				"project": ""
			},

			"rules": {
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "error",
				"indent": "off",
				"@typescript-eslint/indent": "off",
				"camelcase": "off",
				"@typescript-eslint/camelcase": ["error", { "properties": "never" }],
				"@typescript-eslint/no-namespace": "off",
				"@typescript-eslint/no-parameter-properties": "off",
				"@typescript-eslint/no-inferrable-types": "off"
			}
		}
	]
}