export const initExampleComponent = () => {
	const exampleComponent =
		document.querySelectorAll<HTMLElement>('.example-component');

	exampleComponent.forEach(component => {
		// the component logic here
		console.log(component);
	});
};
