import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { RadioButton } from 'react-native-paper';



function Question({ navigation }) {

    const catId = useSelector(state => state.id);
    const ques = useSelector(state => state.question.results);
    console.log(ques)
    const dispatch = useDispatch()
    const [ans, setAns] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(-1)
    const [TextValue, setTextValue] = useState('NextQuestion')
    const [AnsCounter, SetAnsCounter] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${catId}`)
                .then((res) => {
                    // console.log(res.data);
                    setCurrentQuestion(0)
                    dispatch({ type: 'QUESTION', ques: (res.data) })
                })
                .catch((err) => console.log(err.message))

        }, []))



    // useFocusEffect(
    //     React.useCallback(async () => {
    //         const data = await axios.get(`https://opentdb.com/api.php?amount=10&category=${catId}`)
    //         setCurrentQuestion(0)
    //         dispatch({ type: 'QUESTION', ques: (data.data) })

    //     }, []))




    useFocusEffect(
        React.useCallback(() => {
            if (currentQuestion > -1) {
                let currentAnswers = [...ques[currentQuestion]?.incorrect_answers, ques[currentQuestion]?.correct_answer]
                currentAnswers.sort()
                setAns(currentAnswers)
            }
        }, [currentQuestion])
    )

    const CheckOption = (v, c) => {

        const i = ques[c].correct_answer;
        if (v === i) {
            // console.log('correct option')
            SetAnsCounter(AnsCounter + 1)
        } else {
            console.log('incoreect option')
        }
    }

    if (!ques) {
        return <View><Text>Loading Question...</Text></View>
    } else if (!ques[currentQuestion]) {
        return <View><Text>Loading current Question...</Text></View>

    }
    return (
        <ScrollView>
            <View>
                <ImageBackground source={{uri:"https://cdnb.artstation.com/p/assets/images/images/022/323/513/large/mario-aceituno-fondo-pantalla-quiz.jpg?1574978636"}} style={{flex:1,}}>

                <View >
                    {
                        <Text style={style.Question}>{`Q${currentQuestion + 1}) ${ques[currentQuestion]?.question}`}</Text>
                    }
                </View>
                <View>
                    {
                        ans?.map((v, i) => {
                            return <TouchableOpacity key={i} style={style.MainOption}  >
                                <Text onPress={() => CheckOption(v, currentQuestion)} style={style.Option}> Option {(i + 1) + ') ' + v} </Text>

                            </TouchableOpacity>

                        })
                    }


                    <TouchableOpacity onPress={() => {
                        currentQuestion < 9 ? setCurrentQuestion(currentQuestion + 1) : setTextValue('SubmitQuestion')
                    }} style={[style.NextQuestion,style.Option]} ><Text>{TextValue}</Text></TouchableOpacity>
                </View>


                <Text>Home</Text>
                <TouchableOpacity onPress={() => navigation.navigate('quiz')} >
                    <Text>Quiz</Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        </ScrollView >
    );
}

const style = StyleSheet.create({
    Question: {
        borderWidth: 2,
        borderColor: "#20232a",
        backgroundColor: "#b38600",
        color: "black",
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
    },
    Option: {
        borderWidth: 2,
        borderColor: "#20232a",
        backgroundColor: "#b38600",
        color: "black",
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
        marginRight: 25,
        marginLeft: 25,
    },
    NextQuestion:{
        borderWidth: 2,
        borderColor: "#20232a",
        backgroundColor: "blue",
        color: "black",
        padding: 10,
        marginBottom: 10,
        fontSize: 20,
        marginRight: 25,
        marginLeft: 25,
    }
})


export default Question;