import { fetchMovie } from '@/api/movies';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

const MovieDetails = () => {
    const { id } = useLocalSearchParams(); // hover or log the id the see the type - console.log(typeof id)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movies', id], // using key automatically cache uniquely
        queryFn: () => fetchMovie(id) // it needs parameter that's why it's different to the previous one
    })

    console.log(data)

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (isError) {
        return <Text>Failed to fetch data</Text>
    }

    return (
        <View>
            <Text style={{
                fontSize: 24,
                fontWeight: '500'
            }}>{data.title}</Text>
        </View>
    )
}

export default MovieDetails;
