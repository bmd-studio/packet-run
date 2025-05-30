'use client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import Link from 'next/link';
import { TerminalStatus, TerminalType, useAllTerminalsSubscription } from '@/data/generated';
import { CircleHelp, DoorClosed, MonitorPlay, MonitorStop, Plus, Router, Server } from 'lucide-react';
import { useContext } from 'react';
import { terminalContext } from '../RegisterTerminal';
import { cn } from '@/lib/utils';

function getTerminalIcon(type: TerminalType, className: string = 'size-5') {
    switch (type) {
    case TerminalType.Gateway:
        return <DoorClosed className={className} />;
    case TerminalType.Router:
        return <Router className={className} />;
    case TerminalType.Sender:
        return <MonitorPlay className={className} />;
    case TerminalType.Receiver:
        return <MonitorStop className={className} />;
    case TerminalType.Server:
        return <Server className={className} />;
    default:
        return <CircleHelp className={className} />;
    }
}   

const terminalStatusIndicatorClassNames = "inline-block size-2 rounded-full";

function getTerminalStatusIndicator(terminal: { status: TerminalStatus, presences?: { connectedAt: number }[] }, className?: string) {
    switch (terminal.status) {
    case TerminalStatus.Idle:
        return <span className={cn(
            "bg-green-500",
            terminalStatusIndicatorClassNames,
            className
        )} />;
    case TerminalStatus.ScanningNfc:
        return <span className={cn(
            "bg-blue-500",
            terminalStatusIndicatorClassNames,
            className
        )} />;
    case TerminalStatus.CreatingPacket:
        return <span className={cn(
            "bg-yellow-500",
            terminalStatusIndicatorClassNames,
            className
        )} />;
    case TerminalStatus.CreatedPacket:
        return <span className={cn(
            "bg-purple-500",
            terminalStatusIndicatorClassNames,
            className
        )} />;
    default:
        return <span className={cn(
            "bg-red-500",
            terminalStatusIndicatorClassNames,
            className
        )} />;
    }
}


export default function StandaloneMenu() {
    const { data } = useAllTerminalsSubscription();
    const terminal = useContext(terminalContext);

    return (
        <div className="flex py-2 px-6 bg-[var(--light-gray)] w-screen justify-between gap-8 items-center border-b-2 border-dashed fixed top-0 left-0 right-0 z-50">
            {/* eslint-disable-next-line @next/next/no-img-element  */}
            <img src="/logo.svg" alt="Packet Run" className="h-6" />
            {terminal && (
                <div className="text-xs text-gray-500 flex gap-2 items-center">
                    Current terminal:
                    {getTerminalIcon(terminal.type, 'size-4')}
                    {terminal.id}
                    {getTerminalStatusIndicator(terminal, 'size-2')}
                </div>
            )}
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/sender/1" className="flex flex-row items-center gap-2">
                                <Plus />
                                Start new run
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Terminals</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <span className="text-xs ml-2 text-gray-500">Jump to terminal:</span>
                            <ul className="grid w-[400px] gap-2 grid-cols-2">
                                {data?.allTerminals.map(terminal => (
                                    <li key={terminal.id}>
                                        <NavigationMenuLink asChild>
                                            <Link href={`/${terminal.type.toLowerCase()}/${terminal.id}`}>
                                                <div className="flex items-center gap-2">
                                                    <div className="px-2">
                                                        {getTerminalIcon(terminal.type)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex flex-row items-center gap-2">
                                                            Terminal {terminal.id}
                                                            {getTerminalStatusIndicator(terminal)}
                                                        </div>
                                                        <span className="text-xs text-gray-500 capitalize">
                                                            {terminal.type.toLowerCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/statistics">
                                Statistics
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div >
    );
}