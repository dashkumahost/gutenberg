/**
 * Internal dependencies
 */
import type { NormalizedField, SortDirection } from '../types';
import type { FieldType } from '../types/private';
import parseDateTime from './utils/parse-date-time';
import isValidElements from './utils/is-valid-elements';
import {
	OPERATOR_ON,
	OPERATOR_NOT_ON,
	OPERATOR_BEFORE,
	OPERATOR_AFTER,
	OPERATOR_BEFORE_INC,
	OPERATOR_AFTER_INC,
	OPERATOR_IN_THE_PAST,
	OPERATOR_OVER,
} from '../constants';
import isValidRequired from './utils/is-valid-required';
import render from './utils/render-default';

function formatValue< Item >( item: Item, field: NormalizedField< Item > ) {
	const value = field.getValue( { item } );
	if ( [ '', undefined, null ].includes( value ) ) {
		return null;
	}

	try {
		const dateValue = parseDateTime( value );
		return dateValue?.toLocaleString();
	} catch ( error ) {
		return null;
	}
}

const sort = ( a: any, b: any, direction: SortDirection ) => {
	const timeA = new Date( a ).getTime();
	const timeB = new Date( b ).getTime();

	return direction === 'asc' ? timeA - timeB : timeB - timeA;
};

export default {
	type: 'datetime',
	render,
	Edit: 'datetime',
	sort,
	enableSorting: true,
	enableGlobalSearch: false,
	defaultOperators: [
		OPERATOR_ON,
		OPERATOR_NOT_ON,
		OPERATOR_BEFORE,
		OPERATOR_AFTER,
		OPERATOR_BEFORE_INC,
		OPERATOR_AFTER_INC,
		OPERATOR_IN_THE_PAST,
		OPERATOR_OVER,
	],
	validOperators: [
		OPERATOR_ON,
		OPERATOR_NOT_ON,
		OPERATOR_BEFORE,
		OPERATOR_AFTER,
		OPERATOR_BEFORE_INC,
		OPERATOR_AFTER_INC,
		OPERATOR_IN_THE_PAST,
		OPERATOR_OVER,
	],
	format: {},
	formatValue,
	validate: {
		required: isValidRequired,
		elements: isValidElements,
	},
} satisfies FieldType< any >;
