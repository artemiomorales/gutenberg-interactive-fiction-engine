export const getModifiedArrayAttribute = ( attributes, attribute, targetIndex, newValue ) => {
	return new Promise((resolve) => {
		const originalArray = attributes[attribute];
		let newArray = [...originalArray];
		newArray[targetIndex] = newValue;
		const attributeObject = {};
		attributeObject[`${attribute}`] = newArray;
		resolve(attributeObject);
	})
 }

 export const getLengthenedArrayAttribute = ( attributes, attribute, newValue ) => {
	return new Promise((resolve) => {
		const originalArray = attributes[attribute];
		let newArray = [...originalArray];
		newArray.push(newValue);
		const attributeObject = {};
		attributeObject[`${attribute}`] = newArray;
		resolve(attributeObject);
	});
}
