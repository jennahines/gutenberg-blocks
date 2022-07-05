<?php
/**
 * Plugin Name:       JMH Blocks
 * Plugin URI:        https://jennahines.com
 * Description:       A collection of custom Gutenberg blocks
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Author:            Jenna Hines <jenna.hines@webdevstudios.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jmhblocks
 * Domain Path:       jmh
 *
 * @package           jmh
 */

namespace JMH\Blocks;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_blocks() {

	$editor_script = 'build/index.js';
	$editor_style  = 'build/index.css';

	$frontend_script = 'build/frontend.js';
	$frontend_style  = 'build/style-index.css';

	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'jmhblocks-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register frontend script.
	wp_register_script(
		'jmhblocks-frontend-script',
		plugins_url( $frontend_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'jmhblocks-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'jmhblocks-frontend-style',
			plugins_url( $frontend_style, __FILE__ ),
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register Blocks.
	register_block_type(
		'jmhblocks/grid-gallery',
		array(
			'editor_script' => 'jmhblocks-editor-script',
			'editor_style'  => 'jmhblocks-editor-style',
			'style'         => 'jmhblocks-frontend-style',
		)
	);
	register_block_type(
		'jmhblocks/grid-gallery-item',
		array(
			'editor_script' => 'jmhblocks-editor-script',
			'editor_style'  => 'jmhblocks-editor-style',
			'style'         => 'jmhblocks-frontend-style',
		)
	);
	register_block_type(
		'jmhblocks/cta',
		array(
			'editor_script' => 'jmhblocks-editor-script',
			'editor_style'  => 'jmhblocks-editor-style',
			'style'         => 'jmhblocks-frontend-style',
		)
	);
	register_block_type(
		'jmhblocks/section-intro',
		array(
			'editor_script' => 'jmhblocks-editor-script',
			'editor_style'  => 'jmhblocks-editor-style',
			'style'         => 'jmhblocks-frontend-style',
		)
	);
}
	add_action( 'init', __NAMESPACE__ . '\register_blocks' );


	/**
	 * Adds a JMH Block category to the Gutenberg category list.
	 *
	 * @author JennaHines
	 * @since 1.0.0
	 *
	 * @param array $categories The existing categories.
	 * @return array The updated array of categories.
	 */
function register_block_category( $categories ) {

	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'jmh-blocks',
				'title' => esc_html__( 'JMH Blocks', 'jmhblocks' ),
			),
		)
	);
}
	add_filter( 'block_categories_all', __NAMESPACE__ . '\register_block_category', 10, 2 );
