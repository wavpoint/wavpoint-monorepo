import * as React from 'react';
import { Platform } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring,
} from 'react-native-reanimated';
import * as ProgressPrimitive from './primitives/progress';
import { cn } from '../lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
    return (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn('relative h-4 w-full overflow-hidden rounded-full bg-gradient-initial', className)}
            {...props}
        >
            <Indicator value={value} />
        </ProgressPrimitive.Root>
    );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

function Indicator({ value }: { value: number | undefined | null }) {
    const progress = useDerivedValue(() => value ?? 0, [value]);

    const indicator = useAnimatedStyle(() => {
        return {
            width: withSpring(
                `${interpolate(progress.value, [0, 7777], [1, 100], Extrapolation.CLAMP)}%`,
                { overshootClamping: true }
            ),
        };
    }, [progress.value]);

    if (Platform.OS === 'web') {
        return (
            <ProgressPrimitive.Indicator
                className='h-full w-full flex-1 bg-primary web:transition-all'
                style={{ transform: `translateX(-${100 - interpolate(progress.value, [0, 7777], [1, 100], Extrapolation.CLAMP)}%)` }}
            />
        );
    }

    return (
        <ProgressPrimitive.Indicator asChild>
            <Animated.View style={indicator} className={cn('h-full bg-foreground')} />
        </ProgressPrimitive.Indicator>
    );
}