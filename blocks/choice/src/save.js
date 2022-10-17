/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {

	const {
		attributes: { id, parentId, condition, choices }
	 } = props;

	return (
		<div { ...useBlockProps.save() }>
			<div className='ifengine__container'>
				<div id={id} className='ifengine__choice' data-displayconditionally={ parentId !== "" ? 1 : 0} data-conditiontarget={parentId} data-conditionvalue={condition} data-activecondition="">
					<InnerBlocks.Content />
					<ul className='ifengine__choices-list'>
						{
							choices.map((choice, index) =>
								<li>
									<a href="#" key={index}>{choice}</a>
								</li>
							)
						}
					</ul>
				</div>
			</div>
		</div>
	);
}
