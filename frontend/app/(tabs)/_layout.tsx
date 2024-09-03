import { Tabs } from 'expo-router';

const _layout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="songs" />
        </Tabs>
    );
};

export default _layout;
