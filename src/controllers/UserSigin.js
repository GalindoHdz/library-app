import gql from 'graphql-tag';

export const UserSignIn = gql`
    mutation UserSignIn(
        $name: String!
        $last_name: String!
        $email: String!
        $password: String!
    ) {
        UserSignIn(
            User: {
                name: $name
                last_name: $last_name
                email: $email
                password: $password
            }
        ) {
            status
            message
            typeMessage
        }
    }
`;
