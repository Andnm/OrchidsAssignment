import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactScreen = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container]}>
            <View style={styles.content}>
                <View style={styles.infoContainer}>
                    <Icon
                        name="phone"
                        type="font-awesome"
                        size={30}
                        color="#333"
                        style={styles.icon}
                    />
                    <Text style={styles.infoText}>Phone: +1 123-456-7890</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Icon
                        name="envelope"
                        type="font-awesome"
                        size={30}
                        color="#333"
                        style={styles.icon}
                    />
                    <Text style={styles.infoText}>Email: example@example.com</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Icon
                        name="globe"
                        type="font-awesome"
                        size={30}
                        color="#333"
                        style={styles.icon}
                    />
                    <Text style={styles.infoText}>Website: www.example.com</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    // content: {
    //     flex: 1,
    //     padding: 16,
    // },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
});

export default ContactScreen;
