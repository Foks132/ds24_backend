const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
	plugins: ['@typescript-eslint'],
	settings: {
		'import/ignore': [],
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
	rules: {
		'no-var': ERROR,
		'max-len': OFF,
		semi: WARN,
		radix: WARN,
		'no-console': OFF,
		'no-unused-vars': WARN,
		'no-case-declarations': OFF,
		'no-useless-constructor': OFF,
		'no-shadow': WARN,
		'prefer-const': ERROR,
		'arrow-body-style': [ERROR, 'as-needed'],
		'object-shorthand': ERROR,
		'no-unneeded-ternary': [ERROR, {defaultAssignment: false}],
		'@typescript-eslint/consistent-type-imports': [ERROR, {prefer: 'type-imports'}],
		'@typescript-eslint/no-empty-function': OFF,
		'@typescript-eslint/no-unused-vars': WARN,
		'@typescript-eslint/ban-ts-comment': OFF,
		'@typescript-eslint/explicit-function-return-type': OFF,
		'@typescript-eslint/explicit-module-boundary-types': OFF,
	},
};
