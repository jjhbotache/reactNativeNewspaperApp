import { View, Text, FlatList, ScrollView, Image} from 'react-native';
import { mainPageStyles } from './pages/Main/MainStyles';
import StyledText from './components/StyledText/StyledText';
import Separator from './components/Separator/Separator';
import { useEffect, useState } from 'react';
import { NEWS_API_KEY } from '@env';
import { baseUrl } from './constants/newsApiConstants';
import { StyleSheet } from 'react-native-web';
import SearchBar from './components/SearchBar/SearchBar';

export default function Main() {

  const [articles, setArticles] = useState([]);

  let searchTimeout = null;
  function searchBarTextChanged(text) {
    // debounce
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetch(baseUrl+"article/getArticles",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "apiKey": NEWS_API_KEY,
          "keyword": text,
        })
      })
      .then(response => response.json())
      .then(data => {
        let articles_to_show = data.articles.results;
        // filter by languaje "eng"
        articles_to_show = articles_to_show.filter(a => a.lang === "eng")
        articles_to_show = articles_to_show.slice(0, 10)

        setArticles(articles_to_show)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    }, 500);

  }


  useEffect(() => {
    fetch(baseUrl+"article/getArticles",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "apiKey": NEWS_API_KEY,
        "keyword": "covid-19",
      })
    })
    .then(response => response.json())
    .then(data => {
      let articles_to_show = data.articles.results;
      // filter by languaje "eng"
      articles_to_show = articles_to_show.filter(a => a.lang === "eng")
      articles_to_show = articles_to_show.slice(0, 10)

      setArticles(articles_to_show)
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  }, [])


  return(
    <View style={mainPageStyles.page} >
      <StyledText size={"lg"} color={"primary"} bold> News app </StyledText>
      <Separator/>
      <SearchBar onChangeText={searchBarTextChanged}/>
      <Separator/>
      <FlatList 
        data={articles}
        renderItem={({item:a},i) =>(
          <ScrollView key={i} style={articleStyles.articleContainer}>
            <Image source={{uri: a.image}} style={articleStyles.img} resizeMode='cover'/>
            <Separator/>
            <StyledText size={"md"} color={"primary"} bold> {a.title} </StyledText>
            {/* <StyledText size={"sm"} color={"secondary"}> {a.body} </StyledText> */}
          </ScrollView>
        )}
        ItemSeparatorComponent={<Separator mv={40}/>}
        >
      </FlatList>
    </View>
  )
};

const articleStyles = StyleSheet.create({
  articleContainer:{
    padding: 20,
    margin: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    height: "auto",
    // maxHeight: 300,
  },
  img:{
    width: 400,
    height: 200,
  }
})
