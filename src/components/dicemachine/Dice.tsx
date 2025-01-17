interface DiceProps {
    diceNumber : number,
}
export default function Dice(props : DiceProps) {

    const dicePath = `dice-${props.diceNumber}.png`;

    return (
        <img className="h-12 m-auto" src={dicePath} alt={`${props.diceNumber}`} />
    )

}



