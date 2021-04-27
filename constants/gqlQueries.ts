import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const Q_GET_ME = gql`
{
    getMe {
        me {
            name,
            identifier
        }
    }
}
`;

export const Q_GET_CHANNELS_OF_SOURCE = gql`
    query _($obj: ID!) {
        channelsOfSource(entityIdentifier: $obj) {
            identifier,
            name,
            description,
            identification,
            owner,
            read,
            write,
            cover,
            contracts,
            sourceIdentifier,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;

export const Q_GET_CHANNELS_OF_COVER = gql`
    query _($obj: ID!) {
        channelsOfSource(coverIdentifier: $obj) {
            identifier,
            name,
            description,
            identification,
            owner,
            read,
            write,
            cover,
            contracts,
            sourceIdentifier,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;

export const Q_GET_ENTITIES = gql`
    query {
        entities {
            identifier,
            name,
            project,
            identification,
            legal,
            phone,
            address1,
            address2,
            city,
            zip,
            country,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;

export const Q_GET_GROUPS_BY_ENTITY = gql`
    query _($obj: ID!){
        groupsByEntity(entityIdentifier: $obj) {
            identifier,
            name,
            entityIdentifier,
            entity {
                identifier, name, project, identification, legal, phone, address1, address2, city, zip, country, createdAt, modifiedAt, deletedAt
            }
        }
    }
`;

// *******************************************************************************************************

// name!, email!, project, entityIdentifiers, groupIdentifiers
export const M_ADD_USER = gql`
    mutation insertUser($obj: UserInput!) {
        userAdd(user: $obj) {
            name,
            identifier
        }
    } 
`;

export const M_SET_ME = gql`
    mutation {
        setMe(identifier: "cddcd0dd-d868-4977-b763-587b80d17321") {
            me {
                name
            }
        }
    }
`;

// *******************************************************************************************************

// export const M_CHANNEL_ALLOW_TO_WRITE = gql`
//     mutation mChannelAllowToWrite($obj: ID!, $obj1: ID!) {
//         channelAllowToWrite(channelIdentifier: $obj, allowed: $obj1) {
//         }
//     }
// `;

// export const M_CHANNEL_ALLOW_TO_READ = gql`
//     mutation mChannelAllowToRead($obj: ID!, $obj1: ID!) {
//         channelAllowToRead(channelIdentifier: $obj, allowed: $obj1) {

//         }
//     }
// `;

//  name, description, identification, read, write, cover, sourceIdentifier
export const M_ADD_CHANNEL = gql`
    mutation mAddChannel($obj: ChannelInput!) {
        channelAdd(channel: $obj) {
            identifier,
            name,
            description,
            identification,
            owner,
            read,
            write,
            cover,
            contracts {
                identifier, name, version, description, mode, isActive, owner, tags,
                accessKeys, channelIdentifier,
           
            },
            sourceIdentifier,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;

export const M_UPDATE_CHANNEL = gql`
    mutation mUpdateChannel($obj: ID!, $obj1: ChannelInput) {
        channelUpdate(channelIdentifier: $obj, channel: $obj1) {
            identifier, name, description, identification, owner, read, write, cover,
            sourceIdentifier, createdAt, modifiedAt, deletedAt
        }
    }
`;


export const M_DELETE_CHANNEL = gql`
    mutation mDeleteChannel($obj: ID!) {
        channelDelete(channelIdentifier: $obj)
    }
`;

// *******************************************************************************************************

// name, identification, project, legal, phone, address1, address2, city, zip, country, members
export const M_ADD_ENTITY = gql`
    mutation mEntityAdd($obj: EntityInput!){
        entityAdd(entity: $obj) {
            identifier,
            name,
            project,
            identification,
            legal,
            phone,
            address1,
            address2,
            city,
            zip,
            country,
            owner,
            members,
            groups,
            channels,
            contracts,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;


// name, identification, project, legal, phone, address1, address2, city, zip, country, members
export const M_UPDATE_ENTITY = gql`
    mutation mEntityUpdate($obj: ID!, $obj1: EntityInput!){
        entityUpdate(entityIdentifier: $obj, entity: $obj1) {
            identifier,
            name,
            project,
            identification,
            legal,
            phone,
            address1,
            address2,
            city,
            zip,
            country,
            owner,
            members,
            groups,
            channels,
            contracts,
            createdAt,
            modifiedAt,
            deletedAt
        }
    }
`;

export const M_DELETE_ENTITY = gql`
    mutation mEntityDelete($obj: ID!){
        entityDelete(entityIdentifier: $obj)
    }
`;

// *******************************************************************************************************

// name, version, description, mode, modality, tags, contractFields
export const M_ADD_CONTRACT = gql`
    mutation mAddContract($obj: ID!, $obj1: ContractInput!) {
        contractAdd(channelIdentifier: $obj, cntract: $obj1) {
            identifier,
            name,
            version,
            description,
            mode,
            modality,
            isActive,
            owner,
            tags,
            accessKeys,
            contractFields,
            channelIdentifier
        }
    }
`;

// name, entityIdentifier
export const M_ADD_GROUP = gql`
    mutation mAddGroup($obj: GroupInput) {
        groupAdd(group: $obj) {
            identifier,
            name,
            entityIdentifier,
            entity
        }
    }
`;