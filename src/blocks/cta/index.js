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
registerBlockType( 'jmhblocks/cta', {
	title: 'Call to Action',
	description: 'Block to generate a call to action',
	icon: 'format-image',
	category: 'jmh-blocks',

	example: {
		attributes: {
			message: 'Call to Action',
			heading: 'Lorem ipsum dolor sit amet',
			content: 'Posuere mauris aenean nec. Auctor eiusmod posuere habitasse fermentum non quam venenatis. Posuere erat vel mattis malesuada pretium diam elit eu erat. Maecenas eu tempus luctus convallis quisque cursus vitae enim morbi ultrices mattis hac convallis in. Tincidunt lobortis lectus augue enim fringilla vulputate eleifend tristique interdum incididunt posuere dictum.',
		},
	},

	attributes: {
		heading: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		headingColor: {
			type: 'string',
			default: '',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		contentColor: {
			type: 'string',
			default: '',
		},
		textAlignment: {
			type: 'string',
			default: 'none',
		},
		backgroundImage: {
			type: 'string',
			default: null,
		},
		overlayColor: {
            type: 'string',
            default: '#ffffff'
        },
        overlayOpacity: {
            type: 'number',
            default: 0.3
        }
	},

	supports: {
		align: [ 'full', 'wide', 'center' ],
		anchor: true,
		html: false,
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
