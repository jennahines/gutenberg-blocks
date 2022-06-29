/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

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

	const {
		heading,
		headingColor,
		content,
		contentColor,
		backgroundImage,
		overlayColor,
		overlayOpacity,
	} = attributes;

	return (
		<section { ...blockProps }
			style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
		>
			<div 
				class="cta-overlay" 
				style={{ 
					backgroundColor: overlayColor, 
					opacity: overlayOpacity,
				}}
			></div>
			<div class="cta-content aligncenter">
				<h2 style={ { color: headingColor } }>{ heading }</h2>
				<p style={ { color: contentColor } }>{ content }</p>
			</div>
		</section>
	);
}
