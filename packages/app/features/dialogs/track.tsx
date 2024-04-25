import { ArrowUpRight, Play, PlusCircle, SkipBack, SkipForward } from "lucide-react-native";
import { Button, Dialog, DialogContent, DialogTrigger, Drawer, DrawerContent, DrawerTrigger, Row, Text, View, buttonVariants } from "../../ui";
import { Slider2 } from "../../ui/slider";
import { useState } from "react";
import MintDialogContent from "./mint";
import { cn } from "../../lib/utils";
import { useMediaQuery } from "../../ui/primitives/hooks";

export function TrackDialogContent() {
    const [time, setTime] = useState(0);

    const secondsToMinutes = (seconds: number) => `${Math.floor(seconds / 60)}:${(`0${Math.floor(seconds % 60)}`).slice(-2)}`;

    return <Row className="flex justify-center">
        <Row className="px-8 py-2 max-w-xl w-full gap-4">
            <View className="w-[150px] h-[150px] bg-gradient-initial rounded-lg" />

            <View className="gap-4 grow justify-center">
                <View className="gap-1">
                    <Text className="flex items-center font-semibold">Mix Name <ArrowUpRight className="w-4 h-4 text-primary mt-0.5" /></Text>
                    <Text className="font-extralight italic text-xs">Artist Name</Text>
                </View>

                <View className="gap-1.5">
                    <Slider2 value={time} max={30 * 60} onValueChange={(vals) => {
                        const nextValue = vals[0];
                        if (typeof nextValue !== 'number') return;
                        setTime(nextValue);
                    }} />

                    <Row className="justify-between">
                        <Text className="text-[10px]">{secondsToMinutes(time)}</Text>
                        <Text className="text-[10px]">30:00</Text>
                    </Row>
                </View>

                <Row className="justify-between">
                    <Button size={'icon'} variant={'ghost'} className="rounded-lg">
                        <SkipBack className="w-5 h-5" />
                    </Button>

                    <Button size={'icon'} variant={'ghost'} className="rounded-lg">
                        <Play className="w-6 h-6 fill-black" />
                    </Button>

                    <Button size={'icon'} variant={'ghost'} className="rounded-lg">
                        <SkipForward className="w-5 h-5" />
                    </Button>

                    <MintDialog />
                </Row>
            </View>
        </Row>
    </Row>
}

export function MintDialog() {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 624px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className="rounded-lg">
                        <PlusCircle className="w-5 h-5 text-primary" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <MintDialogContent />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Text className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'cursor-pointer rounded-lg')}>
                    <PlusCircle className="w-5 h-5 text-primary" />
                </Text>
            </DrawerTrigger>
            <DrawerContent>
                <MintDialogContent />
            </DrawerContent>
        </Drawer>
    )
}