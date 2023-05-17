import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import blurBg from "./assets/bg-blur.png";
import Stripes from "./assets/stripes.svg";
import nlwLogo from "./assets/nlw-spacetime-logo.svg";
import { styled } from "nativewind";

export default function App() {
  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!hasLoaded) {
    return null;
  }

  const StyledStripes = styled(Stripes);
  const StyledLogo = styled(nlwLogo);
  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{
        position: "absolute",
        left: "-100%",
      }}
      className="relative flex-1 items-center bg-gray-900 px-8"
    >
      <StyledStripes className="absolute left-2 top-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <StyledLogo className="h-48 w-48" />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            {" "}
            Sua capsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-5 text-gray-400 text-center font-body">Feito com ❤ no NLW da Rocketseat</Text>
      <StatusBar style="auto" translucent />
    </ImageBackground>
  );
}
