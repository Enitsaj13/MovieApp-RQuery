import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { Movie } from "@/types/movies";
import { Link } from 'expo-router';

// Define props interface with the movie prop
interface MovieListItemProps {
    movie: Movie; // Specify the type for the movie prop
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
    return (
        <Link href={`/${movie.id}`} asChild>
            <Pressable style={{ flex: 1 }}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }}
                    style={{ width: '100%', aspectRatio: 3 / 5, borderRadius: 20 }}
                />
                {/* <Text>{movie.title}</Text> */}
            </Pressable>
        </Link>
    )
}

export default MovieListItem;
