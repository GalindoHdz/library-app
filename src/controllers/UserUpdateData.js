import gql from 'graphql-tag';

export const UserUpdateData = gql`
    mutation UserUpdateData(
        $_id: ID!
        $token: String!
        $password: String!
        $new_password: String
        $name: String
        $last_name: String
    ) {
        UserUpdateData(
            User: {
                _id: $_id
                token: $token
                password: $password
                new_password: $new_password
                name: $name
                last_name: $last_name
            }
        ) {
            status
            message
            typeMessage
        }
    }
`;
