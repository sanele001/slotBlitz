import Footer from '../../components/siteComponets/footer/Footer';
import { privacy } from '../config/content';

export default function Privacy() {
	return (
		<>
			<section className='mx-auto mt-6 mb-6 max-w-7xl overflow-hidden rounded-2xl border border-white/10'>
				{/* Divider */}
				<div className='border-t border-white/10' />

				{/* About Content */}
				<div className='flex flex-col gap-5 p-5'>
					<div>
						<h3 className='text-xl font-bold text-primary'>
							Privacy Policy for WebSlot.africa
						</h3>
						<p className='mt-3 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.intro}
						</p>

						<h4 className='mt-4 text-xl font-bold text-white'>
							Information We Collect
						</h4>
						<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.infowecallect}
						</p>

						<h4 className='mt-4 text-xl font-bold text-white'>
							How We Use Your Information
						</h4>
						<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.howweuseinfo}
						</p>
						<h4 className='mt-4 text-xl font-bold text-white'>
							Cookies and Tracking Technologies
						</h4>
						<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.coockies}
						</p>
						<h4 className='mt-4 text-xl font-bold text-white'>
							Children's Privacy
						</h4>
						<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.children}
						</p>
						<h4 className='mt-4 text-xl font-bold text-white'>
							Your Privacy Rights (POPIA, GDPR & CCPA)
						</h4>
						<p className='mt-2 whitespace-pre-line text-base leading-7 text-white/70'>
							{privacy.YourPrivacyRights}
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
