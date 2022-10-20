<?php
/**
 * Plugin Name:       Interactive Fiction Engine
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       interactive-fiction-engine
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


function create_block_interactive_fiction_engine_block_init() {
	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/choice/' );
}
add_action( 'init', 'create_block_interactive_fiction_engine_block_init' );



function interactive_fiction_engine_editor_enqueue() {
	wp_enqueue_style( 'interactive_fiction_engine-editor-style',
		plugins_url( 'styles/editor-style.css', __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', 'interactive_fiction_engine_editor_enqueue' );


function interactive_fiction_engine_general_enqueue() {
	wp_enqueue_style( 'interactive_fiction_engine-style',
		plugins_url( 'styles/style.css', __FILE__ )
	);
}
add_action( 'enqueue_block_assets', 'interactive_fiction_engine_general_enqueue' );


function interactive_fiction_engine_frontend_scripts($hook) {

	wp_enqueue_script( 'interactive_fiction_engine-scripts',
        plugins_url( 'js/build/index.js', __FILE__ ),
        [],
		'0.1',
		true
    );
}
add_action('wp_enqueue_scripts', 'interactive_fiction_engine_frontend_scripts');


// function add_type_attribute($tag, $handle, $src) {
//     // if not your script, do nothing and return original $tag
//     if ( 'interactive_fiction_engine-dynamic-block' !== $handle || 'interactive_fiction_engine-initialize' !== $handle) {
//         return $tag;
//     }
//     // change the script tag by adding type="module" and return it.
//     $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
//     return $tag;
// }
// add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
