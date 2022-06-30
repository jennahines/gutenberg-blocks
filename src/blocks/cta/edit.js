import { 
	ColorPalette, 
	InspectorControls, 
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
	RichText, 
	InnerBlocks,
} from '@wordpress/block-editor';
import { 
	Panel, 
	PanelBody, 
	PanelRow, 
	Button, 
	ButtonGroup,
	RangeControl 
} from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { getBlockDefaultClassName } from '@wordpress/blocks';

const ALLOWED_INNER_BLOCKS = [ 'core/button' ];

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

	const {
		heading,
		headingColor,
		content,
		contentColor,
		textAlignment,
		backgroundImage,
		overlayColor,
		overlayOpacity,
	} = attributes;

	return ([
		<InspectorControls>

			<PanelBody 
				title={ __( 'Color Settings', 'jmhblocks' ) }
				initialOpen={ false }
			>

				<PanelRow title={ __( 'Headline Color', 'jmhblocks' ) }>
					<p><strong>Select a color for the headline.</strong></p>
				</PanelRow>
				<ColorPalette 
					value={ headingColor }
					onChange={ ( newHeadingColor ) => setAttributes( { headingColor: newHeadingColor } ) }
				/>

				<PanelRow title={ __( 'Content Color', 'jmhblocks' ) }>
					<p><strong>Select a color for the text.</strong></p>
				</PanelRow>
				<ColorPalette 
					value={ contentColor }
					onChange={ ( newContentColor ) => setAttributes( { contentColor: newContentColor } ) }
				/>

			</PanelBody>

			<PanelBody 
				title={ __( 'Background Settings', 'jmhblocks' ) }
				initialOpen={ false }
			>

				<PanelRow title={ __( 'Background Image', 'jmhblocks' ) }>
					<p><strong>Select an image for the background</strong></p>
				</PanelRow>
				<MediaUpload
					onSelect={ ( newBackgroundImage ) => setAttributes( { backgroundImage: newBackgroundImage.sizes.full.url } ) }
					type="image"
					value={ backgroundImage }
					render={ ( { open } ) => (
						<Button
							icon="upload"
							onClick={ open }>
								Background Image
						</Button>
					)}
				/>
				
				<PanelRow title={ __( 'Overlay Color', 'jmhblocks' ) }>
					<p><strong>Select an overlay color for the background</strong></p>
				</PanelRow>
				<ColorPalette 
					value={ overlayColor }
					onChange={ ( newOverlayColor ) => setAttributes( { overlayColor: newOverlayColor } ) }
				/>

				<PanelRow title={ __( 'Overlay Opacity', 'jmhblocks' ) }>
					<p><strong>Set the overlay opacity</strong></p>
				</PanelRow>
				<RangeControl 
					label={ __( 'Overlay Opacity', 'jmhblocks' ) }
					value={ overlayOpacity }
					onChange={ ( newOverlayOpacity ) => setAttributes( { overlayOpacity: newOverlayOpacity } ) }
					min={ 0 }
					max={ 1 }
					step={ 0.05 }
				/>

			</PanelBody>

		</InspectorControls>,

		<div 
			className={ `${ blockName }` }  
			style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
		>
			<div 
				className={ `${blockName}-overlay` }
				style={{ 
					backgroundColor: overlayColor, 
					opacity: overlayOpacity,
				}}
			></div>
			{
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ (newTextAlignment) => setAttributes( { textAlignment: newTextAlignment } ) }
					/>
				</BlockControls>
			}
			<div 
				className={ `${blockName}-content` }
				style={{
					textAlign: textAlignment,
				}}
			>
				<RichText key="editable"
					tagName="h2"
					allowedFormats={ [] }
					placeholder={ __( 'CTA Heading', 'jmhblocks' ) }
					value={ heading }
					onChange={ ( newHeading ) => setAttributes( { heading: newHeading } ) }
					style={ { color: headingColor } }
				/>
				<RichText key="editable"
					tagName="p"
					placeholder={ __( 'An intriguing line of text to get the user to click the button', 'jmhblocks' ) }
					value={ content }
					onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
					style={ { color: contentColor } }
				/>
				<InnerBlocks allowedBlocks={ ALLOWED_INNER_BLOCKS } />
			</div>
		</div>
	]);
}