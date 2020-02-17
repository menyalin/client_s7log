import gql from 'graphql-tag'

export const queryFilterLess = gql`
    query queryFilterLess {
        driversForVuex {
            id
            fullName
            shortName
            phone1
            phone2
            passport
            driversLicense
            note
            isActive
         }
        carsForVuex {
            id
            title
            listItem
            regNumber
            isTempSlot
            reg
            pts
            isOwned
            type
            maxPltCount
            note
            isActive
        }
        addressesForVuex {
            id
            partner
            address
            shortName
            note
            isShippingPlace
            isDeliveryPlace
            isActive
        }
        staff {
            id
            userId
            role
            isActive
            user {
                name
                email
            }
        }
        orderTemplates {
            id
            templateName
            carType
            status
            note
            shipperId
            consigneeId
            lengthCell
            showInMenu
            plannedCarType
            weight
            pltCount
            price
        }
        
    } 
`