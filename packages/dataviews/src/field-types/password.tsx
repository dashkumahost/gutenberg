/**
 * Internal dependencies
 */
import type { FieldType } from '../types/private';
import isValidRequired from './utils/is-valid-required';
import isValidMinLength from './utils/is-valid-min-length';
import isValidMaxLength from './utils/is-valid-max-length';
import isValidPattern from './utils/is-valid-pattern';
import isValidElements from './utils/is-valid-elements';
import render from './utils/render-default';
import getFormat from './utils/get-format-empty';

export default {
	type: 'password',
	render,
	Edit: 'password',
	sort: () => 0, // Passwords should not be sortable for security reasons
	enableSorting: false,
	enableGlobalSearch: false,
	defaultOperators: [],
	validOperators: [],
	getFormat,
	formatValue: ( item, field ) =>
		field.getValue( { item } ) ? '••••••••' : '',
	validate: {
		required: isValidRequired,
		pattern: isValidPattern,
		minLength: isValidMinLength,
		maxLength: isValidMaxLength,
		elements: isValidElements,
	},
} satisfies FieldType< any >;
