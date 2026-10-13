'use client';
import UnderConstruction from '../../components/siteComponets/siteWarnings/UnderConstruction';
import FliudHeroSection from '../../components/siteComponets/Hero/fluidHero'
import BonusCalculator from '../../components/tools/BonusCalculator'
import Head from "next/head";
import {gameConfig} from  '../config/game'

export default  function Page() {
	return (
		<>
		<Head>
		<title>Casino Bonus Calculator: Check Wagering Requirements | WebSlots</title>
        <meta
          name="description"
          content="Don't get tricked by fine print. Use our free Casino Bonus Calculator to instantly find your total wagering requirement and the true value of any online casino offer."
        />
		</Head>
		<section className="px-1 py-3 items-center">
			<FliudHeroSection heroProps={gameConfig.fluideHeroProps.calculator} />
			<BonusCalculator/>
		</section>
		<section>
			<div className='mx-auto p-4 mt-6 mb-6 max-w-7xl overflow-hidden rounded-2xl border border-white/10'>

<h3 className='text-xl font-bold text-primary'>
							How to Calculate the True Value of an Online Casino Bonus
						</h3>
						<p className='mt-3 whitespace-pre-line text-base leading-7 text-white/70'>
						Not all casino bonuses are created equal. A massive R5,000 bonus might look incredible on a banner advertisement, but if it comes with hidden terms or a high wagering requirement, it could be nearly impossible to cash out.
						</p>

						<div className=' mt-5'/>

						<h4>What is a Wagering Requirement?</h4>
						<p className='mt-3 whitespace-pre-line text-base leading-7 text-white/70'>A wagering requirement (sometimes called a "playthrough" or "rollover" multiplier) is the number of times you must bet your bonus money and sometimes your deposit money before you are legally allowed to withdraw your winnings.</p>
						<p className='mt-3 whitespace-pre-line text-base leading-7 text-white/70'>or example, if you receive a $100 bonus with a 30x wagering requirement, you must place a total of $3,000 worth of bets before that bonus cash turns into real, withdrawable money. Our free tool above does all the complicated math for you instantly!</p>



			</div>
		</section>
		</>
	);
}
