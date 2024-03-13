import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { fetchTopRatedMovies } from '@/api/movies';

// Define an interface for the movie object
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function TabOneScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const movies = await fetchTopRatedMovies();
        setMovies(movies);
      } catch (error) {
        setError(error)
      }

      setIsLoading(false);
    };
    fetchMovies()
  }, []);

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
