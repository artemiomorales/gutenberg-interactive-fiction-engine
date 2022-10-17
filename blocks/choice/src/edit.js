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
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';

// import { DynamicParagraph } from '../../../assets/interactive-fiction-engine';
import { getModifiedArrayAttribute, getLengthenedArrayAttribute, registerComponent, unregisterComponent, DynamicParagraph } from '../../../lib/utils';

import { subscribe } from '@wordpress/data';

import {
	Button,
	PanelBody,
	FormToggle,
	TextInput,
	CheckboxControl,
	TextControl
} from "@wordpress/components";

import { useState, useEffect, useCallback, useRef } from '@wordpress/element';

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

	const {
		attributes: { id, parentId, condition, choices },
		setAttributes
	 } = props;

	 const [activeCondition, setActiveCondition] = useState(null);
	 const [activeStatuses, setActiveStatuses] = useState([]);
	 const isMounted = useRef(false);
	 const dynamicChoice = useRef(null);
	 const [debugView, setDebugView] = useState(window.ifEngine.debugView);

	 const onChangeSimpleValue = (attribute, value) => {
		const objectVal = {};
		objectVal[`${attribute}`] = value;
		setAttributes(objectVal);
	 }

	const addStatus = () => {
		let newArray = [...activeStatuses];
		newArray.push(false);
		setActiveStatuses(newArray);
		console.log(activeStatuses);
	}

	const callSetActiveStatuses = (indexToActivate) => {
		let newArray = activeStatuses.map((item, index) => {
			if(index === indexToActivate) {
				return true;
			}
			return false;
		});
		setActiveStatuses(newArray);
	}

	const removeChoice = (targetIndex) => {
		let newArray = [...choices];
		newArray.splice(targetIndex, 1);
		setAttributes( { choices: newArray } );
	}

	useEffect(() => {
		if(!isMounted.current) {
			isMounted.current = true;
			let defaultActiveStatuses = choices.map(() => false);
			setActiveStatuses(defaultActiveStatuses);
		}
		// Doesn't work
		// return() => {
		// 	console.log("I am being removed");
		// }
	}, []);

	const callback = useCallback((element) => {
		if(!isMounted.current) {
			dynamicChoice.current = new DynamicParagraph(element);
			window.ifEngine.registerListener(dynamicChoice.current);
		} else {
			window.ifEngine.triggerUpdate(dynamicChoice.current);
		}
	}, [activeCondition]);

	const unsubscribe = subscribe(() => {
		setDebugView(window.ifEngine.debugView);
	});

	const updateChoice = (index) => {
		console.log("registering click");
		console.log(activeCondition);
		console.log(index);
		if(activeCondition !== index) {
			setActiveCondition(index);
			callSetActiveStatuses(index);
		} else {
			setActiveCondition(null);
			callSetActiveStatuses(null);
		}
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title='Interactive Fiction Engine Logic'>
					<TextControl
						label={`Element ID`}
						value={id}
						onChange={(value) => {
							setAttributes( { id: value })
						}}
					/>
					<TextControl
						label={`Parent ID`}
						value={parentId}
						onChange={(value) => {
							setAttributes( { parentId: value })
						}}
					/>
					<div className='ifengine__editor-number-input'>
						<label className='label'>Condition</label>
						<input type='number'
							className='input'
							value={`${condition}`}
							onChange={(e) => {
								setAttributes( { condition: parseInt(e.target.value) })
							}}
						/>
					</div>
					<div className='ifengine__editor-toggle'>
						<label className='label'>Debug View</label>
						<FormToggle
							checked={debugView}
							onChange={() => {
								window.ifEngine.debugView = !window.ifEngine.debugView;
							}}
						/>
					</div>
				</PanelBody>
				<PanelBody title='Choices'>
					<div className='ifengine__editor-input-outer'>
						{
							choices && choices.map( (choice, index) => {
								return (
									<div className='ifengine__editor-input-inner'>
										<TextControl
											label={`Option ${index}`}
											className="ifengine__editor-text-input"
											key={index}
											value={choice}
											onChange={(value) => {
												getModifiedArrayAttribute(props.attributes, 'choices', index, value).then((attributeObject) => {
													setAttributes(attributeObject);
												})
											}}
										/>
										<CheckboxControl
											label='Active'
											checked={ activeStatuses[index] }
											onChange={ () => {
												updateChoice(index);
											}}
										/>
										<Button className='ifengine__editor-close-button' onClick={() => {removeChoice(index)}}>X</Button>
									</div>
								)
							})
						}
						{
							choices &&
								<Button className='ifengine__editor-button' onClick={() => {
									getLengthenedArrayAttribute(props.attributes, 'choices', '').then((attributeObject) => {
										setAttributes( attributeObject );
									});
									addStatus()}}>
									Add Choice
								</Button>
						}
					</div>
				</PanelBody>
			</InspectorControls>
			<div className='ifengine__container'>
				<div id={id} className='ifengine__choice' ref={callback} data-displayconditionally={ parentId !== "" ? 1 : 0} data-conditiontarget={parentId} data-conditionvalue={condition} data-activecondition={activeCondition}>
					<InnerBlocks />
					<ul className='ifengine__choices-list'>
						{
							choices && choices.map( (choice, index) => {
								return (
									<li key={index}>
										<a href="#" onClick={(e) => {
											e.preventDefault();
											updateChoice(index)}}>
											{choice}
										</a>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</div>
	);
}
