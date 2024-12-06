import {Img, makeScene2D, Txt, Node, Polygon} from "@motion-canvas/2d";
import mercury from "../images/mercury.svg";
import {all, createRef, delay, easeInQuart, easeOutElastic, easeOutExpo, waitFor} from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const logo = createRef<Img>();

    const topText = createRef<Txt>();

    const bottomText = createRef<Txt>();
    const polygon = createRef<Polygon>();

    view.add(<Txt fill={"#E75A7C"} ref={topText} fontFamily={"JetBrains Mono"} y={-600} fontSize={100} text={"Mercury's"}/>)
    view.add(<Img src={mercury} height={0} y={-50} ref={logo}/>);
    view.add(
        <Polygon layout sides={5} size={800} ref={polygon} fill={"#F2F5EA"} y={940} alignItems={"start"} justifyContent={"center"} paddingTop={200}>
            <Txt fill={"#2C363F"} ref={bottomText} fontFamily={"JetBrains Mono"} text={"Tutorials"} fontSize={75}/>
        </Polygon>
    )

    yield* logo().size([750, 500], 1, easeOutElastic)
    yield* topText().y(-400, 1)
    yield* polygon().y(615, 1)
    yield* waitFor(2)
    yield* all(
        topText().y(-600, 1),
        polygon().y(940, 1)
    );
    yield* logo().size([0, 0], 1, easeInQuart)

});