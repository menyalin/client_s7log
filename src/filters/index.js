import moment from 'moment'
export const unixDateToStr = (value) => {
    return moment(+value).format('DD.MM.YYYY HH:mm')
}