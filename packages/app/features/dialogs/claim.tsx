import { ArrowUpRight, Clock } from "lucide-react-native";
import { Button, Input, Row, Text, View } from "../../ui";

export default function ClaimDialogContent() {
    return <Row className="flex justify-center">
        <View className="px-6 py-2 max-w-xl w-full items-center gap-4">
            <Text className="font-bold text-xl underline underline-offset-4 gap-1 flex">
                S001 - Lootmatic & Trucalyptus
                <ArrowUpRight className="w-6 h-6 text-primary mt-1" />
            </Text>
            <Text className="text-xs italic">20+ tokens of season required to claim vinyl</Text>

            <Input placeholder="Full name" />
            <Input placeholder="Email" />
            <Input placeholder="Address" />
            <Button className="bg-primary web:hover:bg-primary/80 w-full">
                Submit
            </Button>

            <Row className="justify-center items-center gap-1">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <Text className="font-semibold">23:59:00</Text>
            </Row>
        </View>
    </Row>
}