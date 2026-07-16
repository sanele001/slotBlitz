import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../../styles/mabler.module.css';
import { NextButton, PrevButton, usePrevNextButtons } from './carouselButtons';

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<div className={styles.embla}>
			<div className={styles.embla__viewport} ref={emblaRef}>
				<div className={styles.embla__container}>
					{slides.map((index) => (
						<div className={styles.embla__slide} key={index}>
							<div className={styles.embla__slide__number}>
								<span>{index + 1}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.embla__controls}>
				<div className={styles.embla__controls}>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
