/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	FormToggle,
	TextControl,
	NumberControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();

	const {
		attributes: { id, content, displayConditionally, conditionTarget, conditionValue},
		setAttributes
	 } = props;

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Adventure Kit Logic" initialOpen={true}>
					<TextControl
						label={`Element ID`}
						value={id}
						onChange={(value) => {
							setAttributes( { id: value });
						}}
					/>
					<div className='adventurekit__editor-toggle'>
						<label className='label'>Display Conditionally</label>
						<FormToggle
							checked={displayConditionally}
							onChange={() => {
								setAttributes( { displayConditionally: !displayConditionally })
							}}
						/>
					</div>
					{
						displayConditionally &&
							<TextControl
								label={`Condition Target`}
								value={conditionTarget}
								onChange={(value) => {
									setAttributes( { conditionTarget: value });
								}}
							/>
					}
					{
						displayConditionally &&
							<div className='adventurekit__editor-number-input'>
								<label className='label'>Condition Value</label>
								<input type='number'
									className='input'
									onChange={(e) => {
										console.log(e.target.value);
										setAttributes( { conditionValue: e.target.value })
									}}
									value={`${conditionValue }`}
								/>
							</div>
					}
				</PanelBody>
			</InspectorControls>
			<RichText
				tagName="p" // The tag here is the element output and editable in the admin
				value={ content } // Any existing content, either from the database or an attribute default
				onChange={ ( value ) => setAttributes( { content: value } ) } // Store updated content as a block attribute
				placeholder={ __( 'Content...' ) } // Display this text before any content has been added by the user
			/>
		</div>
	);
}
