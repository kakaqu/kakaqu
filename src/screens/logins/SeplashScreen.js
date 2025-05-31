import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import theme from '../../styles/thems';

export default function SeplashScreen() {
  return (
    <View style={styles.container}>      
    <View>
    <Image
        style={styles.stretch}
        source={require('../../../assets/bLogo.png')}
      />
    </View>
    <View>
    <Text
      style={styles.logoText}>BAZAR</Text>
      <StatusBar style="auto" />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretch:{
    marginTop:0,
    marginVertical: 20,
    height: 230,
    width: 230,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 100,
  },

  //fontLogo.ttf
});
