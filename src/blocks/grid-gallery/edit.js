import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { getBlockDefaultClassName } from '@wordpress/blocks';

const JMH_GRID_GALLERY_TEMPLATE = [
	[ 'jmhblocks/section-intro', {} ],
	[ 'jmhblocks/grid-gallery-item', {} ]
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockName = getBlockDefaultClassName( 'jmhblocks/grid-gallery');

	const {
		rowHeight,
		rowHeightMobile,
	 } = attributes;

	return ([
		<InspectorControls>
			<PanelBody title={ __( 'Grid Settings', 'jmhblocks' )} initialOpen={ true }>
				<PanelRow>
					<p><strong>Set the height for a single row on smaller screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 10 }
					max={ 500 }
					step={ 10 }
					value={ rowHeightMobile }
					label={ __( 'Row Height Mobile: ', 'jmhblocks' ) }
					onChange={ ( newRowHeightMobile ) => setAttributes( { rowHeightMobile: newRowHeightMobile } ) } 
				/>
				<PanelRow>
					<p><strong>Set the height for a single row on larger screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 10 }
					max={ 1000 }
					step={ 10 }
					value={ rowHeight }
					label={ __( 'Row Height: ', 'jmhblocks' ) }
					onChange={ ( newRowHeight ) => setAttributes( { rowHeight: newRowHeight } ) } 
				/>
			</PanelBody>
		</InspectorControls>,
		
		<div class="grid-gallery" style={{ '--rowSize': rowHeight, '--rowSizeMobile': rowHeightMobile }}>
			<InnerBlocks template={ JMH_GRID_GALLERY_TEMPLATE } allowedBlocks={ [ 'jmhblocks/grid-gallery-item' ] } />
		</div>
	]);
}