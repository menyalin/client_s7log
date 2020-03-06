import gql from 'graphql-tag'

export const queryDatesFilter = gql`
    query queryDatesFilter ($startDate: String $endDate: String) {
        carUnitForVuex (startDate: $startDate endDate: $endDate) {
            id
            dateRange {
                value
                inclusive
            }
            truckId
            trailerId
            driver1Id
            driver2Id
            note
        }
        carWorkScheduleForVuex (startDate: $startDate endDate: $endDate){
            id
            type
            note
            title
            dateRange {
                value
                inclusive
            }
            carId
            trailerId
            driverId
        }
        ordersForVuex(startDate: $startDate, endDate: $endDate) {
            id
            carType
            number
            status
            dateRange {
                value
                inclusive
            }
            shipperId
            consigneeId
            carId
            note
            plannedShippingDate
            plannedDeliveryDate
            loadingStart
            loadingEnd
            unLoadingStart
            unLoadingEnd
            lengthCell
            isDriverNotified
            isClientNotified
            templateId
            attention
            driver1Id
            driver2Id
            trailerId
            plannedCarType
            weight
            pltCount
            price
        }
        scheduleForVuex(startDate: $startDate, endDate: $endDate) {
            id
            type
            date
            user {
                id
                name
            }
        }
    }
`

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