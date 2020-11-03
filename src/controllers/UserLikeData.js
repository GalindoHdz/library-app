import gql from 'graphql-tag';

export const UserLikesData = gql`
    query UserLikesData($_id: ID!, $token: String!) {
        UserLikesData(User: { _id: $_id, token: $token }) {
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
