import type { NormalizedField } from '../../types';

function formatValue< Item >( item: Item, field: NormalizedField< Item > ) {
	return field.getValue( { item } );
}

export default formatValue;
