<template>
    <div class="view">
        <div ref="calendar" id="calendar"></div>      
    </div>
</template>
<script>
    import defaultData from './calendarData'
    import 'fullcalendar'
    export default {
      mounted () {
        $('#calendar').fullCalendar(
          {
            header: {
              left: 'prev next today',
              center: 'title',
              right: 'listMonth,agendaDay,agendaThreeDay,agendaWeek,month'
            },
            height: 650,
            defaultDate: '2017-02-12',
            defaultView: 'listMonth',
            navLinks: true, // can click day/week names to navigate views
            businessHours: true, // display business hours
            editable: true,
            events: defaultData,
            views: {
              agendaThreeDay: {
                type: 'agenda',
                duration: { days: 3 },
                buttonText: '3 day'
              },
              listMonth: {
                buttonText: 'agenda'
              }
            }
          })
      }
    }
</script>
<style lang="sass" scoped> 
@import '../../styles/fullcalendar.css'
@import '../../styles/bootstrap-fullcalendar.css'
</style>

