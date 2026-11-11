import Link from 'next/link';

/**
 * Pagination
 * ----------
 * Link-based pagination shared by /slots and /reviews. The current page lives
 * in the URL, so this is a plain server component: no state, no effects.
 *
 * `page` is 1-based. `hrefFor(n)` builds the URL for page n.
 */

type Item = number | 'start-ellipsis' | 'end-ellipsis';

function getPageItems(page: number, totalPages: number): Item[] {
	if (totalPages <= 6) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}
	if (page <= 3) {
		return [1, 2, 3, 4, 5, 'end-ellipsis', totalPages];
	}
	if (page >= totalPages - 2) {
		return [
			1,
			'start-ellipsis',
			totalPages - 4,
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			totalPages,
		];
	}
	return [
		1,
		'start-ellipsis',
		page - 1,
		page,
		page + 1,
		'end-ellipsis',
		totalPages,
	];
}

interface PaginationProps {
	page: number;
	totalPages: number;
	hrefFor: (page: number) => string;
}

export default function Pagination({
	page,
	totalPages,
	hrefFor,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const hasPrev = page > 1;
	const hasNext = page < totalPages;

	return (
		<div className='pagination-shell'>
			{/* Mobile */}
			<div className='pagination-mobile flex md:hidden'>
				{hasPrev ? (
					<Link
						href={hrefFor(page - 1)}
						className='pagination-mobile__button'>
						&lt; Prev
					</Link>
				) : (
					<span
						aria-disabled='true'
						className='pagination-mobile__button'>
						&lt; Prev
					</span>
				)}
				<div className='pagination-mobile__meta'>
					Page {page} of {totalPages}
				</div>
				{hasNext ? (
					<Link
						href={hrefFor(page + 1)}
						className='pagination-mobile__button'>
						Next &gt;
					</Link>
				) : (
					<span
						aria-disabled='true'
						className='pagination-mobile__button'>
						Next &gt;
					</span>
				)}
			</div>

			{/* Desktop */}
			<nav aria-label='Pagination' className='pagination hidden md:flex'>
				<span
					className={`pagination__nav pagination__nav--prev ${
						hasPrev ? '' : 'pagination__nav--disabled'
					}`}>
					{hasPrev ? (
						<Link href={hrefFor(page - 1)} className='pagination__nav-link'>
							&lt; previous
						</Link>
					) : (
						<span aria-disabled='true' className='pagination__nav-link'>
							&lt; previous
						</span>
					)}
				</span>

				{getPageItems(page, totalPages).map((item) =>
					typeof item === 'number' ? (
						<span
							key={item}
							className={`pagination__item ${
								page === item ? 'pagination__item--active' : ''
							}`}>
							<Link
								href={hrefFor(item)}
								aria-current={page === item ? 'page' : undefined}
								className='pagination__link'>
								{item}
							</Link>
						</span>
					) : (
						<span key={item} className='pagination__break' aria-hidden='true'>
							...
						</span>
					),
				)}

				<span
					className={`pagination__nav pagination__nav--next ${
						hasNext ? '' : 'pagination__nav--disabled'
					}`}>
					{hasNext ? (
						<Link href={hrefFor(page + 1)} className='pagination__nav-link'>
							next &gt;
						</Link>
					) : (
						<span aria-disabled='true' className='pagination__nav-link'>
							next &gt;
						</span>
					)}
				</span>
			</nav>
		</div>
	);
}
