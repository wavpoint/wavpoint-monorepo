import { View } from 'react-native'
import { styled } from 'nativewind'
import { FlashList as RNFlashList } from '@shopify/flash-list'

export const Row = styled(View, "flex-row")

export const Column = styled(View, "flex justify-center items-center")

export const FlashList = styled(RNFlashList)