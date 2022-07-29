/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'jmhblocks/grid-gallery', {
	title: 'Grid Gallery',
	description: 'Block to generate a grid gallery',
	icon: 'format-image',
	category: 'jmh-blocks',

	attributes: {
		rowHeight: {
			type: 'number',
			default: 50,
		},
		align: {
			type: 'string',
			default: 'wide',
		},
	},
	
	supports: {
		anchor: true,
		html: false,
		align: [ 'full', 'wide', 'center' ],
	},

	
	/**
	 * @see ./edit.js
	 */
	edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
