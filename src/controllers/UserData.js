import gql from 'graphql-tag';

export const UserData = gql`
    query UserData($_id: ID!, $token: String!) {
        UserData(User: { _id: $_id, token: $token }) {
            status
            message
            typeMessage
            name
            last_name
            email
            photo
            theme
        }
    }
`;
