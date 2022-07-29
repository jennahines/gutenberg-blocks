/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const blockName = getBlockDefaultClassName( 'jmhblocks/cta');

	const {
		gridColumnSpan,
		gridRowSpan,
		gridColumnSpanMobile,
		gridRowSpanMobile,
	} = attributes;

	return (
		<div { ...blockProps } 
			 data-column-span={ gridColumnSpan } 
			 data-row-span={ gridRowSpan }
			 data-column-span-mobile={ gridColumnSpanMobile } 
			 data-row-span-mobile={ gridRowSpanMobile }
		>
			<InnerBlocks.Content />
		</div>
	);
}
