import gql from 'graphql-tag';

export const UserRecoverAccount = gql`
    mutation UserRecoverAccount($email: String!) {
        UserRecoverAccount(User: { email: $email }) {
            status
            message
            typeMessage
        }
    }
`;
