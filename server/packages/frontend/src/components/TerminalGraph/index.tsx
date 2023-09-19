import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Terminal, TerminalStatus, TerminalType, useAllTerminalsSubscription, useResetTerminalMutation } from '@/data/generated';
import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import colors from 'tailwindcss/colors';
import { Button } from '../ui/button';

const mapTerminalStatusToColor: Record<TerminalStatus | 'OFFLINE', { background: string, border: string }> = {
    'OFFLINE': {
        background: colors.red[500],
        border: colors.red[200],
    },
    [TerminalStatus.Idle]: {
        background: colors.green[500],
        border: colors.green[200],
    },
    [TerminalStatus.ScanningNfc]: {
        background: colors.blue[500],
        border: colors.blue[200],
    },
    [TerminalStatus.CreatingPacket]: {
        background: colors.indigo[500],
        border: colors.indigo[200],
    },
    [TerminalStatus.CreatedPacket]: {
        background: colors.purple[500],
        border: colors.purple[200],
    },
};

const mapTerminalTypeToShape: Record<TerminalType, cytoscape.Css.NodeShape> = {
    [TerminalType.Gateway]: 'ellipse',
    [TerminalType.Router]: 'ellipse',
    [TerminalType.Sender]: 'diamond',
    [TerminalType.Receiver]: 'barrel',
    [TerminalType.Server]: 'diamond',
};

export default function TerminalGraph() {
    const { data, error } = useAllTerminalsSubscription();
    const graphRef = useRef<HTMLDivElement | null>(null);
    const graph = useRef<cytoscape.Core | null>(null);
    const [activeTerminal, setActiveTerminal] = useState<Terminal | null>(null);
    const [mutate] = useResetTerminalMutation();

    if (error) {
        console.error(error);
    }

    const elements = useMemo(() => {
        if (!data?.allTerminals.length) {
            return [];
        }

        return {
            nodes: data.allTerminals.map((terminal) => {
                return {
                    data: {
                        ...terminal,
                        id: terminal.id.toString(),
                        label: `${terminal.id}`,
                        backgroundColor: terminal.presences.length
                            ? mapTerminalStatusToColor[terminal.status].background
                            : mapTerminalStatusToColor['OFFLINE'].background,
                        borderColor: terminal.presences.length
                            ? mapTerminalStatusToColor[terminal.status].border
                            : mapTerminalStatusToColor['OFFLINE'].border,
                        shape: mapTerminalTypeToShape[terminal.type],
                    },
                } as NodeDefinition
            }).reverse(),
            edges: data.allTerminals.flatMap((terminal) => {
                return terminal.connectionsTo.map((connection) => {
                    return {
                        data: {
                            id: `e_${terminal.id}_${connection.to.id}`,
                            source: terminal.id.toString(),
                            target: connection.to.id.toString(),
                        },
                    } as EdgeDefinition
                });
            }),
        };
    }, [data]);

    useEffect(() => {
        graph.current = cytoscape({
            elements,
            container: graphRef.current,
            layout: { name: 'circle' },
            autoungrabify: true,
            autounselectify: true,
            userPanningEnabled: false,
            userZoomingEnabled: false,
            style: [{
                selector: 'node',
                style: {
                    backgroundColor: 'data(backgroundColor)',
                    "border-color": 'data(borderColor)',
                    "border-style": 'solid',
                    "border-width": 5,
                    shape: 'data(shape)' as cytoscape.Css.NodeShape,
                    width: 64,
                    height: 64,
                }
            }, {
                selector: 'node[label]',
                style: {
                    label: 'data(label)',
                    "text-wrap": 'wrap',
                    "font-family": '-apple-system',
                    // "text-margin-y": -12,
                    "font-size": 18,
                    "font-weight": "bold",
                    "color": "white",
                    "text-valign": "center"
                }
            }, {
                selector: 'edge',
                style: {
                    width: 1.5,
                    'curve-style': 'bezier',
                    "mid-target-arrow-shape": 'triangle',
                    "mid-target-arrow-color": colors.gray[300],
                    "arrow-scale": 1.6,
                    "line-color": colors.gray[300],
                }
            }, {
                selector: 'edge.highlighted',
                style: {
                    width: 2.5,
                    "line-color": colors.gray[400],
                    'mid-target-arrow-color': colors.gray[400],
                    "z-index": 2,
                }
            }],
        });

        graph.current.nodes().bind('mouseover', (e) => {
            const target = e.target as cytoscape.NodeSingular;
            target.connectedEdges().addClass('highlighted');
        });
        graph.current.nodes().bind('mouseout', (e) => {
            const target = e.target as cytoscape.NodeSingular;
            target.connectedEdges().removeClass('highlighted');
        });
        graph.current.nodes().bind('click', (e) => {
            const target = e.target as cytoscape.NodeSingular;
            setActiveTerminal(target.data());
        });
    }, [elements]);

    useEffect(() => {
        function resizeCytoscape() {
            graph.current?.resize();
            graph.current?.fit();
        }

        window.addEventListener('resize', resizeCytoscape);
        
        return () => window.removeEventListener('resize', resizeCytoscape);
    }, []);

    const closePopover = useCallback(() => {
        setActiveTerminal(null);
    }, []);

    const resetTerminal = useCallback(() => {
        if (activeTerminal) {
            mutate({ variables: { terminalId: Number.parseInt(activeTerminal.id as unknown as string) }});
        }
    }, [mutate, activeTerminal]);

    useEffect(() => {
        if (!data?.allTerminals.length) {
            return;
        } 

        setActiveTerminal((currentValue) => {
            if (!currentValue) {
                return null;
            } else {
                return data.allTerminals.find((t) => t.id == currentValue.id) as Terminal|| null;
            }
        });
    }, [data]);

    return (
        <div className="grow flex flex-col flex-shrink min-w-0 w-md">
            <div className="flex-auto" ref={graphRef} />
            <Popover open={!!activeTerminal} onOpenChange={closePopover}>
                <PopoverContent className='w-[384px] m-4 whitespace-pre bg-background shadow-md rounded-md overflow-x-hidden overflow-y-scroll border border-gray-100' align="start">
                    {activeTerminal && (
                        <div className="grid grid-colrs-1 divide-y max-h-screen">
                            <h1 className="text-lg p-4 flex items-center">
                                Terminal {activeTerminal.id}
                                <span className="text-sm ml-2 text-gray-600">
                                    {activeTerminal.type}
                                </span>
                            </h1>
                            <div className="p-4 flex space-between items-center">
                                <span className="text-sm text-white font-bold p-1 px-2 rounded" style={{ backgroundColor: mapTerminalStatusToColor[activeTerminal.status].background}}>
                                    {activeTerminal?.status}
                                </span>
                                <Button className="ml-auto" variant="outline" onClick={resetTerminal}>
                                    Reset
                                </Button>
                            </div>
                            <Accordion type="single" collapsible className="max-w-full overflow-hidden">
                                <AccordionItem value="json" className="border-none px-4">
                                    <AccordionTrigger className="text-gray-600">JSON Object</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="p-4 bg-gray-50 overflow-x-scroll rounded">
                                            <code className="text-sm font-mono text-gray-500">
                                                {JSON.stringify(activeTerminal, null, 4)}
                                            </code>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}