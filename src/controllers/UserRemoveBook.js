import gql from 'graphql-tag';

export const UserRemoveBook = gql`
    mutation UserRemoveBook($_id: ID!, $token: String!, $key: ID!) {
        UserRemoveBook(User: { _id: $_id, token: $token, key: $key }) {
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
