/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { Field, FormatNumber, NormalizedField } from '../types';
import type { FieldType } from '../types/private';
import {
	OPERATOR_IS,
	OPERATOR_IS_NOT,
	OPERATOR_LESS_THAN,
	OPERATOR_GREATER_THAN,
	OPERATOR_LESS_THAN_OR_EQUAL,
	OPERATOR_GREATER_THAN_OR_EQUAL,
	OPERATOR_IS_ANY,
	OPERATOR_IS_NONE,
	OPERATOR_IS_ALL,
	OPERATOR_IS_NOT_ALL,
	OPERATOR_BETWEEN,
} from '../constants';
import sort from './utils/sort-number';
import isValidRequired from './utils/is-valid-required';
import isValidMin from './utils/is-valid-min';
import isValidMax from './utils/is-valid-max';
import isValidElements from './utils/is-valid-elements';
import render from './utils/render-default';

function getFormat< Item >( field: Field< Item > ): Required< FormatNumber > {
	const fieldFormat = field.format as FormatNumber | undefined;
	return {
		separatorThousand:
			fieldFormat?.separatorThousand !== undefined &&
			typeof fieldFormat.separatorThousand === 'string'
				? fieldFormat.separatorThousand
				: ',',
		separatorDecimal:
			fieldFormat?.separatorDecimal !== undefined &&
			typeof fieldFormat.separatorDecimal === 'string'
				? fieldFormat.separatorDecimal
				: '.',
		decimals:
			fieldFormat?.decimals !== undefined &&
			typeof fieldFormat.decimals === 'number' &&
			fieldFormat.decimals >= 0 &&
			fieldFormat.decimals <= 100 &&
			Number.isInteger( fieldFormat.decimals )
				? fieldFormat.decimals
				: 2,
	};
}

function formatValue< Item >( item: Item, field: NormalizedField< Item > ) {
	let value = field.getValue( { item } );
	if ( value === null || value === undefined ) {
		return '';
	}

	value = Number( value );
	if ( ! Number.isFinite( value ) ) {
		return String( value );
	}

	let format: Required< FormatNumber >;
	if ( field.type !== 'number' ) {
		format = getFormat( field as Field< any > );
	} else {
		format = field.format as Required< FormatNumber >;
	}

	const { separatorThousand, separatorDecimal, decimals } = format;
	const fixedValue = value.toFixed( decimals );
	const [ integerPart, decimalPart ] = fixedValue.split( '.' );
	const formattedInteger = separatorThousand
		? integerPart.replace( /\B(?=(\d{3})+(?!\d))/g, separatorThousand )
		: integerPart;
	return decimals === 0
		? formattedInteger
		: formattedInteger + separatorDecimal + decimalPart;
}

function isEmpty( value: unknown ): value is '' | undefined | null {
	return value === '' || value === undefined || value === null;
}

function isValidCustom< Item >( item: Item, field: NormalizedField< Item > ) {
	const value = field.getValue( { item } );

	if ( ! isEmpty( value ) && ! Number.isFinite( value ) ) {
		return __( 'Value must be a number.' );
	}

	return null;
}

export default {
	type: 'number',
	render,
	Edit: 'number',
	sort,
	enableSorting: true,
	enableGlobalSearch: false,
	defaultOperators: [
		OPERATOR_IS,
		OPERATOR_IS_NOT,
		OPERATOR_LESS_THAN,
		OPERATOR_GREATER_THAN,
		OPERATOR_LESS_THAN_OR_EQUAL,
		OPERATOR_GREATER_THAN_OR_EQUAL,
		OPERATOR_BETWEEN,
	],
	validOperators: [
		// Single-selection
		OPERATOR_IS,
		OPERATOR_IS_NOT,
		OPERATOR_LESS_THAN,
		OPERATOR_GREATER_THAN,
		OPERATOR_LESS_THAN_OR_EQUAL,
		OPERATOR_GREATER_THAN_OR_EQUAL,
		OPERATOR_BETWEEN,
		// Multiple-selection
		OPERATOR_IS_ANY,
		OPERATOR_IS_NONE,
		OPERATOR_IS_ALL,
		OPERATOR_IS_NOT_ALL,
	],
	getFormat,
	formatValue,
	validate: {
		required: isValidRequired,
		min: isValidMin,
		max: isValidMax,
		elements: isValidElements,
		custom: isValidCustom,
	},
} satisfies FieldType< any >;
