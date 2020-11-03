import gql from 'graphql-tag';

export const UserVerify = gql`
    query UserVerify($_id: ID!, $token: String!) {
        UserVerify(User: { _id: $_id, token: $token }) {
            status
            message
            typeMessage
        }
    }
`;
