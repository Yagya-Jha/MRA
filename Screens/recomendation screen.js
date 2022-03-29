import * as React from 'react'
import {Text, View, Stylesheet, SafeAreaView, Touchableopacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {movie_details: {}};
    }

    convert_time(time){
        var h = Math.floor(time/60);
        var m = time%60;

        return `${h} hours ${m} minutes`
    }

    get_movie_details=()=>{
        const url = 'http://127.0.0.1:5000/getmovie';
        axios.get(url).then(response=>{
            let details = response.data.data;
            details["runtime"] = this.convert_time(details.runtime);
            this.setState({movie_details: details});
        }).catch(e=>{
            console.log(e.message);
        });
    }

    componentDidMount(){
        this.get_movie_details();
    }

    like_movie=()=>{
        const url = 'http://127.0.0.1:5000/likedmovies';
        axios.post(url).then(response=>{
            this.get_movie_details();
        }).catch(e=>{
            console.log(e.message);
        })
    }

    unlike_movie=()=>{
        const url = 'http://127.0.0.1:5000/unlikedmovies';
        axios.post(url).then(response=>{
            this.get_movie_details();
        }).catch(e=>{
            console.log(e.message);
        })
    }

    now_watched_movie=()=>{
        const url = 'http://127.0.0.1:5000/didnotwatched';
        axios.post(url).then(response=>{
            this.get_movie_details();
        }).catch(e=>{
            console.log(e.message);
        })
    }

    render(){
        const {movie_details} = this.state;
        var tittle;
        if(movie_details.poster_link){
            const {poster_link, title, release_date, runtime, overwiew, rating} = movie_details;
            tittle = title
        }
        return(
        <View>
            <SafeAreaView />
            <Text>{tittle}</Text>
        </View>
        );
    }
}