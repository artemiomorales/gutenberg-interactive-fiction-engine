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
	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/dynamic-paragraph/' );
}
add_action( 'init', 'create_block_interactive_fiction_engine_block_init' );



// function interactive_fiction_engine_editor_enqueue() {
// 	wp_enqueue_style( 'interactive_fiction_engine-style',
// 		plugins_url( 'assets/editor-style.css', __FILE__ )
// 	);
//     wp_enqueue_script( 'interactive_fiction_engine-script',
//         plugins_url( 'assets/interactive-fiction-engine.js', __FILE__ ),
//         array( 'wp-blocks' )
//     );
// 	wp_enqueue_script( 'interactive_fiction_engine-initialize',
//         plugins_url( 'assets/initialize.js', __FILE__ ),
//         array( 'wp-blocks', 'interactive_fiction_engine-script' )
//     );
// }
// add_action( 'enqueue_block_editor_assets', 'interactive_fiction_engine_editor_enqueue' );


function interactive_fiction_engine_general_enqueue() {
	wp_enqueue_style( 'interactive_fiction_engine-style',
		plugins_url( 'assets/style.css', __FILE__ )
	);
    wp_enqueue_script( 'interactive_fiction_engine-script',
        plugins_url( 'assets/interactive-fiction-engine.js', __FILE__ ),
        array( 'wp-blocks' )
    );
}
add_action( 'enqueue_block_assets', 'interactive_fiction_engine_general_enqueue' );


function interactive_fiction_engine_ui_scripts($hook) {

	wp_enqueue_script( 'interactive_fiction_engine-dynamic-paragraph',
		plugins_url( 'assets/dynamic-paragraph.js', __FILE__ ),
		array( 'wp-blocks', 'interactive_fiction_engine-script' ),
		'0.1',
		true
	);

	wp_enqueue_script( 'interactive_fiction_engine-initialize',
        plugins_url( 'assets/initialize.js', __FILE__ ),
        array( 'wp-blocks', 'interactive_fiction_engine-dynamic-paragraph' ),
		'0.1',
		true
    );

	// $script_js = 'assets/interactive-fiction-engine.js';
	// wp_enqueue_script( 'interactive-fiction-engine', plugins_url($script_js, __FILE__), [], '0.1', true);
}
add_action('wp_enqueue_scripts', 'interactive_fiction_engine_ui_scripts');


// function interactive_fiction_engine_stylesheet() {
//     wp_enqueue_style( 'interactive_fiction_engine-style', plugins_url( 'style.css', __FILE__ ) );
// }
// add_action( 'enqueue_block_assets', 'interactive_fiction_engine_stylesheet' );
