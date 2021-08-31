import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import Question from './Home'
import { Colors } from 'react-native/Libraries/NewAppScreen';


function QuizApp({ navigation }) {

    const catogory = useSelector(state => state.catagory);
    const dispatch = useDispatch()
    // console.log(catogory);

    useFocusEffect(
        React.useCallback(() => {
            axios.get('https://opentdb.com/api_category.php')
                .then((res) => {
                    dispatch({ type: 'CATAGORY', catg: (res.data) })
                })
                .catch((err) => console.log(err.message))
        }, []))



    return (
        <ScrollView>
            <View>

                <View >
                    {
                        catogory ?
                            catogory.trivia_categories?.map((v, i) => {
                                return <TouchableOpacity style={style.catgName} key={i} onPress={() => {
                                    dispatch({ type: 'ID', id: v.id })
                                    navigation.navigate('home')
                                }}>
                                    <Text style={{color:'#1a1300',  fontSize: 15,fontWeight: "bold"}} >{v.name}</Text>
                                </TouchableOpacity>
                            }) : <Text>...Loading Quiz App</Text>
                    }
                </View>


                {/* <Question/> */}

                <Text>Quiz App</Text>
                <TouchableOpacity onPress={() => navigation.navigate('home')} >
                    <Text>Home</Text>
                </TouchableOpacity>



            </View>
        </ScrollView>
    );
}



const style = StyleSheet.create({
    catgName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#b38600",
        color: "#fff",
        padding: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
      
    }
})

export default QuizApp;

