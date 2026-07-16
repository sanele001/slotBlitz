import React, {
	ComponentPropsWithRef,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: PropType) => {
	const { children, disabled, ...restProps } = props;

	return (
		<button>
			<FaArrowLeft className='mr-2' />
			{...restProps}
		</button>
	);
};

export const NextButton = (props: PropType) => {
	const { children, disabled, ...restProps } = props;

	return (
		<button>
			<FaArrowRight className='mr-2' />
			{...restProps}
		</button>
	);
};
