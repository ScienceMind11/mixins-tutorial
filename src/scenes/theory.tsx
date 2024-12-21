import {makeScene2D, Rect, Icon, Txt, Line} from "@motion-canvas/2d";
import {
    all,
    Color,
    createRef,
    createSignal,
    map,
    Reference,
    ThreadGenerator,
    tween,
    waitFor
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const green = new Color("#BBC7A4")
    const black = new Color("#2C363F")
    const white = new Color("#F2F5EA")
    const grey = new Color("#D6DBD2")
    const red = new Color("#E75A7C")
    const blue = new Color("#508CA4")

    var y = 0

    const sourceCode = createRef<Rect>();
    view.add(
        <Rect layout padding={20} radius={8} fill={green.darken(0.4)} gap={24} alignItems="center" position={[-650, y]} ref={sourceCode} opacity={0}>
            <Icon icon={"material-symbols:code"} size={56} color={white}/>
            <Txt fontSize={42} text={"Source Code"} fill={white} fontFamily={"JetBrains Mono"}/>
        </Rect>
    )

    const bytecode = createRef<Rect>();
    const bytecodeIcon = createRef<Icon>();
    const bytecodeTxt = createRef<Txt>();
    view.add(
        <Rect layout padding={20} radius={8} fill={green.darken(0.9)} gap={24} alignItems="center" position={[-50, y]} ref={bytecode} opacity={0}>
            <Icon icon={"material-symbols:deployed-code-outline"} size={56} color={white} ref={bytecodeIcon}/>
            <Txt fontSize={42} text={"Bytecode"} fill={white} fontFamily={"JetBrains Mono"} ref={bytecodeTxt}/>
        </Rect>
    )

    const sourceToByte = createRef<Line>();
    view.add(
        <Line layout lineWidth={8} endArrow points={[sourceCode().right, bytecode().left]} stroke={white} radius={8} startOffset={15} endOffset={15} alignItems={"center"} justifyContent={"center"} ref={sourceToByte} opacity={0}/>
    )

    const machineCode = createRef<Rect>();
    view.add(
        <Rect layout padding={20} radius={8} fill={grey.darken(1)} gap={24} alignItems="center" position={[550, y]} ref={machineCode} opacity={0}>
            <Icon icon={"charm:binary"} size={56} color={white}/>
            <Txt fontSize={42} text={"Machine Code"} fill={white} fontFamily={"JetBrains Mono"}/>
        </Rect>
    )

    const byteToMachine = createRef<Line>();
    view.add(
        <Line layout paddingRight={20} lineWidth={8} endArrow points={[bytecode().right, machineCode().left]} stroke={white} radius={8} startOffset={15} endOffset={15} alignItems={"center"} justifyContent={"center"} ref={byteToMachine} opacity={0}>
            <Rect layout padding={20} fill={black}>
                <Txt text={"JVM"} fill={white} fontFamily={"JetBrains Mono"} fontSize={36}/>
            </Rect>
        </Line>
    )

    const mixin = createRef<Rect>();
    view.add(
        <Rect layout padding={20} radius={8} fill={red.darken(0.7)} gap={24} alignItems="center" position={[-650, y + 200]} ref={mixin} opacity={0}>
            <Icon icon={"file-icons:mixin"} size={56} color={white}/>
            <Txt fontSize={42} text={"Mixin"} fill={white} fontFamily={"JetBrains Mono"}/>
        </Rect>
    )

    const mixinToByte = createRef<Line>();
    view.add(
        <Line layout lineWidth={8} endArrow
              points={[
                  mixin().right,
                  () => bytecode().bottom().addY(150),
                  bytecode().bottom
              ]}
        stroke={white} radius={8} startOffset={15} endOffset={15} alignItems={"center"} justifyContent={"center"} ref={mixinToByte} opacity={0}/>
    )

    yield* sourceCode().opacity(1, 0.6)

    yield* waitFor(1) // replace with waitUntil()
    yield* all(
        bytecode().opacity(1, 0.6),
        sourceToByte().opacity(1, 0.6)
    )

    yield* waitFor(1) // replace with waitUntil()
    yield* all(
        machineCode().opacity(1, 0.6),
        byteToMachine().opacity(1, 0.6)
    )

    yield* waitFor(1) // replace with waitUntil()
    yield* all(
        mixin().opacity(1, 0.6),
        tween(0.6, value => {
            y = map(0, -100, value)
        }),
        mixinToByte().opacity(1, 0.6),
        bytecode().fill(red.darken(0.7), 0.6),
        bytecodeTxt().text("Modified Bytecode", 0.6),
        machineCode().x(650, 0.6),
        tweenIcon(bytecodeIcon, 0.6, "material-symbols:deployed-code-update-outline")
    )

    yield* waitFor(2)

});

function* tweenIcon(icon: Reference<Icon>, duration: number, newIcon: string): ThreadGenerator {
    yield icon().opacity(0, duration / 2)
    yield    icon().icon(newIcon)
    yield* icon().opacity(1, duration / 2)
}