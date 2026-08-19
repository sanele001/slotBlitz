import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { GameCTAButtons } from '../../../components/games/gameCTAButtons';
import HeroSection from '../../../components/siteComponets/Hero/hero';

describe('GameCTAButtons', () => {
	it('renders the demo link and favorites button', () => {
		render(<GameCTAButtons slug='test-game' />);

		expect(screen.getByRole('link', { name: /play demo/i })).toHaveAttribute(
			'href',
			'/games/demo/test-game',
		);

		expect(
			screen.getByRole('button', { name: /add to favorites/i }),
		).toBeInTheDocument();
	});

	it('handles favorite clicks', async () => {
		const handleClick = jest.fn();
		render(<GameCTAButtons slug='test-game' onAddToFavorites={handleClick} />);

		await userEvent.click(
			screen.getByRole('button', { name: /add to favorites/i }),
		);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders the HeroSection ', () => {
		const heroImageSrc = '/path/to/hero-image.jpg';
		const className = 'custom-class';
		render(<HeroSection heroImageSrc={heroImageSrc} className={className} />);
		expect(
			screen.getByRole('link', { name: /explore slots/i }),
		).toHaveTextContent('Explore Slots');
		expect(
			screen.getByRole('link', { name: /explore slots/i }),
		).toHaveAttribute('href', '/slots');
		expect(
			screen.getByRole('link', { name: /Latest Reviews/i }),
		).toHaveTextContent('Latest Reviews');
		expect(
			screen.getByRole('link', { name: /Latest Reviews/i }),
		).toHaveAttribute('href', '/reviews');
	});
});
