import { useInViewAnimation } from '../hooks/useInViewAnimation';
import Button from './Button';

export default function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section ref={ref} className="w-full px-6 py-12">
      <div className="ml-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:justify-end">
        <div
          className={`rounded-[40px] bg-[#051A24] px-10 pb-10 pt-3 text-[#F6FCFF] shadow-[inset_0_2px_24px_rgba(255,255,255,0.08)] ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <h3 className="text-[22px] font-medium">Monthly Partnership</h3>
          <p className="mt-5 whitespace-pre-line text-[#E0EBF0]">A dedicated creative design team.\nYou work directly with Viktor.</p>
          <p className="mt-8 text-2xl">$5,000</p>
          <p className="text-[#E0EBF0]">Monthly</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="https://halaskastudio.com/./book">Start a chat</Button>
            <Button href="https://halaskastudio.com/./book" variant="secondary">
              How it works
            </Button>
          </div>
        </div>
        <div
          className={`rounded-[40px] bg-white px-10 pb-10 pt-3 text-[#0D212C] shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:pr-24 ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="text-[22px] font-medium">Custom Project</h3>
          <p className="mt-5 whitespace-pre-line text-[#273C46]">Fixed scope, fixed timeline.\nSame team, same standards.</p>
          <p className="mt-8 text-2xl">$5,000</p>
          <p className="text-[#273C46]">Minimum</p>
          <div className="mt-8">
            <Button href="https://halaskastudio.com/./book" variant="tertiary">
              Start a chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
