import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { authClient } from '@/lib/auth-client';
import { Link, Stack } from 'expo-router';
import { Combine, MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useState } from 'react';
import { Image, type ImageStyle, Pressable, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerTransparent: true,

  headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    })
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center p-4">
        <View className="w-full max-w-md gap-8">

          {/* Header */}
          <View className="gap-2 justify-center items-center">
            <View className="p-4 bg-orange-500 rounded-lg">
              <Combine className="size-12" color={'#fff'} />
            </View>
            <Text className="text-center text-2xl font-bold text-orange-500">
              Welcome to OptimaAset
            </Text>
            <Text className="text-center text-sm text-muted-foreground">
              Aplikasi untuk mengelola aset perusahaan dengan mudah dan efisien.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-6 w-full">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                returnKeyType="next"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto px-1 py-0"
                >
                  <Text className="text-sm">Forgot your password?</Text>
                </Button>
              </View>
              <Input id="password" secureTextEntry value={password}
                onChangeText={setPassword} />
            </View>

            <Button className="w-full" onPress={handleLogin}>
              <Text>Continue</Text>
            </Button>
          </View>

          {/* Footer */}
          <Text className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Text className="underline">Sign up</Text>
          </Text>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">or</Text>
            <Separator className="flex-1" />
          </View>

          <SocialConnections />

        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
