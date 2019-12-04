import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class PoreQuestion extends Component {
    constructor(props) {
        super(props);
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    nextQuestion(typeId) {
        let score = this.props.navigation.getParam('score');
        score = score + typeId;
        this.props.navigation.navigate('CleanserQuestion', {
            score
        });
    }

    render() {
        return (
            <ImageBackground source={require('./blob.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.header}>
                            My pores are usually
                        </Text>
                    </View>
                    <View style={{ zIndex: 5 }}>
                        <View style={styles.scrollContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(1)}
                                >
                                    <Text style={styles.btnText}>large and easily clogged with sweat and oil throughout the day.</Text>
                                </TouchableOpacity>
                            </View> 
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(4)}
                                >
                                    <Text style={styles.btnText}>clogged around the nose but small and unnoticeable elsewhere.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(2)}
                                >
                                    <Text style={styles.btnText}>on the smaller side, but I still get blackheads.</Text>
                                </TouchableOpacity>
                            </View>             
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(3)}
                                >
                                    <Text style={styles.btnText}>unnoticeable and uncongested. I don't typically get blackheads.</Text>
                                </TouchableOpacity>
                            </View>  
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                style={styles.userBtn}
                                onPress={() => this.nextQuestion(5)}
                                >
                                    <Text style={styles.btnText}>normal to large but can vary since my skin often reacts to products.</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>
                                Progress: 25%
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  topContainer: {
      marginTop: "auto",
      marginLeft: 20,
      marginRight: 20,
      width: "100%",
      height: 200,
      position: "absolute"
    },
  header: {
    marginTop: "20%",
    textAlign: "center",
    fontSize: 34,
    color: "white"
  },
  scrollContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      marginTop: 200,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      display: "flex",
      flexDirection: "column",
      paddingTop: "9%",
      paddingLeft: "10%",
      paddingRight: "10%",
      paddingBottom: "15%"
    },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  userBtn: {
    backgroundColor: "white",
    borderColor: "#A7CAEB",
    borderWidth: 2,
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: "95%",
  },
  btnText: {
    fontSize: 16,
    color: "#A7CAEB",
    textAlign: "center"
  },
  bodyText: {
      fontSize: 12,
      textAlign: "center",
      margin: 15
  }
});
