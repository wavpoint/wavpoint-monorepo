import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '../lib/utils';
import { styled } from 'nativewind';

const StyledTI = styled(TextInput)

const Input = React.forwardRef<
    React.ElementRef<typeof TextInput>,
    React.ComponentPropsWithoutRef<typeof TextInput>
// @ts-ignore
>(({ className, placeholderClassName, ...props }, ref) => {
    return (
        <StyledTI
            ref={ref}
            className={cn(
                'web:flex h-10 native:h-12 web:w-full rounded-xl border border-gray-300 px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] placeholder:text-gray-400 file:border-0 file:bg-transparent file:font-medium',
                props.editable === false && 'opacity-50 web:cursor-not-allowed',
                className
            )}
            // @ts-ignore
            placeholderClassName={cn('text-gray-300', placeholderClassName)}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export { Input };