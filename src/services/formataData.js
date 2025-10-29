import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

function formataData(data_hora){
    dayjs.extend(utc)
    dayjs.extend(timezone)
    
    return dayjs.utc(data_hora).format('DD/MM/YYYY HH:mm')
}

export {formataData}