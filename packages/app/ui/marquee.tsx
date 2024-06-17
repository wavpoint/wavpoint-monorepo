import { useEffect, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useFrameCallback,
	useSharedValue,
	type SharedValue,
} from "react-native-reanimated";
import { Row } from "./layout";
import { View } from "./view";

interface MeasureElementProps {
	onLayout: (width: number) => void;
	children: React.ReactNode;
}

const MeasureElement = ({ onLayout, children }: MeasureElementProps) => (
	<Animated.ScrollView
		horizontal
		className={"opacity-0 -z-10"}
		pointerEvents="box-none"
	>
		<View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
			{children}
		</View>
	</Animated.ScrollView>
);

interface TranslatedElementProps {
	index: number;
	offset: SharedValue<number>;
	childrenWidth: number;
	children: React.ReactNode;
}

const TranslatedElement = ({
	index,
	children,
	offset,
	childrenWidth,
}: TranslatedElementProps) => {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: (index - 1) * childrenWidth,
			transform: [
				{
					translateX: -offset.value,
				},
			],
		};
	}, []);

	return (
		<Animated.View style={[{ position: "absolute" }, animatedStyle]}>
			{children}
		</Animated.View>
	);
};

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

interface ClonerProps {
	count: number;
	renderChild: (index: number) => JSX.Element;
}

const Cloner = ({ count, renderChild }: ClonerProps) => (
	<>{getIndicesArray(count).map(renderChild)}</>
);

interface ChildrenScrollerProps {
	duration: number;
	childrenWidth: number;
	parentWidth: number;
	reverse: boolean;
	children: React.ReactNode;
}

const ChildrenScroller = ({
	duration,
	childrenWidth,
	parentWidth,
	reverse,
	children,
}: ChildrenScrollerProps) => {
	const offset = useSharedValue(0);
	const coeff = useSharedValue(reverse ? 1 : -1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: only change on reverse change
	useEffect(() => {
		coeff.value = reverse ? 1 : -1;
	}, [reverse]);

	useFrameCallback((i) => {
		// prettier-ignore
		offset.value +=
			(coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) /
			duration;
		offset.value = offset.value % childrenWidth;
	}, true);

	const count = Math.round(parentWidth / childrenWidth) + 2;
	const renderChild = (index: number) => (
		<TranslatedElement
			key={`clone-${index}`}
			index={index}
			offset={offset}
			childrenWidth={childrenWidth}
		>
			{children}
		</TranslatedElement>
	);

	return <Cloner count={count} renderChild={renderChild} />;
};

interface MarqueeProps {
	duration?: number;
	reverse?: boolean;
	className?: string;
	children: React.ReactNode;
}

export const Marquee = ({
	duration = 2000,
	reverse = false,
	className,
	children,
}: MarqueeProps) => {
	const [parentWidth, setParentWidth] = useState(0);
	const [childrenWidth, setChildrenWidth] = useState(0);

	return (
		<View
			className={className}
			onLayout={(ev) => {
				setParentWidth(ev.nativeEvent.layout.width);
			}}
			pointerEvents="box-none"
		>
			<Row className="overflow-hidden" pointerEvents="box-none">
				<MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

				{childrenWidth > 0 && parentWidth > 0 && (
					<ChildrenScroller
						duration={duration}
						parentWidth={parentWidth}
						childrenWidth={childrenWidth}
						reverse={reverse}
					>
						{children}
					</ChildrenScroller>
				)}
			</Row>
		</View>
	);
};
