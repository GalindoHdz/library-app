import gql from 'graphql-tag';

export const BookForSubjects = gql`
    query BookForSubjects($subject: String!) {
        BookForSubjects(subject: $subject) {
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
