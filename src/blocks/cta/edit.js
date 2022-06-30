import { 
	ColorPalette, 
	InspectorControls, 
	MediaUpload,
	InnerBlocks,
} from '@wordpress/block-editor';
import { 
	Panel,
	PanelBody, 
	PanelRow, 
	Button,
	RangeControl 
} from '@wordpress/components';
import { __ } from "@wordpress/i18n";
import { getBlockDefaultClassName } from '@wordpress/blocks';

const JMH_CTA_TEMPLATE = [ 
	[ 'core/heading', { 'placeholder': 'Call to action headline' } ],
	[ 'core/paragraph', { 'placeholder': 'Call to action content' } ],
	[ 'core/button', {} ]
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

	const {
		backgroundImage,
		overlayColor,
		overlayOpacity,
	} = attributes;

	return ([
		<InspectorControls>

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
			<div 
				className={ `${blockName}-content` }
			>
				<InnerBlocks template={ JMH_CTA_TEMPLATE } templateLock={ true } />
			</div>
		</div>
	]);
}