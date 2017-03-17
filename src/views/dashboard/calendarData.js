/* eslint-disable indent */
/* eslint-disable no-tabs */
export default [
    {
        title: 'Business Lunch',
        start: '2017-02-03T13:00:00',
        constraint: 'businessHours'
    },
    {
        title: 'Meeting',
        start: '2017-02-13T11:00:00',
        constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
    },
    {
        title: 'Conference',
        start: '2017-02-18',
        end: '2017-02-20'
    },
    {
        title: 'Party',
        start: '2017-02-29T20:00:00'
    },

    // areas where "Meeting" must be dropped
    {
        id: 'availableForMeeting',
        start: '2017-02-11T10:00:00',
        end: '2017-02-11T16:00:00',
        rendering: 'background'
    },
    {
        id: 'availableForMeeting',
        start: '2017-02-13T10:00:00',
        end: '2017-02-13T16:00:00',
        rendering: 'background'
    },

    // red areas where no events can be dropped
    {
        start: '2017-02-24',
        end: '2017-02-28',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
    },
    {
        start: '2017-02-06',
        end: '2017-02-08',
        overlap: false,
        rendering: 'background',
        color: '#ff9f89'
    }
]
