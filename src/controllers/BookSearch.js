import gql from 'graphql-tag';

export const BookSearch = gql`
    query BookSearch($word: String!) {
        BookSearch(word: $word) {
            status
            message
            typeMessage
            Books {
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
