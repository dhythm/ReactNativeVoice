import Voice from '@react-native-community/voice';
import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

const App: React.FunctionComponent = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [voice, setVoice] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = (event) => {
      console.log('onSpeechStart');
    };
    Voice.onSpeechEnd = (event) => {
      console.log('onSpeechEnd');
    };
    Voice.onSpeechResults = (event: any) => {
      console.log('onSpeechResults');
      console.log(event.value);
      setVoice(event.value[0]);
    };
    Voice.onSpeechError = (event) => {
      console.log('_onSpeechError');
      console.log(event.error);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('ja-JP');
    }
    setIsRecord((prevState) => !prevState);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Button title={isRecord ? 'stop' : 'start'} onPress={onRecordVoice} />
          <Text>{voice}</Text>
          <Button title="clear" onPress={() => setVoice('')} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
