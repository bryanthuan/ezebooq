// function msToHMS( ms ) {
//     // 1- Convert to seconds:
//     var seconds = ms / 1000;
//     // 2- Extract hours:
//     var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
//     seconds = seconds % 3600; // seconds remaining after extracting hours
//     // 3- Extract minutes:
//     var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
//     // 4- Keep only seconds not extracted to minutes:
//     seconds = seconds % 60;
//     alert( hours+" hours and "+minutes+" minutes and "+seconds+" seconds!" );
// }
// https://momentjs.com/

/* eslint-disable no-useless-escape */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '_')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')          // Trim - from end of text
}

export function arrayDateToText(arr) {
  // const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  // const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const shortestDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  if (arr.join(', ') === [0, 1, 2, 3, 4, 5, 6].join(', ')) {
    return 'Every day'
  } else if (arr.join(', ') === [1, 2, 3, 4, 5].join(', ')) {
    return 'Weekdays'
  } else if (arr.join(', ') === [6, 0].join(', ') || arr.join(', ') === [0, 6].join(', ')) {
    return 'Weekends'
  } else {
    const rf = arr.map(item => {
      return shortestDays[item]
    })
    return rf.join(', ')
  }
}

export function getDuration() {
  const dur = [0, 15, 30, 45]
  const duration = []
  for (let i = 0; i <= 23; i++) {
    if (i < 23) {
      for (const item of dur) {
        if (i === 0 & item === 0) continue
        const mins = {}
        mins['label'] = i > 0 ? (item > 0 ? `${i}h ${item}m` : `${i}h`) : `${item}m`
        mins['value'] = i * 3600000 + item * 60 * 1000
        duration.push(mins)
      }
    } else {
      const mins = {}
      mins['label'] = '23h'
      mins['value'] = 23 * 3600000
      duration.push(mins)
    }
  }
  return duration
}

export function getHhmm(compare = null) {
  const dur = [0, 15, 30, 45]
  const duration = []
  for (let i = 0; i <= 23; i++) {
    for (const item of dur) {
      if (i === 0 & item === 0) continue
      const mins = {}
      mins['label'] = item > 0 ? `${i}:${item}` : `${i}:00`
      // mins['label'] = `${i}h ${item}m`
      mins['value'] = i * 3600000 + item * 60 * 1000
      duration.push(mins)
    }
  }
  if (compare !== null) {
    return duration.filter(item => {
      return item.value > compare
    })
  }
  return duration
}

const week = [
  { label: 'Mo', value: 1 },
  { label: 'Tu', value: 2 },
  { label: 'We', value: 3 },
  { label: 'Th', value: 4 },
  { label: 'Fr', value: 5 },
  { label: 'Sa', value: 6 },
  { label: 'Su', value: 0 }
]

export function getWeekDayOption() {
  return week
}

export function getDaysLabel(days) {
  return week.reduce((newArr, item) => {
    for (const i of days) {
      if (i === item.value) {
        newArr.push({
          'label': item.label,
          'value': item.value
        })
      }
    }
    return newArr
  }, [])
}

export function sortDays(days) {
  return days.sort((a, b) => {
    return a - b
  })
}

export function uniqid() {
  function chr4() {
    return Math.random().toString(16).slice(-4)
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4()
}

export default {}
