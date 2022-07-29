import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { getBlockDefaultClassName } from '@wordpress/blocks';

const JMH_GALLERY_ITEM_TEMPLATE = [
	[ 'core/image', {} ],
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
	const blockName = getBlockDefaultClassName( 'jmhblocks/grid-gallery-item');

	const {
		gridColumnSpan,
		gridRowSpan,
		gridColumnSpanMobile,
		gridRowSpanMobile,
	 } = attributes;

	return ([
		<InspectorControls>
			<PanelBody title={ __( 'Image Settings', 'jmhblocks' )} initialOpen={ true }>
				<PanelRow>
					<p><strong>Select the number of <em>columns</em> the image should span on small screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 1 }
					max={ 4 }
					step={ 1 }
					value={ gridColumnSpanMobile }
					label={ __( 'Grid Columns Mobile: ', 'jmhblocks' ) }
					onChange={ ( newColumnSpanMobile ) => setAttributes( { gridColumnSpanMobile: newColumnSpanMobile } ) } 
				/>

				<PanelRow>
					<p><strong>Select the number of <em>rows</em> the image should span on small screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 1 }
					max={ 4 }
					step={ 1 }
					value={ gridRowSpanMobile }
					label={ __( 'Grid Rows Mobile: ', 'jmhblocks' ) }
					onChange={ ( newRowSpanMobile ) => setAttributes( { gridRowSpanMobile: newRowSpanMobile } ) } 
				/>

				<PanelRow>
					<p><strong>Select the number of <em>columns</em> the image should span on large screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 1 }
					max={ 12 }
					step={ 1 }
					value={ gridColumnSpan }
					label={ __( 'Grid Columns Desktop: ', 'jmhblocks' ) }
					onChange={ ( newColumnSpan ) => setAttributes( { gridColumnSpan: newColumnSpan } ) } 
				/>

				<PanelRow>
					<p><strong>Select the number of <em>rows</em> the image should span on large screens.</strong></p>
				</PanelRow>
				<RangeControl
					min={ 1 }
					max={ 12 }
					step={ 1 }
					value={ gridRowSpan }
					label={ __( 'Grid Rows Desktop: ', 'jmhblocks' ) }
					onChange={ ( newRowSpan ) => setAttributes( { gridRowSpan: newRowSpan } ) } 
				/>
			</PanelBody>
		</InspectorControls>,
		
		<div className={ `${ blockName }` } 
			 data-column-span={ gridColumnSpan } 
			 data-row-span={ gridRowSpan }
			 data-column-span-mobile={ gridColumnSpanMobile } 
			 data-row-span-mobile={ gridRowSpanMobile }
		>
			<InnerBlocks template={ JMH_GALLERY_ITEM_TEMPLATE } templateLock={ true } />
		</div>
	]);
}