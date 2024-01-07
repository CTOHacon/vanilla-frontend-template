type FadeOptions = {
	transitionDuration: number; // Duration in milliseconds
	onStart: () => void;
	onEnd: () => void;
};

const setFadeStyle = (
	element: HTMLElement,
	opacity: number,
	duration: number
) => {
	element.style.opacity = opacity.toString();
	element.style.transition = `opacity ${duration}ms`;
};

export const fadeIn = (element: HTMLElement, options: FadeOptions): void => {
	options.onStart();
	element.style.display = 'block';
	requestAnimationFrame(() => {
		setFadeStyle(element, 1, options.transitionDuration);
		setTimeout(() => {
			options.onEnd();
		}, options.transitionDuration);
	});
};

export const fadeOut = (element: HTMLElement, options: FadeOptions): void => {
	options.onStart();
	setFadeStyle(element, 0, options.transitionDuration);
	setTimeout(() => {
		element.style.display = 'none';
		options.onEnd();
	}, options.transitionDuration);
};

export const fadeToggle = (
	element: HTMLElement,
	options: FadeOptions
): void => {
	const isVisible = window.getComputedStyle(element).display !== 'none';
	isVisible ? fadeOut(element, options) : fadeIn(element, options);
};
