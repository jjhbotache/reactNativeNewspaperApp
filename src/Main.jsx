import { View, Text, FlatList, ScrollView } from 'react-native';
import { mainPageStyles } from './pages/Main/MainStyles';
import StyledText from './components/StyledText/StyledText';
import Separator from './components/Separator/Separator';
import { useEffect, useState } from 'react';
import { NEWS_API_KEY } from '@env';
import { baseUrl } from './constants/newsApiConstants';

export default function Main() {
  const [articles, setArticles] = useState([]);
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
      const firstArticle = data.articles.results[0]
      setArticles(data.articles.results)
    })
  }, []);
  return(
    <View style={mainPageStyles.page} >
      <StyledText size={"lg"} color={"primary"} bold> News app </StyledText>
      <Separator/>
      <FlatList 
        data={articles}
        renderItem={({item:a},i) =>(
          <View key={i} style={{paddingHorizontal:10}}>
            <StyledText size={"md"} color={"primary"} bold> {a.title} </StyledText>
            <StyledText size={"sm"} color={"secondary"}> {a.body.slice(0,500)} </StyledText>
          </View>
        )}
        ItemSeparatorComponent={<Separator mv={40}/>}
        >
      </FlatList>
    </View>
  )
};
