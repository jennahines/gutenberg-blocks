import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import { getBlockDefaultClassName } from '@wordpress/blocks';

const JMH_GALLERY_TEMPLATE = [
	[ 'core/heading', { 'placeholder': 'Gallery Heading' } ],
	[ 'core/image', {} ]
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
	const blockName = getBlockDefaultClassName( 'jmhblocks/cta');

	return (
		<div className={ `${ blockName }` }>
			<InnerBlocks template={ JMH_GALLERY_TEMPLATE } templateLock={ true } />
		</div>
	);
}