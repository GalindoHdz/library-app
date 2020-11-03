import gql from 'graphql-tag';

export const UserLogIn = gql`
    query UserLogIn($email: String!, $password: String!) {
        UserLogIn(User: { email: $email, password: $password }) {
            _id
            token
            status
            message
            typeMessage
        }
    }
`;
