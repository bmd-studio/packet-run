import Run from '../entities/run/index.entity';
import { RunHopStatus } from '../entities/runHop/index.entity';
import Terminal, { TerminalType } from '../entities/terminal/index.entity';

/**
 * Retrieve the previously taken hop for a given run
 */
export async function getPreviousHop(run: Run) {
    const [previousHop] = await run.hops.loadItems({ 
        where: {
            hop: run.currentHopIndex - 1,
            status: RunHopStatus.ACTUAL,
        },
    });

    return previousHop;
}

/**
 * Retrieve the terminal that has the shortest path to the destination
 */
export async function getTerminalWithShortestPath(run: Run, destinationType: TerminalType.SERVER | TerminalType.RECEIVER) {    
    // Base the destination on whether the server has been visited
    const destination = destinationType === TerminalType.RECEIVER
        ? (await this.orm.em.findOne(Terminal, { type: TerminalType.RECEIVER })).id
        : run.server.id;

    // This variable tracks which terminals still need to be processed.
    // Whenever the destination is not found, all toConnections are added to
    // the queue for that terminal
    let queue: [number, Terminal][] = run.terminal.connectionsTo.getItems().map((t) => [run.terminal.id, t.to]);

    // Track which terminals we've seen, so that we don't track routes
    // multiple times
    const seen: Set<number> = new Set();

    // Store the backwards route so that we can track how we end up at the destination
    const routes: Map<number, number[]> = new Map(
        // Add the routes from the current terminal to the next
        queue.map((t) => [t[1].id, [run.terminal.id, t[1].id]]),
    );

    // Loop through the queue gradually using Breadth-first Search
    while (queue.length > 0) {
        // Process the first item in the queue
        const [previous, terminal] = queue.shift();

        // GUARD: Check if this is the destination we're looking for
        if (terminal.id === destination) {
            // Add the path to the terminal and exit
            seen.add(terminal.id);

            // Add the route
            routes.set(destination, [...routes.get(previous), destination]);

            // Clear the queue
            queue = [];
        } else {
            // Loop through all available connections from here
            terminal.connectionsTo.getItems()
                // Filter any connection we've already handled
                .filter((c) => !seen.has(c.to.id))
                .forEach((c) => {
                    // Mark the connection as seen
                    seen.add(c.to.id);

                    // Save the route from the current terminal to this connection
                    routes.set(c.to.id, [...routes.get(previous), c.to.id]);

                    // Add the connection to the queue
                    queue.push([terminal.id, c.to]);
                });
        }
    }

    // Retrieve the final route to the destination
    const route = routes.get(destination);

    // Return the next hop
    return {
        terminalId: route[1],
        route,
    }
}