import StandaloneMenu from '@/components/StandaloneMenu';

export default function Home() {
    return (
        <>
            <StandaloneMenu />
            <div className="flex flex-row h-screen items-center justify-center bg-[var(--light-gray)]">
                <img src="/logo.svg" alt="Packet Run" className="w-[25vw]" />
            </div>
        </>
    )
}