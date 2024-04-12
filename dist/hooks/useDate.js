export function useTimeStamp(date) {
    if (typeof date !== 'string')
        return +new Date();
    const [front, end] = date.split(' ');
    const [year, month, day] = front.split('-');
    const [hours, minutes, seconds] = end.split(':');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes), Number(seconds), 0).getTime();
}
