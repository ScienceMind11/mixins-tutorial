import {makeScene2D, Circle, Icon, Rect, Txt, Layout, Node, Code, LezerHighlighter, Img} from "@motion-canvas/2d";
import {
    all,
    Color,
    createRef, DEFAULT,
    easeInOutCubic, easeOutQuart,
    easeOutQuint,
    linear,
    map,
    Reference,
    waitFor
} from "@motion-canvas/core";
import {parser} from "@lezer/java";
import {tags} from "@lezer/highlight"

Code.defaultHighlighter = new LezerHighlighter(parser);

export default makeScene2D(function* (view) {

    const background = new Color("#2C363F")

    const mixinBox = createRef<Rect>();
    const mixinCode = createRef<Code>();
    view.add(
        <Rect layout gap={10} direction={"column"} fill={background.brighten(0.2)} radius={8} padding={20} opacity={0.0} ref={mixinBox}>
            <Txt text={"MIXIN"} fontFamily={"JetBrains Mono"} fontSize={24} fill={background.brighten(1.5)}/>
            <Rect layout fill={background.brighten(0.1)} radius={8} padding={20}>
                <Code fontSize={28} fontFamily={"JetBrains Mono"} ref={mixinCode} code={`\
@Mixin(TitleScreen.class)
public class TitleScreenMixin {

    @Inject(at = @At("HEAD"), method = "init()V")
    private void exampleMod$printLine(CallbackInfo ci) {
        ExampleMod.LOGGER.info("This is output from our mixin.");
    }
    
}\
                `}/>
            </Rect>
        </Rect>
    )

    yield* waitFor(1.6) // replace with waitUntil()
    yield* mixinBox().opacity(1, 0.3)
    yield* waitFor(1)

    yield* mixinCode().selection(mixinCode().findAllRanges(/"HEAD"/gi), 0.6)
    yield* waitFor(1)

    yield* mixinCode().selection(mixinCode().findAllRanges(/"init\(\)V"/gi), 0.6)
    yield* waitFor(1)

    yield* mixinCode().selection(DEFAULT, 0.6)

    yield* waitFor(3) // replace with waitUntil()
    yield* all(
        mixinBox().position([-425, 350], 1.6, easeOutQuart),
        mixinCode().code(`\
@Inject(at = @At("HEAD"), method = "init()V")
private void exampleMod$printLine(CallbackInfo ci) {
    info("This is output from our mixin.");
}\
        `, 1.6)
    );
    yield* waitFor(2)

    const sourceBox = createRef<Rect>();
    const sourceCode = createRef<Code>();
    view.add(
        <Rect layout gap={10} direction={"column"} fill={background.brighten(0.2)} radius={8} padding={20} opacity={0.0} ref={sourceBox}>
            <Txt text={"SOURCE"} fontFamily={"JetBrains Mono"} fontSize={24} fill={background.brighten(1.5)}/>
            <Rect layout fill={background.brighten(0.1)} radius={8} padding={20}>
                <Code fontSize={28} fontFamily={"JetBrains Mono"} ref={sourceCode} code={`\
@Mixin(TitleScreen.class)
public class TitleScreenMixin {
    
    
    
    
    
}\
                `}/>
            </Rect>
        </Rect>
    )

    yield* sourceBox().opacity(1, 0.3)

});
