import moment from 'moment'
const dateFormat = 'DD.MM.YYYY HH:mm'
export const unixDateToStr = (value) => {
    return moment(+value).format(dateFormat)
}

export const dateRangeToStr = (val) => {
    if (val[1].value) return moment(+val[0].value).format(dateFormat) + ' - ' + moment(+val[1].value).format(dateFormat)
    else return moment(+val[0].value).format(dateFormat) + ' - '
}