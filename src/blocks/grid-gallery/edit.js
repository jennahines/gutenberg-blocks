import { TextControl } from '@wordpress/components';
import { RichText, BlockControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
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
	const blockProps = useBlockProps();

	const {
		heading,
		image
	} = attributes;
	

	return ([
		<BlockControls group="block">
			
		</BlockControls>,
		<div { ...blockProps }>
			<div class="grid container">
				<RichText key="editable"
					tagName="h2"
					allowedFormats={ [] }
					placeholder={ __( 'Grid Gallery Title', 'jmhblocks' ) }
					value={ heading }
					onChange={ ( value ) => setAttributes( { heading: value } ) }
				/>
				
			</div>
		</div>
	]);
}