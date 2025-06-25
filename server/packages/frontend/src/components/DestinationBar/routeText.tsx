import { RegisterTerminalRunHopFragment, RunHopType } from "@/data/generated";
import { getActualTakenHops, getAmountOfAlternativeHops, getAmountOfReturnHops, hopIsAtGateway, PartialRun } from "@/lib/hopHelpers";
import { JSX } from "react";

function RecommendedHopText(hop: RegisterTerminalRunHopFragment) {
    const owner = hop?.address?.info?.company.name || hop?.address?.info?.carrier?.name || undefined;
    const destination = hop.address?.info?.location?.city || undefined
    if (destination) {
        return (
            <p>
                Wij hebben alvast gekeken. Naar <b>{destination}</b> is de korste route. Wij bevelen deze aan.
            </p>
        );
    }
    const unknownDestinationResponse = (
        <p>
            Dit is de snelste route voor je pakketje. We weten alleen niet waar deze precies naar toe gaat, omdat de router niet zegt waar hij staat.
        </p>
    );
    const unkownOwnerResponse = (
        <p>
            Dit is de snelste route voor je pakketje. We weten alleen niet van wie deze router is.
        </p>
    );
    if (!destination && !owner) {
        // should pick a random one
        const selection = Math.floor(Math.random() * 2);
        const responseArray = [unknownDestinationResponse, unkownOwnerResponse];
        return responseArray[selection];
    }

    if (!destination) {
        return unknownDestinationResponse;
    }
    if (!owner) {
        return unkownOwnerResponse;
    }
    return null;
}

function AlternativeHopText(hop: RegisterTerminalRunHopFragment, run: PartialRun | null | undefined) {
    const owner = hop?.address?.info?.company.name || hop?.address?.info?.carrier?.name || undefined;
    const destination = hop.address?.info?.location?.city || undefined
    const country = hop.address?.info?.location?.country || undefined
    const alternativeHopCount = getAmountOfAlternativeHops(run);
    const potentialTexts = [];
    if (alternativeHopCount > 3) {
        // make a note out of it
        potentialTexts.push((
            <p>
                We zien dat er al veel alternatieve routes genomen zijn. Helaas kom je niet altijd op plaats van bestemming als je alternatieve routes blijft nemen.
            </p>
        ));
    }
    if (destination || country) {
        potentialTexts.push((
            <p>
                Dit is een alternatieve route. Deze is mogelijk wat langzamer of vermijdt een router die je mogelijk niet wil hebben.
            </p>
        ));
    } else {
        potentialTexts.push((
            <p>
                Vraagtekens ????<br></br>
                Dat is een onbekende route! Soms kunnen we niet zien hoe je pakketje reist. De weg bestaat wel, maar blijft een mysterie. Spannend!
            </p >
        ));
    }
    if (!owner) {
        potentialTexts.push((
            <p>
                Van deze alternatieve route weten we niet wie de router bezit. Vertrouw jij deze route genoeg om hem te kiezen?
            </p>
        ));
    }
    if (potentialTexts.length === 0) {
        return null;
    }
    const selection = Math.floor(Math.random() * potentialTexts.length);
    return potentialTexts[selection];
}

function PreviousHopText(hop: RegisterTerminalRunHopFragment, run: PartialRun | null | undefined) {
    const returnHopsAmount = getAmountOfReturnHops(run);
    const isAtGateWay = hopIsAtGateway(run);

    if (isAtGateWay) {
        return (
            <p>
                Deze route gaat terug naar je computer. Zo kom je niet het internet op en zal je nooit de website kunnen laden.
            </p>
        );
    }
    const potentialTexts = [];
    potentialTexts.push((
        <p>
            Deze route gaat terug naar je vorige stop.
        </p>
    ));
    potentialTexts.push((
        <p>
            Met deze route ga je terug. Met echte internetpakketjes gebeurd dit eigenlijk nooit.
        </p>
    ));
    if (returnHopsAmount > 2) {
        potentialTexts.push((
            <p>
                We zien dat je al een aantal keer de terug route hebt gekozen. Om het pakketje aan te laten komen op bestemming moet deze wel vooruit!
            </p>
        ));
    }
    if (potentialTexts.length === 0) {
        return null;
    }
    const selection = Math.floor(Math.random() * potentialTexts.length);
    return potentialTexts[selection];
}


function WormHoleHopText(hop: RegisterTerminalRunHopFragment, run: PartialRun | null | undefined) {
    const hopAmount = getActualTakenHops(run)?.length || 0;
    const potentialTexts = [];
    potentialTexts.push((
        <p>
            Deze route gaat direct terug.
        </p>
    ));
    if (hopAmount > 5) {
        potentialTexts.push((
            <p>
                Pfoe wat een reis. Dit pakketje is door {`${hopAmount}`} routers gereist. Voor de snelle weg terug kies deze route.
            </p>
        ));
    }
    if (potentialTexts.length === 0) {
        return null;
    }
    const selection = Math.floor(Math.random() * potentialTexts.length);
    return potentialTexts[selection];
}

export default function DestinationExplanation(props: { hop: RegisterTerminalRunHopFragment, run: PartialRun | null | undefined }): JSX.Element | null {
    const { hop, run } = props;
    switch (hop.type) {
        case RunHopType.Alternative:
            return AlternativeHopText(hop, run);
        case RunHopType.Invalid:
            break;
        case RunHopType.Previous:
            return PreviousHopText(hop, run);
        case RunHopType.Recommended:
            return RecommendedHopText(hop);
        case RunHopType.Wormhole:
            return WormHoleHopText(hop, run);
    }
    return null;

}
