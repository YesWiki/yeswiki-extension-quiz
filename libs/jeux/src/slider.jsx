import React from 'react';

const PREVIOUS = 'previous';
const NEXT = 'next';
const JUMP = 'jump';

export const HORIZONTAL = 'horizontal';
export const VERTICAL = 'vertical';

const DEFAULT_CLASSNAMES = {
	previousButton: 'previousButton',
	nextButton: 'nextButton',
	buttonDisabled: 'disabled',
	track: 'track',
	slide: 'slide',
	hidden: 'hidden',
	previous: 'previous',
	current: 'current',
	next: 'next',
	jump: 'jump',
	animateIn: 'animateIn',
	animateOut: 'animateOut',
};
const DEFAULT_DURATION = 4000;

const arrowTransforms = {
	up: 'rotate(90 10 15)',
	down: 'rotate(270 10 15)',
	left: 'rotate(180 10 15)',
	right: 'rotate(0 10 15)',
};
function Arrow({ direction = 'right' }) {
	console.log('Arrow');
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30">
			<polygon fill="#fff" points="20 15 4.228 0 0 3.626 11.954 15 0 26.374 4.228 30"
				transform={arrowTransforms[direction]} />
		</svg>
	);
}

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);
		const {
			slideIndex = 0,
			direction = HORIZONTAL,
		} = this.props;
		this.state = {
			currentSlideIndex: slideIndex,
			animating: false,
		};
		this.slideCount = React.Children.count(this.props.children);
		this.direction = direction;
		this.swipeProperty = direction === HORIZONTAL ? 'left' : 'top';
		this.swipeEventProperty = direction === HORIZONTAL ? 'clientX' : 'clientY';
	}

	componentDidMount() {
		this.setupAutoplay();
	}

	componentWillUnmount() {
		this.stopAutoplay();
		if (this.animationTimerId) {
			clearTimeout(this.animationTimerId);
		}
	}

	componentWillReceiveProps(props) {
		this.slideCount = React.Children.count(props.children);
		if (this.state.currentSlideIndex >= this.slideCount) {
			this.setState({ currentSlideIndex: 0 });
		}
	}

	setupAutoplay = () => {
		if (this.props.autoplay && !this.isMouseOver) {
			this.stopAutoplay();
			this.autoplayTimerId = setInterval(
				this.next,
				parseInt(this.props.autoplay, 10),
			);
		}
	}

	stopAutoplay = () => {
		if (this.autoplayTimerId) {
			clearInterval(this.autoplayTimerId);
		}
	}

	onAnimationEnd = () => {
		console.log('');
		console.log('onAnimationEnd', "state:", this.state, "nextslide:", this.state.nextSlideIndex);

		this.setState({
			currentSlideIndex: this.nextSlideIndex,
			animating: false,
			animation: undefined,
		});

		this.setupAutoplay();
	};

	isDisabled = () => this.slideCount < 2 ||
		this.state.animating ||
		this.props.disabled;

	isInfinite = () => this.slideCount > 2 && this.props.infinite !== false;

	canGoPrevious = () => this.isInfinite() || this.state.currentSlideIndex > 0;

	canGoNext = () => this.isInfinite() || this.state.currentSlideIndex < this.slideCount - 1;

	goTo = (index, animation) => {
		console.log("goto", index, animation);
		if (this.isDisabled()) return;
		this.props.scrollToTop();
		this.nextSlideIndex = index;
		this.setState({ animating: true, animation });
		const timeout = this.props.duration || DEFAULT_DURATION;
		this.animationTimerId = setTimeout(this.onAnimationEnd, timeout);
	};

	goTodirect = (index) => {
		let animation = JUMP;

		this.nextSlideIndex = Number(index);
		this.setState({
			animating: true,
			animation
		});
		const timeout = this.props.duration || DEFAULT_DURATION;
		this.animationTimerId = setTimeout(this.onAnimationEnd, timeout);
		this.props.setCurrenindex(this.nextSlideIndex);
	};

	previous = () => {
		if (!this.canGoPrevious()) return;
		const nextSlideIndex = (this.state.currentSlideIndex - 1);
		const actualNextSlide = nextSlideIndex >= 0 ? nextSlideIndex : this.slideCount - 1;
		this.goTo(actualNextSlide, PREVIOUS);
		this.props.setCurrenindex(nextSlideIndex);
	};

	next = () => {
		console.log('next');
		if (!this.canGoNext()) return;
		const nextSlideIndex = (this.state.currentSlideIndex + 1) % this.slideCount;
		this.goTo(nextSlideIndex, NEXT);
		this.props.setCurrenindex(nextSlideIndex);

	};

	getSlideClass = (index) => {
		const {
			currentSlideIndex,
			animation,
		} = this.state;
		if (index === 0) {
			console.log("<===============================>");
		}

		const classNames = this.getClassNames();
		const lastSlideIndex = this.slideCount - 1;
		let reponse;
		let path;
		if (this.slideCount === 2) {
			// Protection des jeux à deux slides
			if (animation) {
				reponse = `${classNames.animateIn} ${classNames[animation]}`;
			}
			console.log('getSlideClass', index, classNames.previous, !isNaN(index));
			return index < currentSlideIndex ? classNames.previous : classNames.next;
		}
		// fin de changement 
		if (!animation) {
			path = "default";
			this.props.scrollToTop();
			// On est sur le slide affiché
			if (index + 0 === currentSlideIndex - 0) {
				path = "index +0 === currentSlideIndex - 0 no animation";
				reponse = classNames.current;
			}
			// On est sur le slide avant le slide affiché (previous)
			else if (index === -1 + currentSlideIndex || (currentSlideIndex === 0 && index === lastSlideIndex)) {
				path = "index +0 === currentSlideIndex - 1 no animation";

				reponse = classNames.previous;
			}
			else if (index === currentSlideIndex + 1 || (index === 0 && currentSlideIndex === lastSlideIndex)) {
				path = "index +0 === currentSlideIndex + 1 no animation";
				reponse = classNames.next;
			}
			else {
				path = "else no animation";
				reponse = classNames.hidden;
			}
		}
		if (animation) {
			if (index === currentSlideIndex - 0 && (animation === NEXT || animation === PREVIOUS)) {
				path = "index +0 === currentSlideIndex - 0 animation";
				reponse = `${classNames.animateOut}  ${classNames[animation]}`
			}
			else if (index === currentSlideIndex - 0 && (animation === JUMP)) {
				if (this.nextSlideIndex - currentSlideIndex > 0) {
					path = "index +0 === currentSlideIndex JUMP NEXT";
					reponse = `${classNames.animateOut}  ${classNames[NEXT]}`
				}
				else{
					path =  "index +0 === currentSlideIndex jump PREVIOUS";
					reponse = `${classNames.animateOut}  ${classNames[PREVIOUS]}`
				}
			}
			else if (animation == JUMP && index === this.nextSlideIndex) {
				if (this.nextSlideIndex - currentSlideIndex > 0) {
					path = "index +0 === nextSlideIndex animation";
					reponse = `${classNames.animateIn}  ${classNames[NEXT]}`
				}
				else{
					path = "index +0 === nextSlideIndex animation";
					reponse = `${classNames.animateIn}  ${classNames[PREVIOUS]}`
				}
			}
			// On est sur le slide avant le slide affiché (previous)
			else if (index === 0 - 1 + currentSlideIndex || (currentSlideIndex === 0 && index === lastSlideIndex)) {
				if (animation === PREVIOUS) {
					path = "index +0 === currentSlideIndex -1 PREVIOUS animation";
					reponse = `${classNames.animateIn} ${classNames.previous}`;
				}
				if (animation === NEXT) {
					path = "index +0 === currentSlideIndex -1 NEXT animation";
					reponse = classNames.hidden;
				}
				if (animation === JUMP) {
					path = "index +0 === currentSlideIndex + 1 JUMP animation";
					reponse = classNames.hidden;
				}
			}
			else if (index === 1 + currentSlideIndex || (index === 0 && currentSlideIndex === lastSlideIndex)) {
				if (animation === NEXT) {
					path = "index +0 === currentSlideIndex + 1 NEXT animation";
					reponse = `${classNames.animateIn} ${classNames.next}`;
				}
				if (animation === PREVIOUS) {
					path = "index +0 === currentSlideIndex + 1 PREVIOUS animation";
					reponse = classNames.hidden;
				}
				if (animation === JUMP) {
					path = "index +0 === currentSlideIndex + 1 JUMP animation";
					reponse = classNames.hidden;
				}
			}
			else {
				path = "else animation";
				reponse = classNames.hidden;
			}

		}

		console.log(" idx=", index, " idsIsNum?", !isNaN(index), " slcount=", this.slideCount,
			" curSlIdx=", this.state.currentSlideIndex, "nextSlIdx", this.nextSlideIndex,
			" reponse=", reponse, " path=", path, "animation=", animation, "CurSld=", currentSlideIndex);
		return reponse;






	};


	/* eslint-disable lines-between-class-members */
	isSwiping = false;
	sliderRef;
	pageStartPosition;

	currentElement;
	currentElementStartPosition;
	currentElementPosition;
	previousElement;
	previousElementStartPosition;
	previousElementPosition;
	nextElement;
	nextElementStartPosition;
	nextElementPosition;
	/* eslint-enable lines-between-class-members */

	handleTouchStart = (e) => {
		console.log("handleTouchStart")
		if (this.isDisabled()) return;
		this.stopAutoplay('handleTouchStart');
		const { current, previous, next } = this.getClassNames();
		const touch = e.touches[0];
		this.isSwiping = true;
		this.pageStartPosition = touch[this.swipeEventProperty];
		/* eslint-disable prefer-destructuring */
		this.currentElement = this.sliderRef.getElementsByClassName(current)[0];
		this.previousElement = this.sliderRef.getElementsByClassName(previous)[0];
		this.nextElement = this.sliderRef.getElementsByClassName(next)[0];
		/* eslint-enable prefer-destructuring */
		const touchDelta = this.currentElement.getBoundingClientRect()[this.swipeProperty];
		this.currentElementStartPosition = 0;
		this.currentElementPosition = 0;
		this.currentElement.style.transition = 'none';
		if (this.previousElement) {
			this.previousElement.style.transition = 'none';
			this.previousElement.style.visibility = 'visible';
			// eslint-disable-next-line max-len
			this.previousElementStartPosition = this.previousElement.getBoundingClientRect()[this.swipeProperty] - touchDelta;
		}
		if (this.nextElement) {
			this.nextElement.style.visibility = 'visible';
			this.nextElement.style.transition = 'none';
			// eslint-disable-next-line max-len
			this.nextElementStartPosition = this.nextElement.getBoundingClientRect()[this.swipeProperty] - touchDelta;
		}
	};

	animating = false;

	handleTouchMove = (e) => {
		console.log("handleTouchMove")
		e.preventDefault();
		this.animating = this.animating ||
			requestAnimationFrame(() => {
				if (!this.isSwiping) {
					this.animating = false;
					return;
				}
				const touch = e.touches[0];
				const newLeft = touch[this.swipeEventProperty] - this.pageStartPosition;
				this.currentElementPosition = this.currentElementStartPosition + newLeft;
				this.currentElement.style[this.swipeProperty] = `${this.currentElementPosition}px`;
				if (this.previousElement) {
					this.previousElementPosition = this.previousElementStartPosition + newLeft;
					this.previousElement.style[this.swipeProperty] = `${this.previousElementPosition}px`;
				}
				if (this.nextElement) {
					this.nextElementPosition = this.nextElementStartPosition + newLeft;
					this.nextElement.style[this.swipeProperty] = `${this.nextElementPosition}px`;
				}
				this.animating = false;
			});
	};

	handleTouchEnd = () => {
		console.log("handleTouchEnd")

		this.animating = false;
		this.isSwiping = false;
		this.currentElement.style.removeProperty(this.swipeProperty);
		this.currentElement.style.removeProperty('transition');
		if (this.previousElement) {
			this.previousElement.style.removeProperty('visibility');
			this.previousElement.style.removeProperty('transition');
			this.previousElement.style.removeProperty(this.swipeProperty);
		}
		if (this.nextElement) {
			this.nextElement.style.removeProperty('visibility');
			this.nextElement.style.removeProperty('transition');
			this.nextElement.style.removeProperty(this.swipeProperty);
		}
		const touchDelta = this.currentElementStartPosition - this.currentElementPosition;
		const minSwipeOffset = this.props.minSwipeOffset || 15;
		if (Math.abs(touchDelta) > minSwipeOffset) {
			if (touchDelta < 0) {
				this.previous();
			} else {
				this.next();
			}
		} else {
			this.setupAutoplay();
		}
	};

	getClassNames = () => ({ ...DEFAULT_CLASSNAMES, ...this.props.classNames });

	initTouchEvents = (sliderRef) => {
		console.log("initTouchEvents")
		if (this.isDisabled() || !sliderRef) return;
		this.sliderRef = sliderRef;
		this.sliderRef.addEventListener('touchstart', this.handleTouchStart);
		this.sliderRef.addEventListener('touchmove', this.handleTouchMove, {
			passive: false,
		});
		this.sliderRef.addEventListener('touchend', this.handleTouchEnd);
	}

	handleMouseOver = () => {
		console.log("handleMouseOver")
		this.isMouseOver = true;
		this.stopAutoplay();
	}

	handleMouseOut = () => {
		console.log("handleMouseOut")
		this.isMouseOver = false;
		this.setupAutoplay();
	}

	render() {
		const {
			children,
			className = 'slider',
			previousButton = <Arrow direction={this.direction === HORIZONTAL ? 'left' : 'down'} />,
			nextButton = <Arrow direction={this.direction === HORIZONTAL ? 'right' : 'up'} />,
			touchDisabled,
			autoplay,
		} = this.props;
		const classNames = this.getClassNames();
		const isDisabled = this.isDisabled();
		const divStyle = {
			left: '100%'
		  };
		return (
			<div className={classNames.slider || className}
				{...!touchDisabled && { ref: this.initTouchEvents }}
				{...autoplay && {
					onMouseOver: this.handleMouseOver,
					onMouseOut: this.handleMouseOut,
				}}
			>

				<div className={classNames.track}>
					{React.Children.map(children, (item, index) => (
						React.cloneElement(item, {
							key: index,
							className: [classNames.slide, this.getSlideClass(index), item.props.className].filter(x => x).join(' '),
						})
					))}
				</div>
			</div>
		);
	}
}
export default Slider;
