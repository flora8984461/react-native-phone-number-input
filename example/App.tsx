import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { Input } from 'react-native-elements';

const App = () => {
  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          {showMessage && (
            <View style={styles.message}>
              <Text>Country Code : {countryCode}</Text>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? 'true' : 'false'}</Text>
            </View>
          )}
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            countryPickerProps={{withAlphaFilter:true}}
            disabled={disabled}
            withDarkTheme
            withShadow
            autoFocus
            textInputProps = {{
              InputComp: Input,
              value: value,
              rightIcon: {
                name: 'times',
                type: 'font-awesome',
                size: 20,
                onPress: () => {
                    // phoneInput.current.clear();
                    setValue('');
                    setFormattedValue('');
                    // setCountryCode('');
                }
              },
              containerStyle: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              },
              inputContainerStyle: {
                borderBottomWidth: 0,
                flex: 1,
              }
            }}
            // textInputStyle = {{
            // }}
            textContainerStyle = {{
              flex: 1,
              width: 200,
              backgroundColor: '#F8F9F9',
              paddingHorizontal: 5,
              paddingVertical: 1,
              // textAlign: 'left',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            // containerStyle={{
            // }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
              let getNumberAfterPossiblyEliminatingZero = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
              console.log(getNumberAfterPossiblyEliminatingZero);
            }}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, disabled ? {} : styles.redColor]}
            onPress={() => {
              setDisabled(!disabled);
            }}>
            <Text style={styles.buttonText}>{disabled ? 'Activate' : 'Disable'}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 14,
  },
  redColor: {
    backgroundColor: '#F57777'
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default App;
