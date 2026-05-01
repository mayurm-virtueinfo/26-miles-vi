import { HeaderLeftProps } from "@/src/shared/interface/headerLeft.interface";
import { Text, View } from "react-native";
import { useSharedComponentStyles } from "./sharedComponentsStyes/sharedComponentsStyes";

export function HeaderLeft({ title }: HeaderLeftProps) {
  const sharedComponentStyles = useSharedComponentStyles();

  return (
    <View style={sharedComponentStyles.headerLeftContainer}>
      <Text style={sharedComponentStyles.HeaderLeftTitle}>{title}</Text>
    </View>
  );
}
