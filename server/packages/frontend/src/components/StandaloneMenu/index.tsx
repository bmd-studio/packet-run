'use client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import Link from 'next/link';
import { TerminalStatus, TerminalType, useAllTerminalsSubscription, useResetTerminalMutation, useCreateReturnPacketMutation } from '@/data/generated';
import { CircleHelp, DoorClosed, MonitorPlay, MonitorStop, Plus, Router, Server, Loader2, RefreshCw, Package } from 'lucide-react';
import { useCallback, useContext } from 'react';
import { terminalContext } from '../RegisterTerminal';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { styled } from 'styled-components';
const MenuWrapper = styled.div<{ open?: boolean }>`
    top: -54px;
    transition: all 0.3s;
    position: fixed;
    &:hover {
        top: -0px;
    }
    &::after {
        font-family: Symbola, monospace;
        content: '\\2193';
        text-align: center;
        padding-bottom: 8px;
        width: 100px;
        height: 32px;
        border-radius: 0px 0px 16px 16px;
        position: absolute;
        bottom: -32px;
        background-color: var(--light-gray);
        border-top: 2px dashed;
        left: calc(50vw - 50px);
        z-index: 5;
        box-shadow: 0px 5px 5px grey;
    }
`;

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
    const [resetTerminal, { loading: loadingReset }] = useResetTerminalMutation();
    const [createReturnPacket, { loading: loadingReturnPacket }] = useCreateReturnPacketMutation();

    const handleResetTerminal = useCallback(() => {
        if (!terminal || terminal.status === TerminalStatus.Idle) {
            return;
        }
        resetTerminal({ variables: { terminalId: terminal.id } });
    }, [terminal, resetTerminal]);

    const handleOpenReturnPacket = useCallback(() => {
        if (!terminal || terminal.type !== TerminalType.Server) {
            return;
        }
        if (terminal.status !== TerminalStatus.ScanningNfc) {
            return;
        }
        createReturnPacket({
            variables: {
                terminalId: terminal.id,
                isPacketCreated: false
            }
        });
    }, [terminal, createReturnPacket]);

    const handleCloseReturnPacket = useCallback(() => {
        if (!terminal || terminal.type !== TerminalType.Server) {
            return;
        }
        if (terminal.status !== TerminalStatus.CreatingPacket) {
            return;
        }
        createReturnPacket({
            variables: {
                terminalId: terminal.id,
                isPacketCreated: true
            }
        });
    }, [terminal, createReturnPacket]);

    return (
        <MenuWrapper className="flex py-2 px-6 bg-[var(--light-gray)] w-screen justify-between gap-8 items-center border-b-2 border-dashed fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="Packet Run" className="h-6" />
                <Tooltip>
                    <TooltipTrigger>
                        <span className="text-xs uppercase text-gray-400 flex items-center gap-1">
                            / Standalone
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="start" sideOffset={5}>
                        In standalone mode, we&apos;re running a simulation of the Packet Run system.
                    </TooltipContent>
                </Tooltip>
            </div>
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
                        <NavigationMenuTrigger className="flex items-center gap-2">
                            Actions
                            {(loadingReset || loadingReturnPacket) && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-2 p-2">
                                <li>
                                    <NavigationMenuLink
                                        asChild
                                        className={cn(
                                            "flex items-center gap-2 flex-row cursor-pointer",
                                            (!terminal || terminal.status === TerminalStatus.Idle) && "opacity-50 cursor-not-allowed"
                                        )}
                                        onClick={handleResetTerminal}
                                    >
                                        <button>
                                            <RefreshCw className="w-4 h-4 shrink-0" />
                                            <span>Reset Terminal</span>
                                        </button>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink
                                        className={cn(
                                            "flex items-center gap-2 flex-row cursor-pointer",
                                            (!terminal || terminal.type !== TerminalType.Server || terminal.status !== TerminalStatus.ScanningNfc) && "opacity-50 cursor-not-allowed"
                                        )}
                                        onClick={handleOpenReturnPacket}
                                    >
                                        <Package className="w-4 h-4 shrink-0" />
                                        <span>Create Return Packet (Open)</span>
                                    </NavigationMenuLink>
                                </li>
                                <li>
                                    <NavigationMenuLink
                                        className={cn(
                                            "flex items-center gap-2 flex-row cursor-pointer",
                                            (!terminal || terminal.type !== TerminalType.Server || terminal.status !== TerminalStatus.CreatingPacket) && "opacity-50 cursor-not-allowed"
                                        )}
                                        onClick={handleCloseReturnPacket}
                                    >
                                        <Package className="w-4 h-4 shrink-0" />
                                        <span>Create Return Packet (Close)</span>
                                    </NavigationMenuLink>
                                </li>
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
        </MenuWrapper>
    );
}
