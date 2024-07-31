import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const actions = ["Lamber", "Chupar", "Beijar", "Massagear", "Acariciar", "Morder", "Cheirar", "Apertar", "Explorar", "Tocar"];
const maleBodyParts = ["Peito", "Nuca", "Orelha", "Barriga", "Perna", "Mão", "Pênis", "Escroto", "Coxas", "Bunda"];
const femaleBodyParts = ["Peito", "Nuca", "Orelha", "Barriga", "Perna", "Mão", "Vagina", "Clitóris", "Coxas", "Bunda"];
const times = ["10 segundos", "20 segundos", "30 segundos", "40 segundos", "50 segundos", "60 segundos"];

export default function App() {
  const [action, setAction] = useState("Ação");
  const [maleBodyPart, setMaleBodyPart] = useState("Parte Masculina");
  const [femaleBodyPart, setFemaleBodyPart] = useState("Parte Feminina");
  const [time, setTime] = useState("Tempo");
  const [countdown, setCountdown] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const intervalRef = useRef(null);

  const [actionRotateValue] = useState(new Animated.Value(0));
  const [maleBodyRotateValue] = useState(new Animated.Value(0));
  const [femaleBodyRotateValue] = useState(new Animated.Value(0));
  const [timeRotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (showSplash) {
      setTimeout(() => setShowSplash(false), 3000); // Splash screen duration
    }
  }, [showSplash]);

  useEffect(() => {
    if (countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [countdown]);

  const rollDice = (options, setResult, rotateValue) => {
    let interval;
    Animated.timing(rotateValue, {
      toValue: 5,
      duration: 5000, // 5 segundos de duração
      useNativeDriver: true,
    }).start(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      rotateValue.setValue(0); // Reset rotation value
    });

    interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
    }, 1000); // Atualização a cada 1000ms
  };

  const createSpinAnimation = (rotateValue) => {
    return rotateValue.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5],
      outputRange: ['0deg', '360deg', '720deg', '1080deg', '1440deg', '1800deg'],
    });
  };

  const startCountdown = () => {
    const seconds = parseInt(time.split(" ")[0], 10);
    setCountdown(seconds);
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Dado Erótico</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => rollDice(actions, setAction, actionRotateValue)}>
        <Animated.View style={[styles.dice, styles.action, { transform: [{ rotate: createSpinAnimation(actionRotateValue) }] }]}>
          <Text style={styles.text}>{action}</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => rollDice(maleBodyParts, setMaleBodyPart, maleBodyRotateValue)}>
        <Animated.View style={[styles.dice, styles.male, { transform: [{ rotate: createSpinAnimation(maleBodyRotateValue) }] }]}>
          <Text style={styles.text}>{maleBodyPart}</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => rollDice(femaleBodyParts, setFemaleBodyPart, femaleBodyRotateValue)}>
        <Animated.View style={[styles.dice, styles.female, { transform: [{ rotate: createSpinAnimation(femaleBodyRotateValue) }] }]}>
          <Text style={styles.text}>{femaleBodyPart}</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => rollDice(times, setTime, timeRotateValue)}>
        <Animated.View style={[styles.dice, styles.time, { transform: [{ rotate: createSpinAnimation(timeRotateValue) }] }]}>
          <Text style={styles.text}>{time}</Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{countdown > 0 ? countdown : "Pronto"}</Text>
        <TouchableOpacity style={styles.startButton} onPress={startCountdown}>
          <Text style={styles.startButtonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6f61',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dice: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  action: {
    backgroundColor: '#ffffff',
  },
  male: {
    backgroundColor: '#add8e6',
  },
  female: {
    backgroundColor: '#ffb6c1',
  },
  time: {
    backgroundColor: '#ffa500',
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});
