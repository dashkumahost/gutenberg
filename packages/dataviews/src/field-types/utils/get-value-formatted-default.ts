import type { NormalizedField } from '../../types';

function getValueFormatted< Item >(
	item: Item,
	field: NormalizedField< Item >
) {
	return field.getValue( { item } );
}

export default getValueFormatted;
