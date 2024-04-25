import { ComponentProps, forwardRef } from 'react'
import { Text as NativeText, Platform, Linking, TextStyle } from 'react-native'
import { styled, StyledProps } from 'nativewind'
import { TextLink as SolitoTextLink } from 'solito/link'

export const Text = styled(NativeText)

/**
 * You can use this pattern to create components with default styles
 */
export const P = styled(NativeText, 'text-base text-black my-4')

/**
 * Components can have defaultProps and styles
 */
export const H1 = styled(NativeText, 'text-3xl font-extrabold my-4')
H1.defaultProps = {
    role: 'heading',
}

/**
 * Solito's TextLink doesn't work directly with styled() since it has a textProps prop
 * By wrapping it in a function, we can forward style down properly.
 */
export const TextLink = styled<
    ComponentProps<typeof SolitoTextLink> & { style?: TextStyle }
>(function TextLink({ style, textProps, ...props }) {
    return (
        <SolitoTextLink
            textProps={{ ...textProps, style: [style, textProps?.style] }}
            {...props}
        />
    )
}, 'text-base font-bold hover:underline text-blue-500')