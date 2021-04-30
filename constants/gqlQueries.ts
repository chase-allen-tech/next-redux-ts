import { gql } from '@apollo/client';

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
     query getChannels($obj: ID!) {
        channelsForSource(entityIdentifier: $obj) {
            identifier,
            name,
            description,
            identification,
            owner,
            read,
            write,
            cover,
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

export const Q_GET_CONTRACTS = gql`
    query {
        contracts {
            identifier,
            name,
            version,
            description,
            isActive,
            owner,
            tags,
            accessKeys,
            channelIdentifier
        }
    }
`;

export const Q_GET_CONTRACTS_FOR_CHANNEL = gql`
    query getContracts($obj: ID!) {
        contractsForChannel(
            channelIdentifier: $obj
        ) {
            identifier,
            name
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
    query get_groups($obj: ID!){
        groupsForEntity(entityIdentifier: $obj) {
            identifier,
            name,
            entityIdentifier,
            entity {
                identifier, name
                # , project, identification, legal, phone, address1, address2, city, zip, country, createdAt, modifiedAt, deletedAt
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
    mutation setUser($obj: ID!){
        setMe(identifier: $obj) {
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
            createdAt,
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
export const M_DELETE_CONTRACT = gql`
    mutation mUpdateContract($obj: ID!, $obj1: ID!) {
        contractDelete(channelIdentifier: $obj, contractIdentifier: $obj1) {
            identifier,
            name,
            version,
            description,
            # mode,
            # modality,
            isActive,
            owner,
            tags,
            accessKeys,
            # contractFields,
            channelIdentifier
        }
    }
`;

export const M_UPDATE_CONTRACT = gql`
    mutation mUpdateContract($obj: ID!, $obj1: ID!, $obj2: ContractInput!) {
        contractUpdate(channelIdentifier: $obj, contractIdentifier: $obj1, contract: $obj2) {
            identifier,
            name,
            version,
            description,
            # mode,
            # modality,
            isActive,
            owner,
            tags,
            accessKeys,
            # contractFields,
            channelIdentifier
        }
    }
`;

// name, version, description, mode, modality, tags, contractFields
export const M_ADD_CONTRACT = gql`
    mutation contractCreation($obj: ContractInput!) {
        contractAdd(contract: $obj) {
            identifier
            name
        }
    }
`;

// *******************************************************************************************************

// name, entityIdentifier
export const M_ADD_GROUP = gql`
    mutation mAddGroup($obj: GroupInput) {
        groupAdd(group: $obj) {
            identifier,
            name,
            entityIdentifier,
            entity {
                name
            }
        }
    }
`;

export const M_UPDATE_GROUP = gql`
    mutation mAddGroup($obj: ID!, $obj1: GroupInput) {
        groupUpdate(groupIdentifier: $obj, group: $obj1) {
            identifier,
            name,
            entityIdentifier,
            entity
        }
    }
`;

export const M_DELETE_GROUP = gql`
    mutation mDeleteGroup($obj: ID!) {
        groupDelete(groupIdentifier: $obj) {
            identifier,
            name,
            entityIdentifier,
            entity
        }
    }
`;