/**
 * Internal dependencies
 */
import type { FieldType } from '../types/private';
import formatValue from './utils/format-value';
import getFormat from './utils/get-format-empty';

export default {
	type: 'media',
	render: () => null,
	Edit: null,
	sort: () => 0,
	enableSorting: false,
	enableGlobalSearch: false,
	defaultOperators: [],
	validOperators: [],
	getFormat,
	formatValue,
	// cannot validate any constraint, so
	// the only available validation for the field author
	// would be providing a custom validator.
	validate: {},
} satisfies FieldType< any >;
