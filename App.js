import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

const App = () => {
  const [time, setTime] = useState(0);
  const [timeLast, setTimeLast] = useState(null);
  const [button, setButton] = useState('Iniciar');
  function handleStart() {
    if (timer !== null) {
      //Aqui Para o Cronometro
      clearInterval(timer);
      timer = null;
      setButton('Retomar');
    } else {
      //Começar Cronometro
      timer = setInterval(() => {
        ss++;
        if (ss == 60) {
          ss = 0;
          mm++;
        }
        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setTime(format);
      }, 1000);
      setButton('Pausar');
    }
  }
  function handleStop() {
    if (timer !== null) {
      //Parar Time
      clearInterval(timer);
      timer = null;
    }
    setTimeLast(time);
    setTime(0);
    setButton('Iniciar');
    ss = 0;
    mm = 0;
    hh = 0;
    // }
  }
  return (
    <View style={styles.container}>
      <Image source={require('./src/images/crono.png')} />
      <Text style={styles.timer}>{time}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: timer ? '#FFF' : '#5cb85c' }]}
          onPress={handleStart}>
          <Text style={[styles.btnText, { color: timer ? '#00aeef' : '#fff' }]}>
            {button}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={time === 0 ? true : false}
          style={[
            styles.btn,
            { backgroundColor: '#f32013', opacity: time ? 1 : 0.5 },
          ]}
          onPress={handleStop}>
          <Text style={[styles.btnText, { color: '#fff' }]}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTime}>
        {timeLast && (
          <Text style={styles.lastTimeText}>Last Time: {timeLast}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  lastTime: {
    marginTop: 40,
  },
  lastTimeText: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default App;
