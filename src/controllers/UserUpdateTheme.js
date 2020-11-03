import gql from 'graphql-tag';

export const UserUpdateTheme = gql`
    mutation UserUpdateTheme($_id: ID!, $token: String!, $value: Boolean!) {
        UserUpdateTheme(User: { _id: $_id, token: $token, value: $value }) {
            status
            message
            typeMessage
        }
    }
`;
