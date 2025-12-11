/**
 * WordPress dependencies
 */
import { dateI18n, getDate, getSettings } from '@wordpress/date';

/**
 * Internal dependencies
 */
import type {
	Field,
	FormatDate,
	NormalizedField,
	SortDirection,
} from '../types';
import type { FieldType } from '../types/private';
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
	OPERATOR_BETWEEN,
	DAYS_OF_WEEK,
} from '../constants';
import isValidRequired from './utils/is-valid-required';
import render from './utils/render-default';

function formatValue< Item >( item: Item, field: NormalizedField< Item > ) {
	const value = field.getValue( { item } );
	if ( ! value ) {
		return '';
	}

	let format: Required< FormatDate >;
	if ( field.type !== 'date' ) {
		format = getFormat( {} as Field< any > );
	} else {
		format = field.format as Required< FormatDate >;
	}

	return dateI18n( format.date, getDate( value ) );
}

function getFormat< Item >( field: Field< Item > ): Required< FormatDate > {
	const fieldFormat = field.format as FormatDate | undefined;
	return {
		date:
			fieldFormat?.date !== undefined &&
			typeof fieldFormat.date === 'string'
				? fieldFormat.date
				: getSettings().formats.date,
		weekStartsOn:
			fieldFormat?.weekStartsOn !== undefined &&
			DAYS_OF_WEEK.includes( fieldFormat?.weekStartsOn )
				? fieldFormat.weekStartsOn
				: getSettings().l10n.startOfWeek,
	};
}

const sort = ( a: any, b: any, direction: SortDirection ) => {
	const timeA = new Date( a ).getTime();
	const timeB = new Date( b ).getTime();

	return direction === 'asc' ? timeA - timeB : timeB - timeA;
};

export default {
	type: 'date',
	render,
	Edit: 'date',
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
		OPERATOR_BETWEEN,
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
		OPERATOR_BETWEEN,
	],
	getFormat,
	formatValue,
	validate: {
		required: isValidRequired,
		elements: isValidElements,
	},
} satisfies FieldType< any >;
