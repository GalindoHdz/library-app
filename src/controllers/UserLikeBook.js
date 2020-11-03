import gql from 'graphql-tag';

export const UserLikeBook = gql`
    mutation UserLikeBook(
        $_id: ID!
        $token: String!
        $key: ID!
        $title: String!
        $author: String!
        $description: String!
        $year_publication: String!
        $cover: String!
    ) {
        UserLikeBook(
            User: {
                _id: $_id
                token: $token
                key: $key
                title: $title
                author: $author
                description: $description
                year_publication: $year_publication
                cover: $cover
            }
        ) {
            status
            message
            typeMessage
            likes {
                _id
                title
                author
                description
                year_publication
                cover
            }
        }
    }
`;
