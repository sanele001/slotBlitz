'use client';

/**
 * Loader
 * ------
 * Branded loading indicator, meant to be used as a Suspense `fallback`
 * while a section, page, or image-heavy component streams in.
 *
 * Usage: <Loader /> for an inline loader, <Loader fullScreen /> to
 * cover the whole viewport (e.g. for a full page-level Suspense boundary).
 */

interface LoaderProps {
	label?: string;
	fullScreen?: boolean;
}

const ACCENT = '#fb226b';

export default function Loader({
	label = 'Loading',
	fullScreen = false,
}: LoaderProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center gap-5 ${
				fullScreen ? 'fixed inset-0 z-50 bg-[#0c0714]' : 'w-full py-16'
			}`}>
			<div className='relative w-16 h-16'>
				{/* Soft pulsing glow behind the ring */}
				<div
					className='absolute inset-0 rounded-full blur-xl opacity-40 loader-glow'
					style={{ backgroundColor: ACCENT }}
				/>

				{/* Rotating gradient ring */}
				<div
					className='absolute inset-0 rounded-full loader-spin'
					style={{
						background: `conic-gradient(from 0deg, ${ACCENT} 0deg, transparent 300deg)`,
						WebkitMask:
							'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
						mask: 'radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))',
					}}
				/>

				{/* Static faint track ring */}
				<div className='absolute inset-0 rounded-full border-4 border-white/5' />
			</div>

			<p className='flex items-center gap-1 text-sm font-medium text-white/60'>
				{label}
				<span className='loader-dot' style={{ animationDelay: '0s' }}>
					.
				</span>
				<span className='loader-dot' style={{ animationDelay: '0.2s' }}>
					.
				</span>
				<span className='loader-dot' style={{ animationDelay: '0.4s' }}>
					.
				</span>
			</p>

			<style jsx>{`
				.loader-spin {
					animation: loader-spin 0.9s linear infinite;
				}
				.loader-glow {
					animation: loader-pulse 1.6s ease-in-out infinite;
				}
				.loader-dot {
					animation: loader-dot-fade 1.2s ease-in-out infinite;
					opacity: 0.2;
				}
				@keyframes loader-spin {
					to {
						transform: rotate(360deg);
					}
				}
				@keyframes loader-pulse {
					0%,
					100% {
						opacity: 0.25;
						transform: scale(0.9);
					}
					50% {
						opacity: 0.5;
						transform: scale(1.1);
					}
				}
				@keyframes loader-dot-fade {
					0%,
					100% {
						opacity: 0.2;
					}
					50% {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
}
