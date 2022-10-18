console.log('init script');
window.ifEngine.dynamicParagraphs = [];
const dynamicParagraphElements = document.querySelectorAll(".ifengine__choice");
dynamicParagraphElements.forEach((element) => {
	const dynamicParagraph = new DynamicParagraph(element);
	window.ifEngine.registerListener(dynamicParagraph);
	const links = dynamicParagraph.domElement.querySelectorAll('a');
	console.log(links);
	links.forEach((link, index) => {
		link.addEventListener('click', (e) => {
			// e.preventDefault();
			console.log(dynamicParagraph.domElement.getAttribute('data-activecondition'));
			if(parseInt(dynamicParagraph.domElement.getAttribute('data-activecondition')) !== index) {
				dynamicParagraph.domElement.setAttribute('data-activecondition', index);
			} else {
				dynamicParagraph.domElement.setAttribute('data-activecondition', null);
			}
			window.ifEngine.triggerUpdate(dynamicParagraph);
		})
	})
});
