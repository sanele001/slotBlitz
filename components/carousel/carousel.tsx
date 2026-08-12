import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { usefetchPublicImage } from '../../app/hooks/games/useFetchPublicImage';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../../styles/mabler.module.css';
import { NextButton, PrevButton, usePrevNextButtons } from './carouselButtons';
import { Slot } from '../../types/slot';
import Link from 'next/link';

type PropType = {
	slides: Slot[];
	options?: EmblaOptionsType;
	imageLandscape: string;
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
					{slides.map((slide, index) => {
						const imageUrl = usefetchPublicImage(slide.imageSquare);
						console.log('imageUrl:', imageUrl); // Log the image URL for debugging
						return (
							<div
								className={styles.embla__slide}
								key={slide.gameSlug ?? index}>
								<Link href={`/games/${slide.gameSlug}`}>
									<div className={styles.embla__slide__number}>
										<div className='w-full h-full'>
											<div
												style={{
													backgroundImage: `url(${imageUrl})`,
												}}
												className='w-full h-full rounded-xl bg-cover bg-center bg-no-repeat'
											/>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.embla__controls}>
				<div className={styles.embla__buttons}>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
