
import { RegisterTerminalRunHopFragment, RunHopStatus, RunHopType } from '@/data/generated';
export interface PartialRun {
    currentHop: RegisterTerminalRunHopFragment;
    hops: RegisterTerminalRunHopFragment[];
}

export function getAmountOfAlternativeHops(run: PartialRun | null | undefined) {
    if (!run) {
        return 0;
    }
    return run.hops.filter((hop) => hop.type === RunHopType.Alternative).length;
}

export function getAmountOfReturnHops(run: PartialRun | null | undefined) {
    if (!run) {
        return 0;
    }
    return run.hops.filter((hop) => hop.type === RunHopType.Previous).length;
}
export function hopIsAtGateway(run: PartialRun | null | undefined) {
    if (!run) {
        return false;
    }
    return run.currentHop.terminal.id === 2;
}

export function getActualTakenHops(run: PartialRun | null | undefined) {
    const previousRoutes = run.hops.filter((h) => (
        h.address && h.status === RunHopStatus.Actual
    )).sort((a, b) => a.hop - b.hop);
    return previousRoutes;
}
