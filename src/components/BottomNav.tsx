import Button from './Button';

export default function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white px-8 py-2 shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]">
      <span className="font-mondwest text-2xl font-semibold text-[#051A24]">V</span>
      <Button className="px-5 py-2">Start a chat</Button>
    </div>
  );
}
