import { ActivityIndicator, Text, View, Image, Pressable } from 'react-native';
import { fetchMovie } from '@/api/movies';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { addMovieToWatchList } from '@/api/watchlist';

const MovieDetails = () => {
    const { id } = useLocalSearchParams(); // hover or log the id the see the type - console.log(typeof id)

    const client = useQueryClient();

    const { data: movie, isLoading, isError } = useQuery({
        queryKey: ['movies', id], // using key automatically cache uniquely
        queryFn: () => fetchMovie(id) // it needs parameter that's why it's different to the previous one
    });

    const { mutate } = useMutation({
        mutationFn: () => addMovieToWatchList(id),
        onSuccess: () => { // if success, update the screen
            client.invalidateQueries({ queryKey: ['watchlist'] });
        }
    });

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (isError) {
        return <Text>Failed to fetch data</Text>
    }

    return (
        <View>
            <Stack.Screen options={{ title: movie?.title }} />
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                }}
                style={{ width: '100%', height: 300 }}
            />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: '500', marginVertical: 10 }}>
                    {movie?.title}
                </Text>
                <View style={{ marginVertical: 10 }}>
                    <Pressable onPress={() => mutate()}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <FontAwesome name="bookmark-o" size={24} color="black" />
                        <Text>Add to watchlist</Text>
                    </Pressable>
                </View>
                <Text style={{ fontSize: 16 }}>{movie?.overview}</Text>

            </View>
        </View>
    )
}

export default MovieDetails;
